/**
 * Dreamcatcher AI - Energy Calculation Engine
 * Whitepaper V1.0 - Standard Logic Implementation
 */

import {
  VIBE_INTERVALS,
  TIME_WEIGHTS,
  getVibeState,
  ATOMIC_TEMPLATES,
  type AtomicCard,
} from './constants-v1';
import { PILLARS, type PillarId } from './constants-v1';

// ============================================
// Core Calculation Functions
// ============================================

export interface EnergyResult {
  score: number; // 0-100
  vibe: keyof typeof VIBE_INTERVALS;
  card: AtomicCard;
  energyBoosters?: EnergyBooster[];
  debug?: {
    seed: string;
    baseScore: number;
    timeWeight: number;
    starWeight: number;
    dateHash: number;
  };
}

export interface EnergyBooster {
  pillar: PillarId;
  name: string;
  action: string;
  reason: string;
}

/**
 * Calculate energy state (Whitepaper V1.0 algorithm)
 */
export function calculateEnergy(seed: string): EnergyResult {
  const now = new Date();

  // Step 1: Seed conversion
  const seedNum = parseInt(seed.padStart(3, '0'), 10);
  if (isNaN(seedNum) || seedNum < 0 || seedNum > 999) {
    throw new Error('Invalid seed: must be 0-999');
  }

  // Base score: map 0-999 to 0-100
  const baseScore = (seedNum / 999) * 100;

  // Step 2: Time weight adjustment (Whitepaper V1.0 §4)
  const dayWeight = TIME_WEIGHTS.getDayWeight(now);
  const monthWeight = TIME_WEIGHTS.getMonthWeight(now);
  const starWeight = TIME_WEIGHTS.getStarWeight(now);

  // Combined time weight
  const timeWeight = (dayWeight + monthWeight + starWeight) / 3;
  const timeAdjustedScore = baseScore * timeWeight;

  // Step 3: Date perturbation (adds daily variation)
  const dateHash = now.getDate() + now.getMonth() * 31 + now.getFullYear() % 100;
  const perturbation = ((dateHash % 20) - 10); // -10 to +10 perturbation

  // Final score (clamped to 0-100 range)
  const finalScore = Math.max(0, Math.min(100, timeAdjustedScore + perturbation));
  const roundedScore = Math.round(finalScore);

  // Step 4: Determine Vibe state
  const vibe = getVibeState(roundedScore);

  // Step 5: Generate Atomic Card (from Whitepaper lexicon)
  const template = ATOMIC_TEMPLATES[vibe];

  const card: AtomicCard = {
    status: template.status[seedNum % template.status.length],
    oracle: template.oracle[(seedNum + 1) % template.oracle.length],
    supported: [
      ...template.supported[(seedNum + 2) % template.supported.length]
    ],
    adjustment: template.adjustment[(seedNum + 3) % template.adjustment.length],
  };

  // Step 6: Generate energy booster suggestions (Whitepaper V1.0 §8 Six Pillars)
  const energyBoosters = generateEnergyBoosters(roundedScore, seedNum);

  return {
    score: roundedScore,
    vibe,
    card,
    energyBoosters,
    debug: {
      seed,
      baseScore: Math.round(baseScore * 100) / 100,
      timeWeight: Math.round(timeWeight * 1000) / 1000,
      starWeight: Math.round(starWeight * 1000) / 1000,
      dateHash,
    },
  };
}

/**
 * Generate energy booster suggestions (Whitepaper V1.0 §8)
 *
 * ZenOracle Constitution - Low-Energy Protection Protocol:
 * - score < 30: NO boosters (stillness phase, no social/performance actions)
 * - score 30-60: repair from P3 and P5
 * - score > 75: provide enhancement suggestions
 */
function generateEnergyBoosters(score: number, seedNum: number): EnergyBooster[] {
  const boosters: EnergyBooster[] = [];

  // Critical: When score < 30, return empty array (no boosters)
  if (score < 30) {
    return boosters;
  }

  if (score < 60) {
    // Medium-low energy: use P3 and P5 for repair
    const repairPillars: PillarId[] = ['P3', 'P5'];

    repairPillars.forEach(pillarId => {
      const pillar = PILLARS[pillarId];
      boosters.push({
        pillar: pillarId,
        name: pillar.name,
        action: getBoosterAction(pillarId, seedNum),
        reason: pillar.mechanism,
      });
    });
  } else if (score > 75) {
    // Flow state: provide enhancement suggestions
    const enhancePillars: PillarId[] = ['P1', 'P2', 'P4'];
    const selectedPillar = enhancePillars[seedNum % enhancePillars.length];

    const pillar = PILLARS[selectedPillar];
    boosters.push({
      pillar: selectedPillar,
      name: pillar.name,
      action: getBoosterAction(selectedPillar, seedNum + 1),
      reason: pillar.mechanism,
    });
  }

  return boosters;
}

/**
 * Get specific action suggestions (based on pillar)
 * Ultra-concise, high-leverage verbs
 * Low-energy phases: permission-based, not obligation-based
 */
function getBoosterAction(pillarId: PillarId, seed: number): string {
  const actions = {
    P1: [
      'Align work with circadian peaks',
      'Schedule decisions during high-energy windows',
      'Time-block deep work',
    ],
    P2: [
      'Clear visual clutter',
      'Optimize lighting for focus',
      'Reduce environmental friction',
    ],
    P3: [
      'Provide value without expectation',
      'Acknowledge someone\'s contribution',
      'Listen actively to one person',
    ],
    P4: [
      'Read 5 pages of challenging material',
      'Study one relevant concept',
      'Review core principles',
    ],
    P5: [
      'Wear attire that signals competence',
      'Adopt confident posture',
      'Use a pre-performance ritual',
    ],
    P6: [
      'Consult a mentor in your field',
      'Reflect on one inherited strength',
      'Leverage one systemic pattern',
    ],
  };

  const pillarActions = actions[pillarId];
  return pillarActions[seed % pillarActions.length];
}

// ============================================
// Batch Calculation
// ============================================

export function calculateBatchEnergy(seeds: string[]): EnergyResult[] {
  return seeds.map(seed => calculateEnergy(seed));
}

// ============================================
// Utility Functions: Energy Trend Analysis
// ============================================

export interface EnergyTrend {
  direction: 'rising' | 'falling' | 'stable';
  change: number;
  recommendation: string;
}

export function analyzeEnergyTrend(
  currentScore: number,
  previousScore: number
): EnergyTrend {
  const change = currentScore - previousScore;

  let direction: 'rising' | 'falling' | 'stable';
  if (Math.abs(change) < 5) {
    direction = 'stable';
  } else if (change > 0) {
    direction = 'rising';
  } else {
    direction = 'falling';
  }

  const recommendations = {
    rising: 'Continue current momentum. Focus on expansion and visibility.',
    falling: 'Conserve energy. Reduce commitments and focus on core priorities.',
    stable: 'Maintain current rhythm. Small adjustments yield best results.',
  };

  return {
    direction,
    change: Math.round(change * 100) / 100,
    recommendation: recommendations[direction],
  };
}

// ============================================
// Export Types
// ============================================

export type { AtomicCard };
