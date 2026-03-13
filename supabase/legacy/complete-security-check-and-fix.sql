-- ============================================
-- STEP 1: 检查当前所有表的 RLS 状态
-- ============================================
-- 复制下面的查询结果，看看哪些表的 rls_enabled 是 false

SELECT
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- ============================================
-- STEP 2: 检查现有的 RLS 策略
-- ============================================

SELECT
  tablename,
  policyname,
  cmd as operation,
  qual as using_expression
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;

-- ============================================
-- STEP 3: 安全修复脚本
-- 执行前请先查看 STEP 1 和 STEP 2 的结果
-- ============================================

-- 为所有没有启用 RLS 的表启用 RLS
DO $$
DECLARE
  tbl RECORD;
BEGIN
  FOR tbl IN
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
    AND rowsecurity = false
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl.tablename);
    RAISE NOTICE 'Enabled RLS on table: %', tbl.tablename;
  END LOOP;
END $$;

-- ============================================
-- STEP 4: 为常见表添加基本的 RLS 策略
-- ============================================

-- 如果你有 User 表，添加基本策略
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'User' AND schemaname = 'public') THEN
    -- 用户只能查看自己的数据
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'User' AND policyname = 'Users can view own data') THEN
      CREATE POLICY "Users can view own data" ON "User"
        FOR SELECT USING (auth.uid()::text = id::text);
    END IF;

    -- 用户只能更新自己的数据
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'User' AND policyname = 'Users can update own data') THEN
      CREATE POLICY "Users can update own data" ON "User"
        FOR UPDATE USING (auth.uid()::text = id::text);
    END IF;
  END IF;
END $$;

-- 如果你有 Account 表，添加基本策略
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'Account' AND schemaname = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'Account' AND policyname = 'Users can view own accounts') THEN
      CREATE POLICY "Users can view own accounts" ON "Account"
        FOR SELECT USING (auth.uid()::text = "userId"::text);
    END IF;
  END IF;
END $$;

-- 如果你有 Session 表，添加基本策略
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'Session' AND schemaname = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'Session' AND policyname = 'Users can view own sessions') THEN
      CREATE POLICY "Users can view own sessions" ON "Session"
        FOR SELECT USING (auth.uid()::text = "userId"::text);
    END IF;
  END IF;
END $$;

-- ============================================
-- STEP 5: 验证修复结果
-- ============================================

SELECT
  tablename,
  rowsecurity as rls_enabled,
  (SELECT COUNT(*) FROM pg_policies WHERE pg_policies.tablename = pg_tables.tablename) as policy_count
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
