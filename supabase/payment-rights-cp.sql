-- Payment, points, credits, and membership tables for ClarityPath
-- Date: 2026-03-13
-- Purpose:
-- 1. Add V1 monetization tables using cp_ prefix
-- 2. Keep Better Auth user linkage through cp_users(id)
-- 3. Support Creem checkout, webhook fulfillment, bonus points, purchased credits, and memberships
--
-- Dependencies:
-- - better-auth-tables-cp.sql must be applied first

BEGIN;

-- 1. Summary table for user-visible balances.
CREATE TABLE IF NOT EXISTS public.cp_user_points_summary (
  user_id TEXT PRIMARY KEY REFERENCES public.cp_users(id) ON DELETE CASCADE,
  bonus_points_balance INTEGER NOT NULL DEFAULT 0,
  purchased_credits_balance INTEGER NOT NULL DEFAULT 0,
  next_bonus_points_expiry_at TIMESTAMPTZ,
  next_purchased_credits_expiry_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT cp_user_points_summary_non_negative_bonus CHECK (bonus_points_balance >= 0),
  CONSTRAINT cp_user_points_summary_non_negative_purchased CHECK (purchased_credits_balance >= 0)
);

-- 2. Ledger for all bonus point grants, deductions, expiries, and adjustments.
CREATE TABLE IF NOT EXISTS public.cp_points_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES public.cp_users(id) ON DELETE CASCADE,
  source_type TEXT NOT NULL,
  direction TEXT NOT NULL,
  amount INTEGER NOT NULL,
  remaining_amount INTEGER,
  description TEXT,
  related_payment_order_id UUID,
  related_referral_reward_id UUID,
  related_checkin_date DATE,
  expires_at TIMESTAMPTZ,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT cp_points_transactions_valid_direction CHECK (direction IN ('credit', 'debit', 'expire', 'reversal')),
  CONSTRAINT cp_points_transactions_valid_source CHECK (
    source_type IN (
      'signup_bonus',
      'checkin_bonus',
      'referral_bonus',
      'campaign_bonus',
      'manual_adjustment',
      'usage_deduction',
      'expiry',
      'refund_reversal'
    )
  ),
  CONSTRAINT cp_points_transactions_positive_amount CHECK (amount > 0),
  CONSTRAINT cp_points_transactions_remaining_non_negative CHECK (
    remaining_amount IS NULL OR remaining_amount >= 0
  )
);

-- 3. Lot-based purchased reading credits.
CREATE TABLE IF NOT EXISTS public.cp_purchased_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES public.cp_users(id) ON DELETE CASCADE,
  payment_order_id UUID,
  sku TEXT NOT NULL,
  credits_total INTEGER NOT NULL,
  credits_remaining INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  expires_at TIMESTAMPTZ NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT cp_purchased_credits_positive_total CHECK (credits_total > 0),
  CONSTRAINT cp_purchased_credits_non_negative_remaining CHECK (credits_remaining >= 0),
  CONSTRAINT cp_purchased_credits_remaining_not_above_total CHECK (credits_remaining <= credits_total),
  CONSTRAINT cp_purchased_credits_valid_status CHECK (status IN ('active', 'depleted', 'expired', 'revoked'))
);

-- 4. Daily check-in streak tracking.
CREATE TABLE IF NOT EXISTS public.cp_checkin_streaks (
  user_id TEXT PRIMARY KEY REFERENCES public.cp_users(id) ON DELETE CASCADE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_checkin_date DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT cp_checkin_streaks_non_negative_current CHECK (current_streak >= 0),
  CONSTRAINT cp_checkin_streaks_non_negative_longest CHECK (longest_streak >= 0)
);

-- 5. Referral relationships.
CREATE TABLE IF NOT EXISTS public.cp_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inviter_user_id TEXT NOT NULL REFERENCES public.cp_users(id) ON DELETE CASCADE,
  invited_user_id TEXT NOT NULL REFERENCES public.cp_users(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'registered',
  first_valid_feature_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT cp_referrals_unique_invited UNIQUE (invited_user_id),
  CONSTRAINT cp_referrals_no_self_invite CHECK (inviter_user_id <> invited_user_id),
  CONSTRAINT cp_referrals_valid_status CHECK (status IN ('registered', 'qualified', 'rewarded', 'rejected'))
);

