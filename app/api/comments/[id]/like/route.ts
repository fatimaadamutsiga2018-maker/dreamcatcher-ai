import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createServiceClient();

  // Check if already liked
  const { data: existing } = await supabase
    .from('cp_comment_likes')
    .select('id')
    .eq('comment_id', id)
    .eq('user_id', session.user.id)
    .maybeSingle();

  if (existing) {
    // Unlike: remove the like
    await supabase
      .from('cp_comment_likes')
      .delete()
      .eq('id', existing.id);

    return NextResponse.json({ liked: false });
  }

  // Like: insert new
  const { error } = await supabase.from('cp_comment_likes').insert({
    comment_id: id,
    user_id: session.user.id,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ liked: true });
}
