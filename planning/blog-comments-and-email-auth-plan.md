# Blog Comments + Email Auth Implementation Plan

> **Status Update (2026-03-13):**
> - Phase 1 (Email Auth): DONE — merged to main, live on production
> - Phase 2 (Comments): SQL redesigned — old `auth.users` references replaced
>   with `cp_users` in `supabase/blog-comments-cp.sql`
> - The SQL in this document (Part 2) is outdated. Use `supabase/blog-comments-cp.sql` instead.

**Created:** 2026-03-12
**Status:** Planning
**Priority:** High

---

## 目标

1. **博客评论系统** — 用户可以在博客文章下留言、回复、点赞
2. **邮箱注册登录** — 支持 Email/Password 注册，保留现有 Google/GitHub OAuth

---

## Part 1: Email/Password Authentication

### 现状分析

**当前认证方式：**
- ✅ Google OAuth (已配置)
- ✅ GitHub OAuth (已配置)
- ❌ Email/Password (未启用)

**技术栈：**
- Better Auth v1.5.4
- PostgreSQL (Supabase)
- 现有表：`auth.users` (Supabase 管理) + `public.profiles` (扩展信息)

### 实现方案

#### 1.1 启用 Better Auth Email/Password

**修改 `lib/auth.ts`：**

```typescript
import { betterAuth } from 'better-auth';

export const auth = betterAuth({
  appName: 'ClarityPath',
  baseURL: process.env.NEXTAUTH_URL || 'https://www.dreamcatcherai.us',
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-build',

  // 数据库连接
  database: {
    provider: 'postgres',
    url: process.env.DATABASE_URL,
  },

  // 启用 Email/Password
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    requireEmailVerification: true, // 可选：是否强制邮箱验证
  },

  // 邮件发送配置（用于验证邮箱）
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      // TODO: 集成邮件服务 (Resend/SendGrid/Postmark)
      console.log(`Send verification email to ${user.email}: ${url}`);
    },
  },

  trustedOrigins: [
    'https://www.dreamcatcherai.us',
    'https://dreamcatcherai.us',
    'https://dreamcatcher-ai-nine.vercel.app',
  ],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    },
  },
});
```

#### 1.2 更新客户端 `lib/auth-client.ts`

```typescript
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient();

export const {
  signIn,
  signOut,
  signUp,  // 新增：注册方法
  useSession,
} = authClient;
```

#### 1.3 创建注册页面 `app/auth/signup/page.tsx`

**功能：**
- Email + Password + Name 表单
- 密码强度提示
- 注册成功后跳转到邮箱验证提示页
- 底部链接到登录页

**设计风格：** 沿用现有 signin 页面的渐变背景 + 圆角卡片

#### 1.4 改造登录页面 `app/auth/signin/page.tsx`

**新增：**
- Email/Password 登录表单
- "Forgot Password?" 链接
- "Don't have an account? Sign up" 链接

**保留：**
- Google OAuth 按钮
- GitHub OAuth 按钮

**布局：**
```
[Email/Password Form]
    ↓
[--- or ---]
    ↓
[Google Button]
[GitHub Button]
```

#### 1.5 密码重置流程

**新建页面：**
- `app/auth/forgot-password/page.tsx` — 输入邮箱
- `app/auth/reset-password/page.tsx` — 输入新密码（带 token）

#### 1.6 邮件服务集成

**推荐方案：Resend**
- 免费额度：3000 emails/month
- 简单易用，Next.js 官方推荐
- 需要验证域名（dreamcatcherai.us）

**环境变量：**
```env
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=noreply@dreamcatcherai.us
```

---

## Part 2: Blog Comment System

### 数据库设计

#### 2.1 新建表：`blog_comments`

```sql
CREATE TABLE blog_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- 关联
  post_slug TEXT NOT NULL,  -- 关联到 markdown 文件的 slug
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  parent_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,  -- 回复功能

  -- 内容
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,  -- 冗余存储，防止用户删除后评论消失
  author_email TEXT,          -- 可选：用于 Gravatar 头像

  -- 状态
  status TEXT DEFAULT 'published',  -- 'published' | 'pending' | 'spam' | 'deleted'
  is_pinned BOOLEAN DEFAULT false,  -- 置顶评论

  -- 互动
  likes_count INTEGER DEFAULT 0,

  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 约束
  CONSTRAINT valid_status CHECK (status IN ('published', 'pending', 'spam', 'deleted')),
  CONSTRAINT content_not_empty CHECK (LENGTH(TRIM(content)) > 0)
);

-- 索引
CREATE INDEX idx_comments_post_slug ON blog_comments(post_slug, created_at DESC);
CREATE INDEX idx_comments_user_id ON blog_comments(user_id);
CREATE INDEX idx_comments_parent_id ON blog_comments(parent_id);
CREATE INDEX idx_comments_status ON blog_comments(status);

-- RLS (Row Level Security)
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- 所有人可以查看已发布的评论
CREATE POLICY "Published comments are viewable by everyone"
  ON blog_comments FOR SELECT
  USING (status = 'published');

-- 登录用户可以创建评论
CREATE POLICY "Authenticated users can create comments"
  ON blog_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 用户可以编辑/删除自己的评论
CREATE POLICY "Users can update own comments"
  ON blog_comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON blog_comments FOR DELETE
  USING (auth.uid() = user_id);
```

