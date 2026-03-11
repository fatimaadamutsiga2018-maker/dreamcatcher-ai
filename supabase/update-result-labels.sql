-- Update result_label to match new favorability assessment system
-- Old labels → New labels:
-- "Green Light" → "Highly Favorable"
-- "Favorable" → "Favorable" (no change)
-- "Work for It" → "Moderate"
-- "Hold Off" → "Challenging"
-- "Not Now" → "Unfavorable"

UPDATE cp_hexagrams
SET result_label = CASE result_level
  WHEN 5 THEN 'Highly Favorable'
  WHEN 4 THEN 'Favorable'
  WHEN 3 THEN 'Moderate'
  WHEN 2 THEN 'Challenging'
  WHEN 1 THEN 'Unfavorable'
  ELSE result_label
END
WHERE result_level IN (1, 2, 3, 4, 5);

-- Verify the update
SELECT result_level, result_label, COUNT(*) as count
FROM cp_hexagrams
GROUP BY result_level, result_label
ORDER BY result_level DESC;
