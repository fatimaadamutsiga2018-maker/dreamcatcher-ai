-- ClarityPath Security Hardening Script
-- Execute this in Supabase SQL Editor to fix security vulnerabilities
-- Report Date: 2026-03-01

-- ============================================
-- 1. Fix hexagram_templates table (CRITICAL)
-- ============================================

-- Enable RLS on hexagram_templates
ALTER TABLE hexagram_templates ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read templates (they are reference data)
CREATE POLICY "Anyone can read hexagram templates"
  ON hexagram_templates FOR SELECT
  USING (true);

-- Only authenticated users with admin role can modify templates
-- (You'll need to set up admin role separately)
CREATE POLICY "Only admins can modify templates"
  ON hexagram_templates FOR ALL
  USING (
    auth.jwt() ->> 'role' = 'admin'
  );

-- ============================================
-- 2. Add UPDATE policies for user data
-- ============================================

-- Profiles: Users can update their own profile
CREATE POLICY "Users can update own profile data"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Assessment sessions: Users can update their own assessments
CREATE POLICY "Users can update own assessments"
  ON assessment_sessions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Hexagram readings: Users can update their own readings
CREATE POLICY "Users can update own readings"
  ON hexagram_readings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 3. Add DELETE policies for user data
-- ============================================

-- Profiles: Users can delete their own profile
CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  USING (auth.uid() = id);

-- Assessment sessions: Users can delete their own assessments
CREATE POLICY "Users can delete own assessments"
  ON assessment_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- Hexagram readings: Users can delete their own readings
CREATE POLICY "Users can delete own readings"
  ON hexagram_readings FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 4. Add rate limiting (Optional but recommended)
-- ============================================

-- Create a function to check rate limits
CREATE OR REPLACE FUNCTION check_rate_limit(
  table_name TEXT,
  user_identifier TEXT,
  max_requests INTEGER,
  time_window INTERVAL
)
RETURNS BOOLEAN AS $$
DECLARE
  request_count INTEGER;
BEGIN
  -- Count recent requests from this user/IP
  EXECUTE format(
    'SELECT COUNT(*) FROM %I WHERE
     (user_id::TEXT = $1 OR $1 IS NULL) AND
     created_at > NOW() - $2',
    table_name
  ) INTO request_count
  USING user_identifier, time_window;

  RETURN request_count < max_requests;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 5. Tighten anonymous INSERT policies (Optional)
-- ============================================

-- If you want to add rate limiting to anonymous inserts:
-- Uncomment and adjust these policies

/*
-- Replace existing assessment policy with rate-limited version
DROP POLICY IF EXISTS "Anyone can create assessment" ON assessment_sessions;
CREATE POLICY "Rate-limited assessment creation"
  ON assessment_sessions FOR INSERT
  WITH CHECK (
    check_rate_limit(
      'assessment_sessions',
      COALESCE(auth.uid()::TEXT, inet_client_addr()::TEXT),
      10,  -- Max 10 assessments
      INTERVAL '1 hour'  -- Per hour
    )
  );

-- Replace existing reading policy with rate-limited version
DROP POLICY IF EXISTS "Anyone can create reading" ON hexagram_readings;
CREATE POLICY "Rate-limited reading creation"
  ON hexagram_readings FOR INSERT
  WITH CHECK (
    check_rate_limit(
      'hexagram_readings',
      COALESCE(auth.uid()::TEXT, inet_client_addr()::TEXT),
      20,  -- Max 20 readings
      INTERVAL '1 hour'  -- Per hour
    )
  );
*/

-- ============================================
-- 6. Add audit logging (Optional)
-- ============================================

-- Create audit log table
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on audit log
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can read audit logs
CREATE POLICY "Only admins can read audit logs"
  ON audit_log FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================
-- Verification Queries
-- ============================================

-- Run these to verify RLS is enabled on all tables:
-- SELECT tablename, rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public';

-- Check all policies:
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
-- FROM pg_policies
-- WHERE schemaname = 'public';
