# SEO & GEO Technical Playbook V1.0

> 适用于 Next.js App Router 项目的 SEO/GEO（Generative Engine Optimization）技术基础设置指南。
> 基于 ClarityPath 项目实战经验总结，可直接复用到新项目。

---

## 目录

1. [架构概览](#1-架构概览)
2. [文件清单与依赖关系](#2-文件清单与依赖关系)
3. [Step 1: SEO 常量集中管理](#3-step-1-seo-常量集中管理)
4. [Step 2: robots.txt](#4-step-2-robotstxt)
5. [Step 3: sitemap.xml](#5-step-3-sitemapxml)
6. [Step 4: PWA Manifest](#6-step-4-pwa-manifest)
7. [Step 5: Root Layout 元数据增强](#7-step-5-root-layout-元数据增强)
8. [Step 6: 子页面 Metadata 策略](#8-step-6-子页面-metadata-策略)
9. [Step 7: JSON-LD 结构化数据](#9-step-7-json-ld-结构化数据)
10. [Step 8: 博客/内容页 SEO](#10-step-8-博客内容页-seo)
11. [GEO 专项优化](#11-geo-专项优化)
12. [验证清单](#12-验证清单)
13. [Phase 2 内容层（后续扩展）](#13-phase-2-内容层后续扩展)

---

## 1. 架构概览

SEO 技术基础分两层：

| 层级 | 内容 | 目标受众 |
|------|------|----------|
| **技术地基** | sitemap、robots、metadata、JSON-LD、canonical | 搜索引擎爬虫 + AI 引擎 |
| **内容入口** | 独立 SEO 页面、博客、术语表、OG 图片 | 用户 + 搜索引擎 + AI 引擎 |

本 Playbook 覆盖**技术地基**层，内容层见 Phase 2。

### 核心原则

- **集中管理**：URL、站名、描述等常量放一个文件，全局 import
- **模板化 Title**：`%s | 品牌名`，子页面只需设 title 即自动拼接后缀
- **Canonical 全覆盖**：每个公开页面都有 canonical URL，防重复收录
- **结构化数据分层**：全局放 Organization + WebSite，页面级放 Article/FAQPage/Product 等

---

## 2. 文件清单与依赖关系

```
lib/seo.ts                    ← 所有文件都 import 它（先建）
app/robots.ts                 ← 独立
app/sitemap.ts                ← 依赖 seo.ts + 内容源（如 blog）
app/manifest.ts               ← 独立
app/layout.tsx                ← 核心，依赖 seo.ts
app/[page]/layout.tsx         ← 为 client 页面提供 metadata
app/blog/page.tsx             ← metadata export
app/blog/[slug]/page.tsx      ← generateMetadata + JSON-LD
```

**执行顺序：** `lib/seo.ts` → `robots + sitemap + manifest`（并行）→ `layout.tsx` → 子页面

---

## 3. Step 1: SEO 常量集中管理

```typescript
// lib/seo.ts
export const SITE_URL = 'https://your-domain.com'
export const SITE_NAME = 'YourApp by YourBrand'
export const SITE_DESCRIPTION = '一句话品牌描述，50-160 字符最佳'
export const SITE_LOCALE = 'en_US'  // 或 'zh_CN'
```

**要点：**
- URL 不带尾部斜杠
- SITE_NAME 用于 JSON-LD 和 OG siteName
- SITE_DESCRIPTION 复用于首页 meta description 和 OG description

---

## 4. Step 2: robots.txt

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',   // 用户私有页面
          '/settings',
          '/api/',         // API 路由
          '/auth/',        // 认证页面
          // 添加其他不希望被索引的路径
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
```

**Disallow 常见模式：**
- `/dashboard`、`/settings`、`/billing` — 登录后页面
- `/api/` — API 端点
- `/auth/` — 登录注册页
- `/checkout/` — 支付流程
- 带动态结果的页面（如 `/assessment/results`）— 内容因用户而异，无 SEO 价值

---

## 5. Step 3: sitemap.xml

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ]

  // 动态路由示例：博客文章
  // const posts = getAllPosts()
  // const blogRoutes = posts.map((post) => ({
  //   url: `${SITE_URL}/blog/${post.slug}`,
  //   lastModified: new Date(post.publishDate),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))

  return [...staticRoutes]
}
```

**Priority 参考值：**
| 页面类型 | Priority | changeFrequency |
|----------|----------|-----------------|
| 首页 | 1.0 | weekly |
| 核心功能页 | 0.8-0.9 | monthly |
| 博客列表 | 0.7 | weekly |
| 博客文章 | 0.6 | monthly |
| 定价页 | 0.5 | monthly |
| 法律页面 | 0.2 | yearly |
| 每日更新页 | 0.8 | daily |

---

## 6. Step 4: PWA Manifest

```typescript
// app/manifest.ts
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'YourApp by YourBrand',
    short_name: 'YourApp',
    description: '简短描述',
    start_url: '/',
    display: 'standalone',
    theme_color: '#059669',       // 品牌主色
    background_color: '#ffffff',  // 背景色
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      // 建议补充:
      // { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      // { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
```

---

## 7. Step 5: Root Layout 元数据增强

```typescript
// app/layout.tsx
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_LOCALE } from '@/lib/seo'

export const metadata: Metadata = {
  // 让所有相对路径自动基于站点 URL 解析
  metadataBase: new URL(SITE_URL),

  // 子页面只设 title，自动拼接 " | 品牌名"
  title: {
    default: '品牌口号或首页标题',
    template: '%s | YourApp',
  },

  description: SITE_DESCRIPTION,
  authors: [{ name: 'YourBrand' }],
  creator: 'YourBrand',
  publisher: 'YourBrand',

  openGraph: {
    type: 'website',
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: '品牌口号',
    description: SITE_DESCRIPTION,
    // images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },

  twitter: {
    card: 'summary',  // 有大图时用 'summary_large_image'
    title: '品牌口号',
    description: SITE_DESCRIPTION,
    // images: ['/og-default.png'],
  },

  alternates: {
    canonical: SITE_URL,
  },
}
```

**注意事项：**
- `metadataBase` 是关键——设了它，子页面的 OG url、canonical 等相对路径都能自动解析
- `title.template` 让子页面只需写 `title: 'Pricing'` 就会渲染为 `Pricing | YourApp`
- OG 图片（`og-default.png`）建议 1200x630px，放 `public/` 目录

---

## 8. Step 6: 子页面 Metadata 策略

### 场景 A：Server Component 页面

直接在 `page.tsx` 中 export metadata：

```typescript
// app/pricing/page.tsx
export const metadata: Metadata = {
  title: 'Plans & Pricing',  // 自动变成 "Plans & Pricing | YourApp"
  description: '...',
  alternates: { canonical: `${SITE_URL}/pricing` },
}
```

### 场景 B：Client Component 页面（有 `'use client'`）

Client 组件不能 export metadata，需要在同目录新建 `layout.tsx`：

```typescript
// app/some-client-page/layout.tsx
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Page Title',
  description: '...',
  alternates: { canonical: `${SITE_URL}/some-client-page` },
  openGraph: {
    title: 'Page Title',
    description: '...',
    url: `${SITE_URL}/some-client-page`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

### 场景 C：动态路由页面

使用 `generateMetadata` 函数：

```typescript
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getDataBySlug(slug)
  if (!data) return { title: 'Not Found' }
  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `${SITE_URL}/path/${data.slug}` },
    openGraph: { type: 'article', title: data.title, ... },
  }
}
```

---

## 9. Step 7: JSON-LD 结构化数据

### 全局级（放 layout.tsx）

```typescript
// Organization — 告诉搜索引擎你是谁
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'YourBrand',
  url: SITE_URL,
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@your-domain.com',
    contactType: 'customer service',
  },
  // logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
}

// WebSite — 告诉搜索引擎这个站点是什么
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  // 有站内搜索时可加 SearchAction:
  // potentialAction: {
  //   '@type': 'SearchAction',
  //   target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search?q={search_term}` },
  //   'query-input': 'required name=search_term',
  // },
}
```

### 页面级常用 Schema

| Schema 类型 | 适用场景 | 关键字段 |
|-------------|----------|----------|
| **Article** | 博客/文章 | headline, author, datePublished, articleSection, keywords |
| **FAQPage** | 定价页/帮助中心 | mainEntity: Question[] with acceptedAnswer |
| **Product** | 产品页 | name, description, offers (price, currency) |
| **BreadcrumbList** | 多层级导航 | itemListElement: ListItem[] |
| **HowTo** | 教程/步骤页 | step: HowToStep[] |
| **SoftwareApplication** | SaaS 产品 | name, operatingSystem, applicationCategory, offers |

### 注入方式

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdObject) }}
/>
```

放在 `<head>` 内（layout 级）或页面 JSX 顶层均可。

---

## 10. Step 8: 博客/内容页 SEO

博客是 SEO 长尾流量的核心入口，需要额外关注：

### URL 结构
- 使用语义化 slug：`/blog/why-timing-matters`（好）vs `/blog/post-123`（差）
- 保持扁平：`/blog/[slug]` 优于 `/blog/[category]/[slug]`

### Metadata 模板
```typescript
// generateMetadata 返回值
{
  title: post.title,                    // 自动拼接品牌后缀
  description: post.description,        // 50-160 字符
  alternates: { canonical: `${SITE_URL}/blog/${slug}` },
  openGraph: {
    type: 'article',
    publishedTime: post.publishDate,    // ISO 格式
    authors: [post.author],
    section: post.category,
    tags: post.tags,
  },
  twitter: { card: 'summary' },
}
```

### Article JSON-LD
```typescript
{
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.description,
  author: { '@type': 'Person', name: post.author },
  publisher: { '@type': 'Organization', name: SITE_NAME },
  datePublished: post.publishDate,
  articleSection: post.category,
  keywords: post.tags,
  url: `${SITE_URL}/blog/${post.slug}`,
  // image: post.coverImage,  // 有封面图时加上
}
```

---

## 11. GEO 专项优化

GEO（Generative Engine Optimization）是针对 AI 搜索引擎（ChatGPT、Perplexity、Google AI Overview）的优化。与传统 SEO 的区别：

### GEO vs SEO 对比

| 维度 | SEO | GEO |
|------|-----|-----|
| 目标 | 搜索排名靠前 | 被 AI 引用/推荐 |
| 内容格式 | 关键词密度 | 清晰的问答结构、事实陈述 |
| 结构化数据 | 帮助展示富片段 | 帮助 AI 理解实体关系 |
| 权威性 | 外链 | 引用来源、数据支撑 |

### GEO 技术要点

1. **Schema Markup 要丰富**
   - AI 引擎依赖结构化数据理解页面内容
   - Organization + WebSite 是基础，Article/FAQPage/HowTo 提供内容层结构

2. **FAQ 结构天然适合 AI**
   - FAQPage Schema 的问答格式最容易被 AI 引擎直接引用
   - 定价页、帮助中心都适合加 FAQPage

3. **清晰的 HTML 语义**
   - 用 `<h1>`-`<h3>` 建立内容层次
   - 用 `<article>`、`<section>` 包裹内容块
   - 避免纯 `<div>` 堆砌

4. **Canonical 和 Sitemap 帮助 AI 爬虫发现内容**
   - AI 引擎（如 Perplexity）也会爬取 sitemap
   - 确保所有希望被引用的页面都在 sitemap 中

5. **robots.txt 对 AI 爬虫的控制**
   ```
   # 如果想屏蔽特定 AI 爬虫（按需）：
   User-Agent: GPTBot
   Disallow: /private/

   User-Agent: Claude-Web
   Disallow: /private/

   # 默认建议：允许 AI 爬虫访问公开内容
   ```

---

## 12. 验证清单

部署后逐项验证：

### 基础检查
- [ ] `curl https://your-domain.com/robots.txt` — 返回正确规则
- [ ] `curl https://your-domain.com/sitemap.xml` — 返回 XML，包含所有公开 URL
- [ ] `curl -s https://your-domain.com | grep 'og:'` — 首页有 OG 标签
- [ ] `curl -s https://your-domain.com | grep 'application/ld+json'` — 有 JSON-LD

### 子页面检查
- [ ] 各子页面 `<title>` 带 `| 品牌名` 后缀
- [ ] 各子页面有 `<link rel="canonical" ...>`
- [ ] 博客文章页有 Article JSON-LD
- [ ] 定价页有 FAQPage JSON-LD（如适用）

### 工具验证
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) — 结构化数据无报错
- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — OG 标签正确
- [ ] [Twitter Card Validator](https://cards-dev.twitter.com/validator) — Twitter 卡片正确
- [ ] Google Search Console 提交 sitemap

### GEO 验证
- [ ] 在 Perplexity/ChatGPT 搜索品牌名，观察是否被引用
- [ ] 检查 AI 引擎是否正确理解产品描述（需要内容页上线后验证）

---

## 13. Phase 2 内容层（后续扩展）

技术地基完成后，以下内容层工作可逐步推进：

| 优先级 | 任务 | SEO 价值 | GEO 价值 |
|--------|------|----------|----------|
| P0 | 默认 OG 图片（1200x630） | 高 — 社交分享点击率 | 低 |
| P1 | 核心功能独立页面（如 Archetype 页） | 高 — 长尾关键词 | 高 — AI 引用素材 |
| P1 | 术语表/概念解释页 | 中 — 专业词搜索 | 高 — AI 最爱引用定义 |
| P2 | 博客 SEO 选题扩展 | 高 — 长尾流量主力 | 高 — 知识库素材 |
| P2 | 动态 OG 图片（博客） | 中 — 社交分享 | 低 |
| P3 | BreadcrumbList Schema | 低 — 富片段展示 | 中 — 结构理解 |
| P3 | SoftwareApplication Schema | 中 — 产品搜索 | 中 — 产品理解 |

---

## 快速启动模板

新项目 SEO 设置，按顺序执行：

```bash
# 1. 创建 SEO 常量
touch lib/seo.ts

# 2. 创建 Next.js SEO 路由
touch app/robots.ts app/sitemap.ts app/manifest.ts

# 3. 增强 root layout
# 编辑 app/layout.tsx

# 4. 为 client 页面创建 layout
# 为每个 'use client' 页面目录创建 layout.tsx

# 5. Build 验证
npm run build

# 6. 部署后验证
curl https://your-domain.com/robots.txt
curl https://your-domain.com/sitemap.xml
```

---

*基于 ClarityPath (dreamcatcherai.us) 实战经验，2026-03-17*
*适用于 Next.js 14+ App Router*
