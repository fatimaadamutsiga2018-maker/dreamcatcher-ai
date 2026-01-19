import { NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { consumeEnergyFromLedger } from '@/shared/lib/energy-ledger';

/**
 * POST /api/energy/consume
 * 消费 Energy - 使用 FIFO 逻辑（先消耗免费，后消耗付费）
 * Body: { action: 'personal_timing' | 'detailed_insight', amount?: number }
 */
export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action } = body;

    // Define consumption costs
    const actionCosts: Record<string, number> = {
      personal_timing: 5,
      detailed_insight: 7,
    };

    const cost = actionCosts[action];
    if (!cost) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Consume energy using FIFO logic
    const result = await consumeEnergyFromLedger(session.user.id, cost);

    if (!result.success) {
      return NextResponse.json({
        error: result.error,
        current: result.current,
        required: cost,
        canCheckinTomorrow: true,
        canShare: true,
      }, { status: 402 }); // 402 Payment Required
    }

    // Record in history
    await prisma.energyHistory.create({
      data: {
        userId: session.user.id,
        amount: -cost,
        type: action === 'personal_timing' ? 'personal_timing' : 'detailed_insight',
        description: action === 'personal_timing' ? 'Personal Timing Guide' : 'Detailed Insight',
        metadata: {
          consumedFrom: result.consumedFrom,
        },
      },
    });

    return NextResponse.json({
      energy: result.newBalance,
      consumed: cost,
      remaining: result.newBalance,
      success: true,
    });
  } catch (error) {
    console.error('Error consuming energy:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
