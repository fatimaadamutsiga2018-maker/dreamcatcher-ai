# ClarityPath

ClarityPath is an English-language web product for the US and European market. It combines Eastern wisdom frameworks with modern psychology to help adults 35+ make better decisions, understand their current energy state, and act with better timing.

## Product Scope

- Energy Assessment: a 12-question assessment that outputs four dimension scores and an overall energy state
- Daily Energy Guidance: general daily timing and action recommendations
- Decision Wisdom: a Meihua Yishu inspired decision-support flow built with modern, non-mystical language
- Membership and points: gated features, history, and future subscription flows
- Content system: SEO blog content that educates users and leads them into the product journey

## Current Tech Stack

- Framework: Next.js 16 (App Router)
- Styling: Tailwind CSS v4
- Animation: Framer Motion
- Database: Supabase PostgreSQL
- ORM: Drizzle ORM
- Authentication: Better Auth
- Deployment: Vercel

## Authentication Architecture

The project is standardizing on:

- Better Auth for authentication
- Supabase PostgreSQL as the backing database
- `cp_` table prefixes for ClarityPath auth and business tables

This is intentional. The long-term plan is to allow one Supabase project to host multiple websites. Each website should keep its own isolated table namespace. For ClarityPath, that namespace is `cp_`.

Examples:

- `cp_users`
- `cp_sessions`
- `cp_accounts`
- `cp_verification_tokens`
- `cp_profiles`
- `cp_blog_posts`

This avoids cross-project data mixing and keeps migrations, RLS rules, and maintenance easier to reason about.

## Multi-Site Database Strategy

If more websites are added to the same Supabase project, each site should have its own prefix or its own PostgreSQL schema.

Recommended near-term approach:

- Keep `cp_` for ClarityPath
- Use another prefix for the next site, such as `mh_` or `site2_`
- Do not share auth tables across unrelated websites unless cross-site login is a deliberate product requirement

## Important Note

The repository still contains legacy auth traces from older Supabase Auth and NextAuth-style experiments. The active direction is Better Auth. New auth migrations and table definitions should be written to match `lib/auth.ts`, not the older historical SQL files.

## Key Project Docs

- Planning index: `planning/README.md`
- Product requirements: `planning/PRD.md`
- Database design: `planning/DATABASE_SCHEMA.md`
- Brand guide: `planning/Dreamcatcher-Brand-Guide-V1.0.md`
- Blog and auth planning: `planning/blog-comments-and-email-auth-plan.md`

## Supabase SQL Layout

The SQL structure is now intentionally split:

- `supabase/`
  Active operational SQL for the running project
- `supabase/legacy/`
  Archived SQL from earlier setup phases, NextAuth experiments, and one-off repair scripts
- `planning/supabase/`
  Planning/reference-only SQL, not the runtime source of truth

Current auth source of truth:

- `supabase/better-auth-tables-cp.sql`

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.
