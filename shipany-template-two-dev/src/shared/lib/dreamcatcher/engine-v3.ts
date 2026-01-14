/**
 * Dreamcatcher AI - Tri-Factor Resonance Engine (V3.0)
 * 基于梅花易数的三因子共振模型
 *
 * 核心逻辑：
 * 上卦（外部环境）= (Input A + Input B) % 8
 * 下卦（内部生物场）= (Input B + Input C) % 8
 * 动爻（焦点）= (Input A + Input B + Input C) % 6 + 1
 *
 * 哲学：系统不预测运气，而是识别"系统摩擦"和"最优窗口"
 */

import {
  TRIGRAMS,
  MOVING_POSITIONS,
  USER_MODES,
  TRI_FACTOR_INPUTS,
  GLOBAL_DISCLAIMER,
} from './constants';

// === Core Types ===

export type UserMode = keyof typeof USER_MODES;

export interface TriFactorInputs {
  A?: number; // 生物签名：生日或随机3位
  B: number; // 环境语境：日期总和
  C: number; // 时间脉冲：时辰 (0-23)
}

export interface HexagramReading {
  upper_trigram: number; // 0-7
  lower_trigram: number; // 0-7
  moving_position: number; // 1-6
  upper_name: string;
  lower_name: string;
  moving_layer: string;
  moving_focus: string;
}

export interface L1Card {
  status: string;
  oracle: string;
  supported: string[];
  adjustment: string;
  disclaimer: string;
}

export interface L2Interpretation {
  theme: string;
  resonance_pattern: string; // 上卦 + 下卦的组合解读
  bio_field_intensity: number; // 0-100% 生物场强度
  state_description: string; // 整体状态描述
  friction_point: string; // 基于动爻的摩擦点
  strategic_recalibration: string[]; // 3个基于动爻的具体建议
  optimal_window: string; // 当前条件支持什么
  execution_blueprint: string[]; // 具体执行步骤（新增）
  disclaimer: string;
}

export interface TriFactorResult {
  mode: UserMode;
  hexagram: HexagramReading;
  l1_card: L1Card;
  l2_interpretation: L2Interpretation;
  timestamp: number;
}

// === Helper Functions ===

/**
 * 计算日期总和（Input B）
 * 例如：2024-01-08 → 2+0+2+4+0+1+0+8 = 17
 */
export const calculateDateSum = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const sum = String(year).split('').map(Number)
    .concat(String(month).split('').map(Number))
    .concat(String(day).split('').map(Number))
    .reduce((acc, n) => acc + n, 0);

  return sum;
};

/**
 * 计算当前时辰（Input C）
 * 返回 0-23 的小时数
 */
export const getCurrentHour = (date: Date): number => {
  return date.getHours();
};

/**
 * 计算三因子并生成卦象
 */
export const calculateHexagram = (inputs: TriFactorInputs): HexagramReading => {
  const { A = 0, B, C } = inputs;

  // 上卦 = (A + B) % 8
  const upper_trigram = (A + B) % 8;

  // 下卦 = (B + C) % 8
  const lower_trigram = (B + C) % 8;

  // 动爻 = (A + B + C) % 6 + 1 (结果为 1-6)
  const moving_position = ((A + B + C) % 6) + 1;

  const upper_data = TRIGRAMS[upper_trigram as keyof typeof TRIGRAMS];
  const lower_data = TRIGRAMS[lower_trigram as keyof typeof TRIGRAMS];
  const moving_data = MOVING_POSITIONS[moving_position as keyof typeof MOVING_POSITIONS];

  return {
    upper_trigram,
    lower_trigram,
    moving_position,
    upper_name: upper_data.name,
    lower_name: lower_data.name,
    moving_layer: moving_data.layer,
    moving_focus: moving_data.focus_area,
  };
};

/**
 * 生成 L1 卡片（精英导师风格 - 精准、高效、100% 英文）
 */
