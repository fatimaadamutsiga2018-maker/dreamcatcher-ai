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

  // Count total hexagram readings
  const { count: totalReadings } = await supabase
    .from('cp_reading_history')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('reading_type', 'hexagram');

  // Count total assessments
  const { count: totalAssessments } = await supabase
    .from('cp_reading_history')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('reading_type', 'assessment');

  // Count this month
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const { count: thisMonth } = await supabase
    .from('cp_reading_history')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', monthStart);

  // Recent activity (last 10)
  const { data: recentActivity } = await supabase
    .from('cp_reading_history')
    .select('id, reading_type, question, input_numbers, result_summary, consumed_source, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);

  // User assets: points summary
  const { data: summary } = await supabase
    .from('cp_user_points_summary')
    .select('bonus_points_balance, purchased_credits_balance')
    .eq('user_id', userId)
    .single();

  // Active membership
  const { data: membership } = await supabase
    .from('cp_memberships')
    .select('plan_code, status, current_period_end')
    .eq('user_id', userId)
    .in('status', ['active', 'trialing'])
    .single();

  return NextResponse.json({
    totalReadings: totalReadings ?? 0,
    totalAssessments: totalAssessments ?? 0,
    thisMonth: thisMonth ?? 0,
    recentActivity: recentActivity ?? [],
    bonusPoints: summary?.bonus_points_balance ?? 0,
    purchasedCredits: summary?.purchased_credits_balance ?? 0,
    membership: membership || null,
  });
}
