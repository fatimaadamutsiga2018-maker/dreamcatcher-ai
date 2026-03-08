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
    title: 'Peak Energy',
    emoji: '⭐⭐⭐⭐⭐',
    color: 'green',
    message: "Today's energy is at its peak. This is an exceptional day for taking bold action and making important decisions. The universe strongly supports your endeavors.",
    shortMessage: "Peak energy - excellent for bold moves",
  },
  4: {
    title: 'High Energy',
    emoji: '⭐⭐⭐⭐',
    color: 'blue',
    message: "Strong positive energy flows today. Conditions are highly favorable for pursuing your goals. Confidence and clarity are on your side.",
    shortMessage: "Strong energy - highly favorable",
  },
  3: {
    title: 'Balanced Energy',
    emoji: '⭐⭐⭐',
    color: 'yellow',
    message: "Energy is stable and balanced today. A good day for steady progress and routine activities. Approach tasks with mindfulness.",
    shortMessage: "Balanced energy - steady progress",
  },
  2: {
    title: 'Subdued Energy',
    emoji: '⭐⭐',
    color: 'orange',
    message: "Energy is somewhat restrained today. Better suited for planning and preparation rather than major initiatives. Proceed thoughtfully.",
    shortMessage: "Subdued energy - focus on planning",
  },
  1: {
    title: 'Low Energy',
    emoji: '⭐',
    color: 'red',
    message: "Energy is minimal today. This is an ideal time for reflection, rest, and strategic planning. Avoid major commitments if possible.",
    shortMessage: "Low energy - rest and reflect",
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
export const numberEnergyConfig = {
  5: {
    title: 'Highly Favorable',
    emoji: '🟢',
    color: 'emerald',
    conclusion: "Perfect timing, highly favorable",
    suggestion: "Act with confidence. All conditions support your goal. Seize this opportunity.",
    expandedInsight: (situation: string, movingLine?: number) => {
      let insight = `${situation}. All elements align perfectly. This is an optimal moment to move forward with confidence.`;
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
    conclusion: "Favorable conditions, suitable for progress",
    suggestion: "Prepare thoroughly and act when ready. Conditions support progress with proper execution.",
    expandedInsight: (situation: string, movingLine?: number) => {
      let insight = `${situation}. Conditions generally favor progress. With proper preparation and timing, success is within reach.`;
      if (movingLine && movingLine >= 1 && movingLine <= 6) {
        insight += `\n\n${movingLineStages[movingLine as keyof typeof movingLineStages]}`;
      }
      return insight;
    },
  },
  3: {
    title: 'Achievable with Effort',
    emoji: '🟠',
    color: 'orange',
    conclusion: "Achievable with effort",
    suggestion: "Take initiative and commit sustained effort. Clarify your goal, take active steps, and success will require your dedication.",
    expandedInsight: (situation: string, movingLine?: number) => {
      let insight = `${situation}. Achievable, but requires considerable effort. Success is within reach, but won't come easily—it needs your active engagement.`;
      if (movingLine && movingLine >= 1 && movingLine <= 6) {
        insight += `\n\n${movingLineStages[movingLine as keyof typeof movingLineStages]}`;
      }
      return insight;
    },
  },
  2: {
    title: 'Proceed Carefully',
    emoji: '🔴',
    color: 'red',
    conclusion: "Uncertain, consider waiting",
    suggestion: "Proceed with care. Current conditions require attention. Gather more information and consider timing before committing.",
    expandedInsight: (situation: string, movingLine?: number) => {
      let insight = `${situation}. Current circumstances require careful consideration. Patience and observation may reveal clearer direction or better timing.`;
      if (movingLine && movingLine >= 1 && movingLine <= 6) {
        insight += `\n\n${movingLineStages[movingLine as keyof typeof movingLineStages]}`;
      }
      return insight;
    },
  },
  1: {
    title: 'Consider Alternatives',
    emoji: '⚫',
    color: 'gray',
    conclusion: "Challenging conditions, reconsider timing",
    suggestion: "Consider pausing. Conditions may not support this path right now. Explore alternatives or wait for better timing.",
    expandedInsight: (situation: string, movingLine?: number) => {
      let insight = `${situation}. Present conditions present notable challenges. Consider whether different approaches or timing might serve you better.`;
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
    '开业': { en: 'Launch Projects', description: 'Start new ventures or initiatives' },
    '开市': { en: 'Begin Trading', description: 'Open for business' },
    '签约': { en: 'Sign Contracts', description: 'Formalize agreements' },
    '交易': { en: 'Negotiate Deals', description: 'Business negotiations' },
    '纳财': { en: 'Build Assets', description: 'Accumulate resources' },
    '求财': { en: 'Make Investments', description: 'Financial decisions' },
    '立券': { en: 'Sign Documents', description: 'Legal agreements' },
    '置产': { en: 'Acquire Property', description: 'Real estate decisions' },
  },

  // Relationship & Social
  social: {
    '嫁娶': { en: 'Wedding Ceremonies', description: 'Marriage celebrations' },
    '订婚': { en: 'Get Engaged', description: 'Engagement ceremonies' },
    '订盟': { en: 'Form Partnerships', description: 'Create alliances' },
    '会亲友': { en: 'Host Gatherings', description: 'Social events' },
    '宴会': { en: 'Celebrate Together', description: 'Parties and celebrations' },
    '纳采': { en: 'Meet New People', description: 'Expand social circle' },
  },

  // Home & Living
  home: {
    '搬家': { en: 'Relocate', description: 'Move to new residence' },
    '入宅': { en: 'Move In', description: 'Settle into new home' },
    '安床': { en: 'Arrange Space', description: 'Organize living areas' },
    '装修': { en: 'Home Renovations', description: 'Improvements and upgrades' },
    '动土': { en: 'Break Ground', description: 'Start construction' },
    '安门': { en: 'Structural Changes', description: 'Major modifications' },
    '作灶': { en: 'Structural Changes', description: 'Major modifications' },
    '扫舍': { en: 'Declutter', description: 'Deep cleaning and organizing' },
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
    '祭祀': { en: 'Honor Traditions', description: 'Spiritual remembrance' },
    '祈福': { en: 'Set Intentions', description: 'Prayer and meditation' },
    '开光': { en: 'Bless Items', description: 'Consecration rituals' },
    '斋醮': { en: 'Mindful Detox', description: 'Fasting and meditation' },
    '入学': { en: 'Begin Learning', description: 'Start education or training' },
    '求嗣': { en: 'Family Planning', description: 'Growing family decisions' },
    '冠笄': { en: 'Celebrate Milestones', description: 'Mark transitions' },
  },

  // Creative & Expression
  creative: {
    '塑绘': { en: 'Create Content', description: 'Artistic work' },
    '著述': { en: 'Write & Publish', description: 'Content creation' },
  },

  // Projects & Resources
  projects: {
    '栽种': { en: 'Start Projects', description: 'Plant seeds for growth' },
    '纳畜': { en: 'Acquire Resources', description: 'Build capacity' },
    '伐木': { en: 'Clear Obstacles', description: 'Remove what no longer serves' },
  },

  // Endings & Transitions
  transitions: {
    '安葬': { en: 'Memorial Services', description: 'Funeral and remembrance' },
    '破土': { en: 'Major Changes', description: 'Significant transitions' },
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
    '建': { en: 'Initiation', energy: 'high', description: 'Excellent for starting new projects' },
    '除': { en: 'Clearing', energy: 'medium', description: 'Good for removing obstacles and finishing tasks' },
    '满': { en: 'Abundance', energy: 'high', description: 'Favorable for completion and celebration' },
    '平': { en: 'Balance', energy: 'medium', description: 'Stable energy for routine tasks' },
    '定': { en: 'Commitment', energy: 'high', description: 'Perfect for making important decisions' },
    '执': { en: 'Persistence', energy: 'medium', description: 'Good for maintaining momentum' },
    '破': { en: 'Breakthrough', energy: 'low', description: 'Challenging day, focus on problem-solving' },
    '危': { en: 'Caution', energy: 'low', description: 'Proceed carefully with major decisions' },
    '成': { en: 'Achievement', energy: 'high', description: 'Excellent for completing goals' },
    '收': { en: 'Harvest', energy: 'high', description: 'Great for gathering results and organizing' },
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
