import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';
import { createServiceClient } from '@/lib/supabase/service';
import { getPaymentProductConfig, isPaymentSku } from '@/lib/payment-config';
import { getPlanDeeperAllowance } from '@/lib/deeper-insight';

type JsonRecord = Record<string, unknown>;
type SupabaseClient = ReturnType<typeof createServiceClient>;

interface PaymentOrderRow {
  id: string;
  order_no: string;
  user_id: string;
  sku: string;
  rights_type: 'reading_credits' | 'membership';
  status: string;
  amount: number;
  currency: string;
  provider_checkout_id: string | null;
  provider_order_id: string | null;
  provider_customer_id: string | null;
  paid_at: string | null;
}

interface WebhookRowState {
  id: string;
  processed_at: string | null;
}

function asRecord(value: unknown): JsonRecord | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  return value as JsonRecord;
}

function getString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

function getNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return undefined;
}

function getBoolean(value: unknown): boolean | undefined {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }
  }

  return undefined;
}

function getMetadata(record: JsonRecord | null): JsonRecord {
  return asRecord(record?.metadata) ?? {};
}

function getNestedRecord(record: JsonRecord | null, key: string): JsonRecord | null {
  return asRecord(record?.[key]);
}

function getNestedString(record: JsonRecord | null, key: string): string | undefined {
  return getString(record?.[key]);
}

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const normalizedSignature = signature.trim();
  const computed = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const computedBuffer = Buffer.from(computed, 'utf8');
  const signatureBuffer = Buffer.from(normalizedSignature, 'utf8');

  if (computedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(computedBuffer, signatureBuffer);
}

function getEventType(envelope: JsonRecord): string {
  return (
    getString(envelope.eventType) ||
    getString(envelope.event_type) ||
    getString(envelope.type) ||
    ''
  );
}

function getEventObject(envelope: JsonRecord): JsonRecord {
  return asRecord(envelope.object) ?? envelope;
}

function getEventId(envelope: JsonRecord, eventType: string, object: JsonRecord): string {
  return (
    getString(envelope.id) ||
    [
      eventType || 'unknown',
      getNestedString(object, 'id') || getNestedString(getNestedRecord(object, 'order'), 'id') || 'no-object-id',
      getString(envelope.created_at) || String(Date.now()),
    ].join('_')
  );
}

function getRequestId(object: JsonRecord): string | undefined {
  return (
    getNestedString(object, 'request_id') ||
    getNestedString(getNestedRecord(object, 'checkout'), 'request_id') ||
    getString(getMetadata(object).request_id) ||
    getString(getMetadata(getNestedRecord(object, 'checkout')).request_id)
  );
}

function getOrderNoFromRequestId(requestId?: string): string | undefined {
  if (!requestId) {
    return undefined;
  }

  return requestId.endsWith('_creem') ? requestId.slice(0, -6) : requestId;
}

function getOrderNo(object: JsonRecord): string | undefined {
  const metadata = getMetadata(object);
  const nestedCheckout = getNestedRecord(object, 'checkout');
  const nestedSubscription = getNestedRecord(object, 'subscription');

  return (
    getString(metadata.order_no) ||
    getString(getMetadata(nestedCheckout).order_no) ||
    getString(getMetadata(nestedSubscription).order_no) ||
    getOrderNoFromRequestId(getRequestId(object))
  );
}

function getUserIdFromObject(object: JsonRecord): string | undefined {
  const metadata = getMetadata(object);
  const nestedCheckout = getNestedRecord(object, 'checkout');
  const nestedSubscription = getNestedRecord(object, 'subscription');

  return (
    getString(metadata.user_id) ||
    getString(getMetadata(nestedCheckout).user_id) ||
    getString(getMetadata(nestedSubscription).user_id)
  );
}

function getSkuFromObject(object: JsonRecord): string | undefined {
  const metadata = getMetadata(object);
  const nestedCheckout = getNestedRecord(object, 'checkout');
  const nestedSubscription = getNestedRecord(object, 'subscription');

  return (
    getString(metadata.sku) ||
    getString(getMetadata(nestedCheckout).sku) ||
    getString(getMetadata(nestedSubscription).sku)
  );
}

