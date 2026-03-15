import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase/service';
import {
  getPaymentProductConfig,
  isPaymentSku,
  type PaymentSku,
} from '@/lib/payment-config';

function generateOrderNo() {
  return `cpo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function buildAppUrl() {
  return (
    process.env.BETTER_AUTH_URL ||
    process.env.NEXTAUTH_URL ||
    process.env.APP_BASE_URL ||
    'http://localhost:3000'
  );
}

function normalizeCreemCheckoutUrl(checkoutUrl: string) {
  try {
    const url = new URL(checkoutUrl);
    if (url.hostname === 'creem.io') {
      url.hostname = 'www.creem.io';
    }
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

export async function POST(request: NextRequest) {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const sku = body?.sku;

  if (!sku || typeof sku !== 'string' || !isPaymentSku(sku)) {
    return NextResponse.json({ error: 'Invalid sku' }, { status: 400 });
  }

  const config = getPaymentProductConfig(sku as PaymentSku);

  if (!config.providerProductId) {
    return NextResponse.json(
      { error: `Payment product is not configured for sku: ${config.sku}` },
      { status: 500 }
    );
  }

  const creemApiKey = process.env.CREEM_API_KEY;
  if (!creemApiKey) {
    return NextResponse.json(
      { error: 'Payment provider is not configured' },
      { status: 500 }
    );
  }

  const appBaseUrl = buildAppUrl();
  const orderNo = generateOrderNo();
  const requestId = `${orderNo}_creem`;
  const successUrl = `${appBaseUrl}/checkout/success?orderNo=${encodeURIComponent(orderNo)}`;
  const cancelUrl = `${appBaseUrl}/checkout/cancel?orderNo=${encodeURIComponent(orderNo)}`;

  const supabase = createServiceClient();

  // 1. Create local order first
  const { data: order, error } = await supabase
    .from('cp_payment_orders')
    .insert({
      order_no: orderNo,
      user_id: session.user.id,
      provider: 'creem',
      sku: config.sku,
      rights_type: config.rightsType,
      status: 'pending',
      request_id: requestId,
      provider_product_id: config.providerProductId || null,
      amount: config.amount,
      currency: config.currency,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        user_email: session.user.email,
        product_name: config.displayName,
        reading_credits: config.readingCredits ?? null,
        membership_plan_code: config.membershipPlanCode ?? null,
      },
    })
    .select('id, order_no, provider_product_id, amount, currency, rights_type, status')
    .single();

  if (error || !order) {
    return NextResponse.json(
      { error: error?.message || 'Failed to create payment order' },
      { status: 500 }
    );
  }

  // 2. Call Creem API to create checkout session
  const creemBaseUrl = creemApiKey.startsWith('creem_test_')
    ? 'https://test-api.creem.io/v1'
    : 'https://api.creem.io/v1';
  let creemCheckout;
  try {
    const creemRes = await fetch(`${creemBaseUrl}/checkouts`, {
      method: 'POST',
      headers: {
        'x-api-key': creemApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: config.providerProductId,
        request_id: requestId,
        success_url: successUrl,
        metadata: {
          order_no: orderNo,
          user_id: session.user.id,
          sku: config.sku,
        },
        ...(session.user.email && {
          customer: { email: session.user.email },
        }),
      }),
    });

    if (!creemRes.ok) {
      const errBody = await creemRes.text();
      console.error('Creem checkout error:', creemRes.status, errBody);
      // Update order status to failed
      await supabase
        .from('cp_payment_orders')
        .update({ status: 'failed', metadata: { creem_error: errBody } })
        .eq('order_no', orderNo);
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 502 }
      );
    }

    creemCheckout = await creemRes.json();
  } catch (err) {
    console.error('Creem API request failed:', err);
    await supabase
      .from('cp_payment_orders')
      .update({ status: 'failed' })
      .eq('order_no', orderNo);
    return NextResponse.json(
      { error: 'Payment provider unavailable' },
      { status: 502 }
    );
  }

  // 3. Update order with Creem checkout ID
  await supabase
    .from('cp_payment_orders')
    .update({
      provider_checkout_id: creemCheckout.id,
      status: 'checkout_created',
    })
    .eq('order_no', orderNo);

  return NextResponse.json({
    orderNo,
    checkoutUrl: normalizeCreemCheckoutUrl(creemCheckout.checkout_url),
  });
}
