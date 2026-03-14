# ClarityPath Creem Implementation Plan V1

Last Updated: 2026-03-13
Status: Technical implementation plan

## 1. Purpose

This document translates the product rules from `Payment-and-Points-Plan-V1.md` into an implementable payment architecture for ClarityPath.

It focuses on:

- Creem checkout integration
- webhook-driven rights granting
- `cp_` prefixed data model
- Better Auth user linkage
- phased delivery with minimal rework

## 2. Source References

This plan is based on current Creem official documentation:

- Checkout API
- Webhooks and signature verification
- Test Mode

Implementation should stay aligned with the official docs before coding production webhook behavior.

## 3. Recommended Integration Approach

Use:

- Creem REST API for checkout creation
- custom Next.js API routes for local order creation and webhook fulfillment

Do not use a purely frontend checkout helper as the primary flow.

Reason:

- ClarityPath needs a local order before redirecting to Creem
- rights must be granted from webhook-confirmed events
- refunds, reversals, and later admin reconciliation all depend on internal order records

## 4. Environment Variables

Recommended V1 environment variables:

- `APP_BASE_URL`
- `CREEM_API_KEY`
- `CREEM_WEBHOOK_SECRET`
- `CREEM_MODE`
- `CREEM_PRODUCT_STARTER`
- `CREEM_PRODUCT_EXPLORER`
- `CREEM_PRODUCT_DEEP_DIVE`
- `CREEM_PRODUCT_MEMBER_MONTHLY`
- `CREEM_PRODUCT_MEMBER_YEARLY`

Recommended values:

- `CREEM_MODE=test` during development
- `CREEM_MODE=live` only after dashboard products and webhooks are ready

Base URL behavior:

- if `CREEM_MODE=test`, use `https://test-api.creem.io`
- if `CREEM_MODE=live`, use `https://api.creem.io`

## 5. Product Mapping

Creem products should be created in the dashboard first, then mapped into env vars.

Recommended mapping:

| Internal SKU | Purpose | Creem env var |
|---|---|---|
| `starter_5` | 5 Purchased Reading Credits | `CREEM_PRODUCT_STARTER` |
| `explorer_12` | 12 Purchased Reading Credits | `CREEM_PRODUCT_EXPLORER` |
| `deep_dive_30` | 30 Purchased Reading Credits | `CREEM_PRODUCT_DEEP_DIVE` |
| `member_monthly` | monthly membership | `CREEM_PRODUCT_MEMBER_MONTHLY` |
| `member_yearly` | yearly membership | `CREEM_PRODUCT_MEMBER_YEARLY` |

The app should never trust a client-submitted Creem product ID directly.

The client sends an internal SKU, and the server resolves:

- product type
- rights to grant
- Creem product ID

## 6. Current Stack Fit

ClarityPath currently already has:

- Better Auth
- PostgreSQL access through `pg`
- Supabase client utilities
- App Router API routes

So the cleanest integration path is:

- authenticate user with Better Auth
- create internal order in PostgreSQL
- call Creem REST API from the server
- store webhook-confirmed payment results in PostgreSQL

## 7. Recommended Database Tables

This plan assumes the product plan already approved these tables or equivalents:

- `cp_payment_orders`
- `cp_payment_transactions`
- `cp_memberships`
- `cp_purchased_credits`
- `cp_points_transactions`
- `cp_user_points_summary`

Recommended additional support table:

- `cp_payment_webhook_events`

Purpose:

- store raw event IDs from Creem
- provide idempotency
- prevent double grants when Creem retries webhook delivery

## 8. Table Responsibilities

### `cp_payment_orders`

Purpose:

- local source of truth for every checkout initiation

Suggested fields:

- `id`
- `order_no`
- `user_id`
- `sku`
- `rights_type`
- `status`
- `creem_checkout_id`
- `creem_order_id`
- `creem_product_id`
- `amount`
- `currency`
- `request_id`
- `created_at`
- `updated_at`

Recommended statuses:

- `pending`
- `checkout_created`
- `paid`
- `failed`
- `refunded`
- `chargeback`
- `canceled`

### `cp_payment_transactions`

Purpose:

- normalized provider-side payment record history

Suggested fields:

- `id`
- `order_id`
- `user_id`
- `provider`
- `provider_transaction_id`
- `provider_order_id`
- `provider_customer_id`
- `provider_subscription_id`
- `amount`
- `currency`
- `status`
- `raw_payload`
- `created_at`

### `cp_purchased_credits`

Purpose:

- lot-based Purchased Reading Credits

Suggested fields:

- `id`
- `user_id`
- `payment_order_id`
- `credits_total`
- `credits_remaining`
- `expires_at`
- `created_at`

### `cp_memberships`

Purpose:

- membership access state

Suggested fields:

- `id`
- `user_id`
- `plan_code`
- `status`
- `provider`
- `provider_subscription_id`
- `provider_customer_id`
- `current_period_start`
- `current_period_end`
- `cancel_at_period_end`
- `canceled_at`
- `created_at`
- `updated_at`

Consumption rule:

- V1 should consume purchased credit lots in application code using:
  - `expires_at ASC`
  - then `created_at ASC`

