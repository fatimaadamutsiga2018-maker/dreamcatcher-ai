import { NextResponse } from 'next/server';
import { cleanupExpiredEnergy } from '@/shared/lib/energy-ledger';

/**
 * POST /api/energy/cleanup
 * Clean up expired energy entries
 * Call this via cron job (recommended: daily at midnight UTC)
 *
 * Example cron: 0 0 * * * curl -X POST https://yourdomain.com/api/energy/cleanup
 */
export async function POST(request: Request) {
  // Simple API key check for security
  const authHeader = request.headers.get('authorization');
  const cronKey = process.env.CRON_SECRET_KEY;

  if (cronKey && authHeader !== `Bearer ${cronKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await cleanupExpiredEnergy();

    return NextResponse.json({
      success: true,
      message: `Cleaned up ${result.cleanedEntries} expired entries`,
      totalExpired: result.totalExpired,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error cleaning up expired energy:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/energy/cleanup
 * Returns cleanup status (no actual cleanup)
 */
export async function GET() {
  return NextResponse.json({
    message: 'Energy cleanup endpoint',
    method: 'POST',
    cronExample: '0 0 * * * curl -X POST https://yourdomain.com/api/energy/cleanup',
    description: 'Cleans up expired energy entries daily',
    note: 'Set CRON_SECRET_KEY in .env for security',
  });
}
