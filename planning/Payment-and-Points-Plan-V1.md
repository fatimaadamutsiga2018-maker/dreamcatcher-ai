# ClarityPath Payment And Points Plan V1

Last Updated: 2026-03-13
Status: Draft for product and technical alignment

## 1. Goal

This document defines the V1 payment, points, and membership model for ClarityPath.

The purpose is to:

- keep the user journey simple
- make pricing understandable
- reduce implementation rework
- support phased rollout

V1 priority is a clear and workable monetization model, not maximum feature coverage.

## 2. Core Principles

- Free content should remain open to support growth and trust
- Paid value should be tied to the highest-intent tool usage
- Points and membership must have clearly different meanings
- Webhook-confirmed payment is the only source of truth for granting paid rights
- The system should be easy to expand later without rewriting the core model

## 3. Payment Provider Direction

V1 recommended provider:

- Creem

Reasoning:

- lower operational complexity for a small digital product
- easier early-stage setup than a full self-managed payment stack
- suitable for digital goods, memberships, and simple checkout flows

## 4. Feature Access Model

| Feature | Guest | Registered User | Paid Points User | Member |
|---|---|---|---|---|
| Home | Yes | Yes | Yes | Yes |
| Blog | Yes | Yes | Yes | Yes |
| Energy Assessment | Yes | Yes | Yes | Yes |
| Daily Energy | Yes | Yes | Yes | Yes |
| Decision Guidance - basic calculation + simple result | No | Yes, with points | Yes | Unlimited |
| Decision Guidance - deep AI interpretation | Not in V1 pricing | Not in V1 pricing | Not in V1 pricing | Reserved for later phase |
| History / saved usage | No | Yes | Yes | Yes |
| Personal energy adaptation | No | No | No | Yes |
| Detailed hexagram output | No | No | No | Yes |

## 5. Login And Conversion Flow

Recommended flow:

1. User discovers the product through content or free tools
2. User can browse the site without account creation
3. User attempts to use Decision Guidance
4. User is asked to sign in or sign up
5. New user receives signup bonus points
6. User tries the paid tool with bonus points
7. User later upgrades through points packs or membership

Target path:

`Free content -> Login -> Bonus points -> Paid tool trial -> Buy points or become member`

## 6. Points Model

### Signup reward

- New user signup reward: `10 points`

This is enough for:

- 2 uses of basic Decision Guidance at V1 pricing

### V1 points usage

- Basic Decision Guidance: `5 points / use`

### V1 restrictions

- Points cannot be converted to cash
- Deep AI interpretation is not part of V1 paid points logic
- Points are granted only after verified system events

### Expiry rule

- Standard points validity: `365 days`
- Promotional points may use custom expiry windows
- Consumption order: use earliest-expiring points first

## 7. Daily Check-In Rewards

The original escalating forever model is not recommended because it weakens paid conversion too quickly.

Recommended V1 weekly cycle:

| Day | Reward |
|---|---|
| 1 | 1 point |
| 2 | 1 point |
| 3 | 2 points |
| 4 | 2 points |
| 5 | 3 points |
| 6 | 3 points |
| 7 | 5 points |

Rules:

- one claim per day
- if the streak breaks, reset to day 1
- rewards are promotional points and follow expiry rules

## 8. Referral And Sharing Rewards

Each registered user should have a unique referral code.

Recommended V1 rule:

- inviter reward: `20 points`
- invited user first paid order reward: `10 points`

Trigger condition:

- referral rewards are granted only after the invited user completes their first successful payment

This avoids low-quality referral abuse from simple registrations.

## 9. Paid Products

V1 should support two monetization paths:

- points packs for occasional users
- membership for frequent users

### Points packs

| Product | Price | Points | Intended user |
|---|---:|---:|---|
| Starter | $4.99 | 25 | Light usage |
| Explorer | $9.99 | 60 | Repeat usage |
| Deep Dive | $19.99 | 150 | Heavy but non-member usage |

### Membership

| Product | Price | Rights |
|---|---:|---|
| Monthly Member | $19.99 / month | Unlimited basic Decision Guidance, detailed output, personal energy adaptation |
| Yearly Member | $99 / year | Same as monthly, lower annual cost |

## 10. Rights And Consumption Logic

Points and membership should not mean the same thing.

Recommended rule:

- points buy usage units
- membership buys higher-tier access

Consumption logic:

- for features covered by membership, do not deduct points
- for point-based features, show a confirmation before deduction
- if the user is not a member, deduct points from the oldest-expiring balance first

This keeps the product logic understandable:

- occasional user -> buy points
- frequent user -> buy membership

## 11. V1 Scope Boundaries

### Included in V1

- Better Auth login-required paid flow
- Creem checkout initiation
- points pack purchase
- membership purchase
- payment webhook handling
- points grant logic
- membership status grant logic
- user balance and payment history display
- signup bonus
- check-in rewards
- referral rewards after first paid order

### Not included in V1

- multi-provider payments
- coupon system
- multi-currency pricing
- enterprise billing
- cash-based affiliate payouts
- deep AI interpretation monetization
- complex rolling-expiry logic

## 12. Data Model Recommendation

All new tables should keep the `cp_` prefix.

Recommended V1 tables:

- `cp_user_points_summary`
- `cp_points_transactions`
- `cp_checkin_streaks`
- `cp_referrals`
- `cp_referral_rewards`
- `cp_payment_orders`
- `cp_payment_transactions`
- `cp_memberships`

Suggested responsibilities:

- `cp_user_points_summary`
  current available points, expiring points summary
- `cp_points_transactions`
  every grant, deduction, expiry, referral reward, signup reward, check-in reward
- `cp_checkin_streaks`
  streak count and last check-in date
- `cp_referrals`
  inviter and invited-user relationship
- `cp_referral_rewards`
  reward issuance records
- `cp_payment_orders`
  internal order lifecycle
- `cp_payment_transactions`
  provider-side payment records
- `cp_memberships`
  active member status and validity window

## 13. API Recommendation

Recommended V1 API surface:

- `POST /api/payment/checkout`
- `POST /api/payment/webhook/creem`
- `POST /api/checkin/claim`
- `POST /api/referral/bind`
- `GET /api/user/points`
- `GET /api/user/membership`

Rules:

- checkout creates a local order before redirecting to Creem
- webhook confirms payment success and grants rights
- success page should never grant points by itself

## 14. UI Recommendation

Recommended V1 pages or sections:

- `/pricing`
- `/checkout/success`
- `/checkout/cancel`
- `/dashboard/billing`

Recommended account display:

- current points balance
- membership status
- recent transactions
- next points expiry

## 15. Product Rules To Lock For V1

These should be treated as the default V1 rules unless intentionally revised:

- signup reward: `10 points`
- basic Decision Guidance price: `5 points / use`
- points validity: `365 days`
- check-in rewards use the 7-day cycle in this document
- referral reward triggers after first paid order
- Creem is the V1 provider
- deep AI interpretation is not part of V1 payment logic

## 16. Recommended Build Order

1. Finalize product rules in this document
2. Create payment and points SQL schema with `cp_` prefixes
3. Implement points summary and transaction model
4. Implement checkout API and Creem webhook
5. Build pricing page and billing display
6. Add signup reward grant
7. Add daily check-in
8. Add referral reward logic

## 17. Open Questions

These still need product confirmation before implementation:

- Should monthly membership launch in V1, or should V1 start with yearly only?
- Should detailed hexagram output be fully member-only, or partly available via points?
- Should promotional points and purchased points be displayed separately in the UI?
- Should the billing page expose explicit expiry dates for each points grant?