This prevents newer lots from being used before older or earlier-expiring lots.

### `cp_payment_webhook_events`

Purpose:

- idempotent processing of Creem events

Suggested fields:

- `id`
- `provider`
- `provider_event_id`
- `event_type`
- `processed_at`
- `raw_payload`

Unique index:

- `(provider, provider_event_id)`

## 9. API Routes

Recommended initial routes:

- `POST /api/payment/checkout`
- `POST /api/payment/webhook/creem`
- `GET /checkout/success`
- `GET /checkout/cancel`

Recommended later routes:

- `GET /api/user/reading-credits`
- `GET /api/user/membership`
- `GET /api/user/payment-history`

## 10. Checkout Flow

### `POST /api/payment/checkout`

Input:

- authenticated user
- internal SKU only

Server flow:

1. require Better Auth session
2. validate internal SKU
3. resolve:
   - Creem product ID
   - rights type
   - price metadata for internal records
4. create local `cp_payment_orders` row with `pending`
5. generate stable `request_id` from `order_no`
6. call Creem `POST /v1/checkouts`
7. send:
   - `product_id`
   - `request_id`
   - `customer.email`
   - `success_url`
   - optional `metadata`
8. store returned checkout information
9. update local order to `checkout_created`
10. return checkout URL to frontend

Frontend behavior:

- redirect user to the Creem checkout URL

## 11. Success And Cancel Pages

### `/checkout/success`

This page is for confirmation UI only.

It must not grant rights.

It may:

- read Creem redirect params
- optionally verify redirect signature
- display “payment received, finalizing access”
- poll local order status if needed

### `/checkout/cancel`

This page should:

- inform the user no charge was completed
- allow returning to pricing

## 12. Webhook Flow

### `POST /api/payment/webhook/creem`

Use raw request body text.

Verification:

- read `creem-signature` header
- compute HMAC-SHA256 with `CREEM_WEBHOOK_SECRET`
- compare to header

If invalid:

- return `401`

If valid:

1. parse JSON
2. check `provider_event_id` in `cp_payment_webhook_events`
3. if already processed, return `200`
4. record event row
5. dispatch by `eventType`
6. update order / transaction / rights
7. mark processed
8. return `200`

## 13. Webhook Events To Handle In V1

### One-time purchase event

- `checkout.completed`

Use for:

- starter / explorer / deep-dive Purchased Reading Credits
- initial synchronization of membership checkout completion

### Subscription lifecycle events

For membership products, prepare to handle:

- `subscription.active`
- `subscription.paid`
- `subscription.canceled`
- `subscription.scheduled_cancel`
- `subscription.past_due`
- `subscription.expired`

Recommended grant rule:

- use `subscription.paid` as the main access-grant or renewal confirmation
- treat `subscription.active` as synchronization support

## 14. Rights Granting Rules

### For Purchased Reading Credits

When a matching paid one-time order is confirmed:

- mark local order `paid`
- create transaction record
- create `cp_purchased_credits` lot
- update user summary

### For Membership

When a subscription event confirms payment:

- upsert `cp_memberships`
- mark status active
- update current period dates

When canceled / expired / unpaid terminal state:

- update membership status accordingly

## 15. Refund And Reversal Handling

V1 technical rule:

- refunds never restore Bonus Points
- refunds only affect unused Purchased Reading Credits
- if provider sends refunded / chargeback information later, local order and transaction status must be updated
- unused purchased rights should be revoked
- V1 should avoid negative summary balances
- if reversal amount exceeds remaining purchased rights, record the unrecovered portion for audit/manual handling instead of forcing negative summary balances

Implementation note:

- do not attempt fully automated refund business policy in the first coding step
- but database states must support refund and chargeback reconciliation

## 16. Pricing UI Recommendations

V1 pricing page should:

- be viewable without login
- require login only on purchase click
- display:
  - 5 credits
  - 12 credits
  - 30 credits
  - monthly membership
  - yearly membership

Each CTA should carry:

- internal SKU
- login return target

## 17. Billing UI Recommendations

`/dashboard/billing` should show:

- current Bonus Points
- current Purchased Reading Credits
- membership status
- next expiry
- recent purchases
- recent usage

This page does not need refunds management in V1.

## 18. Testing Plan

Use Creem Test Mode first.

Required validation:

1. create checkout in test mode
2. complete one-time purchase
3. confirm webhook grants Purchased Reading Credits once only
4. repeat webhook delivery and confirm no double grant
5. complete membership checkout
6. confirm membership row activates correctly
7. verify cancel page behavior
8. verify success page does not grant rights by itself

## 19. Implementation Order

1. Create SQL schema for payment and rights tables
2. Add environment variable support
3. Implement `POST /api/payment/checkout`
4. Implement `POST /api/payment/webhook/creem`
5. Build success and cancel pages
6. Build pricing UI entry points
7. Build billing summary page
8. Test in Creem test mode

## 20. Immediate Next Step

The next concrete engineering step should be:

- write the SQL migration for the approved payment and rights tables

After that:

- implement checkout route
- implement webhook route
