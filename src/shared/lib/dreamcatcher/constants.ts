/**
 * Dreamcatcher AI - Core Constants & Lexicon
 * 白皮书 V1.0 标准化词库与映射表
 * V3.0 Upgrade: 梅花易数三因子共振模型
 */

import { REQUIRED_DISCLAIMERS } from './constitution';

// === Energy Seed Types ===
export const SEED_TYPES = {
  RANDOM_CLICK: 'random_click',
  NUMERIC: 'numeric',
  BIRTH: 'birth',
} as const;

// === V3.0: User Modes (三种用户路径) ===
export const USER_MODES = {
  GUEST: 'guest', // 仅使用 Input B（环境偏向）
  ANONYMOUS: 'anonymous', // Input A（随机）+ Input C（时辰）
  MEMBER: 'member', // 存储的生日 + 意图 + 时辰
} as const;

// === V3.0: Tri-Factor Inputs (三因子输入) ===
export const TRI_FACTOR_INPUTS = {
  A: 'bio_signature', // 生物签名：生日或随机3位
  B: 'environmental_context', // 环境语境：日期总和
  C: 'temporal_pulse', // 时间脉冲：当前时辰
} as const;

// === V3.0: Trigrams (八卦现代化映射 - 成功学/心理学口语化) ===
export const TRIGRAMS = {
  0: {
    name: 'Grounded',
    chinese: '坤',
    color: 'from-amber-600 to-yellow-400', // 稳定的土黄色
    modern_meaning: 'Foundation building / Resource consolidation / Stable base',
    performance_context: 'This is your consolidation phase. Strengthen foundations before expanding.',
  },
  1: {
    name: 'Kinetic',
    chinese: '震',
    color: 'from-green-500 to-emerald-400', // Neon Green - 动能绿色
    modern_meaning: 'Action trigger / Launch momentum / Initiative energy',
    performance_context: 'Green light for movement. Start now, adjust as you go.',
  },
  2: {
    name: 'Flow',
    chinese: '坎',
    color: 'from-blue-500 to-cyan-400', // 水流蓝
    modern_meaning: 'Adaptability / Navigation through obstacles / Deep processing',
    performance_context: 'Go with the current. Flexibility beats force right now.',
  },
  3: {
    name: 'Connection',
    chinese: '兑',
    color: 'from-pink-500 to-rose-400', // 连接粉色
    modern_meaning: 'Communication / Exchange / Social resonance',
    performance_context: 'Conversation and feedback flow easily. Reach out.',
  },
  4: {
    name: 'Pause',
    chinese: '艮',
    color: 'from-slate-500 to-gray-400', // 暂停灰色
    modern_meaning: 'Stillness / Boundary setting / Strategic rest',
    performance_context: 'Stop sign. Reflect before you act.',
  },
  5: {
    name: 'Visibility',
    chinese: '离',
    color: 'from-orange-500 to-amber-400', // 可见橙色
    modern_meaning: 'Clarity / Recognition / Illumination',
    performance_context: 'You are seen. Make your moves visible and documented.',
  },
  6: {
    name: 'Gradual',
    chinese: '巽',
    color: 'from-teal-500 to-cyan-400', // 渐进青色
    modern_meaning: 'Incremental progress / Persistent influence / Penetration',
    performance_context: 'Small consistent actions win over force. Keep showing up.',
  },
  7: {
    name: 'Peak',
    chinese: '乾',
    color: 'from-violet-600 to-purple-400', // 巅峰紫色
    modern_meaning: 'Maximum structure / Authority / Full power',
    performance_context: 'Full capacity. Execute with confidence and precision.',
  },
} as const;

