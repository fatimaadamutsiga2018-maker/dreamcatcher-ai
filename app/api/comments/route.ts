import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postSlug = searchParams.get('postSlug');
  const latest = searchParams.get('latest');

  const supabase = createServiceClient();

  // Fetch latest comments across all posts (for blog listing page)
  if (latest) {
    const limit = Math.min(parseInt(latest) || 5, 20);
    const { data, error } = await supabase
      .from('cp_blog_comments')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ comments: data });
  }

  if (!postSlug) {
    return NextResponse.json({ error: 'postSlug or latest required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('cp_blog_comments')
    .select('*')
    .eq('post_slug', postSlug)
    .eq('status', 'published')
    .is('parent_id', null)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ comments: data });
}

export async function POST(request: NextRequest) {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { postSlug, content } = body;

  if (!postSlug || !content) {
    return NextResponse.json(
      { error: 'postSlug and content required' },
      { status: 400 }
    );
  }

  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from('cp_blog_comments')
    .insert({
      post_slug: postSlug,
      user_id: session.user.id,
      content: content.trim(),
      author_name: session.user.name || session.user.email || 'Anonymous',
      author_email: session.user.email,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ comment: data }, { status: 201 });
}
