import { NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { addEnergyToLedger } from '@/shared/lib/energy-ledger';

/**
 * POST /api/energy/checkin
 * Daily check-in +5 Energy (free source)
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
        lastCheckin: true,
        isSubscriber: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if already checked in today
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastCheckin = user.lastCheckin ? new Date(user.lastCheckin) : null;
    const lastCheckinDate = lastCheckin
      ? new Date(lastCheckin.getFullYear(), lastCheckin.getMonth(), lastCheckin.getDate())
      : null;

    if (lastCheckinDate && lastCheckinDate.getTime() >= today.getTime()) {
      return NextResponse.json({
        error: 'Already checked in today',
        energy: user.energyBalance,
        canCheckin: false,
      });
    }

    // Calculate reward (subscribers get 2x)
    const checkinReward = user.isSubscriber ? 10 : 5;

    // Add to ledger as free energy
    await addEnergyToLedger(session.user.id, checkinReward, 'free');

    // Create checkin record
    await prisma.checkin.create({
      data: {
        userId: session.user.id,
        date: now,
        energy: checkinReward,
      },
    });

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { lastCheckin: now },
    });

    // Record in history
    await prisma.energyHistory.create({
      data: {
        userId: session.user.id,
        amount: checkinReward,
        type: 'checkin',
        description: user.isSubscriber ? 'Daily check-in (Subscriber 2x)' : 'Daily check-in',
      },
    });

    return NextResponse.json({
      energy: updatedUser.energyBalance,
      reward: checkinReward,
      canCheckin: false,
      message: `+${checkinReward} Energy recharged!`,
    });
  } catch (error) {
    console.error('Error during checkin:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