-- 6. Referral reward records.
CREATE TABLE IF NOT EXISTS public.cp_referral_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_id UUID NOT NULL REFERENCES public.cp_referrals(id) ON DELETE CASCADE,
  rewarded_user_id TEXT NOT NULL REFERENCES public.cp_users(id) ON DELETE CASCADE,
  reward_type TEXT NOT NULL,
  reward_amount INTEGER NOT NULL,
  points_transaction_id UUID,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  CONSTRAINT cp_referral_rewards_valid_type CHECK (reward_type IN ('invited_signup_bonus', 'inviter_usage_bonus')),
  CONSTRAINT cp_referral_rewards_positive_amount CHECK (reward_amount > 0)
);

-- 7. Internal payment order lifecycle.
CREATE TABLE IF NOT EXISTS public.cp_payment_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_no TEXT NOT NULL UNIQUE,
  user_id TEXT NOT NULL REFERENCES public.cp_users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'creem',
  sku TEXT NOT NULL,
  rights_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  request_id TEXT NOT NULL UNIQUE,
  provider_checkout_id TEXT,
  provider_order_id TEXT,
  provider_customer_id TEXT,
  provider_product_id TEXT,
  amount NUMERIC(12, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  success_url TEXT,
  cancel_url TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  CONSTRAINT cp_payment_orders_valid_provider CHECK (provider IN ('creem')),
  CONSTRAINT cp_payment_orders_valid_rights_type CHECK (rights_type IN ('reading_credits', 'membership')),
  CONSTRAINT cp_payment_orders_valid_status CHECK (
    status IN ('pending', 'checkout_created', 'paid', 'failed', 'refunded', 'chargeback', 'canceled')
  ),
  CONSTRAINT cp_payment_orders_non_negative_amount CHECK (amount >= 0)
);

-- 8. Provider-side transaction history.
CREATE TABLE IF NOT EXISTS public.cp_payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_order_id UUID NOT NULL REFERENCES public.cp_payment_orders(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES public.cp_users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'creem',
  provider_event_type TEXT,
  provider_transaction_id TEXT,
  provider_order_id TEXT,
  provider_customer_id TEXT,
  provider_subscription_id TEXT,
  amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL,
  raw_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT cp_payment_transactions_valid_provider CHECK (provider IN ('creem'))
);

-- 9. Membership access state.
CREATE TABLE IF NOT EXISTS public.cp_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES public.cp_users(id) ON DELETE CASCADE,
  plan_code TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'creem',
  provider_subscription_id TEXT UNIQUE,
  provider_customer_id TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  canceled_at TIMESTAMPTZ,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  deeper_insight_total INTEGER NOT NULL DEFAULT 0,
  deeper_insight_remaining INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT cp_memberships_valid_provider CHECK (provider IN ('creem')),
  CONSTRAINT cp_memberships_valid_plan_code CHECK (plan_code IN ('member_monthly', 'member_yearly')),
  CONSTRAINT cp_memberships_valid_status CHECK (
    status IN ('active', 'past_due', 'canceled', 'expired', 'trialing')
  )
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_cp_memberships_user_active
  ON public.cp_memberships(user_id)
  WHERE status IN ('active', 'trialing', 'past_due');

-- 10. Webhook idempotency and audit.
CREATE TABLE IF NOT EXISTS public.cp_payment_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL DEFAULT 'creem',
  provider_event_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ,
  raw_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT cp_payment_webhook_events_valid_provider CHECK (provider IN ('creem')),
  CONSTRAINT cp_payment_webhook_events_unique_event UNIQUE (provider, provider_event_id)
);

