# Blog and Login Feature Design

**Date:** 2026-03-06
**Status:** Approved
**Type:** UI Mockup (No Backend)

## Overview

Add blog and login functionality to ClarityPath app with both official wisdom articles and community contributions. This is a UI-only implementation using mock data and localStorage for authentication state.

## Requirements

1. **Blog Purpose:**
   - Official wisdom articles and guidance tips (content marketing)
   - Community blog where registered users can share experiences

2. **Authentication:**
   - UI mockup only (no real backend)
   - Login/register forms with validation UI
   - LocalStorage to simulate logged-in state

3. **Content Management:**
   - Rich text editor UI for creating posts
   - Formatting options (bold, images, links)

## Architecture

### Pages to Create

1. `/blog` - Blog listing page (all posts with filters)
2. `/blog/[slug]` - Individual blog post detail page
3. `/blog/create` - Create new post page (requires "login")
4. `/login` - Login page
5. `/register` - Registration page
6. `/profile` - User profile page

### Navigation

- Add header navigation: Home | Blog | Login/Profile
- Conditional rendering based on auth state

### Data Structure

Mock data stored in TypeScript constants:

```typescript
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: 'official' | 'community';
  };
  category: string;
  publishedAt: string;
  coverImage?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
}
```

## Design Details

### Blog Listing Page (`/blog`)

- Hero section: "Wisdom & Community" title with subtitle
- Filter tabs: All | Official | Community
- Card grid layout (3 columns on desktop, responsive)
- Each card:
  - Cover image (optional)
  - Category badge (amber for official, emerald for community)
  - Title, excerpt (2 lines max)
  - Author avatar + name
  - Date
  - Read time estimate
- Pagination (UI only)

### Blog Post Detail (`/blog/[slug]`)

- Hero section with title, author, date, category
- Rich content area with proper typography
- Author info card (sidebar on desktop, bottom on mobile)
- Related posts section
- Share buttons (UI only)
- Back to blog link

### Login Page (`/login`)

- Centered card design (max-w-md)
- Email and password fields
- "Remember me" checkbox
- Login button (primary amber)
- Social login buttons (Google, GitHub - UI only)
- Link to register page
- On submit: store mock user in localStorage, redirect to profile

### Register Page (`/register`)

- Similar layout to login
- Additional fields: name, confirm password
- Terms acceptance checkbox
- Register button
- Link to login page

### Create Post Page (`/blog/create`)

- Protected route (check localStorage for auth)
- Rich text editor (using Tiptap or similar)
- Fields:
  - Title input
  - Category selector
  - Cover image upload (UI only)
  - Content editor with toolbar
- Preview toggle button
- Save draft / Publish buttons
- On publish: add to mock data, redirect to post detail

### Profile Page (`/profile`)

- User info card:
  - Avatar, name, bio
  - Edit profile button (UI only)
  - Member since date
- Tabs: Published Posts | Drafts
- Grid of user's posts
- "Create New Post" button

## Design Consistency

All pages follow ClarityPath patterns:

- **Colors:**
  - Primary: Amber (amber-600)
  - Secondary: Emerald (emerald-600)
  - Backgrounds: Gradient from amber-50/emerald-50 to white

- **Components:**
  - Cards: bg-white, rounded-2xl, shadow-lg
  - Buttons: rounded-full, px-8 py-4
  - Inputs: rounded-xl, border-2

- **Typography:**
  - Geist Sans (already configured)
  - Headings: font-bold, text-gray-900
  - Body: text-gray-600/700

## Implementation Notes

1. Create mock data file: `lib/mockBlogData.ts`
2. Create auth utility: `lib/mockAuth.ts` (localStorage helpers)
3. Use existing Tailwind classes for consistency
4. All forms have validation UI (no actual validation logic)
5. All "submit" actions update localStorage and redirect
6. Rich text editor: use Tiptap (lightweight, React-friendly)

## Future Enhancements (Not in Scope)

- Real authentication backend
- Database integration
- Image upload to cloud storage
- Comment system
- Like/bookmark features
- Email notifications
- Admin moderation panel
