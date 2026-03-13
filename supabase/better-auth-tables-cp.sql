-- Better Auth tables for ClarityPath
-- Date: 2026-03-12
-- Purpose:
-- 1. Preserve the cp_ table prefix for ClarityPath
-- 2. Create Better Auth compatible auth tables
-- 3. Avoid destructive replacement of old NextAuth/Supabase-Auth style tables
--
-- Safe behavior:
-- - If an old cp_* auth table exists but does not contain the Better Auth fields
--   this script renames it to a *_legacy_20260312 table first.
-- - Then it creates the correct Better Auth table shape.

BEGIN;

-- 1. Rename incompatible legacy auth tables if they already exist.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'cp_users'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'cp_users' AND column_name = 'emailVerified'
  ) THEN
    EXECUTE 'ALTER TABLE public.cp_users RENAME TO cp_users_legacy_20260312';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'cp_sessions'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'cp_sessions' AND column_name = 'token'
  ) THEN
    EXECUTE 'ALTER TABLE public.cp_sessions RENAME TO cp_sessions_legacy_20260312';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'cp_accounts'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'cp_accounts' AND column_name = 'providerId'
  ) THEN
    EXECUTE 'ALTER TABLE public.cp_accounts RENAME TO cp_accounts_legacy_20260312';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'cp_verification_tokens'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'cp_verification_tokens' AND column_name = 'value'
  ) THEN
    EXECUTE 'ALTER TABLE public.cp_verification_tokens RENAME TO cp_verification_tokens_legacy_20260312';
  END IF;
END $$;

-- 2. Create Better Auth compatible tables.
CREATE TABLE IF NOT EXISTS public.cp_users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  emailVerified BOOLEAN NOT NULL DEFAULT FALSE,
  image TEXT,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.cp_sessions (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL REFERENCES public.cp_users(id) ON DELETE CASCADE,
  expiresAt TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL UNIQUE,
  ipAddress TEXT,
  userAgent TEXT,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.cp_accounts (
  id TEXT PRIMARY KEY,
  accountId TEXT NOT NULL,
  providerId TEXT NOT NULL,
  userId TEXT NOT NULL REFERENCES public.cp_users(id) ON DELETE CASCADE,
  accessToken TEXT,
  refreshToken TEXT,
  idToken TEXT,
  accessTokenExpiresAt TIMESTAMPTZ,
  refreshTokenExpiresAt TIMESTAMPTZ,
  scope TEXT,
  password TEXT,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT cp_accounts_provider_account_unique UNIQUE (providerId, accountId)
);

CREATE TABLE IF NOT EXISTS public.cp_verification_tokens (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  expiresAt TIMESTAMPTZ NOT NULL,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Useful indexes.
CREATE INDEX IF NOT EXISTS idx_cp_sessions_user_id ON public.cp_sessions(userId);
CREATE INDEX IF NOT EXISTS idx_cp_sessions_token ON public.cp_sessions(token);
CREATE INDEX IF NOT EXISTS idx_cp_accounts_user_id ON public.cp_accounts(userId);
CREATE INDEX IF NOT EXISTS idx_cp_verification_identifier ON public.cp_verification_tokens(identifier);
CREATE INDEX IF NOT EXISTS idx_cp_users_email ON public.cp_users(email);

-- 4. Enable RLS.
ALTER TABLE public.cp_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cp_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cp_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cp_verification_tokens ENABLE ROW LEVEL SECURITY;

-- 5. Create policies only if they do not already exist.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_users' AND policyname = 'cp_users_select_own'
  ) THEN
    CREATE POLICY cp_users_select_own
      ON public.cp_users
      FOR SELECT
      USING (auth.uid()::text = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_users' AND policyname = 'cp_users_update_own'
  ) THEN
    CREATE POLICY cp_users_update_own
      ON public.cp_users
      FOR UPDATE
      USING (auth.uid()::text = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_sessions' AND policyname = 'cp_sessions_select_own'
  ) THEN
    CREATE POLICY cp_sessions_select_own
      ON public.cp_sessions
      FOR SELECT
      USING (auth.uid()::text = userId);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_accounts' AND policyname = 'cp_accounts_select_own'
  ) THEN
    CREATE POLICY cp_accounts_select_own
      ON public.cp_accounts
      FOR SELECT
      USING (auth.uid()::text = userId);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_users' AND policyname = 'cp_users_service_role_all'
  ) THEN
    CREATE POLICY cp_users_service_role_all
      ON public.cp_users
      FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_sessions' AND policyname = 'cp_sessions_service_role_all'
  ) THEN
    CREATE POLICY cp_sessions_service_role_all
      ON public.cp_sessions
      FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_accounts' AND policyname = 'cp_accounts_service_role_all'
  ) THEN
    CREATE POLICY cp_accounts_service_role_all
      ON public.cp_accounts
      FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_verification_tokens' AND policyname = 'cp_verification_tokens_service_role_all'
  ) THEN
    CREATE POLICY cp_verification_tokens_service_role_all
      ON public.cp_verification_tokens
      FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;
END $$;

COMMIT;

-- Verification queries you can run after execution:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'cp_%' ORDER BY table_name;
-- SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'cp_users' ORDER BY ordinal_position;