// === V3.0: Moving Positions (六爻系统级映射 - 口语化成功学表达) ===
export const MOVING_POSITIONS = {
  1: {
    layer: 'Foundation Layer',
    focus_area: 'Physical Base',
    friction_point: 'Your foundation needs attention',
    recommended_actions: ['Get proper rest', 'Drink more water', 'Clear your space'],
    modern_translation: 'Recovery first. Your basics (sleep, hydration, environment) determine your peak performance.',
  },
  2: {
    layer: 'Foundation Layer',
    focus_area: 'Resource Management',
    friction_point: 'Your resources are stretched thin',
    recommended_actions: ['Review your commitments', 'Say no to new requests', 'Protect your boundaries'],
    modern_translation: 'Consolidate before you expand. Quality over quantity right now.',
  },
  3: {
    layer: 'Execution Layer',
    focus_area: 'Workflow Systems',
    friction_point: 'Your systems need tuning',
    recommended_actions: ['Optimize your process', 'Batch similar tasks', 'Reduce task switching'],
    modern_translation: 'Work smarter, not harder. Small system fixes create big leverage.',
  },
  4: {
    layer: 'Execution Layer',
    focus_area: 'Decision Load',
    friction_point: 'Your decision bandwidth is maxed out',
    recommended_actions: ['Delegate complex choices', 'Create decision frameworks', 'Focus on one thing at a time'],
    modern_translation: 'Your mental energy is precious. Protect it by simplifying and delegating.',
  },
  5: {
    layer: 'Strategic Layer',
    focus_area: 'Strategic Clarity',
    friction_point: 'Your long-term vision needs recalibration',
    recommended_actions: ['Pause major commitments', 'Reconnect with your "why"', 'Gather more data first'],
    modern_translation: 'Slow down to speed up. Clarity now prevents wrong turns later.',
  },
  6: {
    layer: 'Strategic Layer',
    focus_area: 'Network Leverage',
    friction_point: 'Your social network needs attention',
    recommended_actions: ['Have that key conversation', 'Reach out to mentors', 'Avoid unnecessary conflicts'],
    modern_translation: 'Your network is your net worth. Invest in key relationships strategically.',
  },
} as const;

// === V3.0: Global Disclaimer (全局免责声明) ===
export const GLOBAL_DISCLAIMER = REQUIRED_DISCLAIMERS.FINAL_DECISION_MAKER + ' ' + REQUIRED_DISCLAIMERS.INFORMS_NOT_COMMANDS;

// === V3.0: 12 Officers (十二建除 - 现代化映射) ===
// 用于 Guest Mode 的环境氛围
export const TWELVE_OFFICERS = {
  建: {
    name: 'Establish',
    chinese: '建',
    color_type: 'expanding',
    color_class: 'from-yellow-400 via-amber-500 to-orange-500', // Expanding Golden Aura
    system_status: 'LAUNCH PHASE',
    environment_report: 'Structural integrity is high. Excellent for new initiatives and long-term planning.',
  },
  除: {
    name: 'Clear',
    chinese: '除',
    color_type: 'expanding',
    color_class: 'from-yellow-300 via-green-400 to-emerald-500',
    system_status: 'CLEANSING PHASE',
    environment_report: 'Old patterns release easily. Good for breaking habits and clearing obstacles.',
  },
  满: {
    name: 'Fullness',
    chinese: '满',
    color_type: 'expanding',
    color_class: 'from-green-400 via-teal-500 to-cyan-500',
    system_status: 'AMPLIFICATION PHASE',
    environment_report: 'Energy at peak capacity. Optimal for completion and celebration.',
  },
  平: {
    name: 'Balance',
    chinese: '平',
    color_type: 'stable',
    color_class: 'from-blue-400 via-indigo-400 to-violet-400',
    system_status: 'HARMONY PHASE',
    environment_report: 'Equilibrium point. Good for maintenance and steady progress.',
  },
  定: {
    name: 'Stabilize',
    chinese: '定',
    color_type: 'contracting',
    color_class: 'from-blue-500 via-indigo-600 to-purple-600',
    system_status: 'ANCHORING PHASE',
    environment_report: 'Energy consolidates. Focus on completion and securing gains.',
  },
  执: {
    name: 'Hold',
    chinese: '执',
    color_type: 'contracting',
    color_class: 'from-indigo-500 via-purple-600 to-violet-700',
    system_status: 'GRIP PHASE',
    environment_report: 'Maintain position. Not ideal for new starts, excellent for defense.',
  },
  破: {
    name: 'Break',
    chinese: '破',
    color_type: 'contracting',
    color_class: 'from-red-500 via-rose-600 to-pink-600',
    system_status: 'DISRUPTION PHASE',
    environment_report: 'Hidden weaknesses surface. Avoid bold moves. Focus on repair.',
  },
  危: {
    name: 'Risk',
    chinese: '危',
    color_type: 'contracting',
    color_class: 'from-red-600 via-orange-600 to-amber-600',
    system_status: 'CAUTION PHASE',
    environment_report: 'Volatility detected. Reduce exposure, protect core assets.',
  },
  成: {
    name: 'Achieve',
    chinese: '成',
    color_type: 'expanding',
    color_class: 'from-emerald-400 via-green-500 to-teal-500',
    system_status: 'REALIZATION PHASE',
    environment_report: 'Projects complete naturally. Good for harvest and recognition.',
  },
  收: {
    name: 'Receive',
    chinese: '收',
    color_type: 'contracting',
    color_class: 'from-teal-500 via-blue-600 to-indigo-600',
    system_status: 'INTEGRATION PHASE',
    environment_report: 'Energy turns inward. Time for review, rest, and reorganization.',
  },
  开: {
    name: 'Open',
    chinese: '开',
    color_type: 'expanding',
    color_class: 'from-cyan-400 via-blue-500 to-violet-500',
    system_status: 'EXPANSION PHASE',
    environment_report: 'New possibilities emerge. Excellent for networking and exploration.',
  },
  闭: {
    name: 'Close',
    chinese: '闭',
    color_type: 'contracting',
    color_class: 'from-indigo-600 via-purple-700 to-slate-800', // Contracting Indigo Sphere
    system_status: 'DORMANCY PHASE',
    environment_report: 'Energy contracts. Focus on planning and internal development.',
  },
} as const;

