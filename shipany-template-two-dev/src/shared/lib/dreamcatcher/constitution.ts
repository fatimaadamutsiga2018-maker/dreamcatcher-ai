/**
 * Dreamcatcher Language Constitution v2.0
 * Appendix A — Replacement Dictionary v1.0
 *
 * 核心原则：DreamCatcher 永远不是决策者
 * 版本状态：LOCKED (允许新增条目，不允许推翻既有映射)
 */

// === A1. 状态描述映射 ===
export const STATE_DESCRIPTIONS = {
  DEPLETED: {
    short: 'Deep Stillness',
    technical: 'Majority of resources allocated to recovery',
  },
  LOW: {
    short: 'Conservation Mode',
    technical: 'Resource management active',
  },
  BALANCED: {
    short: 'Coherence',
    technical: 'Optimal homeostasis',
  },
  FLOW: {
    short: 'Amplification',
    technical: 'Maximum conductivity',
  },
  OVERFLOW: {
    short: 'High-Leverage State',
    technical: 'State overflow detected',
  },
} as const;

// === A8. 人格与责任边界 (Authority Safety Rule) ===

/**
 * 核心原则：DreamCatcher 永远不是决策者
 */

// 必须包含的免责声明
export const REQUIRED_DISCLAIMERS = {
  FINAL_DECISION_MAKER: 'You remain the final decision-maker.',
  INFORMS_NOT_COMMANDS: 'This insight informs, not commands.',
} as const;

// 允许的表达方式（建议性、非命令式）
export const PERMISSIBLE_PHRASING = {
  suggestions: [
    'Consider',
    'You may wish to',
    'It might be helpful to',
    'The pattern suggests',
    'Current conditions support',
    'This may be a good time to',
  ],
  observations: [
    'The field indicates',
    'Current energy favors',
    'The pattern shows',
    'Data suggests',
  ],
  permissions: [
    'Allow yourself to',
    'Give yourself permission to',
    'It is acceptable to',
  ],
} as const;

// 禁止的表达方式（命令式、强制性）
export const PROHIBITED_PHRASING = {
  commands: [
    '你应该听从',
    'You must follow',
    'You are required to',
  ],
  absolute_paths: [
    '这是唯一正确路径',
    'This is the only way',
    'There is no other option',
  ],
  system_commands: [
    '系统判断你必须',
    'The system determines you must',
    'AI judgment requires',
  ],
} as const;

// === A9. 工程执行注记 ===

/**
 * 约束优先级：
 * 1. Appendix A (最高优先级)
 * 2. Style Preference
 * 3. Creative Variation
 *
 * 输出违反任一条目 → 视为 Language Regression
 */

export const CONSTRAINT_PRIORITY = {
  HIGHEST: 'APPENDIX_A',
  MEDIUM: 'STYLE_PREFERENCE',
  LOW: 'CREATIVE_VARIATION',
} as const;

// === 版本控制 ===

export const CONSTITUTION_VERSION = {
  major: 2,
  minor: 0,
  appendix: 'A',
  appendix_version: '1.0',
  status: 'LOCKED',
} as const;

// === 辅助函数 ===

/**
 * 检查文本是否包含禁止的表达
 */
export const containsProhibitedPhrasing = (text: string): boolean => {
  const allProhibited = [
    ...PROHIBITED_PHRASING.commands,
    ...PROHIBITED_PHRASING.absolute_paths,
    ...PROHIBITED_PHRASING.system_commands,
  ];

  return allProhibited.some(phrase =>
    text.toLowerCase().includes(phrase.toLowerCase())
  );
};

/**
 * 为输出添加必需的免责声明
 */
export const addRequiredDisclaimers = (output: string): string => {
  const disclaimers = Object.values(REQUIRED_DISCLAIMERS).join(' ');
  return `${output}\n\n---\n${disclaimers}`;
};

/**
 * 验证输出是否符合宪法约束
 */
export const validateConstitutionCompliance = (output: string): {
  compliant: boolean;
  violations: string[];
  suggestions?: string[];
} => {
  const violations: string[] = [];
  const suggestions: string[] = [];

  // 检查禁止的表达
  if (containsProhibitedPhrasing(output)) {
    violations.push('Output contains prohibited phrasing (commands or absolute paths)');
    suggestions.push('Use suggestive language: "Consider...", "You may wish to..."');
  }

  // 检查是否包含免责声明
  const hasFinalDecisionMaker = output.includes(REQUIRED_DISCLAIMERS.FINAL_DECISION_MAKER);
  const hasInformsNotCommands = output.includes(REQUIRED_DISCLAIMERS.INFORMS_NOT_COMMANDS);

  if (!hasFinalDecisionMaker || !hasInformsNotCommands) {
    violations.push('Missing required disclaimer(s)');
    suggestions.push('Add: "You remain the final decision-maker. This insight informs, not commands."');
  }

  return {
    compliant: violations.length === 0,
    violations,
    ...(violations.length > 0 && { suggestions }),
  };
};

/**
 * 将命令式表达转换为建议性表达
 */
export const convertToSuggestive = (text: string): string => {
  let converted = text;

  // 替换常见的命令式表达
  const replacements: [RegExp, string][] = [
    [/you must/gi, 'consider'],
    [/you should/gi, 'you may wish to'],
    [/need to/gi, 'it might be helpful to'],
    [/have to/gi, 'current conditions suggest'],
    [/立即/gi, 'consider'],
    [/必须/gi, 'it may be beneficial to'],
    [/应该/gi, 'you could consider'],
  ];

  replacements.forEach(([pattern, replacement]) => {
    converted = converted.replace(pattern, replacement);
  });

  return converted;
};