function getProviderCheckoutId(eventType: string, object: JsonRecord): string | undefined {
  if (eventType.startsWith('checkout.')) {
    return getNestedString(object, 'id');
  }

  return getNestedString(getNestedRecord(object, 'checkout'), 'id');
}

function getProviderOrderId(object: JsonRecord): string | undefined {
  return (
    getNestedString(getNestedRecord(object, 'order'), 'id') ||
    getNestedString(getNestedRecord(object, 'last_transaction'), 'order_id') ||
    getNestedString(getNestedRecord(object, 'current_transaction'), 'order_id') ||
    getNestedString(object, 'order_id')
  );
}

function getProviderCustomerId(object: JsonRecord): string | undefined {
  return (
    getNestedString(getNestedRecord(object, 'customer'), 'id') ||
    getNestedString(object, 'customer_id')
  );
}

function getProviderSubscriptionId(eventType: string, object: JsonRecord): string | undefined {
  if (eventType.startsWith('subscription.')) {
    return getNestedString(object, 'id');
  }

  return getNestedString(getNestedRecord(object, 'subscription'), 'id');
}

function getProviderTransactionId(object: JsonRecord): string | undefined {
  return (
    getNestedString(getNestedRecord(object, 'last_transaction'), 'id') ||
    getNestedString(getNestedRecord(object, 'current_transaction'), 'id') ||
    getNestedString(getNestedRecord(getNestedRecord(object, 'order'), 'transaction'), 'id') ||
    getNestedString(object, 'transaction_id')
  );
}

function getCurrentPeriodStart(object: JsonRecord): string | undefined {
  return (
    getNestedString(object, 'current_period_start_date') ||
    getNestedString(object, 'current_period_start')
  );
}

function getCurrentPeriodEnd(object: JsonRecord): string | undefined {
  return (
    getNestedString(object, 'current_period_end_date') ||
    getNestedString(object, 'current_period_end')
  );
}

