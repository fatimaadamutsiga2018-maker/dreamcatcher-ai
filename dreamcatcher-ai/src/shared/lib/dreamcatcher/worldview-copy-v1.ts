/**
 * Dreamcatcher AI - Worldview Copy Library V1
 * Unified Syntax: Reality → Cost → Reframe → Permission
 * Tone: Calm, Rational, Premium
 * Purpose: Responsibility Transfer + Certainty Provision
 */

// ============================================
// Phase Types
// ============================================

export type PhaseType =
  | 'REST'        // 静｜能量回收
  | 'INITIATE'    // 启｜小火点燃
  | 'ADJUST'      // 调｜纠偏最优
  | 'CONSOLIDATE' // 收｜守护成果
  | 'ACCELERATE'; // 顺｜杠杆放大

export type DomainType = 'BIZ' | 'SOC' | 'STRAT' | 'ACT';
export type ActionType = 'PAUSE' | 'PUSH' | 'TUNE' | 'HOLD';

// ============================================
// Phase Configurations
// ============================================

export interface PhaseAction {
  domain: DomainType;
  action: ActionType;
  content: string; // Combined reality + reframe
  permission: string;
}

export interface PhaseConfig {
  name: string;
  nameCN: string; // Chinese short name
  emoji: string;
  core: string; // Core theme in Chinese
  actions: PhaseAction[];
}

// ============================================
// REST (静) —— 核心：能量回收
// ============================================

const REST_PHASE: PhaseConfig = {
  name: 'REST',
  nameCN: '静',
  emoji: '💤',
  core: '能量回收',
  actions: [
    {
      domain: 'BIZ',
      action: 'PAUSE',
      content: 'The environment is low-leverage. Expansion now converts capital into friction. Pausing is capital protection under resistance.',
      permission: 'Do not force growth. Preserve optionality.',
    },
    {
      domain: 'SOC',
      action: 'PAUSE',
      content: 'Social energy is inward-pulling. Engagement now demands excess emotional cost. Distance today maintains relational clarity.',
      permission: 'Withdraw without guilt. Silence is alignment.',
    },
    {
      domain: 'STRAT',
      action: 'TUNE',
      content: 'Cognitive load is elevated. Major decisions now favor defensive bias. Reflection prevents misdirected commitment.',
      permission: 'Think, don\'t decide. Clarity comes later.',
    },
    {
      domain: 'ACT',
      action: 'PAUSE',
      content: 'Momentum is suppressed. Speed increases drag instead of output. Stillness minimizes loss.',
      permission: 'Wait. Action today costs triple.',
    },
  ],
};

// ============================================
// INITIATE (启) —— 核心：小火点燃
// ============================================

const INITIATE_PHASE: PhaseConfig = {
  name: 'INITIATE',
  nameCN: '启',
  emoji: '🌱',
  core: '小火点燃',
  actions: [
    {
      domain: 'BIZ',
      action: 'PUSH',
      content: 'The signal is active. Early motion compounds advantage. Delay converts opportunity into cost. Small starts unlock disproportionate leverage.',
      permission: 'Begin small. Test without scale.',
    },
    {
      domain: 'SOC',
      action: 'TUNE',
      content: 'Connections are responsive, not expansive. Overreaching dilutes trust density. Selective contact builds alignment.',
      permission: 'Engage intentionally. Not everyone.',
    },
    {
      domain: 'STRAT',
      action: 'HOLD',
      content: 'The direction is correct but unproven. Premature pivots dilute signal clarity. Stability sharpens validation.',
      permission: 'Stay the course. Observe feedback.',
    },
    {
      domain: 'ACT',
      action: 'PUSH',
      content: 'Initiation energy is available. Inaction decays momentum rapidly. One move defines trajectory.',
      permission: 'Start now. Imperfect is acceptable.',
    },
  ],
};

// ============================================
// ADJUST (调) —— 核心：纠偏最优
// ============================================

const ADJUST_PHASE: PhaseConfig = {
  name: 'ADJUST',
  nameCN: '调',
  emoji: '⚙️',
  core: '纠偏最优',
  actions: [
    {
      domain: 'BIZ',
      action: 'TUNE',
      content: 'Leverage exists but misaligned. Scaling without correction magnifies error. Calibration restores efficiency.',
      permission: 'Refine before investing further.',
    },
    {
      domain: 'SOC',
      action: 'TUNE',
      content: 'Signals are mixed. Assumptions distort resonance. Clarification reduces friction.',
      permission: 'Ask. Realign expectations.',
    },
    {
      domain: 'STRAT',
      action: 'PUSH',
      content: 'Insight density is high. Delay erodes cognitive advantage. Strategic moves now compound clarity.',
      permission: 'Act on insight. This window is brief.',
    },
    {
      domain: 'ACT',
      action: 'TUNE',
      content: 'Execution is uneven. Speed hides inefficiency. Adjustment improves flow.',
      permission: 'Slow down to realign motion.',
    },
  ],
};

