/**
 * Content Configuration
 * Centralized content management for all divination tools
 *
 * This file contains all user-facing text, translations, and messaging templates
 * to ensure consistent tone and easy maintenance across the application.
 */

// ============================================================================
// ENERGY LEVELS (Used by both Almanac and Hexagram systems)
// ============================================================================

// Almanac Energy Levels (老黄历 - 整体环境能量)
export const almanacEnergyConfig = {
  5: {
    title: 'Highly Favorable Day',
    emoji: '⭐⭐⭐⭐⭐',
    color: 'green',
    message: "Today's cosmic alignment is exceptionally strong. The activities listed below are particularly well-supported by today's energy.",
    shortMessage: "Highly favorable for specific activities",
  },
  4: {
    title: 'Favorable Day',
    emoji: '⭐⭐⭐⭐',
    color: 'blue',
    message: "Today offers strong support for certain types of activities. Conditions are favorable for the actions listed below.",
    shortMessage: "Favorable for specific activities",
  },
  3: {
    title: 'Balanced Day',
    emoji: '⭐⭐⭐',
    color: 'yellow',
    message: "Today provides steady, balanced conditions. A good day for the types of activities listed below.",
    shortMessage: "Balanced - good for steady progress",
  },
  2: {
    title: 'Cautious Day',
    emoji: '⭐⭐',
    color: 'orange',
    message: "Today's energy is more restrained. Focus on the recommended activities and approach others with extra care.",
    shortMessage: "Proceed thoughtfully",
  },
  1: {
    title: 'Reflective Day',
    emoji: '⭐',
    color: 'red',
    message: "Today is best suited for reflection and planning. Focus on the recommended activities and avoid major commitments.",
    shortMessage: "Best for reflection and planning",
  },
} as const;

// Moving Line (动爻) stage descriptions
export const movingLineStages = {
  1: "This is just beginning. Take time to observe and understand before committing.",
  2: "The foundation is set. Check your inner readiness and gather the support you need.",
  3: "You're in the middle of it. Your actions and attitude will significantly shape the outcome.",
  4: "External factors are shifting. Pay attention to how circumstances and others affect your path.",
  5: "You're at a turning point where timing matters. The choices you make now carry extra weight.",
  6: "The outcome is taking shape. Focus on working with what's unfolding rather than forcing change.",
} as const;

// Number Energy Reading Levels (数字能量测算 - 具体问题成功率)
// Using confidence language instead of probability percentages
export const numberEnergyConfig = {
  5: {
    title: 'Highly Favorable',
    emoji: '🟢',
    color: 'emerald',
    conclusion: "Conditions strongly support your goals",
    suggestion: "This is a favorable time to move forward. The circumstances align well with your intentions.",
    expandedInsight: (situation: string, movingLine?: number) => {
      let insight = `${situation}. The conditions are well-aligned for this path. You can proceed with confidence.`;
      if (movingLine && movingLine >= 1 && movingLine <= 6) {
        insight += `\n\n${movingLineStages[movingLine as keyof typeof movingLineStages]}`;
      }
      return insight;
    },
  },
  4: {
    title: 'Favorable',
    emoji: '🟡',
    color: 'yellow',
    conclusion: "Conditions generally support your direction",
    suggestion: "The environment is supportive. With thoughtful preparation, you're well-positioned to proceed.",
    expandedInsight: (situation: string, movingLine?: number) => {
      let insight = `${situation}. The circumstances favor progress. Prepare well and you'll find the path opens naturally.`;
      if (movingLine && movingLine >= 1 && movingLine <= 6) {
        insight += `\n\n${movingLineStages[movingLine as keyof typeof movingLineStages]}`;
      }
      return insight;
    },
  },
  3: {
    title: 'Moderate',
    emoji: '🟠',
    color: 'orange',
    conclusion: "Success depends on your commitment and effort",
    suggestion: "This path is open, but requires active engagement. Clarify your goals and commit sustained effort.",
    expandedInsight: (situation: string, movingLine?: number) => {
      let insight = `${situation}. The outcome depends significantly on your approach and persistence. Success is achievable with dedication.`;
      if (movingLine && movingLine >= 1 && movingLine <= 6) {
        insight += `\n\n${movingLineStages[movingLine as keyof typeof movingLineStages]}`;
      }
      return insight;
    },
  },
  2: {
    title: 'Challenging',
    emoji: '🔴',
    color: 'red',
    conclusion: "Conditions present notable challenges",
    suggestion: "Consider waiting or gathering more information. The current circumstances may not fully support this direction.",
    expandedInsight: (situation: string, movingLine?: number) => {
      let insight = `${situation}. The present conditions suggest caution. Patience and observation may reveal better timing or approaches.`;
      if (movingLine && movingLine >= 1 && movingLine <= 6) {
        insight += `\n\n${movingLineStages[movingLine as keyof typeof movingLineStages]}`;
      }
      return insight;
    },
  },
  1: {
    title: 'Unfavorable',
    emoji: '⚫',
    color: 'gray',
    conclusion: "Conditions do not favor this path at this time",
    suggestion: "Consider alternative approaches or timing. The current circumstances suggest exploring different options.",
    expandedInsight: (situation: string, movingLine?: number) => {
      let insight = `${situation}. The conditions present significant obstacles. Different timing or approaches may serve you better.`;
      if (movingLine && movingLine >= 1 && movingLine <= 6) {
        insight += `\n\n${movingLineStages[movingLine as keyof typeof movingLineStages]}`;
      }
      return insight;
    },
  },
} as const;

