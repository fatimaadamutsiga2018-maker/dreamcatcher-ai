-- Step 4: Create hexagram_templates table and insert data
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

INSERT INTO hexagram_templates (hexagram_index, name_cn, name_en, element, core_theme, energy_state, action_suggestions, timing_advice, risk_warning) VALUES
(0, '坤', 'Earth', 'Earth', 'Receptivity and Nurturing', 'You are in a receptive, nurturing phase. This is not a time for forcing outcomes, but for allowing things to unfold naturally.', '["Practice Receptivity", "Nurture What Exists", "Trust the Process"]'::jsonb, 'WAIT', 'Don''t mistake passivity for receptivity.'),
(1, '乾', 'Heaven', 'Heaven', 'Creative Power and Leadership', 'Your energy is in a powerful creative phase. This is a time for bold action, leadership, and initiating what you''ve been planning.', '["Take the Lead", "Start What Matters", "Maintain Integrity"]'::jsonb, 'NOW', 'Avoid arrogance. Power without humility creates resistance.'),
(2, '兑', 'Lake', 'Lake', 'Joy and Communication', 'This is a time for open expression and joyful connection.', '["Express Yourself", "Connect with Others", "Find Joy"]'::jsonb, 'NOW', 'Don''t force happiness or avoid difficult truths.'),
(3, '离', 'Fire', 'Fire', 'Clarity and Insight', 'Your vision is clear right now. This is a time for understanding and illumination.', '["Seek Understanding", "Illuminate the Path", "Share Your Light"]'::jsonb, 'NOW', 'Clarity without compassion burns.'),
(4, '震', 'Thunder', 'Thunder', 'Action and Breakthrough', 'Energy is building for movement and change.', '["Take Bold Action", "Break Through Barriers", "Trust Your Momentum"]'::jsonb, 'NOW', 'Action without preparation wastes energy.'),
(5, '巽', 'Wind', 'Wind', 'Flexibility and Adaptation', 'This is a time for gentle persistence and adaptive strategies.', '["Stay Flexible", "Adapt Your Approach", "Persist Gently"]'::jsonb, 'ADJUST', 'Don''t lose your core in adaptation.'),
(6, '坎', 'Water', 'Water', 'Depth and Flow', 'You are in a phase of deep reflection and emotional depth.', '["Go Deeper", "Trust the Flow", "Navigate Carefully"]'::jsonb, 'WAIT', 'Don''t get lost in the depths.'),
(7, '艮', 'Mountain', 'Mountain', 'Stillness and Boundaries', 'This is a time for stillness, grounding, and establishing clear boundaries.', '["Be Still", "Set Boundaries", "Find Your Ground"]'::jsonb, 'WAIT', 'Stillness is not stagnation.');
