import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase/service';

export async function GET() {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const userId = session.user.id;

  // Fetch points summary
  const { data: summary } = await supabase
    .from('cp_user_points_summary')
    .select('bonus_points_balance, purchased_credits_balance')
    .eq('user_id', userId)
    .single();

  // Fetch active membership
  const { data: membership } = await supabase
    .from('cp_memberships')
    .select('plan_code, status, current_period_end')
    .eq('user_id', userId)
    .in('status', ['active', 'trialing'])
    .single();

  const bonusPoints = summary?.bonus_points_balance ?? 0;
  const purchasedCredits = summary?.purchased_credits_balance ?? 0;
  const isMember = !!membership;

  // Determine if user can do a reading
  let canRead = false;
  let readingSource: 'membership' | 'bonus_points' | 'purchased_credits' | 'none' = 'none';

  if (isMember) {
    canRead = true;
    readingSource = 'membership';
  } else if (bonusPoints >= 5) {
    canRead = true;
    readingSource = 'bonus_points';
  } else if (purchasedCredits > 0) {
    canRead = true;
    readingSource = 'purchased_credits';
  }

  return NextResponse.json({
    bonusPoints,
    purchasedCredits,
    membership: membership || null,
    canRead,
    readingSource,
  });
}
