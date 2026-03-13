-- Blog Comments System for ClarityPath
-- Date: 2026-03-13
-- Purpose: Create comment tables compatible with Better Auth + cp_ prefix
--
-- Dependencies: cp_users table must exist (from better-auth-tables-cp.sql)
-- Key difference from earlier drafts: user_id is TEXT referencing cp_users(id),
-- NOT UUID referencing auth.users(id).

BEGIN;

-- 1. Blog comments table
CREATE TABLE IF NOT EXISTS public.cp_blog_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relations
  post_slug TEXT NOT NULL,
  user_id TEXT REFERENCES public.cp_users(id) ON DELETE SET NULL,
  parent_id UUID REFERENCES public.cp_blog_comments(id) ON DELETE CASCADE,

  -- Content
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT,

  -- Status
  status TEXT DEFAULT 'published',
  is_pinned BOOLEAN DEFAULT false,

  -- Engagement
  likes_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('published', 'pending', 'spam', 'deleted')),
  CONSTRAINT content_not_empty CHECK (LENGTH(TRIM(content)) > 0)
);

-- 2. Comment likes table
CREATE TABLE IF NOT EXISTS public.cp_comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES public.cp_blog_comments(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES public.cp_users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(comment_id, user_id)
);

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_cp_comments_post_slug ON public.cp_blog_comments(post_slug, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cp_comments_user_id ON public.cp_blog_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_cp_comments_parent_id ON public.cp_blog_comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_cp_comments_status ON public.cp_blog_comments(status);
CREATE INDEX IF NOT EXISTS idx_cp_comment_likes_comment ON public.cp_comment_likes(comment_id);
CREATE INDEX IF NOT EXISTS idx_cp_comment_likes_user ON public.cp_comment_likes(user_id);

-- 4. Enable RLS
ALTER TABLE public.cp_blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cp_comment_likes ENABLE ROW LEVEL SECURITY;

-- 5. RLS policies for comments
-- Strategy: anon can only SELECT published comments.
-- All writes go through API routes using service_role key,
-- because Better Auth does not populate Supabase auth.uid().
DO $$
BEGIN
  -- Anon: read published comments only
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_blog_comments' AND policyname = 'cp_comments_select_published'
  ) THEN
    CREATE POLICY cp_comments_select_published
      ON public.cp_blog_comments FOR SELECT
      USING (status = 'published');
  END IF;

  -- Service role: full access for all operations (insert/update/delete via API)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_blog_comments' AND policyname = 'cp_comments_service_role_all'
  ) THEN
    CREATE POLICY cp_comments_service_role_all
      ON public.cp_blog_comments FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;
END $$;

-- 6. RLS policies for likes
-- Same strategy: anon can read, only service_role can write.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_comment_likes' AND policyname = 'cp_likes_select_all'
  ) THEN
    CREATE POLICY cp_likes_select_all
      ON public.cp_comment_likes FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cp_comment_likes' AND policyname = 'cp_likes_service_role_all'
  ) THEN
    CREATE POLICY cp_likes_service_role_all
      ON public.cp_comment_likes FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;
END $$;

-- 7. Auto-update likes_count trigger
CREATE OR REPLACE FUNCTION public.update_cp_comment_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.cp_blog_comments
    SET likes_count = likes_count + 1
    WHERE id = NEW.comment_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.cp_blog_comments
    SET likes_count = likes_count - 1
    WHERE id = OLD.comment_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_cp_likes_count_trigger ON public.cp_comment_likes;
CREATE TRIGGER update_cp_likes_count_trigger
AFTER INSERT OR DELETE ON public.cp_comment_likes
FOR EACH ROW
EXECUTE FUNCTION public.update_cp_comment_likes_count();

COMMIT;

-- Verification:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'cp_blog%' OR table_name LIKE 'cp_comment%' ORDER BY table_name;
