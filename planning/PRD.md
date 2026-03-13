# ClarityPath - Product Requirements Document

## 项目概述

**项目名称：** ClarityPath  
**定位：** 帮助35+人群在不确定时代，用东方智慧+现代心理学，做出更好的选择，构建内心秩序  
**目标市场：** 欧美市场（英文界面）  
**技术栈：** Next.js + Tailwind CSS + Supabase PostgreSQL + Better Auth + Vercel

---

## 核心功能模块

### 模块一：能量测评（Energy Assessment）

**目的：** 引流，让用户了解自己的能量状态

**测评维度：** 12题，4维度，每题1-10分

| 维度 | 题目 | 说明 |
|-----|------|------|
| 心理状态 | A1-A3 | Mental Clarity |
| 身体状态 | B4-B6 | Physical Vitality |
| 生活满意度 | C7-C9 | Life Harmony |
| 成长动力 | D10-D12 | Growth Momentum |

**评分结果：**
- 8.5-10：高能状态（High Flow）
- 6.5-8.4：平衡状态（Steady State）
- 4.5-6.4：调整期（Recalibration）
- 1-4.4：充电期（Recharge Mode）

---

### 模块二：能量环境场（Energy Environment）

**通用版（免费）：**
- 今日整体能量倾向（开创/巩固/内省/过渡）
- 大环境适合的行动类型
- 今日能量关键词

**个人版（会员）：**
- 基于生日的个人能量特质
- 环境能量与个人特质匹配度
- 个性化行动建议

---

### 模块三：决策学（Decision Wisdom / 梅花易数）

**基础版（积分）：**
- 输入3位数字 + 问题
- 基础卦象 + 简单建议
- 成本：10积分/次

**详细版（付费）：**
- 完整卦象解读
- 时机分析 + 行动建议
- 成本：$9.9 或 50积分

**计算逻辑：**
```
上卦 = (A + 时 + 分) % 8
下卦 = (B + 时 + 分) % 8
动爻 = (A + B + C + 时 + 分) % 6
```

---

### 模块四：会员与积分系统

**积分获取：**
| 行为 | 积分 |
|-----|------|
| 每日登录 | +1（连续第N天+N，上限7） |
| 分享链接被打开 | +1/次 |
| 新用户注册 | +5 |
| 完成测评 | +3 |
| 完善资料 | +5 |
| 首次付费 | +20 |

**会员权益（$19/月 或 $99/年）：**
- 测评无限次
- 个人能量适配
- 决策学详细版无限次
- 能量趋势追踪

---

## 设计风格参考

**参考：** Pinterest（https://www.pinterest.com）

**设计关键词：**
- 美好、温暖、充满希望
- 简约但不简单
- 视觉丰富但界面干净
- 东方美学 + 现代感

**色彩建议：**
- 主色：温暖的大地色系（米白、浅棕、暖灰）
- 点缀：低饱和的东方色彩（墨绿、朱砂红、靛蓝）
- 背景：干净的白色/米色

**字体：**
- 标题：优雅的无衬线字体（如 Inter, Satoshi）
- 正文：易读的现代字体

---

## 页面结构

```
首页 (Home)
├── Hero Section：价值主张 + CTA
├── 功能介绍：测评 / 能量环境 / 决策学
├── 最新博客文章（3篇精选）
├── 用户证言（后期添加）
└── Footer

测评页 (Assessment)
├── 欢迎页：说明 + 开始按钮
├── 问卷页：12题，分步展示，进度条
└── 结果页：能量类型 + 雷达图 + 建议 + CTA

能量环境页 (Energy Environment)
├── 今日能量概览
├── 能量关键词
├── 行动建议
└── 会员：个人适配入口

决策学页 (Decision Wisdom)
├── 输入区：3位数字 + 问题
├── 计算动画
├── 结果展示
└── 升级提示（付费墙）

会员页 (Membership)
├── 权益对比
├── 积分余额
└── 订阅按钮

博客页 (Blog)
├── 文章列表页
│   ├── 分类标签（能量管理 / 决策智慧 / 个人成长 / 东方哲学）
│   ├── 文章卡片（封面图 + 标题 + 摘要 + 阅读时间）
│   └── 订阅Newsletter入口
├── 文章详情页
│   ├── 标题 + 封面图
│   ├── 作者信息
│   ├── 正文内容
│   ├── 相关文章推荐
│   └── CTA（开始测评 / 查看今日能量）
└── SEO优化（每篇文章独立meta信息）
```

---

## 内容表达规范

### 语言原则
- 全部英文
- 东方智慧内核，现代心理学表达
- 成功学包装，但不鸡汤
- 假设每个人都向好，帮助成为更好的自己

### 东方→现代转换示例
| 东方概念 | 现代表达 |
|---------|---------|
| 吉凶 | 能量倾向 / 时机匹配度 |
| 宜忌 | 能量支持的方向 |
| 卦象 | 当前能量状态解读 |
| 顺势而为 | 与内在节奏同步 |

### 免责声明
> "This guidance is based on wisdom traditions and psychological insights, intended for reflection and inspiration only. You are always the final decision-maker of your life."

