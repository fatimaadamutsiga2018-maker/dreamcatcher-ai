-- Reading history table for ClarityPath Dashboard
-- Date: 2026-03-14
-- Records each hexagram reading and assessment for dashboard stats

BEGIN;

CREATE TABLE IF NOT EXISTS public.cp_reading_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES public.cp_users(id) ON DELETE CASCADE,
  reading_type TEXT NOT NULL,
  question TEXT,
  input_numbers TEXT,
  result_summary JSONB NOT NULL DEFAULT '{}'::jsonb,
  consumed_source TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT cp_reading_history_valid_type CHECK (reading_type IN ('hexagram', 'assessment')),
  CONSTRAINT cp_reading_history_valid_source CHECK (
    consumed_source IN ('membership', 'bonus_points', 'purchased_credits', 'free')
  )
);

CREATE INDEX IF NOT EXISTS idx_cp_reading_history_user_created
  ON public.cp_reading_history(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_cp_reading_history_user_type
  ON public.cp_reading_history(user_id, reading_type);

ALTER TABLE public.cp_reading_history ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_reading_history' AND policyname = 'cp_reading_history_select_own'
  ) THEN
    CREATE POLICY cp_reading_history_select_own
      ON public.cp_reading_history
      FOR SELECT
      USING (auth.uid()::text = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_reading_history' AND policyname = 'cp_reading_history_service_role_all'
  ) THEN
    CREATE POLICY cp_reading_history_service_role_all
      ON public.cp_reading_history
      FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;
END $$;

COMMIT;