// ============================================
// CONSOLIDATE (收) —— 核心：守护成果
// ============================================

const CONSOLIDATE_PHASE: PhaseConfig = {
  name: 'CONSOLIDATE',
  nameCN: '收',
  emoji: '🧱',
  core: '守护成果',
  actions: [
    {
      domain: 'BIZ',
      action: 'HOLD',
      content: 'Value is already captured. New bets introduce unnecessary volatility. Consolidation locks gains.',
      permission: 'Maintain. Secure what\'s earned.',
    },
    {
      domain: 'SOC',
      action: 'TUNE',
      content: 'Inner circles matter more now. Broad exposure dilutes signal quality. Depth outperforms reach.',
      permission: 'Choose fewer, go deeper.',
    },
    {
      domain: 'STRAT',
      action: 'HOLD',
      content: 'Systems are functional. Change now creates noise. Stability preserves advantage.',
      permission: 'Do not optimize. Protect structure.',
    },
    {
      domain: 'ACT',
      action: 'HOLD',
      content: 'Tasks are nearing closure. New loops fracture focus. Completion restores capacity.',
      permission: 'Finish. Then stop.',
    },
  ],
};

// ============================================
// ACCELERATE (顺) —— 核心：杠杆放大
// ============================================

const ACCELERATE_PHASE: PhaseConfig = {
  name: 'ACCELERATE',
  nameCN: '顺',
  emoji: '🚀',
  core: '杠杆放大',
  actions: [
    {
      domain: 'BIZ',
      action: 'PUSH',
      content: 'Leverage is active. Underinvestment wastes momentum. Scale multiplies outcome.',
      permission: 'Deploy resources decisively.',
    },
    {
      domain: 'SOC',
      action: 'PUSH',
      content: 'Resonance is high. Silence forfeits influence. Presence amplifies authority.',
      permission: 'Be visible. Speak clearly.',
    },
    {
      domain: 'STRAT',
      action: 'PUSH',
      content: 'Vision has traction. Conservatism limits upside. Expansion clarifies dominance.',
      permission: 'Think bigger. Commit forward.',
    },
    {
      domain: 'ACT',
      action: 'PUSH',
      content: 'Motion reduces resistance. Hesitation breaks flow. Speed compounds results.',
      permission: 'Move fast. Momentum is on your side.',
    },
  ],
};

// ============================================
// Export Master Library
// ============================================

export const WORLDVIEW_COPY_V1: Record<PhaseType, PhaseConfig> = {
  REST: REST_PHASE,
  INITIATE: INITIATE_PHASE,
  ADJUST: ADJUST_PHASE,
  CONSOLIDATE: CONSOLIDATE_PHASE,
  ACCELERATE: ACCELERATE_PHASE,
} as const;

// ============================================
// Utility Functions
// ============================================

/**
 * Get phase configuration by phase type
 */
export const getPhaseConfig = (phase: PhaseType): PhaseConfig => {
  return WORLDVIEW_COPY_V1[phase];
};

/**
 * Get action advice for a specific phase and domain
 */
export const getActionAdvice = (
  phase: PhaseType,
  domain: DomainType
): PhaseAction | undefined => {
  const phaseConfig = getPhaseConfig(phase);
  return phaseConfig.actions.find(a => a.domain === domain);
};

/**
 * Format action advice as structured text (compact format)
 */
export const formatActionAdvice = (action: PhaseAction): string => {
  const { domain, action: actionType, content, permission } = action;

  return `${domain} · ${actionType}: ${content} Permission: ${permission}`;
};

/**
 * Format action advice as multi-line text (detailed format)
 */
export const formatActionAdviceDetailed = (action: PhaseAction): string => {
  const { domain, action: actionType, content, permission } = action;

  return `
${domain} · ${actionType}

${content}

Permission: ${permission}
  `.trim();
};

/**
 * Get phase display header
 */
export const getPhaseHeader = (phase: PhaseType): string => {
  const config = getPhaseConfig(phase);
  return `${config.emoji} ${config.name} (${config.nameCN}) —— 核心：${config.core}`;
};

/**
 * Get all available phase types
 */
export const getAllPhases = (): PhaseType[] => {
  return Object.keys(WORLDVIEW_COPY_V1) as PhaseType[];
};

/**
 * Get all available domain types
 */
export const getAllDomains = (): DomainType[] => {
  return ['BIZ', 'SOC', 'STRAT', 'ACT'];
};

/**
 * Get all available action types
 */
export const getAllActions = (): ActionType[] => {
  return ['PAUSE', 'PUSH', 'TUNE', 'HOLD'];
};