---

## 技术实现

### 前端
- **框架：** Next.js 14 (App Router)
- **样式：** Tailwind CSS
- **组件：** shadcn/ui 或 Radix UI
- **动画：** Framer Motion
- **部署：** Vercel
- **SEO：** Next.js内置SSR/SSG支持，动态meta标签，结构化数据

### 后端
- **数据库：** Supabase (PostgreSQL)
- **认证：** Better Auth
- **存储：** Supabase Storage
- **支付：** Stripe

### 认证与数据隔离策略（2026-03-12 更新）

- **认证方案正式定版：** Better Auth
- **认证存储：** Supabase PostgreSQL
- **表命名策略：** ClarityPath 全部认证核心表使用 `cp_` 前缀
- **原因：** 未来计划在同一个 Supabase 项目中承载多个站点，需要在数据库层清晰隔离

#### ClarityPath 认证表命名约定

- `cp_users`
- `cp_sessions`
- `cp_accounts`
- `cp_verification_tokens`

#### 多站点规则

- ClarityPath 使用自己的 `cp_` 表命名空间
- 其他网站应使用独立前缀或独立 PostgreSQL schema
- 默认**不共享 auth tables**
- 只有在明确要做跨站统一账号体系时，才讨论共享用户系统

#### 实施原则

- 新 migration 必须与 `lib/auth.ts` 一致
- 仓库中的旧 Supabase Auth / NextAuth 风格脚本视为历史遗留，不再作为主实现依据
- 优先选择“保留 `cp_` 前缀 + 使用 Better Auth 兼容字段”的方案，降低多项目混表风险

### 算法
- **测评评分：** 随机抽取题目（4版本×4维度=16题库，每次抽12题）+ 加权算法
- **梅花易数：** 自建规则引擎 + 64卦解读模板
- **能量环境：** 预置数据或简单计算

---

## 开发优先级

### Phase 1（MVP）
- [ ] 首页设计 + 开发
- [ ] 能量测评（12题 + 结果页）
- [ ] 基础数据库 + 用户系统

### Phase 2
- [ ] 能量环境场（通用版）
- [ ] 决策学基础版
- [ ] 积分系统

### Phase 3
- [ ] 会员系统 + 支付
- [ ] 个人能量适配
- [ ] 决策学详细版

### Phase 4
- [ ] AI 解读生成
- [ ] 1v1 咨询预约
- [ ] 多语言支持

---

## 相关文档

- [测评题库详情](./assessment-questions.md)
- [结果文案模板](./result-templates.md)
- [UI设计参考](./design-reference.md)

---

## 附录：AI 协作上下文 (MUSK.md)

> 供 AI 助手快速理解项目，有实质变化时更新。

### 项目速览

| 字段 | 内容 |
|------|------|
| **项目名称** | ClarityPath |
| **域名** | https://www.dreamcatcherai.us/ |
| **核心功能** | 老黄历（日常能量）+ 梅花易数（决策辅助） |
| **文案价值观** | 积极友好、不伤人、去宗教化、西方化 |

### 技术栈（已更新）

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js (App Router) | 16.1.6 |
| 样式 | Tailwind CSS | v4 |
| 动画 | Framer Motion | 12.x |
| 数据库 | PostgreSQL + Supabase | — |
| ORM | Drizzle ORM | 0.45.x |
| 认证 | Better Auth | 1.5.x |
| 认证表策略 | `cp_` 前缀隔离 | — |

### 关键文件位置

| 用途 | 路径 |
|------|------|
| 文案配置中心 | `src/lib/content-config.ts` |
| 老黄历翻译 | `src/lib/almanac-translator.ts` |
| 梅花易数数据 | `src/lib/hexagram64.ts` |
| 数据库表 | `src/db/schema.ts` |

### 能量等级对照

| 等级 | 成功率 | 老黄历表达 | 梅花易数表达 |
|------|--------|-----------|-------------|
| 5 | 85-100% | Optimal Energy | Highly Favorable |
| 4 | 70-84% | Favorable Energy | Favorable |
| 3 | 55-69% | Balanced Energy | Achievable with Effort |
| 2 | 35-54% | Challenging Energy | Consider Timing |
| 1 | 0-34% | Low Energy | Consider Alternatives |

### 主人偏好（晋也小姐姐）

- **技术水平**：AI初学者，需要非技术语言解释
- **决策风格**：偏好主动性，鼓励"你自己帮自己"
- **沟通偏好**：直接给结论，再给理由；风格轻松
- **资源管理**：优先免费/低成本方案

### 与 AI 协作指南

1. **修改文案时**：优先改 `src/lib/content-config.ts`，保持积极友好
2. **添加功能时**：给出2-3个方案对比，标注难度（⭐/⭐⭐/⭐⭐⭐）
3. **技术决策时**：用产品语言解释，提前指出可能踩的坑

---

**创建日期：** 2026-03-02  
**最后更新：** 2026-03-12  
**负责人：** 晋也小姐姐 + Musk + 克总（技术实现）