const generateL1Card = (hexagram: HexagramReading): L1Card => {
  const upper_data = TRIGRAMS[hexagram.upper_trigram as keyof typeof TRIGRAMS];
  const lower_data = TRIGRAMS[hexagram.lower_trigram as keyof typeof TRIGRAMS];
  const moving_data = MOVING_POSITIONS[hexagram.moving_position as keyof typeof MOVING_POSITIONS];

  // 状态 = 上卦的现代含义
  const status = `${upper_data.name} ${lower_data.name} Resonance`;

  // 预言 = 结合上下卦的语境
  const oracle = `External field shows ${upper_data.modern_meaning.toLowerCase()}, while internal field requires ${lower_data.modern_meaning.toLowerCase()}. ${upper_data.performance_context}`;

  // 支持行动 = 基于动爻的推荐（已经是英文）
  const supported = [...moving_data.recommended_actions];

  // 调整建议 = 动爻的现代翻译
  const adjustment = moving_data.modern_translation;

  return {
    status,
    oracle,
    supported,
    adjustment,
    disclaimer: GLOBAL_DISCLAIMER,
  };
};

/**
 * 计算生物场强度（0-100）
 * 基于卦象的和谐度和动爻位置
 */
const calculateBioFieldIntensity = (hexagram: HexagramReading): number => {
  const { upper_trigram, lower_trigram, moving_position } = hexagram;

  // 基础强度：上下卦相同 = 高强度
  let baseIntensity = upper_trigram === lower_trigram ? 85 : 65;

  // 根据动爻位置调整
  const positionModifiers: Record<number, number> = {
    1: -15, // Foundation issues reduce intensity
    2: -10,
    3: +5,
    4: +10, // Execution layer is active
    5: +15, // Direction is clear
    6: -5, // Network needs work
  };

  const finalIntensity = Math.max(0, Math.min(100, baseIntensity + (positionModifiers[moving_position] || 0)));
  return finalIntensity;
};

/**
 * 生成 L2 深度解读（支持性导师风格 - 实用、落地、口语化）
 */
const generateL2Interpretation = (hexagram: HexagramReading): L2Interpretation => {
  const upper_data = TRIGRAMS[hexagram.upper_trigram as keyof typeof TRIGRAMS];
  const lower_data = TRIGRAMS[hexagram.lower_trigram as keyof typeof TRIGRAMS];
  const moving_data = MOVING_POSITIONS[hexagram.moving_position as keyof typeof MOVING_POSITIONS];

  // 计算生物场强度
  const bio_field_intensity = calculateBioFieldIntensity(hexagram);

  // 主题 = 只显示英文卦象组合
  const theme = `${upper_data.name} over ${lower_data.name}`;

  // 共振模式 = 上卦和下卦的交互（深层解释，不是重复鼓动）
  let resonance_pattern = '';
  if (upper_data.name === lower_data.name) {
    // 上下卦相同 - 提供深层洞察
    if (upper_data.name === 'Kinetic') {
      resonance_pattern = `Both external and internal fields are in launch mode. This creates maximum momentum, but without execution refinement, energy scatters. Focus is your multiplier.`;
    } else if (upper_data.name === 'Grounded') {
      resonance_pattern = `Double consolidation creates a stable but low-energy state. This is your recovery period. Trust the process and avoid forcing output.`;
    } else if (upper_data.name === 'Peak') {
      resonance_pattern = `Maximum alignment across all systems. Your capacity is at its peak, but so is the cost of error. Execute with precision, not speed.`;
    } else {
      resonance_pattern = `Both fields resonate in ${upper_data.name.toLowerCase()} energy. This alignment creates clarity and focus, but may create blind spots. Stay aware of your assumptions.`;
    }
  } else {
    // 上下卦不同 - 动态张力
    if (upper_data.name === 'Kinetic' && hexagram.moving_position === 4) {
      resonance_pattern = `System resonance is high, but execution bandwidth is finite. Momentum must be shaped, not multiplied. You have the energy—but not infinite fuel.`;
    } else if (upper_data.name === 'Pause') {
      resonance_pattern = `External conditions signal pause, but your internal state wants movement. This friction is actually feedback. The obstacle is the path.`;
    } else {
      resonance_pattern = `External conditions favor ${upper_data.name.toLowerCase()} energy, while your internal state requires ${lower_data.name.toLowerCase()}. Success comes from working with both, not choosing one.`;
    }
  }

  // 整体状态描述（口语化）
  let state_description = '';
  if (upper_data.name === lower_data.name) {
    // 上下卦相同
    if (upper_data.name === 'Kinetic') {
      state_description = `High external momentum meets internal execution power. You're in a launch window, but ${moving_data.friction_point.toLowerCase()}.`;
    } else if (upper_data.name === 'Grounded') {
      state_description = `Double consolidation mode. Not the time for bold moves. Focus on ${moving_data.focus_area.toLowerCase()}.`;
    } else if (upper_data.name === 'Peak') {
      state_description = `Maximum structural alignment. Your systems are at full capacity. Execute with precision.`;
    } else {
      state_description = `The external and internal fields are aligned in ${upper_data.name.toLowerCase()} energy. This creates focus and clarity.`;
    }
  } else {
    // 上下卦不同 - 动态张力
    if (upper_data.name === 'Kinetic' && hexagram.moving_position === 4) {
      state_description = `High external momentum meets internal execution drag. You want to move fast, but ${moving_data.friction_point.toLowerCase()}. Focus on execution refinement.`;
    } else {
      state_description = `External conditions favor ${upper_data.name.toLowerCase()} energy, while your internal state requires ${lower_data.name.toLowerCase()}. This dynamic creates opportunity if you navigate it wisely.`;
    }
  }

  // 摩擦点 = 动爻的摩擦点
  const friction_point = `${moving_data.friction_point} — Focus Point: ${moving_data.layer}`;

  // 战略调整 = 基于动爻的3个具体建议
  const strategic_recalibration = [...moving_data.recommended_actions];

  // 最优窗口 = 当前条件支持什么
  const optimal_window = `Current conditions favor ${upper_data.modern_meaning.toLowerCase()}. Consider alignment with ${lower_data.name} energy before taking action.`;

  // 执行蓝图（新增 - 具体可操作步骤）
  const execution_blueprint = [
    `Step 1: ${strategic_recalibration[0]}`,
    `Step 2: ${strategic_recalibration[1]}`,
    `Step 3: ${strategic_recalibration[2]}`,
    `Review progress in 48 hours and adjust.`,
  ];

  return {
    theme,
    resonance_pattern,
    bio_field_intensity,
    state_description,
    friction_point,
    strategic_recalibration,
    optimal_window,
    execution_blueprint,
    disclaimer: GLOBAL_DISCLAIMER,
  };
};

