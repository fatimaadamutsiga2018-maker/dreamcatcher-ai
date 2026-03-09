// Simplified 64 Hexagrams System
// Using traditional Plum Blossom calculation

export interface Hexagram {
  sequence_number: number;
  name_cn: string;
  name_en: string;
  upper_trigram: string;
  lower_trigram: string;
  result_level: number;  // 5=🟢 Highly Favorable, 4=🟡 Favorable, 3=🟠 Moderate, 2=🔴 Challenging, 1=⚫ Unfavorable
  result_icon: string;
  result_label: string;
  situation: string;
  action_1: string;
  action_2: string;
  action_3: string;
}

// Trigram mapping (8 basic trigrams)
const TRIGRAMS = {
  0: { name: 'Earth', symbol: '坤', unicode: '☷' },
  1: { name: 'Heaven', symbol: '乾', unicode: '☰' },
  2: { name: 'Lake', symbol: '兑', unicode: '☱' },
  3: { name: 'Fire', symbol: '离', unicode: '☲' },
  4: { name: 'Thunder', symbol: '震', unicode: '☳' },
  5: { name: 'Wind', symbol: '巽', unicode: '☴' },
  6: { name: 'Water', symbol: '坎', unicode: '☵' },
  7: { name: 'Mountain', symbol: '艮', unicode: '☶' },
};

// Correct mapping from trigram combination to hexagram sequence number
// Based on traditional I Ching ordering from Musk's 64-hexagram data
const TRIGRAM_TO_HEXAGRAM: Record<string, number> = {
  '0-0': 2, '0-1': 11, '0-2': 19, '0-3': 36, '0-4': 24, '0-5': 46, '0-6': 7, '0-7': 15,
  '1-0': 12, '1-1': 1, '1-2': 10, '1-3': 13, '1-4': 25, '1-5': 44, '1-6': 6, '1-7': 33,
  '2-0': 45, '2-1': 43, '2-2': 58, '2-3': 49, '2-4': 17, '2-5': 28, '2-6': 47, '2-7': 31,
  '3-0': 35, '3-1': 14, '3-2': 38, '3-3': 30, '3-4': 21, '3-5': 50, '3-6': 64, '3-7': 56,
  '4-0': 16, '4-1': 34, '4-2': 54, '4-3': 55, '4-4': 51, '4-5': 32, '4-6': 40, '4-7': 62,
  '5-0': 46, '5-1': 44, '5-2': 61, '5-3': 37, '5-4': 42, '5-5': 57, '5-6': 59, '5-7': 53,
  '6-0': 8, '6-1': 5, '6-2': 60, '6-3': 63, '6-4': 3, '6-5': 48, '6-6': 29, '6-7': 39,
  '7-0': 23, '7-1': 26, '7-2': 41, '7-3': 22, '7-4': 27, '7-5': 18, '7-6': 4, '7-7': 52,
};

// Calculate hexagram from 3 numbers
export function calculateHexagram64(num1: number, num2: number, num3: number): {
  upper: number;
  lower: number;
  hexagramNumber: number;
  movingLine: number;
  upperTrigram: typeof TRIGRAMS[0];
  lowerTrigram: typeof TRIGRAMS[0];
} {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // Formula from Musk: upper = (A + hour + minute) % 8, lower = (B + hour + minute) % 8
  const upper = (num1 + hour + minute) % 8;
  const lower = (num2 + hour + minute) % 8;

  // Calculate moving line (1-6)
  const movingLine = ((num1 + num2 + num3 + hour + minute) % 6) + 1;

  const trigramKey = `${upper}-${lower}`;
  const hexagramNumber = TRIGRAM_TO_HEXAGRAM[trigramKey] || 1;

  return {
    upper,
    lower,
    hexagramNumber,
    movingLine,
    upperTrigram: TRIGRAMS[upper as keyof typeof TRIGRAMS],
    lowerTrigram: TRIGRAMS[lower as keyof typeof TRIGRAMS],
  };
}

