-- ClarityPath Database Schema - Phase 1 MVP
-- Execute this in Supabase SQL Editor

-- 1. Profiles Table (User Extended Information)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  birth_date DATE,
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. Assessment Sessions Table
CREATE TABLE assessment_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  total_score DECIMAL(4,2) NOT NULL,
  energy_type TEXT NOT NULL,

  mental_clarity_score DECIMAL(4,2) NOT NULL,
  physical_vitality_score DECIMAL(4,2) NOT NULL,
  life_harmony_score DECIMAL(4,2) NOT NULL,
  growth_momentum_score DECIMAL(4,2) NOT NULL,

  lowest_dimension TEXT NOT NULL,

  question_set JSONB NOT NULL,
  answers JSONB NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  CONSTRAINT valid_energy_type CHECK (
    energy_type IN ('high_flow', 'steady_state', 'recalibration', 'recharge_mode')
  )
);

CREATE INDEX idx_assessment_user_id ON assessment_sessions(user_id);
CREATE INDEX idx_assessment_created_at ON assessment_sessions(created_at DESC);

ALTER TABLE assessment_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own assessments"
  ON assessment_sessions FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create assessment"
  ON assessment_sessions FOR INSERT
  WITH CHECK (true);

-- 3. Hexagram Readings Table
CREATE TABLE hexagram_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  question TEXT NOT NULL,
  input_numbers TEXT NOT NULL,

  hexagram_index INTEGER NOT NULL,
  hexagram_name_cn TEXT NOT NULL,
  hexagram_name_en TEXT NOT NULL,

  core_theme TEXT NOT NULL,
  energy_state TEXT NOT NULL,
  action_suggestions JSONB NOT NULL,
  timing_advice TEXT NOT NULL,
  risk_warning TEXT NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT valid_hexagram_index CHECK (hexagram_index BETWEEN 0 AND 7),
  CONSTRAINT valid_timing CHECK (timing_advice IN ('NOW', 'WAIT', 'ADJUST'))
);

CREATE INDEX idx_hexagram_user_id ON hexagram_readings(user_id);
CREATE INDEX idx_hexagram_created_at ON hexagram_readings(created_at DESC);

ALTER TABLE hexagram_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own readings"
  ON hexagram_readings FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create reading"
  ON hexagram_readings FOR INSERT
  WITH CHECK (true);

-- 4. Hexagram Templates Table
CREATE TABLE hexagram_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hexagram_index INTEGER UNIQUE NOT NULL,
  name_cn TEXT NOT NULL,
  name_en TEXT NOT NULL,
  element TEXT NOT NULL,
  core_theme TEXT NOT NULL,
  energy_state TEXT NOT NULL,
  action_suggestions JSONB NOT NULL,
  timing_advice TEXT NOT NULL,
  risk_warning TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_index CHECK (hexagram_index BETWEEN 0 AND 7)
);

-- 5. Insert Initial Hexagram Templates
INSERT INTO hexagram_templates (
  hexagram_index, name_cn, name_en, element,
  core_theme, energy_state, action_suggestions,
  timing_advice, risk_warning
) VALUES
(0, '坤', 'Earth', 'Earth',
 'Receptivity and Nurturing',
 'You are in a receptive, nurturing phase. This is not a time for forcing outcomes, but for allowing things to unfold naturally.',
 '["Practice Receptivity", "Nurture What Exists", "Trust the Process"]'::jsonb,
 'WAIT',
 'Don''t mistake passivity for receptivity.'),

(1, '乾', 'Heaven', 'Heaven',
 'Creative Power and Leadership',
 'Your energy is in a powerful creative phase. This is a time for bold action, leadership, and initiating what you''ve been planning.',
 '["Take the Lead", "Start What Matters", "Maintain Integrity"]'::jsonb,
 'NOW',
 'Avoid arrogance. Power without humility creates resistance.'),

(2, '兑', 'Lake', 'Lake',
 'Joy and Communication',
 'This is a time for open expression and joyful connection.',
 '["Express Yourself", "Connect with Others", "Find Joy"]'::jsonb,
 'NOW',
 'Don''t force happiness or avoid difficult truths.'),

(3, '离', 'Fire', 'Fire',
 'Clarity and Insight',
 'Your vision is clear right now. This is a time for understanding and illumination.',
 '["Seek Understanding", "Illuminate the Path", "Share Your Light"]'::jsonb,
 'NOW',
 'Clarity without compassion burns.'),

(4, '震', 'Thunder', 'Thunder',
 'Action and Breakthrough',
 'Energy is building for movement and change.',
 '["Take Bold Action", "Break Through Barriers", "Trust Your Momentum"]'::jsonb,
 'NOW',
 'Action without preparation wastes energy.'),

(5, '巽', 'Wind', 'Wind',
 'Flexibility and Adaptation',
 'This is a time for gentle persistence and adaptive strategies.',
 '["Stay Flexible", "Adapt Your Approach", "Persist Gently"]'::jsonb,
 'ADJUST',
 'Don''t lose your core in adaptation.'),

(6, '坎', 'Water', 'Water',
 'Depth and Flow',
 'You are in a phase of deep reflection and emotional depth.',
 '["Go Deeper", "Trust the Flow", "Navigate Carefully"]'::jsonb,
 'WAIT',
 'Don''t get lost in the depths.'),

(7, '艮', 'Mountain', 'Mountain',
 'Stillness and Boundaries',
 'This is a time for stillness, grounding, and establishing clear boundaries.',
 '["Be Still", "Set Boundaries", "Find Your Ground"]'::jsonb,
 'WAIT',
 'Stillness is not stagnation.');

