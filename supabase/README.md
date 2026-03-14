# Supabase SQL Guide

This directory contains SQL files related to ClarityPath database setup and historical migrations.

## Source Of Truth

For the current authentication system, the active SQL entrypoint is:

- `better-auth-tables-cp.sql`

This is the only auth SQL in this directory that matches the current project decision:

- Better Auth
- Supabase PostgreSQL
- `cp_` table prefix

## Current Status

### Current / active

- `better-auth-tables-cp.sql`
  Purpose: Better Auth compatible auth tables for ClarityPath
  Status: current, deployed to production

- `blog-comments-cp.sql`
  Purpose: Blog comment and like tables, references cp_users(id) TEXT
  Status: current, not yet deployed — run in Supabase SQL Editor when ready
  Depends on: better-auth-tables-cp.sql (cp_users must exist first)

- `payment-rights-cp.sql`
  Purpose: payment, bonus points, purchased reading credits, check-in, referral, membership, and webhook event tables
  Status: current, not yet deployed — run in Supabase SQL Editor when payment implementation begins
  Depends on: better-auth-tables-cp.sql (cp_users must exist first)

- `update-result-labels.sql`
  Purpose: result label updates for domain content
  Status: potentially still useful, non-auth

### Legacy / do not run casually

Historical SQL files are archived under:

- `supabase/legacy/`

They are kept for reference and git history, but they do not represent the current auth direction.

## Important Warning

Some local scripts in `scripts/` still reference older SQL files, now under `supabase/legacy/init.sql`.
That means:

- old SQL files are not automatically applied to production
- but they are still dangerous if someone manually runs the old scripts

Before running any DB setup script, verify that it points to the intended SQL file.

## Working Rule

If the goal is to work on current auth:

1. Use `better-auth-tables-cp.sql`
2. Keep `cp_` prefixes
3. Do not revive old NextAuth SQL
4. Do not mix these files with `planning/supabase/` drafts

If the goal is to set up blog comments:

1. Ensure `better-auth-tables-cp.sql` has been run first
2. Run `blog-comments-cp.sql` in Supabase SQL Editor
3. Tables created: `cp_blog_comments`, `cp_comment_likes`

If the goal is to set up payment and rights:

1. Ensure `better-auth-tables-cp.sql` has been run first
2. Run `payment-rights-cp.sql` in Supabase SQL Editor
3. Tables created include:
   - `cp_user_points_summary`
   - `cp_points_transactions`
   - `cp_purchased_credits`
   - `cp_checkin_streaks`
   - `cp_referrals`
   - `cp_referral_rewards`
   - `cp_payment_orders`
   - `cp_payment_transactions`
   - `cp_memberships`
   - `cp_payment_webhook_events`
