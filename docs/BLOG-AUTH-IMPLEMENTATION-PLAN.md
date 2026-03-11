# ClarityPath Blog & Authentication Implementation Plan

**Created:** 2026-03-08
**Status:** Planning Phase
**Priority:** High

---

## 📋 Project Overview

### Goals
1. Implement blog system with SEO optimization
2. Add user authentication (Email + Google OAuth)
3. Enable comments on blog posts
4. Maintain existing ClarityPath functionality

### Reference
- Template: `/home/echo007/.openclaw/workspace/projects/claritypath-reference/shipany-template-two-dev/`
- Current Project: `/home/echo007/.openclaw/workspace/projects/claritypath-app/`

---

## 🎯 Phase 1: Authentication System (Week 1)

### 1.1 Setup Authentication Infrastructure

**Dependencies to Install:**
```bash
npm install next-auth@latest
npm install @auth/supabase-adapter
npm install bcryptjs
npm install @types/bcryptjs --save-dev
```

**Tasks:**
- [ ] Configure NextAuth.js with Supabase adapter
- [ ] Setup email/password authentication
- [ ] Configure Google OAuth provider
- [ ] Create user session management
- [ ] Add authentication middleware

**Files to Create:**
```
app/api/auth/[...nextauth]/route.ts  # NextAuth API route
lib/auth/config.ts                    # Auth configuration
lib/auth/providers.ts                 # OAuth providers
middleware.ts                         # Route protection
```

**Database Tables Needed:**
```sql
-- Already have: profiles table
-- Need to add:
- sessions (for NextAuth)
- accounts (for OAuth)
- verification_tokens (for email verification)
```

### 1.2 User Interface Components

**Pages to Create:**
```
app/auth/signin/page.tsx              # Sign in page
app/auth/signup/page.tsx              # Sign up page
app/auth/verify-email/page.tsx        # Email verification
```

**Components to Create:**
```
components/auth/SignInForm.tsx        # Email/password form
components/auth/GoogleSignInButton.tsx # Google OAuth button
components/auth/UserMenu.tsx          # User dropdown menu
```

### 1.3 Integration with Existing Features

**Update Existing Pages:**
- [ ] Add "Save to History" for logged-in users
- [ ] Link assessment results to user account
- [ ] Link hexagram readings to user account
- [ ] Add user dashboard to view history

---

## 🎯 Phase 2: Blog System (Week 2)

### 2.1 Content Management Setup

**Dependencies to Install:**
```bash
npm install contentlayer next-contentlayer
npm install rehype-pretty-code shiki
npm install remark-gfm
npm install gray-matter
```

**Tasks:**
- [ ] Setup Contentlayer for MDX content
- [ ] Configure blog post schema
- [ ] Add syntax highlighting
- [ ] Setup SEO metadata

**Files to Create:**
```
contentlayer.config.ts                # Content configuration
content/blog/                         # Blog posts directory
lib/blog/utils.ts                     # Blog utilities
```

### 2.2 Blog Pages & Components

**Pages to Create:**
```
app/blog/page.tsx                     # Blog listing page
app/blog/[slug]/page.tsx              # Individual blog post
app/blog/category/[category]/page.tsx # Category pages
app/blog/tag/[tag]/page.tsx           # Tag pages
```

**Components to Create:**
```
components/blog/BlogCard.tsx          # Blog post card
components/blog/BlogContent.tsx       # MDX content renderer
components/blog/TableOfContents.tsx   # TOC navigation
components/blog/ShareButtons.tsx      # Social sharing
components/blog/RelatedPosts.tsx      # Related articles
```

### 2.3 SEO Optimization

**Tasks:**
- [ ] Add dynamic metadata for each post
- [ ] Generate sitemap.xml
- [ ] Add structured data (JSON-LD)
- [ ] Optimize images with Next.js Image
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags

**Files to Create:**
```
app/sitemap.ts                        # Dynamic sitemap
lib/seo/metadata.ts                   # SEO utilities
```

---