// Hexagram names lookup (sequence_number -> name_cn, name_en)
const HEXAGRAM_NAMES: Record<number, { name_cn: string; name_en: string }> = {
  1:  { name_cn: '乾为天',   name_en: 'Heaven over Heaven' },
  2:  { name_cn: '坤为地',   name_en: 'Earth over Earth' },
  3:  { name_cn: '水雷屯',   name_en: 'Water over Thunder' },
  4:  { name_cn: '山水蒙',   name_en: 'Mountain over Water' },
  5:  { name_cn: '水天需',   name_en: 'Water over Heaven' },
  6:  { name_cn: '天水讼',   name_en: 'Heaven over Water' },
  7:  { name_cn: '地水师',   name_en: 'Earth over Water' },
  8:  { name_cn: '水地比',   name_en: 'Water over Earth' },
  9:  { name_cn: '天风小畜', name_en: 'Heaven over Wind' },
  10: { name_cn: '天泽履',   name_en: 'Heaven over Lake' },
  11: { name_cn: '地天泰',   name_en: 'Earth over Heaven' },
  12: { name_cn: '天地否',   name_en: 'Heaven over Earth' },
  13: { name_cn: '天火同人', name_en: 'Heaven over Fire' },
  14: { name_cn: '火天大有', name_en: 'Fire over Heaven' },
  15: { name_cn: '地山谦',   name_en: 'Earth over Mountain' },
  16: { name_cn: '雷地豫',   name_en: 'Thunder over Earth' },
  17: { name_cn: '泽雷随',   name_en: 'Lake over Thunder' },
  18: { name_cn: '山风蛊',   name_en: 'Mountain over Wind' },
  19: { name_cn: '地泽临',   name_en: 'Earth over Lake' },
  20: { name_cn: '风地观',   name_en: 'Wind over Earth' },
  21: { name_cn: '火雷噬嗑', name_en: 'Fire over Thunder' },
  22: { name_cn: '山火贲',   name_en: 'Mountain over Fire' },
  23: { name_cn: '山地剥',   name_en: 'Mountain over Earth' },
  24: { name_cn: '地雷复',   name_en: 'Earth over Thunder' },
  25: { name_cn: '天雷无妄', name_en: 'Heaven over Thunder' },
  26: { name_cn: '山天大畜', name_en: 'Mountain over Heaven' },
  27: { name_cn: '山雷颐',   name_en: 'Mountain over Thunder' },
  28: { name_cn: '泽风大过', name_en: 'Lake over Wind' },
  29: { name_cn: '坎为水',   name_en: 'Water over Water' },
  30: { name_cn: '离为火',   name_en: 'Fire over Fire' },
  31: { name_cn: '泽山咸',   name_en: 'Lake over Mountain' },
  32: { name_cn: '雷风恒',   name_en: 'Thunder over Wind' },
  33: { name_cn: '天山遁',   name_en: 'Heaven over Mountain' },
  34: { name_cn: '雷天大壮', name_en: 'Thunder over Heaven' },
  35: { name_cn: '火地晋',   name_en: 'Fire over Earth' },
  36: { name_cn: '地火明夷', name_en: 'Earth over Fire' },
  37: { name_cn: '风火家人', name_en: 'Wind over Fire' },
  38: { name_cn: '火泽睽',   name_en: 'Fire over Lake' },
  39: { name_cn: '水山蹇',   name_en: 'Water over Mountain' },
  40: { name_cn: '雷水解',   name_en: 'Thunder over Water' },
  41: { name_cn: '山泽损',   name_en: 'Mountain over Lake' },
  42: { name_cn: '风雷益',   name_en: 'Wind over Thunder' },
  43: { name_cn: '泽天夬',   name_en: 'Lake over Heaven' },
  44: { name_cn: '天风姤',   name_en: 'Heaven over Wind' },
  45: { name_cn: '泽地萃',   name_en: 'Lake over Earth' },
  46: { name_cn: '地风升',   name_en: 'Earth over Wind' },
  47: { name_cn: '泽水困',   name_en: 'Lake over Water' },
  48: { name_cn: '水风井',   name_en: 'Water over Wind' },
  49: { name_cn: '泽火革',   name_en: 'Lake over Fire' },
  50: { name_cn: '火风鼎',   name_en: 'Fire over Wind' },
  51: { name_cn: '震为雷',   name_en: 'Thunder over Thunder' },
  52: { name_cn: '艮为山',   name_en: 'Mountain over Mountain' },
  53: { name_cn: '风山渐',   name_en: 'Wind over Mountain' },
  54: { name_cn: '雷泽归妹', name_en: 'Thunder over Lake' },
  55: { name_cn: '雷火丰',   name_en: 'Thunder over Fire' },
  56: { name_cn: '火山旅',   name_en: 'Fire over Mountain' },
  57: { name_cn: '巽为风',   name_en: 'Wind over Wind' },
  58: { name_cn: '兑为泽',   name_en: 'Lake over Lake' },
  59: { name_cn: '风水涣',   name_en: 'Wind over Water' },
  60: { name_cn: '水泽节',   name_en: 'Water over Lake' },
  61: { name_cn: '风泽中孚', name_en: 'Wind over Lake' },
  62: { name_cn: '雷山小过', name_en: 'Thunder over Mountain' },
  63: { name_cn: '水火既济', name_en: 'Water over Fire' },
  64: { name_cn: '火水未济', name_en: 'Fire over Water' },
};