// Legacy export for backward compatibility (defaults to almanac)
export const energyLevelConfig = almanacEnergyConfig;

// ============================================================================
// HEXAGRAM READING TEMPLATES (梅花易数)
// ============================================================================

export const hexagramReadingConfig = {
  // Level-based conclusions
  conclusions: {
    5: "Conditions are exceptionally favorable. This path aligns strongly with current energy patterns.",
    4: "Strong potential for success. The timing and circumstances support your goals.",
    3: "Success is achievable with focused effort. Consider the resources and commitment required.",
    2: "Challenging conditions ahead. Careful planning and patience will be essential.",
    1: "Significant obstacles present. Consider alternative approaches or timing.",
  },

  // Level-based suggestions
  suggestions: {
    5: "Move forward with confidence. Trust your preparation and seize this opportunity.",
    4: "Proceed with your plans. Stay focused and maintain momentum.",
    3: "Evaluate your resources carefully. Success requires sustained effort and adaptability.",
    2: "Proceed cautiously. Strengthen your foundation before major commitments.",
    1: "Pause and reassess. This may not be the optimal time or approach.",
  },

  // Section labels
  labels: {
    situation: "Current Situation",
    conclusion: "Assessment",
    suggestion: "Guidance",
    insight: "Deeper Insight",
  },
} as const;

// ============================================================================
// ALMANAC ACTIVITY TRANSLATIONS (老黄历宜忌)
// ============================================================================

