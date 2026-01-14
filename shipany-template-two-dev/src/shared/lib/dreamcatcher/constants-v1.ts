/**
 * Dreamcatcher AI - Core Constants & Lexicon
 * Core Lexicon & Rules Whitepaper V1.0 - Master Logic Reference
 */

// ============================================
// Part 1: Energy Score Ranges (Whitepaper V1.0 §3)
// ============================================

export const VIBE_INTERVALS = {
  FLOW: { min: 75, max: 100, label: 'Flow' },
  BALANCED: { min: 60, max: 74, label: 'Balanced' },
  LOW: { min: 40, max: 59, label: 'Low Support' },
  DEPLETED: { min: 0, max: 39, label: 'Depleted' },
} as const;

export type VibeState = keyof typeof VIBE_INTERVALS;

// ============================================
// Part 2: 10 Energy Domains (Whitepaper V1.0 §2)
// ============================================

export type DomainId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const ENERGY_DOMAINS = {
  1: {
    name: 'Time & Cycles',
    short: 'Time',
    description: 'Daily, monthly, and annual cycle influences',
  },
  2: {
    name: 'Biological Rhythm',
    short: 'BioRhythm',
    description: 'Sleep, physical energy, hormone levels',
  },
  3: {
    name: 'Emotional Account',
    short: 'Emotion',
    description: 'Current emotional state and accumulation',
  },
  4: {
    name: 'Cognitive Load',
    short: 'Cognitive',
    description: 'Brain information processing capacity',
  },
  5: {
    name: 'Social Energy',
    short: 'Social',
    description: 'Energy reserves for human interaction',
  },
  6: {
    name: 'Environment Field',
    short: 'Environment',
    description: 'Physical space impact on energy',
  },
  7: {
    name: 'Intention Intensity',
    short: 'Intention',
    description: 'Goal clarity and drive level',
  },
  8: {
    name: 'Action Capacity',
    short: 'Action',
    description: 'Execution and task completion ability',
  },
  9: {
    name: 'Meaning Sense',
    short: 'Meaning',
    description: 'Connection to value system',
  },
  10: {
    name: 'System Resilience',
    short: 'Resilience',
    description: 'Buffer capacity for unexpected situations',
  },
} as const;

// ============================================
// Part 3: 12 Construction Star System (Whitepaper V1.0 §5.2)
// ============================================

export type StarId =
  | '建' | '除' | '满' | '平' | '定' | '执'
  | '破' | '危' | '成' | '收' | '开' | '闭';

export const TWELVE_STARS = {
  建: { polarity: '+', meaning: 'Initiate, begin, construct' },
  除: { polarity: '0', meaning: 'Clear, clean, renew' },
  满: { polarity: '+', meaning: 'Complete, full, peak' },
  平: { polarity: '0', meaning: 'Balance, level, neutral' },
  定: { polarity: '+', meaning: 'Stabilize, establish, decide' },
  执: { polarity: '+', meaning: 'Persist, insist, execute' },
  破: { polarity: '-', meaning: 'Break, destroy, disband' },
  危: { polarity: '-', meaning: 'Danger, crisis, caution' },
  成: { polarity: '+', meaning: 'Achieve, complete, harvest' },
  收: { polarity: '+', meaning: 'Collect, gather, conclude' },
  开: { polarity: '+', meaning: 'Open, expand, release' },
  闭: { polarity: '-', meaning: 'Close, hide, store' },
} as const;

// ============================================
// Part 4: Traditional Almanac Behavior Mapping (Whitepaper V1.0 §5.3)
// ============================================

export const ALCHEMY_MAPPING = {
  开市: { neutral: 'Initiate', modern: 'Launch / Start / Go Live' },
  纳财: { neutral: 'Gain', modern: 'Income / Deal / Monetize' },
  立券: { neutral: 'Commit', modern: 'Sign Contract / Agreement' },
  交易: { neutral: 'Exchange', modern: 'Buy / Sell / Negotiate' },
  会亲友: { neutral: 'Connect', modern: 'Meeting / Networking' },
  嫁娶: { neutral: 'Union', modern: 'Relationship / Partnership' },
  求嗣: { neutral: 'Create', modern: 'New Idea / New Project' },
  出行: { neutral: 'Move', modern: 'Travel / Relocation' },
  移徙: { neutral: 'Shift', modern: 'Change Environment' },
  入宅: { neutral: 'Settle', modern: 'New Home / New Workspace' },
  修造: { neutral: 'Optimize', modern: 'Improve / Refactor' },
  动土: { neutral: 'Disrupt', modern: 'Structural Change' },
  安床: { neutral: 'Rest', modern: 'Sleep / Recovery' },
  沐浴: { neutral: 'Cleanse', modern: 'Reset / Detach' },
  祈福: { neutral: 'Align', modern: 'Intention / Focus' },
  祭祀: { neutral: 'Reflect', modern: 'Review / Closure' },
  破土: { neutral: 'Release', modern: 'Let Go / End Phase' },
  安葬: { neutral: 'Conclude', modern: 'Finish / Archive' },
} as const;

