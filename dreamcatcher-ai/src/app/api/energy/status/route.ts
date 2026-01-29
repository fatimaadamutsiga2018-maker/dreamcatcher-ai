import { NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { getEnergyBreakdown } from '@/shared/lib/energy-ledger';

/**
 * GET /api/energy/status
 * Get detailed energy status including breakdown and expiry info
 */
export async function GET() {
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

    // Get detailed breakdown
    const breakdown = await getEnergyBreakdown(session.user.id);

    // Check daily actions
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastCheckin = user.lastCheckin ? new Date(user.lastCheckin) : null;
    const lastCheckinDate = lastCheckin
      ? new Date(lastCheckin.getFullYear(), lastCheckin.getMonth(), lastCheckin.getDate())
      : null;
    const canCheckin = !lastCheckinDate || lastCheckinDate.getTime() < today.getTime();

    // Check today's share
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

    const shareCount = await prisma.energyHistory.count({
      where: {
        userId: session.user.id,
        type: 'share',
        createdAt: {
          gte: todayStart,
          lt: todayEnd,
        },
      },
    });

    // Get expiring soon (within 7 days)
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const expiringEntries = await prisma.energyLedger.findMany({
      where: {
        userId: session.user.id,
        amount: { gt: 0 },
        expiresAt: {
          gt: now,
          lte: sevenDaysFromNow,
        },
      },
      orderBy: { expiresAt: 'asc' },
      take: 3,
    });

    return NextResponse.json({
      energy: user.energyBalance,
      isSubscriber: user.isSubscriber,
      breakdown: {
        freeEnergy: breakdown.freeEnergy,
        paidEnergy: breakdown.paidEnergy,
        total: breakdown.total,
      },
      dailyActions: {
        canCheckin,
        canShare: shareCount === 0,
      },
      expiry: {
        earliestExpiry: breakdown.earliestExpiry,
        expiringSoon: expiringEntries.map(e => ({
          amount: e.amount,
          source: e.source,
          expiresAt: e.expiresAt,
          daysUntilExpiry: Math.ceil((e.expiresAt!.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)),
        })),
      },
      info: {
        freeEnergyExpiresIn: '30 days',
        paidEnergyExpiresIn: '180 days',
      },
    });
  } catch (error) {
    console.error('Error fetching energy status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