/**
 * 计算当前日期的十二建除
 * @param date 日期
 * @returns 十二建除的key（建、除、满等）
 */
export const calculateTwelveOfficer = (date: Date): keyof typeof TWELVE_OFFICERS => {
  // 简化版算法：基于日期的模运算
  // 实际应使用完整的天干地支计算
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const officers: (keyof typeof TWELVE_OFFICERS)[] = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'];
  return officers[dayOfYear % 12];
};

// === Vibe State Intervals ===
export const VIBE_INTERVALS = {
  FLOW: { min: 75, max: 100, label: 'Flow' },
  BALANCED: { min: 60, max: 74, label: 'Balanced' },
  LOW: { min: 40, max: 59, label: 'Low' },
  DEPLETED: { min: 0, max: 39, label: 'Depleted' },
} as const;

export type VibeState = keyof typeof VIBE_INTERVALS;

// === Core Vibe Lexicon (ZenOracle Constitution) ===
// Resonance Interpreter: We observe cycles, not failures
export const VIBE_LEXICON = {
  Flow: ['Expansive', 'Magnetic', 'Clear', 'Amplified', 'Aligned', 'Decisive'],
  Balanced: ['Centered', 'Stable', 'Grounded', 'Harmonized', 'Composed', 'Neutral'],
  Low: ['Sensitive', 'Processing', 'Clouded', 'Drained', 'Constrained', 'Heavy'],
  Depleted: ['Deep Stillness', 'Inward Phase', 'Sacred Conservation', 'Zero-Point', 'Silent Phase', 'Restoring'],
} as const;

// === Behavior Mapping (老黄历 → 现代决策语义) ===
export const BEHAVIOR_MAPPING = {
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
  忌争: { neutral: 'Low Friction', modern: 'Avoid Conflict' },
  忌急: { neutral: 'Slow Down', modern: 'Delay Decision' },
  忌远行: { neutral: 'Stay Local', modern: 'Avoid Major Move' },
} as const;

// === Decision Scene Lexicon ===
export const DECISION_SCENES = {
  career: ['Launch', 'Pitch', 'Interview', 'Resign', 'Negotiate', 'Focus Work'],
  money: ['Big Purchase', 'Investment Decision', 'Pricing', 'Subscription', 'Refund'],
  relationship: ['First Date', 'Difficult Talk', 'Reconnect', 'Set Boundary', 'Collaboration'],
  personal: ['Start Learning', 'Habit Reset', 'Skill Upgrade', 'Long-term Plan'],
  environment: ['Move House', 'Desk Setup', 'Travel Timing', 'Home Update'],
} as const;

// === Energy Upgrade Sources ===
export const ENERGY_SOURCES = {
  积德: { system: 'Prosocial Action', desc: '利他行为带来长期回流' },
  读书: { system: 'Cognitive Upgrade', desc: '输入 > 输出' },
  风水: { system: 'Environmental Tuning', desc: '空间影响状态' },
  贵人: { system: 'Network Leverage', desc: '支持性连接' },
  相: { system: 'Presence Signal', desc: '第一印象' },
  名: { system: 'Linguistic Priming', desc: '语言暗示' },
  家庭: { system: 'Emotional Base', desc: '安全感' },
  朋友: { system: 'Social Buffer', desc: '压力缓冲' },
} as const;

