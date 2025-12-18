# AI服务集成方案 - 优化版（基于 OpenRouter）

## 1. 方案概述

本方案通过 OpenRouter 作为 AI 服务聚合平台，实现对多个 AI 模型提供商的统一访问，包括火山引擎（豆包）、OpenAI 等。完全复用现有的 Vercel AI SDK，保持技术栈一致性。

## 2. 核心优势

1. **零代码改动**：继续使用现有的 `ai` SDK 和 `generateText` 函数
2. **统一接口**：所有模型都通过 OpenAI 兼容的 API 调用
3. **简单配置**：只需更改模型名称，无需修改代码
4. **支持流式**：自动继承流式输出能力
5. **模型丰富**：支持包括火山引擎在内的 100+ 模型

## 3. 实施步骤

### 3.1 注册 OpenRouter

1. 访问 [OpenRouter](https://openrouter.ai)
2. 注册账号并获取 API Key
3. 设置支付方式（支持信用卡）

### 3.2 更新环境变量

在 `.env.local` 中添加或修改：

```env
# OpenRouter 配置
OPENAI_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_BASE_URL=https://openrouter.ai/api/v1

# 可选：配置默认模型
AI_MODEL=volcengine/doubao-pro-32k

# 可选：配置备用模型
AI_FALLBACK_MODEL=anthropic/claude-3-haiku
```

### 3.3 修改现有 API

#### 方案一：最小改动（推荐）

修改 `app/api/generate-card/route.ts`：

```typescript
import { generateText } from "ai";

export const runtime = "nodejs";

interface GenerateCardRequest {
  occasion: string;
  recipientName: string;
  relationship: string;
  tone: string;
  additionalContext?: string;
  model?: string; // 新增：允许指定模型
}

export async function POST(request: Request) {
  try {
    const body: GenerateCardRequest = await request.json();
    const {
      occasion,
      recipientName,
      relationship,
      tone,
      additionalContext,
      model = process.env.AI_MODEL || "openai/gpt-4o-mini" // 默认模型
    } = body

    // Validate required fields
    if (!occasion || !recipientName || !relationship || !tone) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Build the prompt for AI generation
    const prompt = `You are a professional greeting card writer. Create a heartfelt and personalized greeting card message.

Card Details:
- Occasion: ${occasion}
- Recipient: ${recipientName}
- Relationship: ${relationship}
- Tone: ${tone}
${additionalContext ? `- Additional Context: ${additionalContext}` : ""}

Instructions:
1. Create a warm, personalized greeting card message
2. Match the specified tone (${tone})
3. Make it appropriate for the relationship (${relationship})
4. Keep it authentic and meaningful, not generic
5. Structure: Opening, main message (2-3 paragraphs), closing
6. Length: 150-250 words
7. Use proper formatting with line breaks between paragraphs

Generate ONLY the card message text, starting with the greeting.`

    // Generate the card content using AI
    const { text } = await generateText({
      model: model, // 使用传入的模型或默认模型
      prompt,
      temperature: 0.8,
      maxTokens: 500,
    })

    // Generate a title based on the occasion
    const titlePrompt = `Create a short, warm greeting card title for a ${occasion} card for ${recipientName}.
Examples: "Happy Birthday!", "Congratulations!", "With Love and Thanks"
Generate ONLY the title, nothing else.`

    const { text: title } = await generateText({
      model: model,
      prompt: titlePrompt,
      temperature: 0.7,
      maxTokens: 20,
    })

    return Response.json({
      title: title.trim(),
      message: text.trim(),
      design: "gradient-purple",
      model, // 返回使用的模型
    })
  } catch (error) {
    console.error("[v0] Error generating card:", error)
    return Response.json({ error: "Failed to generate card content" }, { status: 500 })
  }
}
```

#### 方案二：创建模型选择器

创建 `lib/ai-providers.ts`：

```typescript
export type AIModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

export const AI_MODELS: AIModel[] = [
  // OpenAI 模型
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    description: '快速、经济，适合简单任务'
  },
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: '平衡性能与成本'
  },

  // 火山引擎模型
  {
    id: 'volcengine/doubao-lite-4k',
    name: '豆包 Lite 4K',
    provider: '火山引擎',
    description: '中文友好，响应快速'
  },
  {
    id: 'volcengine/doubao-pro-32k',
    name: '豆包 Pro 32K',
    provider: '火山引擎',
    description: '强大中文能力，长上下文'
  },
  {
    id: 'volcengine/doubao-pro-256k',
    name: '豆包 Pro 256K',
    provider: '火山引擎',
    description: '超长上下文，处理大文档'
  },

  // 其他优秀模型
  {
    id: 'anthropic/claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'Anthropic',
    description: '快速、安全的推理'
  },
  {
    id: 'google/gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    description: '多模态能力强大'
  }
];

// 默认模型配置
export const DEFAULT_MODEL = 'volcengine/doubao-pro-32k';
export const FALLBACK_MODEL = 'openai/gpt-4o-mini';
```

### 3.4 添加模型选择 UI

创建 `components/ai-model-selector.tsx`：

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AI_MODELS, type AIModel } from '@/lib/ai-providers';

