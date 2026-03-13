-- CRITICAL Security Fixes - Execute Immediately
-- This fixes the vulnerabilities reported by Supabase on 2026-03-01

-- ============================================
-- FIX 1: Enable RLS on hexagram_templates (CRITICAL)
-- ============================================
ALTER TABLE hexagram_templates ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read templates (reference data)
CREATE POLICY "Anyone can read hexagram templates"
  ON hexagram_templates FOR SELECT
  USING (true);

-- Prevent unauthorized modifications
CREATE POLICY "Prevent unauthorized template modifications"
  ON hexagram_templates FOR ALL
  USING (false);

-- ============================================
-- FIX 2: Add missing UPDATE policies
-- ============================================

-- Users can update their own assessments
CREATE POLICY "Users can update own assessments"
  ON assessment_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can update their own readings
CREATE POLICY "Users can update own readings"
  ON hexagram_readings FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- FIX 3: Add missing DELETE policies
-- ============================================

-- Users can delete their own profiles
CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  USING (auth.uid() = id);

-- Users can delete their own assessments
CREATE POLICY "Users can delete own assessments"
  ON assessment_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- Users can delete their own readings
CREATE POLICY "Users can delete own readings"
  ON hexagram_readings FOR DELETE
  USING (auth.uid() = user_id);
