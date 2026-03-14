# ClarityPath Payment And Rights Plan V1

Last Updated: 2026-03-13
Status: Draft aligned with current product discussion

## 1. Goal

This document defines the V1 monetization structure for ClarityPath.

The goal is to keep the model:

- understandable for users
- safe to implement in phases
- easy to extend later
- consistent with current Better Auth and `cp_` table decisions

V1 should prioritize clarity over feature completeness.

## 2. Core Principles

- Free content should remain open for discovery and trust building
- Paid value should focus on the highest-intent actions
- Bonus rewards and paid rights must be clearly separated
- Webhook-confirmed payment is the only source of truth for granting paid rights
- Guests should be able to browse key conversion pages before being asked to sign in
- Membership should provide true convenience and upgraded access, not just another balance bucket

## 3. Payment Provider Direction

Recommended V1 provider:

- Creem

Reasoning:

- lower setup friction for the current stage
- suitable for digital products and lightweight memberships
- better fit for early-stage monetization than a more operationally heavy stack

## 4. User Rights Model

V1 uses three different rights layers:

- `Bonus Points`
- `Purchased Reading Credits`
- `Membership`

They are not separate user accounts. They are separate rights inside one user account.

### 4.1 Bonus Points

Bonus Points come from:

- signup reward
- daily check-in
- referral rewards
- campaigns and holiday promotions

Bonus Points:

- can be used only to unlock basic Decision Guidance usage
- cannot be converted to cash
- cannot be transferred
- expire faster than paid rights

### 4.2 Purchased Reading Credits

Purchased Reading Credits come from payment.

They represent discrete paid usage rights for:

- basic Decision Guidance

Purchased Reading Credits:

- cannot be converted to cash
- cannot be transferred
- are eligible for refund handling only if unused
- should be shown separately from Bonus Points in the account UI

### 4.3 Membership

Membership is a separate access layer.

Membership users get:

- unlimited basic Decision Guidance
- detailed hexagram output
- personal energy adaptation
- future priority access to deeper premium features

Membership should override basic reading consumption:

- members do not consume Bonus Points
- members do not consume Purchased Reading Credits

for features covered by membership.

## 5. Feature Access Model

| Feature | Guest | Registered User | Paid Reading User | Member |
|---|---|---|---|---|
| Home | Yes | Yes | Yes | Yes |
| Blog | Yes | Yes | Yes | Yes |
| Energy Assessment | Yes | Yes | Yes | Yes |
| Daily Energy | Yes | Yes | Yes | Yes |
| Pricing page | Yes | Yes | Yes | Yes |
| Decision Guidance page | Yes | Yes | Yes | Yes |
| Decision Guidance submit action | Login required | Yes | Yes | Yes |
| Basic Decision Guidance result | No, must sign in before submit | Yes | Yes | Unlimited |
| Deep AI interpretation | Not in V1 pricing | Not in V1 pricing | Not in V1 pricing | Reserved for later phase |
| History / saved usage | No | Yes | Yes | Yes |
| Personal energy adaptation | No | No | No | Yes |
| Detailed hexagram output | No | No | No | Yes |

Detailed hexagram output means the expanded result layer, not just longer copy. It may include:

- expanded hexagram meaning
- timing interpretation
- structured action and caution guidance
- fuller contextual reasoning
- personalized energy-fit guidance

## 6. Login And Conversion Flow

Recommended user flow:

1. User discovers the product through blog, SEO, or free tools
2. User can browse key pages without account creation
3. User opens Decision Guidance and can view the page as a guest
4. User clicks `Receive Guidance`
5. If not signed in, the system requires sign-in or sign-up
6. After sign-in, the system returns the user to the original page via `callbackUrl`
7. New user receives signup Bonus Points
8. User tries the tool with Bonus Points
9. User later upgrades through Purchased Reading Credits or Membership

The same principle applies to pricing:

- guests can view pricing
- login is required only when they click purchase
- after login, the user should return to pricing or continue checkout directly

Target path:

`Free content -> Decision Guidance or Pricing -> Login on action -> Bonus Points trial -> Buy credits or become member`

## 7. Bonus Points And Purchased Reading Credits

