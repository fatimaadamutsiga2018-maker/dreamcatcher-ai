# ClarityPath Database Schema

## 技术栈
- **数据库**: Supabase (PostgreSQL 15+)
- **认证**: Supabase Auth
- **ORM**: Prisma (可选) 或 Supabase Client

---

## Phase 1 (MVP) 核心表

### 1. users (由Supabase Auth管理)
```sql
-- Supabase自动创建，位于auth.users
-- 我们只需要扩展public.profiles表
```

### 2. profiles (用户扩展信息)
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  birth_date DATE, -- 用于个人能量适配(Phase 2)
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

---

### 3. assessment_sessions (测评会话)
```sql
CREATE TABLE assessment_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- 测评结果
  total_score DECIMAL(4,2) NOT NULL, -- 1.00 - 10.00
  energy_type TEXT NOT NULL, -- 'high_flow' | 'steady_state' | 'recalibration' | 'recharge_mode'

  -- 维度得分
  mental_clarity_score DECIMAL(4,2) NOT NULL,
  physical_vitality_score DECIMAL(4,2) NOT NULL,
  life_harmony_score DECIMAL(4,2) NOT NULL,
  growth_momentum_score DECIMAL(4,2) NOT NULL,

  -- 最低维度（用于建议）
  lowest_dimension TEXT NOT NULL, -- 'mental_clarity' | 'physical_vitality' | 'life_harmony' | 'growth_momentum'

  -- 元数据
  question_set JSONB NOT NULL, -- 存储本次使用的题目版本 ["A1", "A2", "A3", "B1"...]
  answers JSONB NOT NULL, -- 存储用户答案 {"A1": 8, "A2": 7, ...}

  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  -- 索引
  CONSTRAINT valid_energy_type CHECK (energy_type IN ('high_flow', 'steady_state', 'recalibration', 'recharge_mode'))
);

CREATE INDEX idx_assessment_user_id ON assessment_sessions(user_id);
CREATE INDEX idx_assessment_created_at ON assessment_sessions(created_at DESC);

-- RLS
ALTER TABLE assessment_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own assessments"
  ON assessment_sessions FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create assessment"
  ON assessment_sessions FOR INSERT
  WITH CHECK (true); -- 允许匿名用户测评
```

---

### 4. hexagram_readings (梅花易数记录)
```sql
CREATE TABLE hexagram_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- 输入
  question TEXT NOT NULL,
  input_numbers TEXT NOT NULL, -- "123" (3位数字)

  -- 计算结果
  hexagram_index INTEGER NOT NULL, -- 0-7 (对应8个基础卦)
  hexagram_name_cn TEXT NOT NULL, -- "乾"
  hexagram_name_en TEXT NOT NULL, -- "Heaven"

  -- 解读结果
  core_theme TEXT NOT NULL,
  energy_state TEXT NOT NULL,
  action_suggestions JSONB NOT NULL, -- ["建议1", "建议2", "建议3"]
  timing_advice TEXT NOT NULL, -- 'NOW' | 'WAIT' | 'ADJUST'
  risk_warning TEXT NOT NULL,

  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- 约束
  CONSTRAINT valid_hexagram_index CHECK (hexagram_index BETWEEN 0 AND 7),
  CONSTRAINT valid_timing CHECK (timing_advice IN ('NOW', 'WAIT', 'ADJUST'))
);

CREATE INDEX idx_hexagram_user_id ON hexagram_readings(user_id);
CREATE INDEX idx_hexagram_created_at ON hexagram_readings(created_at DESC);

-- RLS
ALTER TABLE hexagram_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own readings"
  ON hexagram_readings FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create reading"
  ON hexagram_readings FOR INSERT
  WITH CHECK (true);
```

---

## Phase 2 扩展表

### 5. energy_environment_daily (每日能量环境)
```sql
CREATE TABLE energy_environment_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL,
  energy_tendency TEXT NOT NULL,
  action_type TEXT NOT NULL,
  keywords JSONB NOT NULL,
  general_advice TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_energy_date ON energy_environment_daily(date DESC);
```

### 6. points_transactions (积分流水)
```sql
CREATE TABLE points_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  reason TEXT NOT NULL,
  reference_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_points_user_id ON points_transactions(user_id);
CREATE INDEX idx_points_created_at ON points_transactions(created_at DESC);

ALTER TABLE points_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own transactions" ON points_transactions FOR SELECT USING (auth.uid() = user_id);
```

### 7. user_points_summary (用户积分汇总)
```sql
CREATE TABLE user_points_summary (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_points INTEGER DEFAULT 0 NOT NULL,
  last_daily_login DATE,
  consecutive_days INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_points_summary ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own points" ON user_points_summary FOR SELECT USING (auth.uid() = user_id);
```

---

## Phase 3 商业化表

### 8. memberships (会员订阅)
```sql
CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL,
  status TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_tier CHECK (tier IN ('free', 'monthly', 'yearly')),
  CONSTRAINT valid_status CHECK (status IN ('active', 'cancelled', 'expired'))
);

CREATE INDEX idx_membership_user_id ON memberships(user_id);
CREATE INDEX idx_membership_status ON memberships(status);

ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own membership" ON memberships FOR SELECT USING (auth.uid() = user_id);
```

