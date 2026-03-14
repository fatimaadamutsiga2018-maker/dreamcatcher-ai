import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';
import { createServiceClient } from '@/lib/supabase/service';
import { getPaymentProductConfig, isPaymentSku } from '@/lib/payment-config';

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const computed = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature));
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.CREEM_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('CREEM_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get('creem-signature') || '';

  if (!signature || !verifySignature(rawBody, signature, webhookSecret)) {
    console.error('Webhook signature verification failed');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const eventType: string = event.event_type || event.type || '';
  const eventId: string = event.id || `${eventType}_${Date.now()}`;

  const supabase = createServiceClient();

  // Idempotency check
  const { data: existing } = await supabase
    .from('cp_payment_webhook_events')
    .select('id')
    .eq('provider_event_id', eventId)
    .eq('provider', 'creem')
    .single();

  if (existing) {
    return NextResponse.json({ status: 'already_processed' });
  }

  // Record the event
  await supabase.from('cp_payment_webhook_events').insert({
    provider: 'creem',
    provider_event_id: eventId,
    event_type: eventType,
    raw_payload: event,
    processed_at: new Date().toISOString(),
  });

  try {
    switch (eventType) {
      case 'checkout.completed':
        await handleCheckoutCompleted(supabase, event);
        break;
      case 'subscription.active':
        await handleSubscriptionActive(supabase, event);
        break;
      case 'subscription.canceled':
      case 'subscription.expired':
        await handleSubscriptionEnded(supabase, event, eventType);
        break;
      case 'subscription.past_due':
        await handleSubscriptionPastDue(supabase, event);
        break;
      case 'refund.created':
        await handleRefund(supabase, event);
        break;
      default:
        console.log(`Unhandled Creem event: ${eventType}`);
    }
  } catch (err) {
    console.error(`Error processing webhook ${eventType}:`, err);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }

  return NextResponse.json({ status: 'ok' });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleCheckoutCompleted(supabase: any, event: any) {
  const metadata = event.metadata || {};
  const orderNo = metadata.order_no;
  if (!orderNo) {
    console.error('checkout.completed missing order_no in metadata');
    return;
  }

  const { data: order } = await supabase
    .from('cp_payment_orders')
    .select('*')
    .eq('order_no', orderNo)
    .single();

  if (!order) {
    console.error(`Order not found: ${orderNo}`);
    return;
  }

  // Update order to paid
  await supabase
    .from('cp_payment_orders')
    .update({
      status: 'paid',
      paid_at: new Date().toISOString(),
      provider_order_id: event.order?.id || null,
      provider_customer_id: event.customer?.id || null,
    })
    .eq('order_no', orderNo);

  // Record transaction
  await supabase.from('cp_payment_transactions').insert({
    payment_order_id: order.id,
    user_id: order.user_id,
    provider: 'creem',
    provider_event_type: 'checkout.completed',
    provider_transaction_id: event.order?.transaction?.id || null,
    provider_order_id: event.order?.id || null,
    provider_customer_id: event.customer?.id || null,
    amount: order.amount,
    currency: order.currency,
    status: 'paid',
    raw_payload: event,
  });

  // Grant rights based on order type
  if (order.rights_type === 'reading_credits' && isPaymentSku(order.sku)) {
    const config = getPaymentProductConfig(order.sku);
    const credits = config.readingCredits || 0;
    if (credits > 0) {
      await supabase.from('cp_purchased_credits').insert({
        user_id: order.user_id,
        payment_order_id: order.id,
        sku: order.sku,
        credits_total: credits,
        credits_remaining: credits,
        status: 'active',
        expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      });

      // Update summary
      await supabase.rpc('increment_purchased_credits', {
        p_user_id: order.user_id,
        p_amount: credits,
      }).then(() => {}).catch(async () => {
        // Fallback: upsert directly
        const { data: summary } = await supabase
          .from('cp_user_points_summary')
          .select('purchased_credits_balance')
          .eq('user_id', order.user_id)
          .single();

        if (summary) {
          await supabase
            .from('cp_user_points_summary')
            .update({
              purchased_credits_balance: summary.purchased_credits_balance + credits,
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', order.user_id);
        } else {
          await supabase.from('cp_user_points_summary').insert({
            user_id: order.user_id,
            purchased_credits_balance: credits,
            bonus_points_balance: 0,
          });
        }
      });
    }
  }
  // Membership is handled by subscription.active event
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionActive(supabase: any, event: any) {
  const metadata = event.metadata || {};
  const orderNo = metadata.order_no;
  const userId = metadata.user_id;
  const sku = metadata.sku;

  if (!userId || !sku) {
    console.error('subscription.active missing user_id or sku in metadata');
    return;
  }

  const planCode = sku === 'member_yearly' ? 'member_yearly' : 'member_monthly';
  const subscription = event.subscription || {};

  await supabase.from('cp_memberships').upsert(
    {
      user_id: userId,
      plan_code: planCode,
      provider: 'creem',
      provider_subscription_id: subscription.id || null,
      provider_customer_id: event.customer?.id || null,
      status: 'active',
      current_period_start: subscription.current_period_start || new Date().toISOString(),
      current_period_end: subscription.current_period_end || null,
      cancel_at_period_end: false,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'provider_subscription_id' }
  );

  // Update order if we have one
  if (orderNo) {
    await supabase
      .from('cp_payment_orders')
      .update({
        status: 'paid',
        paid_at: new Date().toISOString(),
        provider_order_id: event.order?.id || null,
        provider_customer_id: event.customer?.id || null,
      })
      .eq('order_no', orderNo);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionEnded(supabase: any, event: any, eventType: string) {
  const subscriptionId = event.subscription?.id;
  if (!subscriptionId) return;

  const status = eventType === 'subscription.canceled' ? 'canceled' : 'expired';

  await supabase
    .from('cp_memberships')
    .update({
      status,
      canceled_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('provider_subscription_id', subscriptionId);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionPastDue(supabase: any, event: any) {
  const subscriptionId = event.subscription?.id;
  if (!subscriptionId) return;

  await supabase
    .from('cp_memberships')
    .update({
      status: 'past_due',
      updated_at: new Date().toISOString(),
    })
    .eq('provider_subscription_id', subscriptionId);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleRefund(supabase: any, event: any) {
  const orderId = event.order?.id;
  if (!orderId) return;

  await supabase
    .from('cp_payment_orders')
    .update({
      status: 'refunded',
      refunded_at: new Date().toISOString(),
    })
    .eq('provider_order_id', orderId);
}