// ============================================
// Part 5: Six Energy Pillars (Whitepaper V1.0 §8)
// ============================================

export type PillarId = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6';

export const PILLARS = {
  P1: {
    id: 'P1' as PillarId,
    name: 'Rhythmic Alignment',
    eastern: 'Fate/Destiny',
    mechanism: 'Align actions with circadian peaks.',
  },
  P2: {
    id: 'P2' as PillarId,
    name: 'Environment Design',
    eastern: 'Feng Shui',
    mechanism: 'Reduce friction, enhance focus.',
  },
  P3: {
    id: 'P3' as PillarId,
    name: 'Social Capital',
    eastern: 'Accumulating Merit',
    mechanism: 'Build strategic relationships.',
  },
  P4: {
    id: 'P4' as PillarId,
    name: 'Cognitive Upgrade',
    eastern: 'Reading',
    mechanism: 'Elevate decisions through knowledge.',
  },
  P5: {
    id: 'P5' as PillarId,
    name: 'Presence Engineering',
    eastern: 'Name/Form',
    mechanism: 'Signal competence non-verbally.',
  },
  P6: {
    id: 'P6' as PillarId,
    name: 'Lineage Leverage',
    eastern: 'Family',
    mechanism: 'Access inherited resources.',
  },
} as const;

// ============================================
// Part 6: Energy State Lexicon (Whitepaper V1.0 §3.1)
// ZenOracle Constitution: Resonance Interpreter
// ============================================

export const VIBE_LEXICON = {
  FLOW: [
    'Expansive',
    'Magnetic',
    'Clear',
    'Amplified',
    'Aligned',
    'Decisive',
  ] as string[],
  BALANCED: [
    'Centered',
    'Stable',
    'Grounded',
    'Harmonized',
    'Composed',
    'Neutral',
  ] as string[],
  LOW: [
    'Sensitive',
    'Processing',
    'Clouded',
    'Receding Phase',
    'Constrained',
    'Heavy',
  ] as string[],
  DEPLETED: [
    'Deep Stillness',
    'Quiet Phase',
    'Sacred Conservation',
    'Stillness',
    'Zero-Point',
    'Restoring',
  ] as string[],
} as const;

// ============================================
// Part 7: Atomic Card Templates (Whitepaper V1.0 §9)
// ============================================

export interface AtomicCard {
  status: string;
  oracle: string;
  supported: string[];
  adjustment: string;
}