// === Main Engine Function ===

/**
 * 根据用户模式计算三因子共振
 */
export const calculateTriFactorResonance = (
  mode: UserMode,
  inputs: TriFactorInputs,
): TriFactorResult => {
  // 计算卦象
  const hexagram = calculateHexagram(inputs);

  // 生成 L1 卡片
  const l1_card = generateL1Card(hexagram);

  // 生成 L2 深度解读
  const l2_interpretation = generateL2Interpretation(hexagram);

  return {
    mode,
    hexagram,
    l1_card,
    l2_interpretation,
    timestamp: Date.now(),
  };
};

/**
 * Guest 模式：只使用环境因素（Input B）
 * 输出关注"Environmental Bias"（十二长生逻辑）
 */
export const calculateGuestMode = (date: Date): TriFactorResult => {
  const B = calculateDateSum(date);
  const C = getCurrentHour(date);

  return calculateTriFactorResonance('GUEST', {
    A: 0, // Guest 模式没有个人输入
    B,
    C,
  });
};

/**
 * Anonymous 模式：随机 3 位 + 时辰
 * 输出是"当前动能"的快照
 */
export const calculateAnonymousMode = (
  random3Digits: number,
  date: Date,
): TriFactorResult => {
  const A = random3Digits;
  const B = calculateDateSum(date);
  const C = getCurrentHour(date);

  return calculateTriFactorResonance('ANONYMOUS', {
    A,
    B,
    C,
  });
};

/**
 * Member 模式：存储的生日 + 意图 + 时辰
 * 每日同步或战略意图
 */
export const calculateMemberMode = (
  birthdaySum: number,
  intent3Digits?: number,
  date: Date = new Date(),
): TriFactorResult => {
  const A = intent3Digits ?? birthdaySum; // 如果没有意图，使用生日
  const B = calculateDateSum(date);
  const C = getCurrentHour(date);

  return calculateTriFactorResonance('MEMBER', {
    A,
    B,
    C,
  });
};

// === 便捷函数：从日期字符串计算生日总和 ===

/**
 * 从生日字符串（YYYY-MM-DD）计算数字总和
 */
export const calculateBirthdaySum = (birthdayStr: string): number => {
  const digits = birthdayStr.replace(/-/g, '').split('').map(Number);
  return digits.reduce((acc, n) => acc + n, 0);
};

/**
 * 从数字种子计算（支持 3 位随机数或生日）
 */
export const calculateSeedSum = (seed: string | number): number => {
  const seedStr = String(seed);
  const digits = seedStr.split('').map(Number);
  return digits.reduce((acc, n) => acc + n, 0);
};
