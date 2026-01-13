/**
 * Dreamcatcher AI - Advanced Energy Engine (Domain Matrix V1.0)
 * ZenOracle Constitution: Resonance Interpreter, not judge
 * 基于 10 大 Energy Domains 的全景能量计算引擎
 */

import {
  VIBE_INTERVALS,
  ATOMIC_TEMPLATES,
  L2_TEMPLATES,
  TIME_WEIGHTS,
  getVibeState,
} from './constants';

// === Core Types ===
export interface EnergySeed {
  value: number; // 0-1
  seed_type: 'random_click' | 'numeric' | 'birth';
}

export interface AtomicCard {
  status: string;
  oracle: string;
  supported: string[];
  adjustment: string;
}

// Dual-Layer Output System
export interface L2Interpretation {
  theme: string; // One-line metaphor
  core_meaning: string; // Normalizing through analogies
  critical_alerts: string[]; // 2-3 Stop/Avoid warnings
  practical_wisdom: string[]; // 2-3 low-effort, high-impact actions
  energy_shift: string; // Value-calibration sentence
}

// === Domain Matrix Types ===
export type DomainId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type Polarity = '+' | '0' | '-' | '±';

export type DetectMethod = 'Seed' | '时间' | '自报' | '默认';

export type OutputType = 'Status' | 'Oracle' | 'Supported' | 'Adjustment';

export interface DomainRule {
  domain: DomainId;
  factor: string;
  polarity: Polarity;
  detect_method: DetectMethod;
  vibe_effect: string;
  output_type: OutputType;
  compressible: boolean;
}

export interface EnergyContext {
  seed: string;
  date: Date;
  userReportedFactors?: string[]; // 用户自报的影响因子
}

export interface EngineResult {
  score: number;
  vibe: keyof typeof VIBE_INTERVALS;
  // L1: Atomic Card (Elite Mentor - precise, high-leverage, 100% English)
  l1_card: AtomicCard;
  // L2: Deep Reading (Supportive Master - grounded, practical, bilingual)
  l2_interpretation: L2Interpretation;
  appliedRules: DomainRule[];
  domainBreakdown: {
    [key in DomainId]?: {
      influence: number;
      rules: DomainRule[];
    };
  };
  // ZenOracle Constitution: Low-Energy Protection Protocol
  disableBoosters: boolean; // If score < 30, disable all social/performance boosters
}