// === Micro Actions (Adjustment Library) ===
export const MICRO_ACTIONS = [
  'Change lighting',
  'Drink water',
  'Clear 3 items',
  'Stretch for 2 minutes',
  'Step outside',
  'Write 1 sentence',
  'Silence notifications',
  'Clean one surface',
  'Read 1 page',
  'Send one thank-you message',
] as const;

// === Atomic Card Templates by Vibe (ZenOracle Constitution) ===
// Role: Resonance Interpreter - observe cycles, do not diagnose failures
export const ATOMIC_TEMPLATES = {
  FLOW: {
    status: VIBE_LEXICON.Flow,
    oracle: [
      'Your system is in expansion mode. Actions taken now tend to amplify.',
      'Energy flows outward. This is a time for visibility and forward motion.',
      'Clarity is high. Move with confidence and let momentum carry you.',
      'The field is receptive. Initiatives launched now gain traction quickly.',
    ],
    supported: [
      ['Launch new initiative', 'Schedule important meetings'],
      ['Make key decisions', 'Expand your network'],
      ['Start visible projects', 'Share your work'],
      ['Take calculated risks', 'Lead conversations'],
    ],
    adjustment: [
      'Open windows for fresh air',
      'Wear bright colors',
      'Play energizing music',
      'Set ambitious goals',
    ],
  },
  BALANCED: {
    status: VIBE_LEXICON.Balanced,
    oracle: [
      'Your system is in harmony. Small adjustments create meaningful results.',
      'Stability is present. This is a good time for maintenance and optimization.',
      'Energy is centered. Proceed with steady, consistent action.',
      'The field is neutral. Neither push nor retreat—steady presence serves best.',
    ],
    supported: [
      ['Maintain current pace', 'Review and optimize'],
      ['Strengthen existing connections', 'Complete pending tasks'],
      ['Balance work and rest', 'Organize your space'],
      ['Follow established routines', 'Document progress'],
    ],
    adjustment: [
      'Tidy your workspace',
      'Take a balanced walk',
      'Practice breathing exercises',
      'Review your checklist',
    ],
  },
  LOW: {
    status: VIBE_LEXICON.Low,
    oracle: [
      'Your system is in processing mode. The window for high-output is temporarily closed, but the window for inner-alignment is wide open.',
      'Energy has turned inward. This is a natural rhythm, not a malfunction.',
      'The field is sensitive. Protection now creates capacity for later.',
      'Your rhythm has slowed. This phase supports depth, not breadth.',
    ],
    supported: [
      ['Reduce decision scope', 'Stay with familiar routines'],
      ['Postpone major actions', 'Focus on core tasks only'],
      ['Limit social exposure', 'Prioritize rest and recovery'],
      ['Avoid new commitments', 'Simplify your environment'],
    ],
    adjustment: [
      'Change screen brightness and step away for 3 minutes. Then, complete one micro-task.',
      'Drink warm water slowly. Return to one essential action.',
      'Clear one small area. Re-enter with a single, simple decision.',
      'Write down three priorities. Afterward, execute the smallest one.',
    ],
  },
  DEPLETED: {
    status: VIBE_LEXICON.Depleted,
    oracle: [
      'Your system is in deep stillness. The window for output has closed; the window for restoration is now fully open.',
      'Energy is in sacred conservation. External action cannot reach you right now—inner alignment can.',
      'The field has turned inward. This cycle is asking for presence, not performance.',
      'Your capacity has entered a hibernation phase. Trust the rhythm and allow for complete reset.',
    ],
    supported: [
      ['Cancel non-essential plans', 'Focus on basic needs only'],
      ['Postpone all decisions', 'Seek quiet environments'],
      ['Minimize input and stimulation', 'Allow for complete rest'],
      ['Protect your energy fiercely', 'Avoid all new initiatives'],
    ],
    adjustment: [
      'Turn off all screens for 10 minutes. Then, do one thing that requires zero thought.',
      'A 3-minute horizontal reset. Afterward, drink one glass of water.',
      'Wrap yourself in a blanket for 5 minutes. Re-enter with one automatic action.',
      'Practice complete silence for 5 minutes. Then, complete one ritual task.',
    ],
  },
} as const;