export const ATOMIC_TEMPLATES: Record<VibeState, {
  status: string[];
  oracle: string[];
  supported: string[][];
  adjustment: string[];
}> = {
  FLOW: {
    status: VIBE_LEXICON.FLOW,
    oracle: [
      'Your biofield is amplified. Actions taken now have disproportionate impact—choose deliberately.',
      'Momentum is strong. Direction matters more than speed. What you touch will echo.',
      'Your resonance is high. This is a premium window for high-leverage decisions.',
      'Flow state detected. Your personal field is outward-focused and ready for expansion.',
      'Maximum leverage window open. Your capacity for impact is at its peak—act with precision.',
      'Opportunity phase active. The field is receptive to calculated risks and bold commitments.',
    ],
    supported: [
      ['Make key decisions', 'Strengthen strategic connections'],
      ['Lead with clarity', 'Take calculated risks'],
      ['Execute high-leverage initiatives', 'Signal competence visibly'],
      ['Expand your network', 'Commit to major projects'],
      ['Maximize impact', 'Accelerate key initiatives'],
    ],
    adjustment: [
      'Introduce one signal of openness (open a window, adjust lighting)',
      'Stand, breathe, and orient your body forward for 30 seconds',
      'Optimize your environment for focus (clear one friction point)',
      'Create a micro-ceremony of intention setting',
      'Establish one high-impact ritual for the day',
    ],
  },
  BALANCED: {
    status: VIBE_LEXICON.BALANCED,
    oracle: [
      'Your biofield is stable. This is optimal for maintenance, optimization, and steady progress.',
      'Resonance is centered. Neither push nor retreat—consistent execution serves best.',
      'Your personal field shows coherence. Small, disciplined actions yield maximum ROI.',
      'Homeostasis achieved. Your capacity matches current demands perfectly.',
    ],
    supported: [
      ['Maintain current pace', 'Optimize existing workflows'],
      ['Strengthen core connections', 'Complete pending items'],
      ['Balance output and recovery', 'Organize your environment'],
      ['Follow established protocols', 'Document and review progress'],
    ],
    adjustment: [
      'Apply one 2-minute optimization to your workspace',
      'Take a brief walk to reset attention and posture',
      'Practice box breathing for 3 cycles',
      'Review and prioritize your top 3 metrics',
    ],
  },
  LOW: {
    status: VIBE_LEXICON.LOW,
    oracle: [
      'Your biofield is in energy conservation mode. Decision fatigue is likely—reduce cognitive load.',
      'Your resonance has turned inward. This is a recovery trough, not a performance plateau.',
      'The personal field is sensitive. Protect your capacity and avoid decision escalation.',
      'Cyclic resource management active. Your rhythm supports depth work, not breadth expansion.',
    ],
    supported: [
      ['Reduce decision scope', 'Stay with familiar protocols'],
      ['Defer major commitments', 'Focus on core deliverables'],
      ['Limit social friction', 'Prioritize recovery windows'],
      ['Avoid new initiatives', 'Simplify your context'],
    ],
    adjustment: [
      'Consider adjusting screen brightness and stepping away for 3 minutes. Then, complete one micro-task.',
      'Invite a slow moment of hydration. Return to one essential action.',
      'Allow for clearing one low-friction area. Re-enter with a single binary decision.',
      'Take a moment to list your top 3 priorities. Afterward, execute the smallest one.',
    ],
  },
  DEPLETED: {
    status: VIBE_LEXICON.DEPLETED,
    oracle: [
      'Your biofield is in deep recovery. Output capacity is suspended; restoration mode is fully active.',
      'Your resonance has reached zero-point. External action cannot reach you—internal recalibration can.',
      'The personal field has contracted. This cycle mandates presence, not performance.',
      'Systemic reset in progress. Trust the biological rhythm and allow for complete recharge.',
    ],
    supported: [
      ['Cancel non-essential commitments', 'Focus on basic maintenance only'],
      ['Defer all decisions', 'Seek low-stimulus environments'],
      ['Minimize input and cognitive load', 'Allow for complete recovery'],
      ['Protect your capacity', 'Avoid all new initiatives'],
    ],
    adjustment: [
      'Consider a 10-minute screen pause. When complete, do one thing that requires zero thought.',
      'Invite 3 minutes of horizontal reset. Afterward, hydrate with intention.',
      'Allow for 5 minutes of low-stimulus environment. Re-enter with one automatic action.',
      'Create 5 minutes of complete silence. Then, complete one ritual task.',
    ],
  },
};

// ============================================
// Part 8: Time Weight Algorithms (Whitepaper V1.0 §4)
// ============================================

export const TIME_WEIGHTS = {
  getDayWeight: (date: Date): number => {
    const dayWeights = [0.8, 0.9, 1.0, 1.1, 1.0, 0.9, 0.8]; // Sun-Sat
    return dayWeights[date.getDay()];
  },

  getMonthWeight: (date: Date): number => {
    const monthWeights = [0.9, 0.95, 1.0, 1.05, 1.1, 1.05, 1.0, 0.95, 0.9, 0.95, 1.0, 1.05];
    return monthWeights[date.getMonth()];
  },

  getStarWeight: (date: Date): number => {
    // Simplified 12 Construction Star weight (can be expanded)
    const dayOfMonth = date.getDate();
    const starIndex = (dayOfMonth - 1) % 12;
    const starPolarities = ['+', '0', '+', '0', '+', '+', '-', '-', '+', '+', '+', '-'];
    return starPolarities[starIndex] === '+' ? 1.05 : starPolarities[starIndex] === '-' ? 0.95 : 1.0;
  },
} as const;

// ============================================
// Utility Functions
// ============================================

export const getVibeState = (score: number): VibeState => {
  for (const [key, interval] of Object.entries(VIBE_INTERVALS)) {
    if (score >= interval.min && score <= interval.max) {
      return key as VibeState;
    }
  }
  return 'DEPLETED';
};

// Phase labels for user-facing display (replaces raw scores)
export const getPhaseLabel = (score: number): { name: string; direction: string } => {
  // High-performance tier differentiation
  if (score >= 95) return { name: 'Maximum Leverage', direction: 'Peak Intensity' }; // 999 range
  if (score >= 90) return { name: 'Flow Momentum', direction: 'Outward' }; // 789+ range
  if (score >= 85) return { name: 'Expansion', direction: 'Opportunity' }; // 777 range
  if (score >= 75) return { name: 'Amplified', direction: 'Outward' };
  if (score >= 60) return { name: 'Harmony', direction: 'Centered' };
  if (score >= 40) return { name: 'Processing', direction: 'Inward' };
  if (score >= 30) return { name: 'Quiet', direction: 'Inward' };
  return { name: 'Deep Stillness', direction: 'Zero-Point' };
};

export const getRandomItem = <T>(array: readonly T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getDeterministicItem = <T>(array: readonly T[], seed: number): T => {
  return array[seed % array.length];
};