// === Domain Rules Matrix (全景母表) ===
const DOMAIN_RULES: DomainRule[] = [
  // Domain 1: 时间与周期 (Time & Cycles)
  {
    domain: 1,
    factor: '日周期高峰',
    polarity: '+',
    detect_method: '时间',
    vibe_effect: '时间',
    output_type: 'Status',
    compressible: false,
  },
  {
    domain: 1,
    factor: '日周期低谷',
    polarity: '-',
    detect_method: '时间',
    vibe_effect: '时间',
    output_type: 'Oracle',
    compressible: false,
  },
  {
    domain: 1,
    factor: '周期重复',
    polarity: '0',
    detect_method: '时间',
    vibe_effect: '时间',
    output_type: 'Oracle',
    compressible: true,
  },

  // Domain 2: 天赋与体质 (Innate Capacity)
  {
    domain: 2,
    factor: '高敏体质',
    polarity: '±',
    detect_method: 'Seed',
    vibe_effect: 'Seed',
    output_type: 'Oracle',
    compressible: true,
  },
  {
    domain: 2,
    factor: '决策耐受低',
    polarity: '-',
    detect_method: '默认',
    vibe_effect: '默认',
    output_type: 'Supported',
    compressible: false,
  },

  // Domain 3: 运势与阶段 (Life Phases)
  {
    domain: 3,
    factor: '扩张期',
    polarity: '+',
    detect_method: '时间',
    vibe_effect: '时间',
    output_type: 'Supported',
    compressible: true,
  },
  {
    domain: 3,
    factor: '收敛期',
    polarity: '-',
    detect_method: '时间',
    vibe_effect: '时间',
    output_type: 'Oracle',
    compressible: false,
  },

  // Domain 4: 空间与环境 (Environment & Fengshui)
  {
    domain: 4,
    factor: '光线不足',
    polarity: '-',
    detect_method: '默认',
    vibe_effect: '默认',
    output_type: 'Adjustment',
    compressible: false,
  },
  {
    domain: 4,
    factor: '信息过载',
    polarity: '-',
    detect_method: '默认',
    vibe_effect: '默认',
    output_type: 'Adjustment',
    compressible: false,
  },

  // Domain 5: 行为与习惯 (Actions & Habits)
  {
    domain: 5,
    factor: '多任务',
    polarity: '-',
    detect_method: '默认',
    vibe_effect: '默认',
    output_type: 'Oracle',
    compressible: true,
  },
  {
    domain: 5,
    factor: '固定节奏',
    polarity: '+',
    detect_method: '默认',
    vibe_effect: '默认',
    output_type: 'Supported',
    compressible: true,
  },

  // Domain 6: 认知与学习 (Mind & Knowledge)
  {
    domain: 6,
    factor: '持续学习',
    polarity: '+',
    detect_method: '默认',
    vibe_effect: '默认',
    output_type: 'Oracle',
    compressible: true,
  },
  {
    domain: 6,
    factor: '信息浅尝',
    polarity: '-',
    detect_method: '默认',
    vibe_effect: '默认',
    output_type: 'Oracle',
    compressible: true,
  },

  // Domain 7: 社会关系与支持 (Social Field)
  {
    domain: 7,
    factor: '正向反馈',
    polarity: '+',
    detect_method: '默认',
    vibe_effect: '默认',
    output_type: 'Status',
    compressible: true,
  },
  {
    domain: 7,
    factor: '孤立状态',
    polarity: '-',
    detect_method: '默认',
    vibe_effect: '默认',
    output_type: 'Oracle',
    compressible: false,
  },

  // Domain 8: 形象与信号 (Presence & Appearance)
  {
    domain: 8,
    factor: '得体形象',
    polarity: '+',
    detect_method: '默认',
    vibe_effect: '默认',
    output_type: 'Status',
    compressible: true,
  },
  {
    domain: 8,
    factor: '自我否定语言',
    polarity: '-',
    detect_method: '默认',
    vibe_effect: '默认',
    output_type: 'Adjustment',
    compressible: false,
  },

  // Domain 9: 意义、善意与回馈 (Virtue & Contribution)
  {
    domain: 9,
    factor: '主动帮助',
    polarity: '+',
    detect_method: '默认',
    vibe_effect: '默认',
    output_type: 'Oracle',
    compressible: true,
  },
  {
    domain: 9,
    factor: '利他行为',
    polarity: '+',
    detect_method: '默认',
    vibe_effect: '默认',
    output_type: 'Supported',
    compressible: true,
  },

  // Domain 10: 修复、养护与恢复 (Restoration & Health)
  {
    domain: 10,
    factor: '睡眠不足',
    polarity: '-',
    detect_method: '默认',
    vibe_effect: '默认',
    output_type: 'Supported',
    compressible: false,
  },
  {
    domain: 10,
    factor: '主动休息',
    polarity: '+',
    detect_method: '默认',
    vibe_effect: '默认',
    output_type: 'Adjustment',
    compressible: false,
  },
];

