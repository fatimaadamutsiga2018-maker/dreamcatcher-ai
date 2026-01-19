import { NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

/**
 * GET /api/energy/balance
 * 获取用户当前 Energy 余额
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

    // 检查今日是否可以签到
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastCheckin = user.lastCheckin ? new Date(user.lastCheckin) : null;
    const lastCheckinDate = lastCheckin
      ? new Date(lastCheckin.getFullYear(), lastCheckin.getMonth(), lastCheckin.getDate())
      : null;
    const canCheckin = !lastCheckinDate || lastCheckinDate.getTime() < today.getTime();

    // 检查今日是否已分享
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

    const canShare = shareCount === 0;

    return NextResponse.json({
      energy: user.energyBalance,
      isSubscriber: user.isSubscriber,
      dailyActions: {
        canCheckin,
        canShare,
      },
    });
  } catch (error) {
    console.error('Error fetching energy balance:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