-- 11. Indexes.
CREATE INDEX IF NOT EXISTS idx_cp_points_transactions_user_created ON public.cp_points_transactions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cp_points_transactions_user_expiry ON public.cp_points_transactions(user_id, expires_at);
CREATE INDEX IF NOT EXISTS idx_cp_purchased_credits_user_expiry ON public.cp_purchased_credits(user_id, expires_at);
CREATE INDEX IF NOT EXISTS idx_cp_referrals_inviter ON public.cp_referrals(inviter_user_id);
CREATE INDEX IF NOT EXISTS idx_cp_referrals_code ON public.cp_referrals(referral_code);
CREATE INDEX IF NOT EXISTS idx_cp_referral_rewards_user_granted ON public.cp_referral_rewards(rewarded_user_id, granted_at DESC);
CREATE INDEX IF NOT EXISTS idx_cp_payment_orders_user_created ON public.cp_payment_orders(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cp_payment_orders_status ON public.cp_payment_orders(status);
CREATE INDEX IF NOT EXISTS idx_cp_payment_transactions_order ON public.cp_payment_transactions(payment_order_id);
CREATE INDEX IF NOT EXISTS idx_cp_payment_transactions_user_created ON public.cp_payment_transactions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cp_memberships_user_status ON public.cp_memberships(user_id, status);
CREATE INDEX IF NOT EXISTS idx_cp_webhook_events_created ON public.cp_payment_webhook_events(created_at DESC);

-- 12. Enable RLS.
ALTER TABLE public.cp_user_points_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cp_points_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cp_purchased_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cp_checkin_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cp_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cp_referral_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cp_payment_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cp_payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cp_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cp_payment_webhook_events ENABLE ROW LEVEL SECURITY;

-- 13. RLS policies.
-- Strategy: user-facing tables allow read-own via auth.uid(); writes should be done by service_role API routes.
DO $$
BEGIN
  -- Summary
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_user_points_summary' AND policyname = 'cp_user_points_summary_select_own'
  ) THEN
    CREATE POLICY cp_user_points_summary_select_own
      ON public.cp_user_points_summary
      FOR SELECT
      USING (auth.uid()::text = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_user_points_summary' AND policyname = 'cp_user_points_summary_service_role_all'
  ) THEN
    CREATE POLICY cp_user_points_summary_service_role_all
      ON public.cp_user_points_summary
      FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;

  -- Points ledger
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_points_transactions' AND policyname = 'cp_points_transactions_select_own'
  ) THEN
    CREATE POLICY cp_points_transactions_select_own
      ON public.cp_points_transactions
      FOR SELECT
      USING (auth.uid()::text = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_points_transactions' AND policyname = 'cp_points_transactions_service_role_all'
  ) THEN
    CREATE POLICY cp_points_transactions_service_role_all
      ON public.cp_points_transactions
      FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;

  -- Purchased credits
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_purchased_credits' AND policyname = 'cp_purchased_credits_select_own'
  ) THEN
    CREATE POLICY cp_purchased_credits_select_own
      ON public.cp_purchased_credits
      FOR SELECT
      USING (auth.uid()::text = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_purchased_credits' AND policyname = 'cp_purchased_credits_service_role_all'
  ) THEN
    CREATE POLICY cp_purchased_credits_service_role_all
      ON public.cp_purchased_credits
      FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;

  -- Check-in streaks
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_checkin_streaks' AND policyname = 'cp_checkin_streaks_select_own'
  ) THEN
    CREATE POLICY cp_checkin_streaks_select_own
      ON public.cp_checkin_streaks
      FOR SELECT
      USING (auth.uid()::text = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_checkin_streaks' AND policyname = 'cp_checkin_streaks_service_role_all'
  ) THEN
    CREATE POLICY cp_checkin_streaks_service_role_all
      ON public.cp_checkin_streaks
      FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;

  -- Referrals
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_referrals' AND policyname = 'cp_referrals_select_related'
  ) THEN
    CREATE POLICY cp_referrals_select_related
      ON public.cp_referrals
      FOR SELECT
      USING (auth.uid()::text = inviter_user_id OR auth.uid()::text = invited_user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_referrals' AND policyname = 'cp_referrals_service_role_all'
  ) THEN
    CREATE POLICY cp_referrals_service_role_all
      ON public.cp_referrals
      FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;

  -- Referral rewards
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_referral_rewards' AND policyname = 'cp_referral_rewards_select_own'
  ) THEN
    CREATE POLICY cp_referral_rewards_select_own
      ON public.cp_referral_rewards
      FOR SELECT
      USING (auth.uid()::text = rewarded_user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_referral_rewards' AND policyname = 'cp_referral_rewards_service_role_all'
  ) THEN
    CREATE POLICY cp_referral_rewards_service_role_all
      ON public.cp_referral_rewards
      FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;

  -- Orders
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_payment_orders' AND policyname = 'cp_payment_orders_select_own'
  ) THEN
    CREATE POLICY cp_payment_orders_select_own
      ON public.cp_payment_orders
      FOR SELECT
      USING (auth.uid()::text = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_payment_orders' AND policyname = 'cp_payment_orders_service_role_all'
  ) THEN
    CREATE POLICY cp_payment_orders_service_role_all
      ON public.cp_payment_orders
      FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;

  -- Transactions
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_payment_transactions' AND policyname = 'cp_payment_transactions_select_own'
  ) THEN
    CREATE POLICY cp_payment_transactions_select_own
      ON public.cp_payment_transactions
      FOR SELECT
      USING (auth.uid()::text = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_payment_transactions' AND policyname = 'cp_payment_transactions_service_role_all'
  ) THEN
    CREATE POLICY cp_payment_transactions_service_role_all
      ON public.cp_payment_transactions
      FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;

  -- Memberships
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_memberships' AND policyname = 'cp_memberships_select_own'
  ) THEN
    CREATE POLICY cp_memberships_select_own
      ON public.cp_memberships
      FOR SELECT
      USING (auth.uid()::text = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_memberships' AND policyname = 'cp_memberships_service_role_all'
  ) THEN
    CREATE POLICY cp_memberships_service_role_all
      ON public.cp_memberships
      FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;

  -- Webhook events
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_payment_webhook_events' AND policyname = 'cp_payment_webhook_events_service_role_all'
  ) THEN
    CREATE POLICY cp_payment_webhook_events_service_role_all
      ON public.cp_payment_webhook_events
      FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;