// 5-level result system for all 64 hexagrams (Musk's simplified system)
const HEXAGRAM_SIMPLIFIED: Record<number, {
  result_level: number;
  result_icon: string;
  result_label: string;
  situation: string;
  action_1: string;
  action_2: string;
  action_3: string;
}> = {
  1:  { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',         situation: 'Perfect timing and alignment',                action_1: 'Move forward boldly',       action_2: 'Seize the moment',          action_3: 'Lead with confidence' },
  44: { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Unexpected opportunity appears',               action_1: 'Act quickly',               action_2: 'Evaluate fit',              action_3: 'Trust your gut' },
  14: { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Time to reap rewards',             action_1: 'Capitalize on momentum',    action_2: 'Share the gains',           action_3: 'Invest wisely' },
  34: { result_level: 3, result_icon: '🟠', result_label: 'Moderate', situation: 'Strong energy needs direction',                action_1: 'Focus your power',          action_2: 'Pace yourself',             action_3: 'Lead with awareness' },
  5:  { result_level: 3, result_icon: '🟠', result_label: 'Moderate', situation: 'Timing not quite right',                       action_1: 'Prepare thoroughly',        action_2: 'Stay alert',                action_3: 'Cultivate patience' },
  26: { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Building reserves for future',                 action_1: 'Think long-term',           action_2: 'Delay gratification',       action_3: 'Protect assets' },
  11: { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Vision aligns with reality',           action_1: 'Trust the flow',            action_2: 'Bridge worlds',             action_3: 'Maintain balance' },
  43: { result_level: 3, result_icon: '🟠', result_label: 'Moderate', situation: 'Decision point approaching',                    action_1: 'Act when ready',            action_2: "Don't hesitate",            action_3: 'Cut cleanly' },
  58: { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Joyful connections',                           action_1: 'Celebrate genuinely',       action_2: 'Spread positivity',         action_3: 'Deepen bonds' },
  10: { result_level: 3, result_icon: '🟠', result_label: 'Moderate', situation: 'Proceed with care',              action_1: 'Step mindfully',            action_2: 'Respect protocols',         action_3: 'Build credibility' },
  38: { result_level: 3, result_icon: '🟠', result_label: 'Moderate', situation: 'Tension and misalignment',                     action_1: 'Find common ground',        action_2: 'Respect differences',       action_3: 'Know when to part' },
  54: { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'New commitment or role',                       action_1: 'Clarify expectations',      action_2: 'Honor your word',           action_3: 'Grow into it' },
  61: { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Trust-building phase',                         action_1: 'Lead with vulnerability',   action_2: 'Keep promises',             action_3: 'Trust intuition' },
  60: { result_level: 3, result_icon: '🟠', result_label: 'Moderate', situation: 'Need balance and rhythm',                      action_1: 'Set boundaries',            action_2: 'Create rituals',            action_3: 'Moderate extremes' },
  41: { result_level: 2, result_icon: '🔴', result_label: 'Challenging',     situation: 'Must let something go',                        action_1: 'Identify the cost',         action_2: 'Release gracefully',        action_3: 'Focus on net gain' },
  19: { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Drawing closer to goal',                       action_1: 'Show up authentically',     action_2: 'Observe first',             action_3: 'Build gradually' },
  30: { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Clarity and visibility peak',          action_1: 'Shine your light',          action_2: 'Clarify vision',            action_3: 'Inspire others' },
  13: { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Finding your tribe',               action_1: 'Find your tribe',           action_2: 'Align on values',           action_3: 'Contribute generously' },
  49: { result_level: 3, result_icon: '🟠', result_label: 'Moderate', situation: 'Transformation needed',                  action_1: 'Release the old',           action_2: 'Lead the change',           action_3: 'Communicate vision' },
  55: { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Peak moment, abundance',                       action_1: 'Savor the moment',          action_2: 'Document learnings',        action_3: 'Prepare for transition' },
  37: { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Focus on foundations',                         action_1: 'Invest in relationships',   action_2: 'Create safe space',         action_3: 'Honor your roots' },
  63: { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Coming full circle',                    action_1: 'Acknowledge completion',    action_2: 'Integrate learnings',       action_3: 'Rest before next' },
  22: { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Presentation matters',                         action_1: 'Polish your image',         action_2: 'Maintain substance',        action_3: 'Make strong impression' },
  36: { result_level: 2, result_icon: '🔴', result_label: 'Challenging',            situation: 'Light temporarily obscured',                   action_1: 'Protect your energy',       action_2: 'Work behind scenes',        action_3: 'Prepare for return' },
  51: { result_level: 3, result_icon: '🟠', result_label: 'Moderate', situation: 'Sudden changes require adaptation',                action_1: 'Stay flexible',        action_2: 'Find your center',          action_3: 'Act on insights' },
  25: { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Moving with natural ease',              action_1: 'Stop forcing',              action_2: 'Align with nature',         action_3: 'Trust the process' },
  17: { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Follow the momentum',                          action_1: 'Follow the energy',         action_2: 'Choose leaders wisely',     action_3: 'Stay flexible' },
  21: { result_level: 3, result_icon: '🟠', result_label: 'Moderate', situation: 'Need clear decisions',                         action_1: 'Make the call',             action_2: 'Execute completely',        action_3: 'Remove obstacles' },
  42: { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Rapid growth phase',                           action_1: 'Invest in growth',          action_2: 'Share gains',               action_3: 'Build systems' },
  3:  { result_level: 2, result_icon: '🔴', result_label: 'Challenging',     situation: 'Challenging start',                            action_1: 'Start small',               action_2: 'Build foundations',         action_3: 'Persist through difficulty' },
  27: { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Self-care phase',                              action_1: 'Prioritize self-care',      action_2: 'Choose quality inputs',     action_3: 'Establish rituals' },
  16: { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Fresh cycle beginning',                        action_1: 'Welcome the return',        action_2: 'Learn from past',           action_3: 'Start fresh' },
  57: { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Gradual progress',                             action_1: 'Keep showing up',           action_2: 'Adapt approach',            action_3: 'Trust subtle power' },
  9:  { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Unexpected encounter',                         action_1: 'Stay open',                 action_2: 'Act quickly',               action_3: 'Evaluate alignment' },
  28: { result_level: 2, result_icon: '🔴', result_label: 'Challenging',     situation: 'Overextended',                                 action_1: 'Identify imbalance',        action_2: 'Reduce load',               action_3: 'Reinforce structures' },
  50: { result_level: 3, result_icon: '🟠', result_label: 'Moderate', situation: 'Transformation underway',                      action_1: 'Embrace refining fire',     action_2: 'Release old form',          action_3: 'Shape the new' },
  32: { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Long-term consistency',                        action_1: 'Commit for long term',      action_2: 'Adapt while persisting',    action_3: 'Celebrate milestones' },
  48: { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Return to source',                          action_1: 'Return to source',          action_2: 'Maintain the well',         action_3: 'Share the water' },
  18: { result_level: 2, result_icon: '🔴', result_label: 'Challenging',     situation: 'Rebuilding needed',                            action_1: 'Acknowledge decay',         action_2: 'Root out corruption',       action_3: 'Rebuild with wisdom' },
  46: { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Rising naturally',                    action_1: 'Grow toward light',         action_2: 'Root deeply',               action_3: 'Trust natural timing' },
  29: { result_level: 2, result_icon: '🔴', result_label: 'Challenging',     situation: 'Navigating uncertain terrain',                 action_1: 'Stay calm',                 action_2: 'Find the current',          action_3: 'Trust your training' },
  6:  { result_level: 2, result_icon: '🔴', result_label: 'Challenging',     situation: 'Conflict brewing',                             action_1: 'Seek middle ground',        action_2: 'Choose battles wisely',     action_3: 'Focus on interests' },
  47: { result_level: 2, result_icon: '🔴', result_label: 'Challenging',     situation: 'Feeling constrained',                          action_1: 'Accept constraints',        action_2: 'Find creative solutions',   action_3: 'Conserve resources' },
  64: { result_level: 3, result_icon: '🟠', result_label: 'Moderate', situation: 'Nearly complete',                              action_1: 'Embrace incompleteness',    action_2: 'Focus on direction',        action_3: 'Trust the process' },
  40: { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Difficulty resolving',                         action_1: 'Let go',                    action_2: 'Integrate lessons',         action_3: 'Move forward lightly' },
  59: { result_level: 3, result_icon: '🟠', result_label: 'Moderate', situation: 'Energy and focus are scattered',                 action_1: 'Focus the scatter',         action_2: 'Release unessential',       action_3: 'Gather what matters' },
  4:  { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Starting to learn',                     action_1: 'Stay curious',              action_2: 'Seek guidance',             action_3: 'Learn by doing' },
  7:  { result_level: 3, result_icon: '🟠', result_label: 'Moderate', situation: 'Team coordination needed',                     action_1: 'Clarify roles',             action_2: 'Build trust',               action_3: 'Lead by example' },
  52: { result_level: 3, result_icon: '🟠', result_label: 'Moderate', situation: 'Time to stop, pause',                          action_1: 'Stop completely',           action_2: 'Observe from stillness',    action_3: 'Wait for signal' },
  33: { result_level: 2, result_icon: '🔴', result_label: 'Challenging',     situation: 'Strategic withdrawal',                         action_1: 'Step back gracefully',      action_2: 'Preserve energy',           action_3: 'Prepare for return' },
  31: { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Mutual attraction',                            action_1: 'Follow attraction',         action_2: 'Check reciprocity',         action_3: 'Build on resonance' },
  56: { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Journey ahead',                                action_1: 'Travel light',              action_2: 'Stay present',              action_3: 'Gather wisdom' },
  62: { result_level: 3, result_icon: '🟠', result_label: 'Moderate', situation: 'Minor imbalance',                              action_1: 'Mind the details',          action_2: 'Avoid major risks',         action_3: 'Correct quickly' },
  53: { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Steady progress',                              action_1: 'Trust the process',         action_2: 'Build step by step',        action_3: 'Celebrate small wins' },
  39: { result_level: 2, result_icon: '🔴', result_label: 'Challenging',     situation: 'Facing obstacles',                             action_1: 'Accept difficulty',         action_2: 'Find another way',          action_3: 'Ask for help' },
  15: { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Quiet strength prevails',                 action_1: 'Let results speak',         action_2: 'Acknowledge others',        action_3: 'Stay grounded' },
  2:  { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Time to receive and nurture',                   action_1: 'Practice receptivity',      action_2: 'Nurture what exists',       action_3: 'Trust the process' },
  12: { result_level: 2, result_icon: '🔴', result_label: 'Challenging',     situation: 'Connection blocked',                           action_1: 'Acknowledge the block',     action_2: "Don't force connection",    action_3: 'Wait for opening' },
  45: { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Coming together',                          action_1: 'Call people together',      action_2: 'Create container',          action_3: 'Honor contributions' },
  35: { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Advancing forward',                     action_1: 'Step into light',           action_2: 'Prepare for responsibility', action_3: 'Help others rise' },
  24: { result_level: 4, result_icon: '🟡', result_label: 'Favorable',       situation: 'Eager readiness',                      action_1: 'Channel energy',            action_2: 'Prepare thoroughly',        action_3: 'Share the joy' },
  20: { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Steady upward climb',                        action_1: 'Grow toward light',         action_2: 'Root deeply',               action_3: 'Trust natural timing' },
  8:  { result_level: 5, result_icon: '🟢', result_label: 'Highly Favorable',      situation: 'Building alliances',                            action_1: 'Reach out',                 action_2: 'Offer support first',       action_3: 'Choose allies carefully' },
  23: { result_level: 2, result_icon: '🔴', result_label: 'Challenging',     situation: 'Natural decline',                              action_1: 'Let it fall',               action_2: 'Protect the core',          action_3: 'Prepare for renewal' },
};

// Build hexagram reading from names + simplified data
function getMockHexagram(hexagramNumber: number): Hexagram {
  const names = HEXAGRAM_NAMES[hexagramNumber] || HEXAGRAM_NAMES[1];
  const simplified = HEXAGRAM_SIMPLIFIED[hexagramNumber] || HEXAGRAM_SIMPLIFIED[1];

  return {
    sequence_number: hexagramNumber,
    name_cn: names.name_cn,
    name_en: names.name_en,
    upper_trigram: names.name_en.split(' over ')[0] || 'Unknown',
    lower_trigram: names.name_en.split(' over ')[1] || 'Unknown',
    ...simplified,
  };
}

// Get hexagram reading
export function getHexagram64Reading(
  question: string,
  numbers: string
): Hexagram & {
  question: string;
  inputNumbers: string;
  movingLine: number;
  upperTrigram: typeof TRIGRAMS[0];
  lowerTrigram: typeof TRIGRAMS[0];
} {
  const [num1, num2, num3] = numbers.split('').map(Number);
  const { hexagramNumber, movingLine, upperTrigram, lowerTrigram } = calculateHexagram64(num1, num2, num3);

  const hexagram = getMockHexagram(hexagramNumber);

  return {
    ...hexagram,
    question,
    inputNumbers: numbers,
    movingLine,
    upperTrigram,
    lowerTrigram,
  };
}

// Level-based conclusion and suggestion mapping (for simplified template)
export const LEVEL_TEMPLATES: Record<number, {
  conclusion: string;
  suggestion: string;
}> = {
  5: {
    conclusion: 'Perfect timing, all conditions aligned',
    suggestion: 'Move forward with confidence and seize the opportunity'
  },
  4: {
    conclusion: 'Favorable conditions, suitable for progress',
    suggestion: 'Prepare well and take action when ready'
  },
  3: {
    conclusion: 'Achievable but requires extra effort',
    suggestion: 'Expect challenges and be prepared to work harder'
  },
  2: {
    conclusion: 'Hold off, timing is not ideal',
    suggestion: 'Delay action and wait for better timing'
  },
  1: {
    conclusion: 'High risk, not recommended',
    suggestion: 'Avoid taking action at this time'
  }
};
