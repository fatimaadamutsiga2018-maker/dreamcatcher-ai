import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase/service';
import { consumeDeeperInsightCount } from '@/lib/deeper-insight';

export async function POST(request: Request) {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = (await request.json()) as {
      reading?: {
        question?: string;
        hexagram_number?: number;
        hexagram_name_en?: string;
        hexagram_name_cn?: string;
      };
    };
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const supabase = createServiceClient();
  const userId = session.user.id;
  const consumption = await consumeDeeperInsightCount(supabase, userId);

  if (!consumption.success) {
    return NextResponse.json({ error: 'Insufficient Deeper Insight rights' }, { status: 402 });
  }

  const question = body?.reading?.question || 'Deeper Insight';

  await supabase.from('cp_reading_history').insert({
    user_id: userId,
    reading_type: 'deeper_insight',
    question,
    input_numbers: body?.reading?.hexagram_number ? `${body.reading.hexagram_number}` : null,
    result_summary: {
      label: body?.reading?.hexagram_name_en,
      hexagramNumber: body?.reading?.hexagram_number,
      hexagramName: body?.reading?.hexagram_name_en,
    },
    consumed_source: consumption.source,
    created_at: new Date().toISOString(),
  });

  return NextResponse.json({
    unlocked: true,
    source: consumption.source,
    deeperInsightRemaining: consumption.deeperInsightRemaining,
    readingCreditsRemaining: consumption.readingCreditsRemaining,
  });
}