export const activityConfig = {
  // Business & Career
  business: {
    '开业': { en: 'Launch New Initiatives', description: 'Start projects or ventures' },
    '开市': { en: 'Make Business Moves', description: 'Important business decisions' },
    '签约': { en: 'Sign Agreements', description: 'Contracts and commitments' },
    '交易': { en: 'Negotiate', description: 'Business discussions and deals' },
    '纳财': { en: 'Financial Planning', description: 'Money management decisions' },
    '求财': { en: 'Pursue Opportunities', description: 'Career and financial moves' },
    '立券': { en: 'Finalize Documents', description: 'Sign important papers' },
    '置产': { en: 'Major Purchases', description: 'Significant investments' },
  },

  // Relationship & Social
  social: {
    '嫁娶': { en: 'Commitment Decisions', description: 'Important relationship steps' },
    '订婚': { en: 'Make Commitments', description: 'Serious relationship decisions' },
    '订盟': { en: 'Form Partnerships', description: 'Business or personal alliances' },
    '会亲友': { en: 'Social Connections', description: 'Meet with important people' },
    '宴会': { en: 'Host Events', description: 'Celebrations and gatherings' },
    '纳采': { en: 'Network', description: 'Build new connections' },
  },

  // Home & Living
  home: {
    '搬家': { en: 'Relocate', description: 'Move to new place' },
    '入宅': { en: 'Move In', description: 'Settle into new space' },
    '安床': { en: 'Reorganize Space', description: 'Rearrange your environment' },
    '装修': { en: 'Home Improvements', description: 'Renovations and upgrades' },
    '动土': { en: 'Start Construction', description: 'Begin building projects' },
    '安门': { en: 'Major Changes', description: 'Significant modifications' },
    '作灶': { en: 'Major Changes', description: 'Significant modifications' },
    '扫舍': { en: 'Deep Clean', description: 'Organize and declutter' },
  },

  // Health & Wellness
  health: {
    '求医': { en: 'Seek Medical Care', description: 'Doctor visits' },
    '疗病': { en: 'Start Treatment', description: 'Medical care' },
    '针灸': { en: 'Alternative Therapy', description: 'Holistic treatments' },
    '理发': { en: 'Self-Care', description: 'Personal grooming' },
    '沐浴': { en: 'Cleanse & Refresh', description: 'Physical renewal' },
  },

  // Travel & Movement
  travel: {
    '出行': { en: 'Travel', description: 'Short trips' },
    '远行': { en: 'Road Trips', description: 'Extended travel' },
    '出火': { en: 'Depart', description: 'Leave home' },
  },

  // Personal Growth & Spiritual
  personal: {
    '祭祀': { en: 'Reflect & Remember', description: 'Honor what matters to you' },
    '祈福': { en: 'Set Intentions', description: 'Focus on your goals' },
    '开光': { en: 'Bless New Items', description: 'Consecrate meaningful objects' },
    '斋醮': { en: 'Reset & Detox', description: 'Cleanse and renew' },
    '入学': { en: 'Start Learning', description: 'Begin courses or training' },
    '求嗣': { en: 'Family Planning', description: 'Family growth decisions' },
    '冠笄': { en: 'Mark Milestones', description: 'Celebrate achievements' },
  },

  // Creative & Expression
  creative: {
    '塑绘': { en: 'Create Content', description: 'Artistic work' },
    '著述': { en: 'Write & Publish', description: 'Content creation' },
  },

  // Projects & Resources
  projects: {
    '栽种': { en: 'Begin New Projects', description: 'Start fresh initiatives' },
    '纳畜': { en: 'Acquire Resources', description: 'Build your capacity' },
    '伐木': { en: 'Clear Obstacles', description: 'Remove what blocks you' },
  },

  // Endings & Transitions
  transitions: {
    '安葬': { en: 'Close Chapters', description: 'Let go and move forward' },
    '破土': { en: 'Major Transitions', description: 'Significant life changes' },
  },

  // Special cases
  special: {
    '诸事不宜': { en: 'Pause & Reflect', description: 'Rest and inner work' },
    '塞穴': { en: 'Wrap Up Loose Ends', description: 'Complete unfinished tasks' },
    '收养': { en: 'Expand Family', description: 'Family growth' },
  },
} as const;

// ============================================================================
// DAY CHARACTERISTICS (日期特征)
// ============================================================================

export const dayCharacteristicsConfig = {
  // Day Officer (建除十二值)
  dayOfficer: {
    '建': { en: 'Initiation', energy: 'high', description: 'Strong energy for bold moves' },
    '除': { en: 'Clearing', energy: 'medium', description: 'Good for finishing and removing obstacles' },
    '满': { en: 'Abundance', energy: 'high', description: 'Favorable for completion and celebration' },
    '平': { en: 'Balance', energy: 'medium', description: 'Steady energy for consistent progress' },
    '定': { en: 'Commitment', energy: 'high', description: 'Perfect for important decisions' },
    '执': { en: 'Persistence', energy: 'medium', description: 'Good for maintaining momentum' },
    '破': { en: 'Breakthrough', energy: 'low', description: 'Challenging day, focus on problem-solving' },
    '危': { en: 'Caution', energy: 'low', description: 'Proceed carefully with major decisions' },
    '成': { en: 'Achievement', energy: 'high', description: 'Excellent for completing goals' },
    '收': { en: 'Harvest', energy: 'high', description: 'Great for gathering results' },
    '开': { en: 'Opening', energy: 'high', description: 'Ideal for new beginnings' },
    '闭': { en: 'Reflection', energy: 'low', description: 'Better for planning than action' },
  },

  // Spirit (十二神)
  spirit: {
    '青龙': { en: 'Supportive', fortune: 'favorable', description: 'Energy supports your initiatives' },
    '明堂': { en: 'Illuminating', fortune: 'favorable', description: 'Clarity and insight available' },
    '天刑': { en: 'Restrictive', fortune: 'challenging', description: 'Proceed with extra care' },
    '朱雀': { en: 'Intense', fortune: 'challenging', description: 'High energy, requires focus' },
    '金匮': { en: 'Prosperous', fortune: 'favorable', description: 'Good for financial matters' },
    '天德': { en: 'Harmonious', fortune: 'favorable', description: 'Smooth progress expected' },
    '白虎': { en: 'Dynamic', fortune: 'challenging', description: 'Active energy, stay grounded' },
    '玉堂': { en: 'Elegant', fortune: 'favorable', description: 'Refinement and grace' },
    '天牢': { en: 'Constrained', fortune: 'challenging', description: 'Patience required' },
    '玄武': { en: 'Protective', fortune: 'challenging', description: 'Focus on security' },
    '司命': { en: 'Empowering', fortune: 'favorable', description: 'Take charge of your path' },
    '勾陈': { en: 'Complex', fortune: 'challenging', description: 'Navigate carefully' },
  },
} as const;

