/**
 * Dreamcatcher AI - Energy Calculation Engine
 * 《白皮书 V1.0》唯一逻辑标准实现
 */

import {
  VIBE_INTERVALS,
  ATOMIC_TEMPLATES,
  TIME_WEIGHTS,
  getVibeState,
  type AtomicCard,
} from './constants-v1';

// ============================================
// 核心计算函数
// ============================================

export interface EnergyResult {
  score: number; // 0-100
  vibe: keyof typeof VIBE_INTERVALS;
  card: AtomicCard;
  debug?: {
    seed: string;
    baseScore: number;
    timeWeight: number;
    starWeight: number;
    dateHash: number;
  };
}

/**
 * 计算能量状态（白皮书 V1.0 算法）
 *
 * 算法流程：
 * 1. Seed 转换：3位数字 → baseScore (0-100)
 * 2. 时间调整：应用日/月/建星权重
 * 3. 日期扰动：添加微扰增加随机性
 * 4. Vibe 判定：映射到 Flow/Balanced/Low/Depleted
 * 5. 文案生成：从 ATOMIC_TEMPLATES 提取内容
 */
export function calculateEnergy(seed: string): EnergyResult {
  const now = new Date();

  // 步骤 1: Seed 转换
  const seedNum = parseInt(seed.padStart(3, '0'), 10);
  if (isNaN(seedNum) || seedNum < 0 || seedNum > 999) {
    throw new Error('Invalid seed: must be 0-999');
  }

  // 基础分数：将 0-999 映射到 0-100
  const baseScore = (seedNum / 999) * 100;

  // 步骤 2: 时间权重调整（白皮书 V1.0 §4）
  const dayWeight = TIME_WEIGHTS.getDayWeight(now);
  const monthWeight = TIME_WEIGHTS.getMonthWeight(now);
  const starWeight = TIME_WEIGHTS.getStarWeight(now);

  // 综合时间权重
  const timeWeight = (dayWeight + monthWeight + starWeight) / 3;
  const timeAdjustedScore = baseScore * timeWeight;

  // 步骤 3: 日期扰动（增加每日变化）
  // 使用日期的哈希值作为扰动源
  const dateHash = now.getDate() + now.getMonth() * 31 + now.getFullYear() % 100;
  const perturbation = ((dateHash % 20) - 10); // -10 到 +10 的扰动

  // 最终分数（限制在 0-100 范围内）
  const finalScore = Math.max(0, Math.min(100, timeAdjustedScore + perturbation));
  const roundedScore = Math.round(finalScore);

  // 步骤 4: 判定 Vibe 状态
  const vibe = getVibeState(roundedScore);

  // 步骤 5: 生成 Atomic Card（白皮书 V1.0 §9）
  const template = ATOMIC_TEMPLATES[vibe];

  // 使用 seed 作为确定性选择器
  const card: AtomicCard = {
    status: template.status[seedNum % template.status.length],
    oracle: template.oracle[(seedNum + 1) % template.oracle.length],
    supported: [
      ...template.supported[(seedNum + 2) % template.supported.length]
    ],
    adjustment: template.adjustment[(seedNum + 3) % template.adjustment.length],
  };

  return {
    score: roundedScore,
    vibe,
    card,
    debug: {
      seed,
      baseScore: Math.round(baseScore * 100) / 100,
      timeWeight: Math.round(timeWeight * 1000) / 1000,
      starWeight: Math.round(starWeight * 1000) / 1000,
      dateHash,
    },
  };
}

// ============================================
// 批量计算（用于测试或分析）
// ============================================

export function calculateBatchEnergy(seeds: string[]): EnergyResult[] {
  return seeds.map(seed => calculateEnergy(seed));
}

// ============================================
// 辅助函数：能量趋势分析
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
// 导出类型（供 UI 使用）
// ============================================

export type { AtomicCard };
