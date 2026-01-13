# AI Rest Engine V0 — MVP

AI Rest 是世界上第一个按需 NSDR (Non-Sleep Deep Rest) 恢复引擎。

## 核心价值主张

> "For the mentally exhausted who can't stop thinking, AI-guided NSDR sessions deliver a proven reset in under 12 minutes — no skill, no practice, just rest."

## 功能特性

- ✅ **Landing Page** - 展示核心价值主张、30秒演示、注册入口
- ✅ **用户注册** - 收集用户邮箱，触发 NSDR 生成流程
- ✅ **NSDR 脚本生成** - 使用 GPT-4 生成个性化引导脚本（待集成）
- ✅ **TTS 语音生成** - 使用 ElevenLabs 将脚本转为语音（待集成）
- ✅ **邮件发送** - 发送包含音频链接的个性化邮件（待集成）
- ✅ **反馈表单** - 收集用户体验反馈、付费意愿、访谈预约
- ✅ **Google Analytics** - 追踪页面停留时间和跳出率（待配置）

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local` 并填写相应的 API Key：

```bash
cp .env.example .env.local
```

必需的环境变量：
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID（可选）
- `OPENAI_API_KEY` - OpenAI API Key（用于生成 NSDR 脚本）
- `ELEVENLABS_API_KEY` - ElevenLabs API Key（用于 TTS）
- `SENDGRID_API_KEY` - SendGrid API Key（用于发送邮件）
- `SENDGRID_FROM_EMAIL` - 发件人邮箱地址

### 3. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
├── app/
│   ├── api/
│   │   ├── register/       # 用户注册 API
│   │   ├── feedback/       # 反馈提交 API
│   │   └── generate-nsdr/  # NSDR 生成 API
│   ├── feedback/           # 反馈表单页面
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页 (Landing Page)
│   └── globals.css         # 全局样式
├── components/
│   └── GoogleAnalytics.tsx # GA 追踪组件
├── lib/
│   ├── nsdr-generator.ts   # NSDR 脚本生成逻辑
│   ├── tts-service.ts      # TTS 服务
│   └── email-service.ts    # 邮件发送服务
└── public/                 # 静态资源
```

## 待集成功能

- [ ] OpenAI GPT-4 API 集成（生成个性化 NSDR 脚本）
- [ ] ElevenLabs TTS API 集成（文本转语音）
- [ ] SendGrid 邮件服务集成
- [ ] 数据库集成（存储用户数据和反馈）
- [ ] Airtable 集成（数据收集和整理）
- [ ] 音频文件云存储（AWS S3 / Cloudinary）
- [ ] Calendly 集成（访谈预约）

## 核心指标（KPI）

根据项目文档，需要追踪以下指标：

1. **落地页停留时间** > 90 秒
2. **注册转化率** > 5%
3. **体验反馈**：>30% 用户反馈"思维慢下来"
4. **付费意愿**：>50% 受访用户表示愿意为个性化付费
5. **流程错误率** < 5%
6. **收集至少 50 条有效反馈**
7. **完成 10 次深度访谈**

## 技术栈

- **Next.js 16** - React 框架
- **React 19** - UI 库
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **OpenAI GPT-4** - AI 文本生成
- **ElevenLabs** - 文本转语音
- **SendGrid** - 邮件服务
- **Google Analytics** - 数据分析

## 开发计划

根据 V0 规划文档：

- ✅ 第 1-2 天：落地页设计与上线
- ✅ 第 3-5 天：MVP 流程拼接
- ✅ 第 1 天：数据追踪与反馈设置
- ⏳ 第 1-2 天：内容准备
- ⏳ 第 5 天起：流量启动与验证

## 许可证

MIT








