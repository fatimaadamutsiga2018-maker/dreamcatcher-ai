import { NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

/**
 * GET /api/energy/history
 * 获取用户能量历史记录
 */
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { energyBalance: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const history = await prisma.energyHistory.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    // Calculate totals
    const totalEarned = history
      .filter(h => h.amount > 0)
      .reduce((sum, h) => sum + h.amount, 0);
    const totalSpent = history
      .filter(h => h.amount < 0)
      .reduce((sum, h) => sum + Math.abs(h.amount), 0);

    return NextResponse.json({
      currentBalance: user.energyBalance,
      totalEarned,
      totalSpent,
      history: history.map(h => ({
        type: h.type,
        amount: h.amount,
        description: h.description,
        createdAt: h.createdAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching energy history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