interface AIModelSelectorProps {
  value?: string;
  onChange?: (modelId: string) => void;
}

export function AIModelSelector({ value, onChange }: AIModelSelectorProps) {
  const [selectedModel, setSelectedModel] = useState(value || 'volcengine/doubao-pro-32k');

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    onChange?.(modelId);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="model-select">选择AI模型</Label>
      <Select value={selectedModel} onValueChange={handleModelChange}>
        <SelectTrigger id="model-select">
          <SelectValue placeholder="选择AI模型" />
        </SelectTrigger>
        <SelectContent>
          {AI_MODELS.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              <div className="flex flex-col items-start">
                <span className="font-medium">{model.name}</span>
                <span className="text-sm text-muted-foreground">
                  {model.provider} - {model.description}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
```

### 3.5 集成到创建卡片流程

在 `app/create/page.tsx` 中添加模型选择：

```typescript
// 在表单中添加模型选择
import { AIModelSelector } from '@/components/ai-model-selector';

// 在表单状态中添加
const [selectedModel, setSelectedModel] = useState('volcengine/doubao-pro-32k');

// 在生成卡片时传递模型
const generateCard = async () => {
  const response = await fetch('/api/generate-card', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      occasion,
      recipientName,
      relationship,
      tone,
      additionalContext,
      model: selectedModel, // 传递选中的模型
    }),
  });
  // ...
};
```

## 4. 支持的火山引擎模型

OpenRouter 支持的火山引擎模型包括：

### 4.1 文本生成模型
- `volcengine/doubao-lite-4k` - 轻量版，4K上下文
- `volcengine/doubao-pro-32k` - 专业版，32K上下文
- `volcengine/doubao-pro-256k` - 专业版，256K上下文
- `volcengine/doubao-character-8k` - 角色扮演模型
- `volcengine/doubao-function-calling-32k` - Function Calling模型

### 4.2 图像生成模型
OpenRouter 也支持一些图像生成模型，但对于图像生成，我们可能需要：

1. **使用 OpenRouter 支持的图像模型**：
   - `stabilityai/stable-diffusion-xl`
   - `black-forest-labs/flux-schnell`
   - `runwayml/gen-3-alpha-turbo`

2. **或继续使用 OpenAI 的 DALL-E**：
   - `openai/dall-e-3`

## 5. 图像生成方案

### 5.1 使用 OpenRouter 的图像模型

```typescript
// 在 app/api/generate-image/route.ts 中
import { generateImage } from 'ai';

export async function POST(request: Request) {
  const { prompt, model = 'stabilityai/stable-diffusion-xl' } = await request.json();

  const { image } = await generateImage({
    model: model,
    prompt: prompt,
    n: 1,
    size: '1024x1024',
  });

  return Response.json({ imageUrl: image });
}
```

### 5.2 或继续使用 OpenAI DALL-E

```typescript
const { image } = await generateImage({
  model: 'openai/dall-e-3',
  prompt: prompt,
  n: 1,
  size: '1024x1024',
});
```

## 6. 成本优化策略

### 6.1 模型选择策略
1. **默认使用火山引擎模型**：成本更低，中文更好
2. **复杂任务使用 Claude 或 GPT-4**：理解能力更强
3. **根据任务类型自动选择**：可通过配置实现

### 6.2 缓存策略
```typescript
// 在 lib/ai-cache.ts 中实现
const cache = new Map<string, string>();

export function getCachedResponse(prompt: string, model: string): string | null {
  return cache.get(`${model}:${prompt}`) || null;
}

export function setCachedResponse(prompt: string, model: string, response: string): void {
  cache.set(`${model}:${prompt}`, response);
}
```

## 7. 监控和分析

### 7.1 使用情况统计
```typescript
// 在 API 调用时添加
const usage = {
  model,
  tokens: usage?.totalTokens || 0,
  cost: calculateCost(model, usage?.totalTokens || 0),
  timestamp: new Date(),
};

// 发送到分析服务
await logUsage(usage);
```

## 8. 总结

这个优化方案的优势：

1. **零破坏性改动**：完全复用现有架构和 `ai` SDK
2. **配置简单**：只需要设置 API Key 和 Base URL
3. **模型丰富**：轻松切换 100+ 模型
4. **成本可控**：可以选择更经济模型
5. **保持高级功能**：流式输出、UI 集成等

通过 OpenRouter，我们获得了一个统一、简单、强大的 AI 服务集成方案，同时保持了代码的整洁和可维护性。

## 9. 实施清单

- [ ] 注册 OpenRouter 账号并获取 API Key
- [ ] 更新 `.env.local` 文件
- [ ] 修改 `app/api/generate-card/route.ts`
- [ ] 创建 `lib/ai-providers.ts`（可选）
- [ ] 创建 `components/ai-model-selector.tsx`（可选）
- [ ] 集成到创建卡片页面（可选）
- [ ] 测试不同模型的生成效果
- [ ] 监控成本和使用情况