# Dreamcatcher AI — Planning Directory

## 当前技术决策（2026-03-12）

- **项目主应用**：`claritypath-app`
- **认证方案**：正式统一为 **Better Auth**
- **数据库承载**：Supabase PostgreSQL
- **表命名策略**：保留 **`cp_` 前缀**
- **原因**：计划未来在同一个 Supabase 项目中承载多个网站，需要通过前缀或 schema 做数据隔离

### 认证与多站点原则

- ClarityPath 的认证表使用 `cp_` 前缀，如 `cp_users`、`cp_sessions`
- 后续新网站应使用独立前缀，不与 ClarityPath 共用认证表
- 除非明确要做跨站单点登录，否则**不要**让多个网站共用同一套 auth tables
- 新的认证 migration 必须与 `lib/auth.ts` 保持一致

### 当前注意事项

- 仓库内仍保留旧的 Supabase Auth / NextAuth 方案痕迹，仅供历史参考
- 后续应以根目录 `supabase/better-auth-tables-cp.sql` 为当前 auth SQL 主入口
- 根目录 `supabase/legacy/` 已归档过时 SQL，避免和当前方案混淆
- `planning/supabase/` 仅保留参考性质文件，不再承载活跃 auth/comment SQL
- 本地开发已确认需要把 `localhost` 加入 trusted origins

## 文件索引

### 品牌与理论（版本演进）

| 文件 | 说明 | 版本 |
|------|------|------|
| `Dreamcatcher-Brand-Guide-V0.1.md` | 初版产品设定与理念 | V0.1 (2026-03-02) |
| `Dreamcatcher-Brand-Guide-V0.2.md` | 产品定位与Slogan升级方案 | V0.2 (2026-03-11) |
| `Dreamcatcher-Brand-Guide-V1.0.md` | **当前版本** — 完整品牌内容指南 | V1.0 (2026-03-11) |
| `ClarityPath-能量理论体系-V2.1.md` | 内部能量理论体系（中文，团队用） | V2.1 (2026-03-11) |

### 产品需求

| 文件 | 说明 |
|------|------|
| `PRD.md` | 产品需求文档 |
| `DATABASE_SCHEMA.md` | 数据库设计 |
| `supabase/` | 规划期 SQL 参考文件（非运行期入口） |

### 测评系统

| 文件 | 说明 |
|------|------|
| `assessment-questions.md` | 能量测评题库（含扩展轮换题目） |
| `result-templates.md` | 测评结果模板 |

### 卦象与梅花

| 文件 | 说明 |
|------|------|
| `hexagrams_64_simplified.md` | 64卦数据（中文） |
| `hexagrams_64_simplified_en.md` | 64卦数据（英文） |
| `meihua-templates.md` | 梅花易数框架 |
| `meihua-64-templates-part1.md` | 64卦解读模板（上） |
| `meihua-64-templates-part2.md` | 64卦解读模板（下） |

### 内容运营

| 文件 | 说明 |
|------|------|
| `blog-content-plan.md` | 博客内容计划 |

---

**Last Updated:** 2026-03-12
**Project:** Dreamcatcher AI (www.dreamcatcherai.us)
