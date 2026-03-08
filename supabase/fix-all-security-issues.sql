-- ============================================
-- Supabase Security Advisor 修复脚本
-- 修复日期: 2026-03-04
-- 问题: 14 个安全错误
-- ============================================

-- 第一部分: 为所有表启用 RLS
-- ============================================

-- 1. User 表
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

-- 2. Account 表
ALTER TABLE "Account" ENABLE ROW LEVEL SECURITY;

-- 3. Session 表
ALTER TABLE "Session" ENABLE ROW LEVEL SECURITY;

-- 4. VerificationToken 表
ALTER TABLE "VerificationToken" ENABLE ROW LEVEL SECURITY;

-- 5. EnergyHistory 表
ALTER TABLE "EnergyHistory" ENABLE ROW LEVEL SECURITY;

-- 6. EnergyLedger 表
ALTER TABLE "EnergyLedger" ENABLE ROW LEVEL SECURITY;

-- 7. Checkin 表
ALTER TABLE "Checkin" ENABLE ROW LEVEL SECURITY;

-- 8. Order 表
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;

-- 9. Transaction 表
ALTER TABLE "Transaction" ENABLE ROW LEVEL SECURITY;

-- 10. active_dream_boards 表
ALTER TABLE "active_dream_boards" ENABLE ROW LEVEL SECURITY;

-- 11. bucklist_guest_messages 表
ALTER TABLE "bucklist_guest_messages" ENABLE ROW LEVEL SECURITY;

-- 12. table_name 表
ALTER TABLE "table_name" ENABLE ROW LEVEL SECURITY;

-- 13. _prisma_migrations 表（系统表，通常不需要用户访问）
ALTER TABLE "_prisma_migrations" ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 第二部分: 添加 RLS 策略
-- ============================================

-- User 表策略
CREATE POLICY "Users can view own profile"
  ON "User" FOR SELECT
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile"
  ON "User" FOR UPDATE
  USING (auth.uid()::text = id::text);

-- Account 表策略（保护敏感的 OAuth 凭证）
CREATE POLICY "Users can view own accounts"
  ON "Account" FOR SELECT
  USING (auth.uid()::text = "userId"::text);

CREATE POLICY "Users can update own accounts"
  ON "Account" FOR UPDATE
  USING (auth.uid()::text = "userId"::text);

CREATE POLICY "Users can delete own accounts"
  ON "Account" FOR DELETE
  USING (auth.uid()::text = "userId"::text);

-- Session 表策略
CREATE POLICY "Users can view own sessions"
  ON "Session" FOR SELECT
  USING (auth.uid()::text = "userId"::text);

CREATE POLICY "Users can delete own sessions"
  ON "Session" FOR DELETE
  USING (auth.uid()::text = "userId"::text);

-- VerificationToken 表策略（通常只需要系统访问）
CREATE POLICY "No public access to verification tokens"
  ON "VerificationToken" FOR ALL
  USING (false);

-- EnergyHistory 表策略
CREATE POLICY "Users can view own energy history"
  ON "EnergyHistory" FOR SELECT
  USING (auth.uid()::text = "userId"::text);

CREATE POLICY "Users can insert own energy history"
  ON "EnergyHistory" FOR INSERT
  WITH CHECK (auth.uid()::text = "userId"::text);

-- EnergyLedger 表策略
CREATE POLICY "Users can view own energy ledger"
  ON "EnergyLedger" FOR SELECT
  USING (auth.uid()::text = "userId"::text);

CREATE POLICY "Users can insert own energy ledger"
  ON "EnergyLedger" FOR INSERT
  WITH CHECK (auth.uid()::text = "userId"::text);

-- Checkin 表策略
CREATE POLICY "Users can view own checkins"
  ON "Checkin" FOR SELECT
  USING (auth.uid()::text = "userId"::text);

CREATE POLICY "Users can insert own checkins"
  ON "Checkin" FOR INSERT
  WITH CHECK (auth.uid()::text = "userId"::text);

-- Order 表策略
CREATE POLICY "Users can view own orders"
  ON "Order" FOR SELECT
  USING (auth.uid()::text = "userId"::text);

CREATE POLICY "Users can insert own orders"
  ON "Order" FOR INSERT
  WITH CHECK (auth.uid()::text = "userId"::text);

-- Transaction 表策略
CREATE POLICY "Users can view own transactions"
  ON "Transaction" FOR SELECT
  USING (auth.uid()::text = "userId"::text);

-- active_dream_boards 表策略
CREATE POLICY "Users can view own dream boards"
  ON "active_dream_boards" FOR SELECT
  USING (auth.uid()::text = "userId"::text);

CREATE POLICY "Users can manage own dream boards"
  ON "active_dream_boards" FOR ALL
  USING (auth.uid()::text = "userId"::text);

-- bucklist_guest_messages 表策略（可能需要公开访问）
CREATE POLICY "Anyone can view guest messages"
  ON "bucklist_guest_messages" FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create guest messages"
  ON "bucklist_guest_messages" FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- table_name 表策略（这个表名很奇怪，可能是测试表）
CREATE POLICY "Restrict access to table_name"
  ON "table_name" FOR ALL
  USING (false);

-- _prisma_migrations 表策略（系统表，禁止所有公开访问）
CREATE POLICY "No public access to migrations"
  ON "_prisma_migrations" FOR ALL
  USING (false);
