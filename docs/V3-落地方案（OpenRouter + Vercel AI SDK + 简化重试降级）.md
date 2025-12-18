# V3 落地方案（OpenRouter + Vercel AI SDK + 简化重试降级）

目标：在不引入额外计费体系、不做过度设计（Geo-aware、内存限流）的前提下，把“便宜 + 稳定”的文本生成链路先跑通上线。

## 1. 设计原则

- **统一技术栈**：只使用 Vercel AI SDK（`ai`、`@ai-sdk/openai`）对接 OpenRouter 的 OpenAI-compat API。
- **稳定性优先**：主模型失败时自动降级到备用模型；对可恢复错误做一次快速重试。
- **MVP 收敛**：不做 Geo-aware；不做 Serverless 内存 Map 限流（无效且误导）。
- **图生图暂不承诺**：OpenRouter 在图生图/编辑上支持不稳定且成本不明，V3 先不作为核心交付。

## 2. 文本模型策略（MVP）

- **主模型（便宜/快）**：`google/gemini-2.0-flash-lite`
- **备用模型（便宜付费兜底）**：`openai/gpt-4o-mini`

说明：模型 ID 以 OpenRouter 控制台为准；这里只给出推荐默认值。

## 3. 环境变量

在部署环境（Vercel Project Env）或本地 `.env.local` 配置：

```bash
# OpenRouter（使用 OpenAI-compat）
OPENAI_API_KEY=sk-or-v1-xxx
OPENAI_BASE_URL=https://openrouter.ai/api/v1

# OpenRouter 可选归因信息（建议配置）
OPENROUTER_SITE_URL=https://your-domain.com
OPENROUTER_APP_NAME=ai-blessing-cards

# 可选：覆盖默认主/备模型（默认已内置）
AI_TEXT_MODEL_PRIMARY=google/gemini-2.0-flash-lite
AI_TEXT_MODEL_FALLBACK=openai/gpt-4o-mini
```

## 4. 代码落地点

### 4.1 OpenRouter provider + 固定模型

文件：`lib/ai/openrouter.ts`

- 创建 `openrouter` provider（`createOpenAI` + `baseURL` 指向 OpenRouter）
- 统一导出 `primaryTextModel` / `fallbackTextModel`（模型选择集中管理）

### 4.2 生成接口的简化重试与降级

文件：`app/api/generate-card/route.ts`

- 逻辑：
  1) 用主模型生成正文；遇到可恢复错误时做 **1 次重试**
  2) 仍失败则切到备用模型，同样可重试 1 次
  3) 标题生成使用“正文最终使用的模型”，避免一次请求里混用模型导致风格不一致
- 仅对以下错误重试/降级：
  - `429`、`5xx`、`timeout`、网络抖动类错误
  - 对 `400/401/403` 等不可恢复错误不重试（直接失败并提示配置问题）

## 5. 观测与回传

V3 最小观测：

- API 返回体包含 `model` 字段，便于在前端/日志中定位命中的是主模型还是备用模型。

（可选后续）增加结构化日志：重试次数、最终模型、错误类别，用于后续成本与稳定性优化。

## 6. 不做的事情（明确范围）

- Geo-aware（按 IP 分区选模型）
- Serverless 内存限流（Map/全局变量）
- 图生图（img2img/edit）作为核心交付

## 7. 如何在网站中验证（手动验收）

### 7.1 验证入口在哪里？

本次落地的能力对应“生成祝福卡片内容”的链路，前端入口在创建卡片流程页：

- 页面路径：`/create`
- 页面文件：`app/create/page.tsx`
- 后端接口：`POST /api/generate-card`（文件：`app/api/generate-card/route.ts`）

### 7.2 验证主链路：能正常生成卡片

1. 打开网站的“创建卡片”页面：访问 `/create`
2. 按页面步骤选择场合、填写收件人、关系、语调等信息
3. 在 “Review & Generate” 步骤点击 “Generate Card”
4. 预期结果：
   - 页面展示生成的 `title` 与 `message`（卡片预览区会出现内容）
   - 如果打开浏览器 DevTools → Network，查看 `/api/generate-card` 的响应 JSON，应包含：
     - `title`（字符串）
     - `message`（字符串）
     - `design`（字符串）
     - `model`（字符串，表示最终实际使用的模型 ID）

### 7.3 验证重试与降级：主模型失败自动用备用模型

建议用“只让主模型失败、备用模型正常”的方式来验证降级逻辑（这样更容易观察 `model` 字段变化）：

1. 在运行环境里配置：
   - `AI_TEXT_MODEL_PRIMARY` 设置为一个“明显不存在/无权限”的模型 ID（用于制造失败）
   - `AI_TEXT_MODEL_FALLBACK` 设置为一个你确定可用的模型 ID（例如 `openai/gpt-4o-mini`）
2. 重新运行并重复 7.2 的生成步骤
3. 预期结果：
   - 页面仍能生成卡片内容（说明降级成功）
   - `/api/generate-card` 响应里的 `model` 应等于 `AI_TEXT_MODEL_FALLBACK`

注意：
- 如果 `OPENAI_API_KEY` 不正确或 `OPENAI_BASE_URL` 没指向 OpenRouter，则主/备都会失败，页面会弹出失败提示，此时无法验证“降级成功”，需要先把 OpenRouter 配置修好。