END $$;

-- 14. Keep payment_order_id FK on purchased credits late-bound so the table can be created before the referenced table exists in restore scenarios.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = 'cp_purchased_credits'
      AND constraint_name = 'cp_purchased_credits_payment_order_fkey'
  ) THEN
    ALTER TABLE public.cp_purchased_credits
      ADD CONSTRAINT cp_purchased_credits_payment_order_fkey
      FOREIGN KEY (payment_order_id) REFERENCES public.cp_payment_orders(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = 'cp_referral_rewards'
      AND constraint_name = 'cp_referral_rewards_points_transaction_fkey'
  ) THEN
    ALTER TABLE public.cp_referral_rewards
      ADD CONSTRAINT cp_referral_rewards_points_transaction_fkey
      FOREIGN KEY (points_transaction_id) REFERENCES public.cp_points_transactions(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = 'cp_points_transactions'
      AND constraint_name = 'cp_points_transactions_related_payment_order_fkey'
  ) THEN
    ALTER TABLE public.cp_points_transactions
      ADD CONSTRAINT cp_points_transactions_related_payment_order_fkey
      FOREIGN KEY (related_payment_order_id) REFERENCES public.cp_payment_orders(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = 'cp_points_transactions'
      AND constraint_name = 'cp_points_transactions_related_referral_reward_fkey'
  ) THEN
    ALTER TABLE public.cp_points_transactions
      ADD CONSTRAINT cp_points_transactions_related_referral_reward_fkey
      FOREIGN KEY (related_referral_reward_id) REFERENCES public.cp_referral_rewards(id) ON DELETE SET NULL;
  END IF;
END $$;

COMMIT;

-- Verification:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'cp_payment%' OR table_name LIKE 'cp_%credits%' OR table_name LIKE 'cp_%points%' ORDER BY table_name;