// === Domain Priority Order ===
const DOMAIN_PRIORITY: DomainId[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// === Core Engine Functions ===

/**
 * 主计算函数：基于 Energy Seed 和 Domain 矩阵计算能量状态
 */
export function calculateEnergy(context: EnergyContext): EngineResult {
  const { seed, date } = context;
  
  // 1. Parse seed
  const numericSeed = parseInt(seed.padStart(3, '0'), 10);
  if (isNaN(numericSeed) || numericSeed < 0 || numericSeed > 999) {
    throw new Error('Invalid seed: must be 0-999');
  }

  // 2. Calculate base score
  const seedValue = numericSeed / 999;
  const baseScore = seedValue * 100;

  // 3. Apply time weights (Domain 1)
  const dayWeight = TIME_WEIGHTS.getDayWeight(date);
  const monthWeight = TIME_WEIGHTS.getMonthWeight(date);
  const timeWeight = (dayWeight + monthWeight) / 2;
  const timeAdjustedScore = baseScore * timeWeight;

  // 4. Select applicable rules (最多3个Domain)
  const applicableRules = selectApplicableRules(context, numericSeed);

  // 5. Calculate domain influences
  const domainBreakdown = calculateDomainInfluences(applicableRules, numericSeed);

  // 6. Apply domain effects to score
  let finalScore = timeAdjustedScore;
  for (const influence of Object.values(domainBreakdown)) {
    finalScore += influence.influence;
  }

  // 7. Clamp to valid range
  finalScore = Math.max(0, Math.min(100, finalScore));

  // 8. Determine vibe state
  const vibe = getVibeState(Math.round(finalScore));

  // 9. Generate atomic card (L1: Elite Mentor)
  const l1_card = generateAtomicCardFromRules(vibe, applicableRules, numericSeed);

  // 10. Generate L2 interpretation (Supportive Master - Bilingual)
  const l2_interpretation = generateL2Interpretation(vibe, numericSeed);

  // 11. ZenOracle Constitution: Low-Energy Protection Protocol
  // If score < 30, disable all social/performance boosters
  const disableBoosters = finalScore < 30;

  return {
    score: Math.round(finalScore),
    vibe,
    l1_card,
    l2_interpretation,
    appliedRules: applicableRules,
    domainBreakdown,
    disableBoosters,
  };
}

/**
 * 选择适用的 Domain 规则（最多3个）
 */
function selectApplicableRules(context: EnergyContext, seed: number): DomainRule[] {
  const rules: DomainRule[] = [];
  const usedDomains = new Set<DomainId>();

  // 1. Time-based rules (Domain 1)
  const timeRules = DOMAIN_RULES.filter(r => r.domain === 1 && r.detect_method === '时间');
  if (timeRules.length > 0) {
    const selectedTimeRule = selectTimeBasedRule(timeRules, context.date);
    rules.push(selectedTimeRule);
    usedDomains.add(1);
  }

  // 2. Seed-based rules (Domain 2)
  const seedRules = DOMAIN_RULES.filter(r => r.domain === 2 && r.detect_method === 'Seed');
  if (seedRules.length > 0) {
    const seedRule = seedRules[seed % seedRules.length];
    rules.push(seedRule);
    usedDomains.add(2);
  }

  // 3. User-reported factors
  if (context.userReportedFactors) {
    for (const factor of context.userReportedFactors.slice(0, 2)) { // 最多再选2个
      const matchingRule = DOMAIN_RULES.find(r => 
        r.factor === factor && !usedDomains.has(r.domain)
      );
      if (matchingRule) {
        rules.push(matchingRule);
        usedDomains.add(matchingRule.domain);
      }
    }
  }

  // 4. Fill remaining slots with default rules (按优先级)
  for (const domain of DOMAIN_PRIORITY) {
    if (rules.length >= 3) break;
    if (usedDomains.has(domain)) continue;

    const defaultRule = DOMAIN_RULES.find(r => 
      r.domain === domain && r.detect_method === '默认'
    );
    if (defaultRule) {
      rules.push(defaultRule);
      usedDomains.add(defaultRule.domain);
    }
  }

  return rules.slice(0, 3); // 确保最多3个
}

/**
 * 基于时间选择 Domain 1 规则
 */
function selectTimeBasedRule(timeRules: DomainRule[], date: Date): DomainRule {
  const hour = date.getHours();
  
  // 简化版：6-18点为高峰，其他为低谷
  if (hour >= 6 && hour < 18) {
    return timeRules.find(r => r.factor === '日周期高峰') || timeRules[0];
  } else {
    return timeRules.find(r => r.factor === '日周期低谷') || timeRules[0];
  }
}

/**
 * 计算各 Domain 对分数的影响
 */
function calculateDomainInfluences(
  rules: DomainRule[],
  seed: number
): EngineResult['domainBreakdown'] {
  const breakdown: EngineResult['domainBreakdown'] = {};

  for (const rule of rules) {
    let influence = 0;

    switch (rule.polarity) {
      case '+':
        influence = 5 + (seed % 8); // +5 到 +12
        break;
      case '-':
        influence = -8 - (seed % 7); // -8 到 -14
        break;
      case '0':
        influence = (seed % 5) - 2; // -2 到 +2
        break;
      case '±':
        influence = (seed % 11) - 5; // -5 到 +5
        break;
    }

    if (!breakdown[rule.domain]) {
      breakdown[rule.domain] = { influence: 0, rules: [] };
    }
    
    breakdown[rule.domain]!.influence += influence;
    breakdown[rule.domain]!.rules.push(rule);
  }

  return breakdown;
}

/**
 * 基于选中的规则生成 Atomic Card (L1: Elite Mentor)
 */
function generateAtomicCardFromRules(
  vibe: keyof typeof VIBE_INTERVALS,
  rules: DomainRule[],
  seed: number
): AtomicCard {
  const template = ATOMIC_TEMPLATES[vibe];

  // 基于规则影响选择内容
  const statusIndex = seed % template.status.length;
  const oracleIndex = (seed + 1) % template.oracle.length;
  const supportedIndex = (seed + 2) % template.supported.length;
  const adjustmentIndex = (seed + 3) % template.adjustment.length;

  return {
    status: template.status[statusIndex],
    oracle: template.oracle[oracleIndex],
    supported: [...template.supported[supportedIndex]],
    adjustment: template.adjustment[adjustmentIndex],
  };
}

/**
 * 生成 L2 深度解读 (Supportive Master - Bilingual)
 */
function generateL2Interpretation(
  vibe: keyof typeof VIBE_INTERVALS,
  seed: number
): L2Interpretation {
  const template = L2_TEMPLATES[vibe];

  // Select content deterministically
  const wisdomIndex = seed % template.practical_wisdom.length;

  return {
    theme: template.theme,
    core_meaning: template.core_meaning,
    critical_alerts: template.critical_alerts,
    practical_wisdom: template.practical_wisdom.slice(wisdomIndex, wisdomIndex + 3),
    energy_shift: template.energy_shift,
  };
}

// === Utility Functions ===

/**
 * 获取 Domain 的中文名称
 */
export function getDomainName(domain: DomainId): string {
  const names = {
    1: '时间与周期',
    2: '天赋与体质',
    3: '运势与阶段',
    4: '空间与环境',
    5: '行为与习惯',
    6: '认知与学习',
    7: '社会关系与支持',
    8: '形象与信号',
    9: '意义、善意与回馈',
    10: '修复、养护与恢复',
  };
  return names[domain];
}

/**
 * 获取所有可用的 Domain 规则
 */
export function getAllDomainRules(): DomainRule[] {
  return [...DOMAIN_RULES];
}

/**
 * 检查特定 Domain 的规则
 */
export function getDomainRules(domain: DomainId): DomainRule[] {
  return DOMAIN_RULES.filter(r => r.domain === domain);
}

// === Legacy Compatibility ===

/**
 * 兼容旧版本的简单计算函数
 * @deprecated 使用 calculateEnergy(context) 替代
 */
export function calculateEnergyLegacy(seed: string): {
  score: number;
  vibe: keyof typeof VIBE_INTERVALS;
  l1_card: AtomicCard;
  l2_interpretation: L2Interpretation;
  disableBoosters: boolean;
} {
  const context: EnergyContext = {
    seed,
    date: new Date(),
  };

  const result = calculateEnergy(context);

  return {
    score: result.score,
    vibe: result.vibe,
    l1_card: result.l1_card,
    l2_interpretation: result.l2_interpretation,
    disableBoosters: result.disableBoosters,
  };
}
