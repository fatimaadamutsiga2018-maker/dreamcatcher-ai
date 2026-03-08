// Assessment Questions Data
export const assessmentQuestions = [
  // Mental Clarity (心理状态)
  {
    id: 'A1',
    dimension: 'mental_clarity',
    question: 'How clear and focused is your mind right now?',
    description: 'Rate your mental clarity and ability to concentrate',
  },
  {
    id: 'A2',
    dimension: 'mental_clarity',
    question: 'How well are you managing stress and anxiety?',
    description: 'Rate your emotional balance and stress management',
  },
  {
    id: 'A3',
    dimension: 'mental_clarity',
    question: 'How confident do you feel about your decisions?',
    description: 'Rate your decision-making confidence',
  },

  // Physical Vitality (身体状态)
  {
    id: 'B4',
    dimension: 'physical_vitality',
    question: 'How energized does your body feel?',
    description: 'Rate your physical energy and vitality',
  },
  {
    id: 'B5',
    dimension: 'physical_vitality',
    question: 'How well are you sleeping?',
    description: 'Rate your sleep quality and restfulness',
  },
  {
    id: 'B6',
    dimension: 'physical_vitality',
    question: 'How healthy do you feel overall?',
    description: 'Rate your overall physical health',
  },

  // Life Harmony (生活满意度)
  {
    id: 'C7',
    dimension: 'life_harmony',
    question: 'How satisfied are you with your relationships?',
    description: 'Rate the quality of your connections with others',
  },
  {
    id: 'C8',
    dimension: 'life_harmony',
    question: 'How balanced is your work-life situation?',
    description: 'Rate your work-life balance',
  },
  {
    id: 'C9',
    dimension: 'life_harmony',
    question: 'How content are you with your current life situation?',
    description: 'Rate your overall life satisfaction',
  },

  // Growth Momentum (成长动力)
  {
    id: 'D10',
    dimension: 'growth_momentum',
    question: 'How motivated are you to pursue your goals?',
    description: 'Rate your drive and motivation',
  },
  {
    id: 'D11',
    dimension: 'growth_momentum',
    question: 'How much are you learning and growing?',
    description: 'Rate your personal development',
  },
  {
    id: 'D12',
    dimension: 'growth_momentum',
    question: 'How optimistic do you feel about your future?',
    description: 'Rate your sense of hope and possibility',
  },
];

export type EnergyType = 'high_flow' | 'steady_state' | 'recalibration' | 'recharge_mode';

export interface AssessmentResult {
  totalScore: number;
  energyType: EnergyType;
  scores: {
    mental_clarity: number;
    physical_vitality: number;
    life_harmony: number;
    growth_momentum: number;
  };
  lowestDimension: string;
}

export function calculateAssessmentResult(answers: Record<string, number>): AssessmentResult {
  const scores = {
    mental_clarity: (answers.A1 + answers.A2 + answers.A3) / 3,
    physical_vitality: (answers.B4 + answers.B5 + answers.B6) / 3,
    life_harmony: (answers.C7 + answers.C8 + answers.C9) / 3,
    growth_momentum: (answers.D10 + answers.D11 + answers.D12) / 3,
  };

  const totalScore = (scores.mental_clarity + scores.physical_vitality + scores.life_harmony + scores.growth_momentum) / 4;

  let energyType: EnergyType;
  if (totalScore >= 8.5) energyType = 'high_flow';
  else if (totalScore >= 6.5) energyType = 'steady_state';
  else if (totalScore >= 4.5) energyType = 'recalibration';
  else energyType = 'recharge_mode';

  const lowestDimension = Object.entries(scores).reduce((a, b) => a[1] < b[1] ? a : b)[0];

  return {
    totalScore: Math.round(totalScore * 100) / 100,
    energyType,
    scores,
    lowestDimension,
  };
}

export const energyTypeInfo = {
  high_flow: {
    title: 'High Flow',
    description: 'You\'re in an optimal state of energy and alignment. This is your time to take bold action on what matters most.',
    color: 'emerald',
  },
  steady_state: {
    title: 'Steady State',
    description: 'You\'re in a balanced, sustainable rhythm. Continue nurturing what\'s working while staying open to growth.',
    color: 'blue',
  },
  recalibration: {
    title: 'Recalibration',
    description: 'You\'re in a transition phase. This is a time to reassess, adjust, and realign with what truly matters.',
    color: 'amber',
  },
  recharge_mode: {
    title: 'Recharge Mode',
    description: 'Your energy needs replenishment. Prioritize rest, self-care, and releasing what no longer serves you.',
    color: 'rose',
  },
};
