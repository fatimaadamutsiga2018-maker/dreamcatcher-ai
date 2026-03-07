-- Step 3: Create hexagram_readings table
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

CREATE POLICY "Users can view own readings" ON hexagram_readings FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Anyone can create reading" ON hexagram_readings FOR INSERT WITH CHECK (true);