// ============================================================================
// DIRECTIONS (方位)
// ============================================================================

export const directionsConfig = {
  translations: {
    '东': 'East',
    '南': 'South',
    '西': 'West',
    '北': 'North',
    '东北': 'Northeast',
    '东南': 'Southeast',
    '西北': 'Northwest',
    '西南': 'Southwest',
    '正东': 'Due East',
    '正南': 'Due South',
    '正西': 'Due West',
    '正北': 'Due North',
    '震': 'East',
    '离': 'South',
    '兑': 'West',
    '坎': 'North',
    '艮': 'Northeast',
    '巽': 'Southeast',
    '乾': 'Northwest',
    '坤': 'Southwest',
  },

  descriptions: {
    wealth: 'Optimal for financial matters',
    joy: 'Best for positive outcomes',
    fortune: 'Favorable for general success',
  },
} as const;

// ============================================================================
// UI LABELS & MESSAGES
// ============================================================================

export const uiLabelsConfig = {
  // Page titles
  titles: {
    almanac: 'Daily Energy Guide',
    hexagram: 'Decision Guidance',
    assessment: 'Energy Assessment',
  },

  // Subtitles
  subtitles: {
    almanac: 'Discover the best timing for your important decisions and activities',
    hexagram: 'Get insights on specific questions and choices',
    assessment: 'Understand your current energy state',
  },

  // Section headers
  sections: {
    favorableActivities: 'Favorable Activities',
    unfavorableActivities: 'Activities to Avoid',
    favorableDirections: 'Favorable Directions',
    energyType: 'Energy Type',
    dailyInfluence: 'Daily Influence',
    selectedDate: 'Selected Date',
  },

  // Buttons
  buttons: {
    today: 'Today',
    getGuidance: 'Get Decision Guidance',
    viewEnergy: "View Today's Energy",
    startAssessment: 'Start Energy Assessment',
  },

  // Call-to-action messages
  cta: {
    needMoreGuidance: 'Need More Specific Guidance?',
    personalizedSupport: 'For personalized decision support on specific questions, try our Decision Guidance tool',
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all activities from a category
 */
export function getActivitiesByCategory(category: keyof typeof activityConfig) {
  return activityConfig[category];
}

/**
 * Flatten all activities into a single lookup object
 */
export function getAllActivities() {
  const allActivities: Record<string, { en: string; description: string }> = {};

  Object.values(activityConfig).forEach(categoryActivities => {
    Object.entries(categoryActivities).forEach(([key, value]) => {
      allActivities[key] = value;
    });
  });

  return allActivities;
}

/**
 * Get almanac energy level configuration
 */
export function getAlmanacEnergyLevel(level: 1 | 2 | 3 | 4 | 5) {
  return almanacEnergyConfig[level];
}

/**
 * Get number energy reading configuration
 */
export function getNumberEnergyLevel(level: 1 | 2 | 3 | 4 | 5) {
  return numberEnergyConfig[level];
}

/**
 * Get energy level configuration (legacy, defaults to almanac)
 */
export function getEnergyLevel(level: 1 | 2 | 3 | 4 | 5) {
  return almanacEnergyConfig[level];
}

/**
 * Get day officer translation
 */
export function getDayOfficer(chinese: string) {
  return dayCharacteristicsConfig.dayOfficer[chinese as keyof typeof dayCharacteristicsConfig.dayOfficer];
}

/**
 * Get spirit translation
 */
export function getSpirit(chinese: string) {
  return dayCharacteristicsConfig.spirit[chinese as keyof typeof dayCharacteristicsConfig.spirit];
}

/**
 * Get direction translation
 */
export function getDirection(chinese: string) {
  return directionsConfig.translations[chinese as keyof typeof directionsConfig.translations] || chinese;
}

/**
 * Get hexagram reading template
 */
export function getHexagramReading(level: 1 | 2 | 3 | 4 | 5) {
  return {
    conclusion: hexagramReadingConfig.conclusions[level],
    suggestion: hexagramReadingConfig.suggestions[level],
    labels: hexagramReadingConfig.labels,
  };
}