### 9. payment_transactions (支付记录)
```sql
CREATE TABLE payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT NOT NULL,
  product_type TEXT NOT NULL,
  product_id UUID,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_charge_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded'))
);

CREATE INDEX idx_payment_user_id ON payment_transactions(user_id);
CREATE INDEX idx_payment_created_at ON payment_transactions(created_at DESC);

ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own payments" ON payment_transactions FOR SELECT USING (auth.uid() = user_id);
```

---

## Phase 4 内容管理

### 10. blog_posts (博客文章)
```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  category TEXT NOT NULL,
  tags JSONB,
  meta_title TEXT,
  meta_description TEXT,
  reading_time INTEGER,
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'published'))
);

CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_status ON blog_posts(status);
CREATE INDEX idx_blog_published_at ON blog_posts(published_at DESC);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published posts are viewable by everyone" ON blog_posts FOR SELECT USING (status = 'published');
```

---

## 辅助表

### 11. question_bank (题库)
```sql
CREATE TABLE question_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version_code TEXT UNIQUE NOT NULL,
  dimension TEXT NOT NULL,
  question_text TEXT NOT NULL,
  scale_description JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_question_dimension ON question_bank(dimension);
```

### 12. hexagram_templates (卦象模板)
```sql
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
```

---

## 数据库函数

```sql
-- 计算用户积分余额
CREATE OR REPLACE FUNCTION get_user_points(p_user_id UUID)
RETURNS INTEGER AS $$
  SELECT COALESCE(total_points, 0)
  FROM user_points_summary
  WHERE user_id = p_user_id;
$$ LANGUAGE SQL STABLE;

-- 检查会员状态
CREATE OR REPLACE FUNCTION is_member(p_user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM memberships
    WHERE user_id = p_user_id
      AND status = 'active'
      AND (expires_at IS NULL OR expires_at > NOW())
  );
$$ LANGUAGE SQL STABLE;
```

---

## 初始化数据

```sql
-- 插入8个基础卦模板
INSERT INTO hexagram_templates (hexagram_index, name_cn, name_en, element, core_theme, energy_state, action_suggestions, timing_advice, risk_warning) VALUES
(0, '坤', 'Earth', 'Earth', 'Receptivity and Nurturing', 'You are in a receptive, nurturing phase. This is not a time for forcing outcomes, but for allowing things to unfold naturally.', '["Practice Receptivity", "Nurture What Exists", "Trust the Process"]', 'WAIT', 'Don''t mistake passivity for receptivity.'),
(1, '乾', 'Heaven', 'Heaven', 'Creative Power and Leadership', 'Your energy is in a powerful creative phase. This is a time for bold action, leadership, and initiating what you''ve been planning.', '["Take the Lead", "Start What Matters", "Maintain Integrity"]', 'NOW', 'Avoid arrogance. Power without humility creates resistance.'),
(2, '兑', 'Lake', 'Lake', 'Joy and Communication', 'This is a time for open expression and joyful connection.', '["Express Yourself", "Connect with Others", "Find Joy"]', 'NOW', 'Don''t force happiness or avoid difficult truths.'),
(3, '离', 'Fire', 'Fire', 'Clarity and Insight', 'Your vision is clear right now. This is a time for understanding and illumination.', '["Seek Understanding", "Illuminate the Path", "Share Your Light"]', 'NOW', 'Clarity without compassion burns.'),
(4, '震', 'Thunder', 'Thunder', 'Action and Breakthrough', 'Energy is building for movement and change.', '["Take Bold Action", "Break Through Barriers", "Trust Your Momentum"]', 'NOW', 'Action without preparation wastes energy.'),
(5, '巽', 'Wind', 'Wind', 'Flexibility and Adaptation', 'This is a time for gentle persistence and adaptive strategies.', '["Stay Flexible", "Adapt Your Approach", "Persist Gently"]', 'ADJUST', 'Don''t lose your core in adaptation.'),
(6, '坎', 'Water', 'Water', 'Depth and Flow', 'You are in a phase of deep reflection and emotional depth.', '["Go Deeper", "Trust the Flow", "Navigate Carefully"]', 'WAIT', 'Don''t get lost in the depths.'),
(7, '艮', 'Mountain', 'Mountain', 'Stillness and Boundaries', 'This is a time for stillness, grounding, and establishing clear boundaries.', '["Be Still", "Set Boundaries", "Find Your Ground"]', 'WAIT', 'Stillness is not stagnation.');
```

---

## 部署清单

### Supabase项目设置
1. ✅ 创建Supabase项目
2. ✅ 启用Email Auth
3. ✅ 运行上述SQL创建表结构
4. ✅ 插入初始化数据（8个卦象模板）
5. ✅ 配置RLS策略
6. ✅ 获取API Keys

### 环境变量
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

**文档版本**: 1.0  
**创建日期**: 2026-03-02  
**Phase 1核心表**: profiles, assessment_sessions, hexagram_readings, hexagram_templates, question_bank
