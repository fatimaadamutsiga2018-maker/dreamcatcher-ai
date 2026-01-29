/**
 * Energy Ledger Service
 * Handles FIFO consumption: Free Energy (oldest first) → Paid Energy
 */

import { prisma } from './prisma';

export type EnergySource = 'free' | 'paid';

// Expiration periods
const FREE_ENERGY_DAYS = 30;
const PAID_ENERGY_DAYS = 180;

/**
 * Add energy to user's ledger
 * @param userId User ID
 * @param amount Amount to add
 * @param source Source of energy ('free' | 'paid')
 * @param orderId Optional Order ID for paid energy
 */
export async function addEnergyToLedger(
  userId: string,
  amount: number,
  source: EnergySource,
  orderId?: string
) {
  const now = new Date();
  const expiresAt = new Date(now);

  if (source === 'free') {
    expiresAt.setDate(expiresAt.getDate() + FREE_ENERGY_DAYS);
  } else {
    expiresAt.setDate(expiresAt.getDate() + PAID_ENERGY_DAYS);
  }

  // Create or update ledger entry
  // For simplicity, we create a new entry for each addition
  const ledger = await prisma.energyLedger.create({
    data: {
      userId,
      source,
      amount,
      initialAmount: amount,
      expiresAt,
      orderId,
    },
  });

  // Update user balance
  await prisma.user.update({
    where: { id: userId },
    data: { energyBalance: { increment: amount } },
  });

  return ledger;
}

/**
 * Consume energy using FIFO logic
 * Priority: Free Energy (oldest first) → Paid Energy (oldest first)
 * @param userId User ID
 * @param amount Amount to consume
 * @returns Object with remaining amount if insufficient energy
 */
export async function consumeEnergyFromLedger(
  userId: string,
  amount: number
) {
  // Check user balance first
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { energyBalance: true },
  });

  if (!user || user.energyBalance < amount) {
    return {
      success: false,
      error: 'Insufficient energy',
      current: user?.energyBalance || 0,
      required: amount,
    };
  }

  let remainingToConsume = amount;
  const consumedFrom: Array<{ ledgerId: string; source: EnergySource; amount: number }> = [];

  // Get all active ledger entries ordered by:
  // 1. Source (free first)
  // 2. Created date (oldest first within same source)
  const ledgerEntries = await prisma.energyLedger.findMany({
    where: {
      userId,
      amount: { gt: 0 },
      expiresAt: { gt: new Date() }, // Only non-expired entries
    },
    orderBy: [
      { source: 'asc' }, // 'free' comes before 'paid' alphabetically
      { createdAt: 'asc' },
    ],
  });

  // Consume from entries in order
  for (const entry of ledgerEntries) {
    if (remainingToConsume <= 0) break;

    const consumeFromEntry = Math.min(entry.amount, remainingToConsume);

    await prisma.energyLedger.update({
      where: { id: entry.id },
      data: {
        amount: { decrement: consumeFromEntry },
        consumedAt: entry.amount - consumeFromEntry === 0 ? new Date() : null,
      },
    });

    consumedFrom.push({
      ledgerId: entry.id,
      source: entry.source as EnergySource,
      amount: consumeFromEntry,
    });

    remainingToConsume -= consumeFromEntry;
  }

  // Update user balance
  await prisma.user.update({
    where: { id: userId },
    data: { energyBalance: { decrement: amount } },
  });

  return {
    success: true,
    consumed: amount,
    consumedFrom,
    newBalance: user!.energyBalance - amount,
  };
}

/**
 * Get detailed energy breakdown
 */
export async function getEnergyBreakdown(userId: string) {
  const ledgerEntries = await prisma.energyLedger.findMany({
    where: {
      userId,
      amount: { gt: 0 },
      expiresAt: { gt: new Date() }, // Only non-expired entries
    },
    orderBy: [
      { source: 'asc' },
      { createdAt: 'asc' },
    ],
  });

  const freeEnergy = ledgerEntries
    .filter(e => e.source === 'free')
    .reduce((sum, e) => sum + e.amount, 0);

  const paidEnergy = ledgerEntries
    .filter(e => e.source === 'paid')
    .reduce((sum, e) => sum + e.amount, 0);

  // Find earliest expiry
  const earliestExpiry = ledgerEntries.length > 0
    ? ledgerEntries.reduce((earliest, e) =>
        !earliest || e.expiresAt! < earliest.expiresAt! ? e : earliest
      ).expiresAt
    : null;

  return {
    total: freeEnergy + paidEnergy,
    freeEnergy,
    paidEnergy,
    earliestExpiry,
    entryCount: ledgerEntries.length,
  };
}

/**
 * Clean up expired energy entries
 * Call this via cron job
 */
export async function cleanupExpiredEnergy() {
  const now = new Date();

  // Find expired entries with remaining balance
  const expiredEntries = await prisma.energyLedger.findMany({
    where: {
      amount: { gt: 0 },
      expiresAt: { lt: now },
    },
  });

  let totalExpired = 0;

  for (const entry of expiredEntries) {
    // Record expired energy in history
    await prisma.energyHistory.create({
      data: {
        userId: entry.userId,
        amount: -entry.amount,
        type: 'expired',
        description: `${entry.source} Energy expired`,
        metadata: { ledgerId: entry.id, expiredAt: entry.expiresAt },
      },
    });

    // Update user balance
    await prisma.user.update({
      where: { id: entry.userId },
      data: { energyBalance: { decrement: entry.amount } },
    });

    totalExpired += entry.amount;

    // Mark ledger entry as consumed
    await prisma.energyLedger.update({
      where: { id: entry.id },
      data: {
        amount: 0,
        consumedAt: now,
      },
    });
  }

  return {
    cleanedEntries: expiredEntries.length,
    totalExpired,
  };
}
