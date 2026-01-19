import { NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { addEnergyToLedger } from '@/shared/lib/energy-ledger';

/**
 * POST /api/energy/share
 * Share reading card +5 Energy (once per day, free source)
 */
export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if already shared today
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

    const existingShare = await prisma.energyHistory.findFirst({
      where: {
        userId: session.user.id,
        type: 'share',
        createdAt: {
          gte: todayStart,
          lt: todayEnd,
        },
      },
    });

    if (existingShare) {
      return NextResponse.json({
        error: 'Already shared today',
        canShare: false,
      });
    }

    // Add share reward
    const shareReward = 5;

    // Add to ledger as free energy
    await addEnergyToLedger(session.user.id, shareReward, 'free');

    // Record in history
    await prisma.energyHistory.create({
      data: {
        userId: session.user.id,
        amount: shareReward,
        type: 'share',
        description: 'Shared your reading card',
      },
    });

    // Get updated balance
    const updatedUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { energyBalance: true },
    });

    return NextResponse.json({
      energy: updatedUser?.energyBalance || shareReward,
      reward: shareReward,
      canShare: false,
      message: '+5 Energy recharged!',
    });
  } catch (error) {
    console.error('Error processing share reward:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
