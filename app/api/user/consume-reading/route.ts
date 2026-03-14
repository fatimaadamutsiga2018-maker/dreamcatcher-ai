import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase/service';

export async function POST(request: Request) {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Parse optional reading metadata from body
  let readingType = 'hexagram';
  let question = '';
  let inputNumbers = '';
  try {
    const body = await request.json();
    readingType = body.readingType || 'hexagram';
    question = body.question || '';
    inputNumbers = body.inputNumbers || '';
  } catch {
    // Body is optional, defaults are fine
  }

  const supabase = createServiceClient();
  const userId = session.user.id;

  // 1. Check membership first — members don't consume anything
  const { data: membership } = await supabase
    .from('cp_memberships')
    .select('id')
    .eq('user_id', userId)
    .in('status', ['active', 'trialing'])
    .single();

  if (membership) {
    // Record reading history
    await supabase.from('cp_reading_history').insert({
      user_id: userId,
      reading_type: readingType,
      question,
      input_numbers: inputNumbers,
      consumed_source: 'membership',
    });
    return NextResponse.json({ consumed: true, source: 'membership' });
  }

  // 2. Fetch current balances
  const { data: summary } = await supabase
    .from('cp_user_points_summary')
    .select('bonus_points_balance, purchased_credits_balance')
    .eq('user_id', userId)
    .single();

  const bonusPoints = summary?.bonus_points_balance ?? 0;
  const purchasedCredits = summary?.purchased_credits_balance ?? 0;

  // 3. Try bonus points (5 per reading)
  if (bonusPoints >= 5) {
    // Deduct 5 bonus points
    await supabase
      .from('cp_user_points_summary')
      .update({
        bonus_points_balance: bonusPoints - 5,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    // Record transaction
    await supabase.from('cp_points_transactions').insert({
      user_id: userId,
      source_type: 'usage_deduction',
      direction: 'debit',
      amount: 5,
      description: 'Decision Guidance reading',
    });

    // Record reading history
    await supabase.from('cp_reading_history').insert({
      user_id: userId,
      reading_type: readingType,
      question,
      input_numbers: inputNumbers,
      consumed_source: 'bonus_points',
    });

    return NextResponse.json({ consumed: true, source: 'bonus_points', remaining: bonusPoints - 5 });
  }

  // 4. Try purchased credits (1 per reading, FIFO by expiry)
  if (purchasedCredits > 0) {
    // Find the earliest-expiring active credit lot
    const { data: creditLot } = await supabase
      .from('cp_purchased_credits')
      .select('id, credits_remaining')
      .eq('user_id', userId)
      .eq('status', 'active')
      .gt('credits_remaining', 0)
      .gt('expires_at', new Date().toISOString())
      .order('expires_at', { ascending: true })
      .order('created_at', { ascending: true })
      .limit(1)
      .single();

    if (creditLot) {
      const newRemaining = creditLot.credits_remaining - 1;
      await supabase
        .from('cp_purchased_credits')
        .update({
          credits_remaining: newRemaining,
          status: newRemaining === 0 ? 'depleted' : 'active',
          updated_at: new Date().toISOString(),
        })
        .eq('id', creditLot.id);

      // Update summary
      await supabase
        .from('cp_user_points_summary')
        .update({
          purchased_credits_balance: purchasedCredits - 1,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      // Record reading history
      await supabase.from('cp_reading_history').insert({
        user_id: userId,
        reading_type: readingType,
        question,
        input_numbers: inputNumbers,
        consumed_source: 'purchased_credits',
      });

      return NextResponse.json({ consumed: true, source: 'purchased_credits', remaining: purchasedCredits - 1 });
    }
  }

  // 5. No rights available
  return NextResponse.json(
    { consumed: false, error: 'Insufficient credits. Please purchase a reading pack or membership.' },
    { status: 402 }
  );
}