## 🎯 Phase 3: Comments System (Week 2-3)

### 3.1 Comments Infrastructure

**Database Tables:**
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_slug TEXT NOT NULL,
  user_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id),  -- For nested replies
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Tasks:**
- [ ] Create comments API routes
- [ ] Add comment submission form
- [ ] Implement nested replies
- [ ] Add comment moderation (admin only)
- [ ] Add like/reaction system (optional)

**Files to Create:**
```
app/api/comments/route.ts             # Comments API
components/blog/CommentSection.tsx    # Comments UI
components/blog/CommentForm.tsx       # Comment form
```

---

## 🎯 Phase 4: Navigation & Layout Updates

### 4.1 Update Site Navigation

**Tasks:**
- [ ] Add "Blog" to main navigation
- [ ] Add user menu to header
- [ ] Update footer with blog links
- [ ] Add breadcrumbs for blog pages

**Files to Update:**
```
app/layout.tsx                        # Add auth provider
components/Navigation.tsx             # Add blog link
components/Header.tsx                 # Add user menu
```

---

## 📊 Technical Decisions

### Authentication Strategy
- **Primary:** NextAuth.js with Supabase adapter
- **Providers:** Email/Password + Google OAuth
- **Session:** JWT-based sessions
- **Storage:** Supabase database

### Blog Content Strategy
- **Format:** MDX (Markdown + React components)
- **Storage:** File-based (content/ directory)
- **Build:** Static generation with ISR
- **CMS:** File-based (can migrate to headless CMS later)

### SEO Strategy
- **Metadata:** Dynamic per page
- **Sitemap:** Auto-generated
- **Structured Data:** JSON-LD for articles
- **Performance:** Image optimization, lazy loading

---

## 🔧 Environment Variables Needed

Add to `.env.local`:
```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-random-secret>

# Google OAuth
GOOGLE_CLIENT_ID=<from-google-console>
GOOGLE_CLIENT_SECRET=<from-google-console>

# Email (for verification)
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM=noreply@dreamcatcherai.us
```

---

## 📝 Content Structure Example

```markdown
---
title: "Understanding I Ching Hexagrams"
description: "A beginner's guide to interpreting I Ching hexagrams"
date: 2026-03-10
author: "ClarityPath Team"
category: "Guides"
tags: ["I Ching", "Hexagrams", "Divination"]
image: "/blog/hexagrams-guide.jpg"
---

# Understanding I Ching Hexagrams

Your blog content here...
```

---

## ✅ Success Criteria

### Phase 1 Complete When:
- [ ] Users can sign up with email
- [ ] Users can sign in with Google
- [ ] User sessions persist
- [ ] Protected routes work
- [ ] User menu displays correctly

### Phase 2 Complete When:
- [ ] Blog listing page shows all posts
- [ ] Individual blog posts render correctly
- [ ] SEO metadata is correct
- [ ] Sitemap generates properly
- [ ] Images are optimized

### Phase 3 Complete When:
- [ ] Users can post comments
- [ ] Comments display correctly
- [ ] Nested replies work
- [ ] Only logged-in users can comment

---

## 🚀 Deployment Checklist

Before pushing to production:
- [ ] Test all authentication flows
- [ ] Verify Google OAuth in production
- [ ] Test blog post rendering
- [ ] Check SEO metadata
- [ ] Test comments system
- [ ] Update environment variables in Vercel
- [ ] Test on mobile devices

---

## 📚 Resources

- NextAuth.js Docs: https://next-auth.js.org/
- Contentlayer Docs: https://contentlayer.dev/
- Supabase Auth: https://supabase.com/docs/guides/auth
- Next.js SEO: https://nextjs.org/learn/seo/introduction-to-seo

---

## 🔄 Next Steps

1. **Review this plan with user** ✅
2. **Setup authentication infrastructure**
3. **Create authentication UI**
4. **Test authentication flows**
5. **Setup blog system**
6. **Create blog UI**
7. **Add comments system**
8. **Deploy to production**