### 7.1 Signup reward

- New user signup reward: `10 Bonus Points`

This is enough for:

- 2 basic Decision Guidance uses

### 7.2 Basic usage cost

- `5 Bonus Points = 1 basic reading`
- `1 Purchased Reading Credit = 1 basic reading`

### 7.3 Consumption rule

Consumption should be simple and explicit:

- if the user has at least `5 Bonus Points`, the system offers to use Bonus Points
- if the user has fewer than `5 Bonus Points`, the system offers to use `1 Purchased Reading Credit`
- V1 should not partially combine balances such as `3 Bonus Points + 1 partial paid balance`

Recommended confirmation copy:

- if Bonus Points are enough:
  `Use 5 Bonus Points to unlock 1 reading?`
- if Bonus Points are not enough:
  `Your Bonus Points are not enough for 1 reading. We can use 1 Purchased Reading Credit instead.`

### 7.4 Restriction rules

- Bonus Points cannot be converted to cash
- Purchased Reading Credits cannot be converted to cash
- Bonus Points cannot be transferred
- Purchased Reading Credits cannot be transferred
- Deep AI interpretation is not part of V1 paid logic
- Rights are granted only after verified system events

### 7.5 Expiry rules

- Signup Bonus Points: `30 days`
- Check-in Bonus Points: `30 days`
- Referral Bonus Points: `30 days`
- Campaign Bonus Points: default `30 days`, with exception support for special promotions
- Purchased Reading Credits: `90 days`

The account UI should show:

- current Bonus Points
- current Purchased Reading Credits
- next expiry date

## 8. Daily Check-In Rewards

The infinitely escalating model is not recommended because it weakens monetization too quickly.

Recommended V1 weekly cycle:

| Day | Reward |
|---|---|
| 1 | 1 Bonus Point |
| 2 | 1 Bonus Point |
| 3 | 2 Bonus Points |
| 4 | 2 Bonus Points |
| 5 | 3 Bonus Points |
| 6 | 3 Bonus Points |
| 7 | 5 Bonus Points |

Rules:

- one claim per day
- if the streak breaks, reset to day 1
- check-in rewards follow Bonus Points expiry rules

## 9. Referral And Sharing Rewards

Each registered user should have a unique referral code.

Recommended V1 rule:

- invited user registration reward: `5 Bonus Points`
- inviter reward after invited user completes first valid feature use: `10 Bonus Points`

Trigger condition:

- invited user can receive the small welcome reward after valid registration
- inviter reward is granted only after the invited user completes the first real feature use

This is stricter than “reward on registration only” and lighter than “reward only after first payment”.

## 10. Paid Products

V1 should support two monetization paths:

- Purchased Reading Credit packs for occasional users
- Membership for frequent users

### 10.1 Purchased Reading Credit packs

| Product | Price | Reading Credits | Intended user |
|---|---:|---:|---|
| Starter | $4.99 | 5 | Light usage |
| Explorer | $9.99 | 12 | Repeat usage |
| Deep Dive | $19.99 | 30 | Heavy but non-member usage |

### 10.2 Membership

| Product | Price | Rights |
|---|---:|---|
| Monthly Member | $19.99 / month | Unlimited basic Decision Guidance, detailed output, personal energy adaptation |
| Yearly Member | $99 / year | Same as monthly, lower annual cost |

## 11. Refund And Fee Rules

### 11.1 Refund rules

- Bonus Points are never refundable
- only unused Purchased Reading Credits are eligible for refund handling
- if an order has already been partially used, only unused purchased rights may be recovered
- if a refund or chargeback is confirmed, the system should revoke unused purchased rights
- V1 should not allow negative balances in user summary tables
- if a reversal exceeds remaining purchased rights, record the unrecovered portion as an audit event instead of forcing negative summary balances

### 11.2 Payment fee rules

- payment provider fees are treated as platform cost
- user-facing price should be the final displayed price
- do not add a separate “processing fee” line for users in V1
- refund policy should note that provider-side fees may be non-refundable to the platform

## 12. Membership Logic

Membership should not behave like a bigger paid balance.

Recommended rule:

- membership covers basic Decision Guidance usage
- members do not spend Bonus Points on basic readings
- members do not spend Purchased Reading Credits on basic readings
- Bonus Points and Purchased Reading Credits remain available for non-member scenarios or later premium expansions

This keeps the value proposition clear:

- occasional user -> buy credits
- frequent user -> buy membership

## 13. V1 Scope Boundaries

### Included in V1

- Better Auth login-required action flow
- Creem checkout initiation
- Purchased Reading Credit pack purchase
- Membership purchase
- payment webhook handling
- Bonus Points grant logic
- Purchased Reading Credits grant logic
- Membership status grant logic
- user balance and payment history display
- signup bonus
- check-in rewards
- referral rewards after first valid feature use
- Decision Guidance login-on-submit behavior

### Not included in V1

- multi-provider payments
- coupon system
- multi-currency pricing
- enterprise billing
- cash-based affiliate payouts
- deep AI interpretation monetization
- complex rolling-expiry logic

## 14. Data Model Recommendation

All new tables should keep the `cp_` prefix.

Recommended V1 tables:

- `cp_user_points_summary`
- `cp_points_transactions`
- `cp_purchased_credits`
- `cp_checkin_streaks`
- `cp_referrals`
- `cp_referral_rewards`
- `cp_payment_orders`
- `cp_payment_transactions`
- `cp_memberships`

Suggested responsibilities:

- `cp_user_points_summary`
  current Bonus Points and Purchased Reading Credits summary
- `cp_points_transactions`
  every bonus grant, deduction, expiry, referral reward, signup reward, check-in reward
- `cp_purchased_credits`
  purchased reading credit grants and remaining balance per order
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

## 15. API Recommendation

Recommended V1 API surface:

- `POST /api/payment/checkout`
- `POST /api/payment/webhook/creem`
- `POST /api/checkin/claim`
- `POST /api/referral/bind`
- `GET /api/user/points`
- `GET /api/user/reading-credits`
- `GET /api/user/membership`

Rules:

- checkout creates a local order before redirecting to Creem
- webhook confirms payment success and grants rights
- success page must never grant rights by itself
- Purchased Reading Credits should be consumed by application logic using:
  - `expires_at ASC`
  - then `created_at ASC`
  so earlier-expiring lots are used first

## 16. UI Recommendation

Recommended V1 pages or sections:

- `/pricing`
- `/checkout/success`
- `/checkout/cancel`
- `/dashboard/billing`

Recommended account display:

- current Bonus Points
- current Purchased Reading Credits
- membership status
- recent transactions
- next expiry

## 17. Product Rules To Lock For V1

These should be treated as the default V1 rules unless intentionally revised:

- signup reward: `10 Bonus Points`
- basic Decision Guidance cost: `5 Bonus Points` or `1 Purchased Reading Credit`
- signup/check-in/referral Bonus Points validity: `30 days`
- Purchased Reading Credit validity: `90 days`
- check-in rewards use the 7-day cycle in this document
- invited user reward: `5 Bonus Points` after valid registration
- inviter reward: `10 Bonus Points` after invited user completes first valid feature use
- Creem is the V1 payment provider
- deep AI interpretation is not part of V1 payment logic
- guests can open Decision Guidance and pricing pages, but must sign in before submit or purchase
- members can use unlimited basic Decision Guidance without consuming Purchased Reading Credits

## 18. Recommended Build Order

1. Finalize product rules in this document
2. Create payment and rights SQL schema with `cp_` prefixes
3. Implement Bonus Points summary, Purchased Reading Credits, and transaction model
4. Implement checkout API and Creem webhook
5. Build pricing page and billing display
6. Add signup reward grant
7. Add daily check-in
8. Add referral reward logic
9. Update Decision Guidance to require login on submit instead of page entry

## 19. Open Questions

These still need product confirmation before implementation:

- Should monthly membership launch in V1, or should V1 start with yearly only?
- Should detailed hexagram output remain fully member-only, or partly available through other premium mechanics later?
- Should Bonus Points and Purchased Reading Credits be shown in one summary card or separate cards?
- Should the billing page expose explicit expiry dates for each grant and purchase lot?
