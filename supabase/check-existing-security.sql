-- 检查所有表的 RLS 状态
SELECT
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- 检查所有现有的 RLS 策略
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd as operation
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;