#### 2.2 新建表：`comment_likes`

```sql
CREATE TABLE comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES blog_comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- 一个用户只能给一条评论点一次赞
  UNIQUE(comment_id, user_id)
);

CREATE INDEX idx_comment_likes_comment_id ON comment_likes(comment_id);
CREATE INDEX idx_comment_likes_user_id ON comment_likes(user_id);

ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view likes"
  ON comment_likes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can like"
  ON comment_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike"
  ON comment_likes FOR DELETE
  USING (auth.uid() = user_id);
```

### 前端实现

#### 2.3 评论组件结构

```
app/blog/[slug]/page.tsx
  └─ <BlogComments slug={slug} />
       ├─ <CommentForm />           // 发表评论表单
       ├─ <CommentList />           // 评论列表
       │    └─ <CommentItem />      // 单条评论
       │         ├─ <CommentActions />  // 点赞、回复、删除
       │         └─ <CommentReplies />  // 嵌套回复
       └─ <CommentPagination />     // 分页
```

#### 2.4 API Routes

**新建：**
- `app/api/comments/route.ts` — GET (列表) / POST (创建)
- `app/api/comments/[id]/route.ts` — PATCH (编辑) / DELETE (删除)
- `app/api/comments/[id]/like/route.ts` — POST (点赞) / DELETE (取消点赞)

**权限控制：**
- GET — 公开
- POST — 需要登录
- PATCH/DELETE — 仅评论作者或管理员

#### 2.5 UI 设计

**评论卡片样式：**
- 头像（Gravatar 或默认图标）
- 用户名 + 发布时间
- 评论内容（支持换行，不支持 Markdown）
- 底部操作栏：👍 点赞数 | 💬 回复 | 🗑️ 删除（仅作者可见）

**回复样式：**
- 缩进显示（最多 2 层）
- 超过 2 层的回复平铺显示，但标注 `@用户名`

**空状态：**
- 无评论时显示："Be the first to share your thoughts"
- 未登录时显示："Sign in to join the conversation"

---

## Part 3: 实施步骤

### Phase 1: Email Auth (优先级高)

1. ✅ 修改 `lib/auth.ts` 启用 emailAndPassword
2. ✅ 更新 `lib/auth-client.ts` 导出 signUp
3. ✅ 创建注册页面 `app/auth/signup/page.tsx`
4. ✅ 改造登录页面 `app/auth/signin/page.tsx`
5. ✅ 创建密码重置页面
6. ✅ 集成 Resend 邮件服务
7. ✅ 测试完整注册登录流程

### Phase 2: Comment System (优先级中)

1. ✅ 在 Supabase 创建 `blog_comments` 和 `comment_likes` 表
2. ✅ 创建 API Routes (`/api/comments/*`)
3. ✅ 创建评论组件 (`<BlogComments />`)
4. ✅ 集成到博客详情页 (`app/blog/[slug]/page.tsx`)
5. ✅ 测试评论、回复、点赞功能
6. ✅ 添加分页和排序

### Phase 3: 优化 (可选)

- [ ] 评论审核功能（管理员后台）
- [ ] 评论通知（邮件提醒）
- [ ] 评论搜索
- [ ] Markdown 支持
- [ ] 评论举报功能
- [ ] 评论编辑历史

---

## 技术决策

### 为什么不用第三方评论系统？

**考虑过的方案：**
- Disqus — 广告多，隐私问题
- Giscus — 依赖 GitHub，用户门槛高
- Utterances — 同上

**自建优势：**
- 完全控制数据
- 无广告
- 与现有认证系统集成
- 可定制 UI
- 未来可扩展（如评论分析、AI 审核等）

### 邮件服务选择

| 服务 | 免费额度 | 优点 | 缺点 |
|------|---------|------|------|
| **Resend** | 3000/月 | Next.js 官方推荐，简单 | 需要验证域名 |
| SendGrid | 100/天 | 老牌稳定 | 配置复杂 |
| Postmark | 100/月 | 送达率高 | 免费额度少 |

**推荐：Resend**

---

## 环境变量清单

**新增：**
```env
# Resend (邮件服务)
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=noreply@dreamcatcherai.us

# Better Auth Database (已有，确认配置正确)
DATABASE_URL=postgresql://postgres:xxx@db.lmquoigvthpysvexmfuy.supabase.co:5432/postgres
```

---

## 风险与注意事项

1. **垃圾评论防护**
   - 短期：登录后才能评论
   - 长期：添加 rate limiting + 内容审核

2. **邮件送达率**
   - 必须验证域名 SPF/DKIM 记录
   - 避免被标记为垃圾邮件

3. **数据库性能**
   - 评论表需要合理索引
   - 考虑分页加载（每页 20 条）

4. **用户隐私**
   - 评论中的邮箱不公开显示
   - 遵守 GDPR（用户可删除自己的评论）

---

## 预估工作量

| 任务 | 预估时间 |
|------|---------|
| Email Auth 实现 | 4-6 小时 |
| 邮件服务集成 | 2-3 小时 |
| 评论数据库设计 | 1 小时 |
| 评论 API 开发 | 3-4 小时 |
| 评论前端组件 | 4-6 小时 |
| 测试与调试 | 2-3 小时 |
| **总计** | **16-23 小时** |

---

**下一步：** 用户确认方案后，开始 Phase 1 实施。
