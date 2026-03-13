-- Step 2: Create assessment_sessions table
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
  CONSTRAINT valid_energy_type CHECK (energy_type IN ('high_flow', 'steady_state', 'recalibration', 'recharge_mode'))
);

CREATE INDEX idx_assessment_user_id ON assessment_sessions(user_id);
CREATE INDEX idx_assessment_created_at ON assessment_sessions(created_at DESC);

ALTER TABLE assessment_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own assessments" ON assessment_sessions FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Anyone can create assessment" ON assessment_sessions FOR INSERT WITH CHECK (true);