// === L2 Deep Reading Templates (Supportive Master - English Only) ===
export const L2_TEMPLATES = {
  FLOW: {
    theme: 'The Amplification Phase',
    core_meaning: 'Like a river in full flow, your biofield has reached maximum conductivity. This is not about forcing—it\'s about removing resistance and letting momentum carry you.',
    critical_alerts: [
      'Avoid overcommitting. High energy ≠ unlimited capacity.',
      'Don\'t bypass due diligence. Speed magnifies errors too.',
    ],
    practical_wisdom: [
      'Make ONE high-stakes decision today. Pick what matters most.',
      'Signal availability. Return one important email or reach out to one key contact.',
      'Set one audacious goal. Write it down.',
    ],
    energy_shift: 'This is the time to execute, not to plan.',
  },
  BALANCED: {
    theme: 'The Coherence Phase',
    core_meaning: 'Your personal field shows optimal homeostasis—neither pushing nor pulling, simply maintaining. Small, consistent actions now compound into significant results.',
    critical_alerts: [
      'Don\'t disrupt stable rhythms without clear reason.',
      'Avoid "comfortable stagnation". Coherence can become complacency.',
    ],
    practical_wisdom: [
      'Optimize ONE workflow or system.',
      'Strengthen ONE key relationship. A message or check-in counts.',
      'Review and prioritize your top 3 commitments.',
    ],
    energy_shift: 'Maintenance today prevents breakdown tomorrow.',
  },
  LOW: {
    theme: 'The Conservation Phase',
    core_meaning: 'Your biofield has shifted to resource management. Think of a phone in Low Power Mode—core functions work, but background apps are paused. This is intelligent adaptation, not failure.',
    critical_alerts: [
      'STOP taking on new obligations. Your reserve buffer is thin.',
      'Avoid high-stakes conversations or negotiations.',
      'Don\'t interpret this as "underperforming."',
    ],
    practical_wisdom: [
      'Complete ONE essential task using your existing momentum.',
      'Allow yourself to say "not now" without guilt.',
      'Schedule a 20-minute nap or silent break.',
    ],
    energy_shift: 'Stillness is active recovery.',
  },
  DEPLETED: {
    theme: 'The Zero-Point Reset',
    core_meaning: 'Your biofield has reached system reset. This is the equivalent of a factory reset on a device—everything that can be turned off has been. What remains is essential and true.',
    critical_alerts: [
      'HALT all non-critical actions immediately.',
      'NO important decisions. Your cognitive bandwidth is fully allocated to recovery.',
      'Do not "power through." This is biological, not psychological.',
    ],
    practical_wisdom: [
      'Execute 15 minutes of horizontal rest. No phone, no audio, no input.',
      'Consume one full glass of water slowly.',
      'Set ONE non-negotiable boundary: "I am offline until [specific time]."',
    ],
    energy_shift: 'Your only job today is to recharge.',
  },
};

// === Time & Cosmic Rhythm Helpers ===
export const TIME_WEIGHTS = {
  // 简化版时间权重（可扩展为更复杂的宇宙节律算法）
  getDayWeight: (date: Date): number => {
    // 基于星期几的基础权重（示例）
    const dayWeights = [0.8, 0.9, 1.0, 1.1, 1.0, 0.9, 0.8]; // Sun-Sat
    return dayWeights[date.getDay()];
  },
  
  getMonthWeight: (date: Date): number => {
    // 基于月份的基础权重（示例）
    const monthWeights = [0.9, 0.95, 1.0, 1.05, 1.1, 1.05, 1.0, 0.95, 0.9, 0.95, 1.0, 1.05];
    return monthWeights[date.getMonth()];
  },
} as const;

// === Utility Functions ===
export const getVibeState = (score: number): VibeState => {
  for (const [key, interval] of Object.entries(VIBE_INTERVALS)) {
    if (score >= interval.min && score <= interval.max) {
      return key as VibeState;
    }
  }
  return 'DEPLETED'; // fallback
};

export const getRandomItem = <T>(array: readonly T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getDeterministicItem = <T>(array: readonly T[], seed: number): T => {
  return array[seed % array.length];
};