async function getWebhookRowState(
  supabase: SupabaseClient,
  providerEventId: string
): Promise<WebhookRowState | null> {
  const { data, error } = await supabase
    .from('cp_payment_webhook_events')
    .select('id, processed_at')
    .eq('provider', 'creem')
    .eq('provider_event_id', providerEventId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

async function reserveWebhookEvent(
  supabase: SupabaseClient,
  providerEventId: string,
  eventType: string,
  payload: JsonRecord
): Promise<{ status: 'already_processed' | 'pending'; rowId: string }> {
  const existing = await getWebhookRowState(supabase, providerEventId);
  if (existing?.processed_at) {
    return { status: 'already_processed', rowId: existing.id };
  }

  if (existing) {
    return { status: 'pending', rowId: existing.id };
  }

  const { data, error } = await supabase
    .from('cp_payment_webhook_events')
    .insert({
      provider: 'creem',
      provider_event_id: providerEventId,
      event_type: eventType,
      raw_payload: payload,
    })
    .select('id, processed_at')
    .single();

  if (!error && data) {
    return { status: 'pending', rowId: data.id };
  }

  const retryExisting = await getWebhookRowState(supabase, providerEventId);
  if (retryExisting?.processed_at) {
    return { status: 'already_processed', rowId: retryExisting.id };
  }

  if (retryExisting) {
    return { status: 'pending', rowId: retryExisting.id };
  }

  throw error;
}

async function markWebhookProcessed(supabase: SupabaseClient, rowId: string) {
  const { error } = await supabase
    .from('cp_payment_webhook_events')
    .update({ processed_at: new Date().toISOString() })
    .eq('id', rowId);

  if (error) {
    throw error;
  }
}

async function findOrderByOrderNo(
  supabase: SupabaseClient,
  orderNo?: string
): Promise<PaymentOrderRow | null> {
  if (!orderNo) {
    return null;
  }

  const { data, error } = await supabase
    .from('cp_payment_orders')
    .select('*')
    .eq('order_no', orderNo)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

async function findLatestMembershipOrder(
  supabase: SupabaseClient,
  userId?: string,
  sku?: string
): Promise<PaymentOrderRow | null> {
  if (!userId || !sku) {
    return null;
  }

  const { data, error } = await supabase
    .from('cp_payment_orders')
    .select('*')
    .eq('user_id', userId)
    .eq('sku', sku)
    .eq('rights_type', 'membership')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

async function upsertOrderPaymentReferences(
  supabase: SupabaseClient,
  order: PaymentOrderRow,
  refs: {
    providerCheckoutId?: string;
    providerOrderId?: string;
    providerCustomerId?: string;
  }
) {
  const updates: Record<string, string> = {};

  if (!order.provider_checkout_id && refs.providerCheckoutId) {
    updates.provider_checkout_id = refs.providerCheckoutId;
  }

  if (!order.provider_order_id && refs.providerOrderId) {
    updates.provider_order_id = refs.providerOrderId;
  }

  if (!order.provider_customer_id && refs.providerCustomerId) {
    updates.provider_customer_id = refs.providerCustomerId;
  }

  if (Object.keys(updates).length === 0) {
    return;
  }

  const { error } = await supabase
    .from('cp_payment_orders')
    .update(updates)
    .eq('id', order.id);

  if (error) {
    throw error;
  }
}

async function markOrderPaid(
  supabase: SupabaseClient,
  order: PaymentOrderRow,
  refs: {
    providerCheckoutId?: string;
    providerOrderId?: string;
    providerCustomerId?: string;
  }
) {
  const updates: Record<string, string> = {};

  if (order.status !== 'paid') {
    updates.status = 'paid';
    updates.paid_at = order.paid_at || new Date().toISOString();
  }

  if (!order.provider_checkout_id && refs.providerCheckoutId) {
    updates.provider_checkout_id = refs.providerCheckoutId;
  }

  if (!order.provider_order_id && refs.providerOrderId) {
    updates.provider_order_id = refs.providerOrderId;
  }

  if (!order.provider_customer_id && refs.providerCustomerId) {
    updates.provider_customer_id = refs.providerCustomerId;
  }

  if (Object.keys(updates).length === 0) {
    return;
  }

  const { error } = await supabase
    .from('cp_payment_orders')
    .update(updates)
    .eq('id', order.id);

  if (error) {
    throw error;
  }
}

async function transactionAlreadyRecorded(
  supabase: SupabaseClient,
  params: {
    paymentOrderId: string;
    providerEventType: string;
    providerTransactionId?: string;
    providerOrderId?: string;
  }
) {
  let query = supabase
    .from('cp_payment_transactions')
    .select('id')
    .eq('payment_order_id', params.paymentOrderId)
    .eq('provider_event_type', params.providerEventType);

  if (params.providerTransactionId) {
    query = query.eq('provider_transaction_id', params.providerTransactionId);
  } else if (params.providerOrderId) {
    query = query.eq('provider_order_id', params.providerOrderId);
  }

  const { data, error } = await query.limit(1).maybeSingle();

  if (error) {
    throw error;
  }

  return Boolean(data);
}

async function insertTransactionIfMissing(
  supabase: SupabaseClient,
  params: {
    paymentOrderId: string;
    userId: string;
    providerEventType: string;
    providerTransactionId?: string;
    providerOrderId?: string;
    providerCustomerId?: string;
    providerSubscriptionId?: string;
    amount: number;
    currency: string;
    status: string;
    rawPayload: JsonRecord;
  }
) {
  const exists = await transactionAlreadyRecorded(supabase, params);
  if (exists) {
    return;
  }

  const { error } = await supabase.from('cp_payment_transactions').insert({
    payment_order_id: params.paymentOrderId,
    user_id: params.userId,
    provider: 'creem',
    provider_event_type: params.providerEventType,
    provider_transaction_id: params.providerTransactionId || null,
    provider_order_id: params.providerOrderId || null,
    provider_customer_id: params.providerCustomerId || null,
    provider_subscription_id: params.providerSubscriptionId || null,
    amount: params.amount,
    currency: params.currency,
    status: params.status,
    raw_payload: params.rawPayload,
  });

  if (error) {
    throw error;
  }
}

async function incrementPurchasedCreditsBalance(
  supabase: SupabaseClient,
  userId: string,
  credits: number
) {
  const { error: rpcError } = await supabase.rpc('increment_purchased_credits', {
    p_user_id: userId,
    p_amount: credits,
  });

  if (!rpcError) {
    return;
  }

  const { data: summary, error: summaryError } = await supabase
    .from('cp_user_points_summary')
    .select('purchased_credits_balance')
    .eq('user_id', userId)
    .maybeSingle();

  if (summaryError) {
    throw summaryError;
  }

  if (summary) {
    const { error } = await supabase
      .from('cp_user_points_summary')
      .update({
        purchased_credits_balance: summary.purchased_credits_balance + credits,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    return;
  }

  const { error } = await supabase.from('cp_user_points_summary').insert({
    user_id: userId,
    purchased_credits_balance: credits,
    bonus_points_balance: 0,
  });

  if (error) {
    throw error;
  }
}

async function grantPurchasedCreditsIfNeeded(
  supabase: SupabaseClient,
  order: PaymentOrderRow
) {
  if (order.rights_type !== 'reading_credits' || !isPaymentSku(order.sku)) {
    return;
  }

  const config = getPaymentProductConfig(order.sku);
  const credits = config.readingCredits || 0;
  if (credits <= 0) {
    return;
  }

  const { data: existingLot, error: existingLotError } = await supabase
    .from('cp_purchased_credits')
    .select('id')
    .eq('payment_order_id', order.id)
    .limit(1)
    .maybeSingle();

  if (existingLotError) {
    throw existingLotError;
  }

  if (existingLot) {
    return;
  }

  const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
  const { error } = await supabase.from('cp_purchased_credits').insert({
    user_id: order.user_id,
    payment_order_id: order.id,
    sku: order.sku,
    credits_total: credits,
    credits_remaining: credits,
    status: 'active',
    expires_at: expiresAt,
  });

  if (error) {
    throw error;
  }

  await incrementPurchasedCreditsBalance(supabase, order.user_id, credits);
}

async function upsertMembership(
  supabase: SupabaseClient,
  params: {
    userId: string;
    planCode: 'member_monthly' | 'member_yearly';
    providerSubscriptionId?: string;
    providerCustomerId?: string;
    status: 'active' | 'past_due' | 'canceled' | 'expired' | 'trialing';
    currentPeriodStart?: string;
    currentPeriodEnd?: string;
    cancelAtPeriodEnd?: boolean;
    canceledAt?: string | null;
    metadata?: JsonRecord;
  }
) {
  const payload = {
    user_id: params.userId,
    plan_code: params.planCode,
    provider: 'creem',
    provider_subscription_id: params.providerSubscriptionId || null,
    provider_customer_id: params.providerCustomerId || null,
    status: params.status,
    current_period_start: params.currentPeriodStart || null,
    current_period_end: params.currentPeriodEnd || null,
    cancel_at_period_end: params.cancelAtPeriodEnd ?? false,
    canceled_at: params.canceledAt ?? null,
    metadata: params.metadata || {},
    updated_at: new Date().toISOString(),
  };

  if (params.providerSubscriptionId) {
    const planAllowance = getPlanDeeperAllowance(params.planCode);
    const { data: existingBySub } = await supabase
      .from('cp_memberships')
      .select('id')
      .eq('provider_subscription_id', params.providerSubscriptionId)
      .maybeSingle();

    if (!existingBySub && planAllowance > 0) {
      payload.deeper_insight_total = planAllowance;
      payload.deeper_insight_remaining = planAllowance;
    }

    const { error } = await supabase
      .from('cp_memberships')
      .upsert(payload, { onConflict: 'provider_subscription_id' });

    if (error) {
      throw error;
    }

    return;
  }

  const { data: existing, error: existingError } = await supabase
    .from('cp_memberships')
    .select('id')
    .eq('user_id', params.userId)
    .eq('plan_code', params.planCode)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existing) {
    const { error } = await supabase
      .from('cp_memberships')
      .update(payload)
      .eq('id', existing.id);

    if (error) {
      throw error;
    }

    return;
  }

  const planAllowance = getPlanDeeperAllowance(params.planCode);
  if (!existing && planAllowance > 0) {
    payload.deeper_insight_total = planAllowance;
    payload.deeper_insight_remaining = planAllowance;
  }

  const { error } = await supabase.from('cp_memberships').insert(payload);
  if (error) {
    throw error;
  }
}

function getMembershipPlanCode(sku?: string): 'member_monthly' | 'member_yearly' | null {
  if (sku === 'member_yearly') {
    return 'member_yearly';
  }

  if (sku === 'member_monthly') {
    return 'member_monthly';
  }

  return null;
}

async function handleCheckoutCompleted(
  supabase: SupabaseClient,
  eventType: string,
  object: JsonRecord,
  rawPayload: JsonRecord
) {
  const orderNo = getOrderNo(object);
  const order = await findOrderByOrderNo(supabase, orderNo);

  if (!order) {
    console.error('checkout.completed order not found', { orderNo });
    return;
  }

  const providerCheckoutId = getProviderCheckoutId(eventType, object);
  const providerOrderId = getProviderOrderId(object);
  const providerCustomerId = getProviderCustomerId(object);
  const providerSubscriptionId = getProviderSubscriptionId(eventType, object);
  const providerTransactionId = getProviderTransactionId(object);

  if (order.rights_type === 'membership') {
    await upsertOrderPaymentReferences(supabase, order, {
      providerCheckoutId,
      providerOrderId,
      providerCustomerId,
    });
    return;
  }

  await markOrderPaid(supabase, order, {
    providerCheckoutId,
    providerOrderId,
    providerCustomerId,
  });

  await insertTransactionIfMissing(supabase, {
    paymentOrderId: order.id,
    userId: order.user_id,
    providerEventType: eventType,
    providerTransactionId,
    providerOrderId,
    providerCustomerId,
    providerSubscriptionId,
    amount: order.amount,
    currency: order.currency,
    status: 'paid',
    rawPayload,
  });

  await grantPurchasedCreditsIfNeeded(supabase, order);
}

async function handleSubscriptionPaid(
  supabase: SupabaseClient,
  eventType: string,
  object: JsonRecord,
  rawPayload: JsonRecord
) {
  const orderNo = getOrderNo(object);
  const userId = getUserIdFromObject(object);
  const sku = getSkuFromObject(object);
  const planCode = getMembershipPlanCode(sku);
  const providerSubscriptionId = getProviderSubscriptionId(eventType, object);
  const providerCustomerId = getProviderCustomerId(object);
  const providerOrderId = getProviderOrderId(object);
  const providerTransactionId = getProviderTransactionId(object);
  const currentPeriodStart = getCurrentPeriodStart(object);
  const currentPeriodEnd = getCurrentPeriodEnd(object);
  const cancelAtPeriodEnd = getBoolean(object.cancel_at_period_end) ?? false;

  if (!userId || !planCode) {
    console.error('subscription.paid missing membership metadata', { orderNo, userId, sku });
    return;
  }

  const order =
    (await findOrderByOrderNo(supabase, orderNo)) ||
    (await findLatestMembershipOrder(supabase, userId, sku));

  await upsertMembership(supabase, {
    userId,
    planCode,
    providerSubscriptionId,
    providerCustomerId,
    status: 'active',
    currentPeriodStart,
    currentPeriodEnd,
    cancelAtPeriodEnd,
    canceledAt: null,
    metadata: getMetadata(object),
  });

  if (!order) {
    console.error('subscription.paid membership order not found', { orderNo, userId, sku });
    return;
  }

  await markOrderPaid(supabase, order, {
    providerCheckoutId: getProviderCheckoutId(eventType, object),
    providerOrderId,
    providerCustomerId,
  });

  await insertTransactionIfMissing(supabase, {
    paymentOrderId: order.id,
    userId: order.user_id,
    providerEventType: eventType,
    providerTransactionId,
    providerOrderId,
    providerCustomerId,
    providerSubscriptionId,
    amount: getNumber(object.amount) ?? order.amount,
    currency: getString(object.currency) || order.currency,
    status: 'paid',
    rawPayload,
  });
}

async function handleSubscriptionStateChange(
  supabase: SupabaseClient,
  eventType: string,
  object: JsonRecord
) {
  const providerSubscriptionId = getProviderSubscriptionId(eventType, object);
  if (!providerSubscriptionId) {
    console.error(`${eventType} missing subscription id`);
    return;
  }

  const statusByEvent: Record<string, 'active' | 'past_due' | 'canceled' | 'expired'> = {
    'subscription.active': 'active',
    'subscription.past_due': 'past_due',
    'subscription.unpaid': 'past_due',
    'subscription.canceled': 'canceled',
    'subscription.expired': 'expired',
  };

  const status = statusByEvent[eventType];
  if (!status) {
    return;
  }

  const updates: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (status === 'canceled' || status === 'expired') {
    updates.canceled_at = new Date().toISOString();
    updates.cancel_at_period_end = false;
  }

  const currentPeriodEnd = getCurrentPeriodEnd(object);
  if (currentPeriodEnd) {
    updates.current_period_end = currentPeriodEnd;
  }

  const { error } = await supabase
    .from('cp_memberships')
    .update(updates)
    .eq('provider_subscription_id', providerSubscriptionId);

  if (error) {
    throw error;
  }
}

async function handleSubscriptionScheduledCancel(
  supabase: SupabaseClient,
  eventType: string,
  object: JsonRecord
) {
  const providerSubscriptionId = getProviderSubscriptionId(eventType, object);
  if (!providerSubscriptionId) {
    console.error(`${eventType} missing subscription id`);
    return;
  }

  const { error } = await supabase
    .from('cp_memberships')
    .update({
      cancel_at_period_end: true,
      updated_at: new Date().toISOString(),
    })
    .eq('provider_subscription_id', providerSubscriptionId);

  if (error) {
    throw error;
  }
}

async function handleSubscriptionUncanceled(
  supabase: SupabaseClient,
  eventType: string,
  object: JsonRecord
) {
  const providerSubscriptionId = getProviderSubscriptionId(eventType, object);
  if (!providerSubscriptionId) {
    console.error(`${eventType} missing subscription id`);
    return;
  }

  const { error } = await supabase
    .from('cp_memberships')
    .update({
      status: 'active',
      cancel_at_period_end: false,
      canceled_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq('provider_subscription_id', providerSubscriptionId);

  if (error) {
    throw error;
  }
}

async function handleRefund(supabase: SupabaseClient, object: JsonRecord) {
  const providerOrderId = getProviderOrderId(object);
  if (!providerOrderId) {
    console.error('refund.created missing provider order id');
    return;
  }

  const { error } = await supabase
    .from('cp_payment_orders')
    .update({
      status: 'refunded',
      refunded_at: new Date().toISOString(),
    })
    .eq('provider_order_id', providerOrderId);

  if (error) {
    throw error;
  }
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

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody || 'null');
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const envelope = asRecord(parsed);
  if (!envelope) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const eventType = getEventType(envelope);
  const object = getEventObject(envelope);
  const eventId = getEventId(envelope, eventType, object);

  if (!eventType) {
    return NextResponse.json({ error: 'Missing event type' }, { status: 400 });
  }

  const supabase = createServiceClient();
  const reservation = await reserveWebhookEvent(supabase, eventId, eventType, envelope);
  if (reservation.status === 'already_processed') {
    return NextResponse.json({ status: 'already_processed' });
  }

  try {
    switch (eventType) {
      case 'checkout.completed':
        await handleCheckoutCompleted(supabase, eventType, object, envelope);
        break;
      case 'subscription.paid':
      case 'subscription.active':
        await handleSubscriptionPaid(supabase, eventType, object, envelope);
        break;
      case 'subscription.unpaid':
      case 'subscription.past_due':
      case 'subscription.canceled':
      case 'subscription.expired':
        await handleSubscriptionStateChange(supabase, eventType, object);
        break;
      case 'subscription.scheduled_cancel':
        await handleSubscriptionScheduledCancel(supabase, eventType, object);
        break;
      case 'subscription.uncanceled':
        await handleSubscriptionUncanceled(supabase, eventType, object);
        break;
      case 'refund.created':
        await handleRefund(supabase, object);
        break;
      default:
        console.log(`Unhandled Creem event: ${eventType}`);
    }
  } catch (err) {
    console.error(`Error processing webhook ${eventType}:`, err);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }

  await markWebhookProcessed(supabase, reservation.rowId);

  return NextResponse.json({ status: 'ok' });
}
