import { createServiceClient } from '@/lib/supabase/service';

type SupabaseClient = ReturnType<typeof createServiceClient>;

const PLAN_ALLOWANCE: Record<'member_monthly' | 'member_yearly', number> = {
  member_monthly: 3,
  member_yearly: 5,
};

export function getPlanDeeperAllowance(planCode: 'member_monthly' | 'member_yearly') {
  return PLAN_ALLOWANCE[planCode] ?? 0;
}

export function applyDeeperInsightDefaults(payload: Record<string, unknown>, planCode: 'member_monthly' | 'member_yearly') {
  const allowance = getPlanDeeperAllowance(planCode);
  payload.deeper_insight_total = allowance;
  payload.deeper_insight_remaining = allowance;
}

export async function consumeDeeperInsightCount(supabase: SupabaseClient, userId: string) {
  const now = new Date().toISOString();

  const { data: membership } = await supabase
    .from('cp_memberships')
    .select('id, plan_code, status, deeper_insight_remaining, deeper_insight_total')
    .eq('user_id', userId)
    .in('status', ['active', 'trialing', 'past_due'])
    .maybeSingle();

  if (membership && membership.deeper_insight_remaining > 0) {
    const remaining = membership.deeper_insight_remaining - 1;
    await supabase
      .from('cp_memberships')
      .update({ deeper_insight_remaining: remaining, updated_at: now })
      .eq('id', membership.id);

    return {
      success: true,
      source: 'membership' as const,
      deeperInsightRemaining: remaining,
      readingCreditsConsumed: 0,
      readingCreditsRemaining: null,
    };
  }

  const { data: summary } = await supabase
    .from('cp_user_points_summary')
    .select('purchased_credits_balance')
    .eq('user_id', userId)
    .single();

  const purchasedCredits = summary?.purchased_credits_balance ?? 0;
  if (purchasedCredits < 2) {
    return { success: false };
  }

  let remainingToConsume = 2;
  const { data: lots } = await supabase
    .from('cp_purchased_credits')
    .select('id, credits_remaining, expires_at')
    .eq('user_id', userId)
    .eq('status', 'active')
    .gt('credits_remaining', 0)
    .gt('expires_at', new Date().toISOString())
    .order('expires_at', { ascending: true })
    .order('created_at', { ascending: true });

  if (!lots || lots.length === 0) {
    return { success: false };
  }

  let consumed = 0;
  for (const lot of lots) {
    if (remainingToConsume <= 0) break;
    const deduct = Math.min(remainingToConsume, lot.credits_remaining);
    remainingToConsume -= deduct;
    consumed += deduct;
    const newRemaining = lot.credits_remaining - deduct;
    await supabase
      .from('cp_purchased_credits')
      .update({
        credits_remaining: newRemaining,
        status: newRemaining === 0 ? 'depleted' : 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('id', lot.id);
  }

  if (remainingToConsume > 0) {
    return { success: false };
  }

  const newBalance = Math.max(0, purchasedCredits - consumed);
  await supabase
    .from('cp_user_points_summary')
    .update({ purchased_credits_balance: newBalance, updated_at: now })
    .eq('user_id', userId);

  await supabase.from('cp_points_transactions').insert({
    user_id: userId,
    source_type: 'usage_deduction',
    direction: 'debit',
    amount: consumed,
    description: 'Deeper Insight unlock',
  });

  return {
    success: true,
    source: 'reading_credits' as const,
    deeperInsightRemaining: 0,
    readingCreditsConsumed: consumed,
    readingCreditsRemaining: newBalance,
  };
}
