-- Insert sample user
INSERT INTO users (id, email, name)
VALUES ('00000000-0000-0000-0000-000000000001', 'demo@blessingcards.com', 'Demo User')
ON CONFLICT (email) DO NOTHING;

-- Insert sample contacts
INSERT INTO contacts (user_id, name, relationship, birthday, notes)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Sarah Johnson', 'Friend', '1990-12-20', 'Loves hiking and photography'),
  ('00000000-0000-0000-0000-000000000001', 'Mom', 'Parent', '1965-01-15', 'Favorite flowers: roses'),
  ('00000000-0000-0000-0000-000000000001', 'John Smith', 'Friend', '1988-09-08', 'Recently graduated MBA'),
  ('00000000-0000-0000-0000-000000000001', 'Emma Davis', 'Friend', '1992-03-25', 'Book club member'),
  ('00000000-0000-0000-0000-000000000001', 'Partner', 'Spouse', '1989-11-28', 'Anniversary Nov 28')
ON CONFLICT DO NOTHING;

-- Insert sample cards
INSERT INTO cards (user_id, contact_id, title, message, occasion, tone, status, sent_at)
SELECT 
  '00000000-0000-0000-0000-000000000001',
  c.id,
  'Happy Birthday Sarah!',
  'Dear Sarah,' || E'\n\n' || 'On this special day, I want to celebrate you and all the joy you bring into our lives. Your kindness, strength, and wonderful spirit make every day brighter.' || E'\n\n' || 'Wishing you a year filled with adventure, laughter, and countless beautiful memories.' || E'\n\n' || 'With warmest wishes!',
  'Birthday',
  'Warm & Personal',
  'sent',
  '2024-12-10'
FROM contacts c WHERE c.name = 'Sarah Johnson' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO cards (user_id, contact_id, title, message, occasion, tone, status, sent_at)
SELECT 
  '00000000-0000-0000-0000-000000000001',
  c.id,
  'Thank You Mom',
  'Dear Mom,' || E'\n\n' || 'I want to take a moment to express my heartfelt gratitude for everything you do. Your love, support, and wisdom have shaped who I am today.' || E'\n\n' || 'Thank you for always being there and for your endless encouragement.' || E'\n\n' || 'With all my love!',
  'Thank You',
  'Sincere & Heartfelt',
  'sent',
  '2024-12-05'
FROM contacts c WHERE c.name = 'Mom' LIMIT 1
ON CONFLICT DO NOTHING;

-- Insert sample reminders
INSERT INTO reminders (user_id, contact_id, occasion, reminder_date, priority, notes)
SELECT 
  '00000000-0000-0000-0000-000000000001',
  c.id,
  'Birthday',
  '2024-12-20',
  'high',
  'Plan something special this year'
FROM contacts c WHERE c.name = 'Sarah Johnson'
ON CONFLICT DO NOTHING;

INSERT INTO reminders (user_id, contact_id, occasion, reminder_date, priority, notes)
SELECT 
  '00000000-0000-0000-0000-000000000001',
  c.id,
  'Birthday',
  '2025-01-15',
  'high',
  'Get roses for mom'
FROM contacts c WHERE c.name = 'Mom'
ON CONFLICT DO NOTHING;

-- Insert sample activities for heatmap
INSERT INTO activities (user_id, contact_id, activity_type, activity_date)
SELECT 
  '00000000-0000-0000-0000-000000000001',
  c.id,
  'card_sent',
  date_series
FROM contacts c
CROSS JOIN generate_series(
  '2024-01-01'::date,
  '2024-12-15'::date,
  '30 days'::interval
) date_series
WHERE c.user_id = '00000000-0000-0000-0000-000000000001'
ON CONFLICT DO NOTHING;
