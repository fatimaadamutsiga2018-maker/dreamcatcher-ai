import { NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { addEnergyToLedger } from '@/shared/lib/energy-ledger';

/**
 * POST /api/energy/welcome
 * Welcome reward - triggers once per user
 */
export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        energyBalance: true,
        energyHistory: {
          where: { type: 'welcome' },
          take: 1,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if already claimed welcome reward
    const hasWelcomeReward = user.energyHistory.length > 0;

    if (hasWelcomeReward) {
      return NextResponse.json({
        alreadyClaimed: true,
        energy: user.energyBalance,
      });
    }

    // Welcome reward: 20 Energy (free source)
    const welcomeReward = 20;

    // Add to ledger
    await addEnergyToLedger(session.user.id, welcomeReward, 'free');

    // Record in history
    await prisma.energyHistory.create({
      data: {
        userId: session.user.id,
        amount: welcomeReward,
        type: 'welcome',
        description: 'Welcome to Dreamcatcher! Your first 20 Energy to explore.',
      },
    });

    // Get updated balance
    const updatedUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { energyBalance: true },
    });

    return NextResponse.json({
      energy: updatedUser?.energyBalance || welcomeReward,
      reward: welcomeReward,
      message: '+20 Energy - Welcome gift!',
    });
  } catch (error) {
    console.error('Error processing welcome reward:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
