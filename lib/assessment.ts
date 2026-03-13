// ClarityPath Assessment — Archetype Engine
import questionBank, { AssessmentQuestion, AssessmentOption } from './assessment-questions';

export type { AssessmentQuestion, AssessmentOption };

// --- Dimension labels for UI ---
export const dimensionLabels = {
  focus: 'Focus',
  power: 'Power',
  rhythm: 'Rhythm',
  drive: 'Drive',
} as const;

// --- Random question selection: 2 per dimension (1 status + 1 response) ---
export function selectQuestions(): AssessmentQuestion[] {
  const dimensions: AssessmentQuestion['dimension'][] = ['focus', 'power', 'rhythm', 'drive'];
  const selected: AssessmentQuestion[] = [];

  for (const dim of dimensions) {
    const statusQs = questionBank.filter(q => q.dimension === dim && q.type === 'status');
    const responseQs = questionBank.filter(q => q.dimension === dim && q.type === 'response');
    selected.push(statusQs[Math.floor(Math.random() * statusQs.length)]);
    selected.push(responseQs[Math.floor(Math.random() * responseQs.length)]);
  }

  return selected;
}

// --- Score calculation ---
export interface DimensionScores {
  focus: number;
  power: number;
  rhythm: number;
  drive: number;
}

export type ArchetypeKey =
  | 'visionary_architect'
  | 'kinetic_fog'
  | 'burnedout_sage'
  | 'deep_observer'
  | 'rogue_engine'
  | 'explorer'
  | 'harmonious_drifter'
  | 'hibernator';

export interface AssessmentResult {
  scores: DimensionScores;
  innerBalance: number;
  actionEnergy: number;
  archetype: ArchetypeKey;
  lowestDimension: keyof DimensionScores;
  highestDimension: keyof DimensionScores;
}

export function calculateResult(answers: Record<string, number>): AssessmentResult {
  // Group answers by dimension
  const dimTotals: Record<string, number[]> = { focus: [], power: [], rhythm: [], drive: [] };

  for (const [qId, score] of Object.entries(answers)) {
    const q = questionBank.find(q => q.id === qId);
    if (q) dimTotals[q.dimension].push(score);
  }

  const scores: DimensionScores = {
    focus: avg(dimTotals.focus),
    power: avg(dimTotals.power),
    rhythm: avg(dimTotals.rhythm),
    drive: avg(dimTotals.drive),
  };

  const innerBalance = (scores.focus + scores.rhythm) / 2;
  const actionEnergy = (scores.power + scores.drive) / 2;

  // Archetype determination (Gemini's matrix with GPT's names)
  let archetype: ArchetypeKey;

  // Special case: all dimensions below 4 → Hibernator
  if (scores.focus < 4 && scores.power < 4 && scores.rhythm < 4 && scores.drive < 4) {
    archetype = 'hibernator';
  } else if (innerBalance >= 7.5 && actionEnergy >= 7.5) {
    archetype = 'visionary_architect';
  } else if (innerBalance >= 7.5 && actionEnergy >= 5) {
    archetype = 'deep_observer';
  } else if (innerBalance >= 7.5) {
    archetype = 'burnedout_sage';
  } else if (innerBalance >= 5 && actionEnergy >= 7.5) {
    archetype = 'kinetic_fog';
  } else if (innerBalance >= 5 && actionEnergy >= 5) {
    archetype = 'explorer';
  } else if (innerBalance >= 5) {
    archetype = 'hibernator';
  } else if (actionEnergy >= 5) {
    archetype = 'rogue_engine';
  } else {
    archetype = 'harmonious_drifter';
  }

  const entries = Object.entries(scores) as [keyof DimensionScores, number][];
  const lowestDimension = entries.reduce((a, b) => a[1] < b[1] ? a : b)[0];
  const highestDimension = entries.reduce((a, b) => a[1] > b[1] ? a : b)[0];

  return { scores, innerBalance, actionEnergy, archetype, lowestDimension, highestDimension };
}

function avg(nums: number[]): number {
  if (nums.length === 0) return 5;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

// --- Archetype data for results page ---
export interface ArchetypeInfo {
  name: string;
  tagline: string;
  description: string;
  reflectionLine: string;
  advice: string;
  color: string;
  icon: string;
}

export const archetypeInfo: Record<ArchetypeKey, ArchetypeInfo> = {
  visionary_architect: {
    name: 'The Visionary Architect',
    tagline: 'Clear direction. Strong momentum.',
    description: "You can see the finish line, and you have the fuel to get there. Your internal weather is crystal clear — this is the time for bold, strategic action on what matters most.",
    reflectionLine: "You have the map and the engine is running. The horizon isn't a destination; it's your playground. Move now while the visibility is perfect.",
    advice: "Don't waste energy on trivial tasks. Attack the one core goal you've been avoiding.",
    color: 'emerald',
    icon: '🏗️',
  },
  kinetic_fog: {
    name: 'The Kinetic Fog',
    tagline: 'High energy, waiting for direction.',
    description: "You have massive energy but no clear target. You're like a sports car in a blizzard — fast but blind. The risk is burning out in the wrong direction.",
    reflectionLine: "You are moving fast, but you might be running in circles. Stop the car. You don't need more speed; you need to clean the windshield.",
    advice: "Pause all new projects. Enter stillness for 2 hours until you can state your core priority in one sentence.",
    color: 'orange',
    icon: '🌪️',
  },
  burnedout_sage: {
    name: 'The Burned-out Sage',
    tagline: 'Sharp mind, empty tank.',
    description: "You see everything clearly, but you can't lift a finger. Your soul is running ahead while your body has fallen behind. This is where 'wasted potential' feelings live.",
    reflectionLine: "Your wisdom is sharp, but your vessel is cracked. Ideas are cheap when the battery is at 1%. Honor your body before it forcefully shuts you down.",
    advice: "Go offline. Your brain needs deep sleep (REM), not more information.",
    color: 'indigo',
    icon: '🧠',
  },
  deep_observer: {
    name: 'The Deep Observer',
    tagline: 'Calm, clear, and calculating.',
    description: "This is Dreamcatcher's most valued preparation state. You're balanced, aware, and patient — waiting for the right window to open.",
    reflectionLine: "The predator is still, not because it's lazy, but because it's calculating. Don't force the timing. The window will open, and you will know.",
    advice: "Stay patient. This is the golden period for deep learning and intelligence gathering before your next move.",
    color: 'blue',
    icon: '🔭',
  },
  rogue_engine: {
    name: 'The Rogue Engine',
    tagline: 'Driven, but carrying too much friction.',
    description: "You're sprinting, but the cost is your relationships, health, or inner peace. You're standing at the intersection of breakthrough and breakdown.",
    reflectionLine: "You are winning the race but losing your home. What is the cost of a victory that leaves you alone at the finish line? Adjust your rhythm.",
    advice: "Address the personal conflict you've been avoiding. It will become the obstacle that trips you next week.",
    color: 'red',
    icon: '🔥',
  },
  explorer: {
    name: 'The Explorer',
    tagline: 'Curious, open, and searching.',
    description: "You're in a phase of discovery. Direction is still forming, but your curiosity and openness are strong. Exploration is valuable — the key is gently turning it into clarity.",
    reflectionLine: "You are discovering what matters to you. Not every path needs a destination yet. But soon, one direction will call louder than the rest.",
    advice: "Start narrowing. Pick one experiment and commit to it for 2 weeks before evaluating.",
    color: 'purple',
    icon: '🧭',
  },
  harmonious_drifter: {
    name: 'The Harmonious Drifter',
    tagline: 'Searching for clarity and direction.',
    description: "When clarity and momentum both drop, life can feel uncertain. This isn't failure — it's often a signal that something deeper needs attention.",
    reflectionLine: "The water is calm, but you are drifting toward nowhere. Peace is a recovery tool, not a lifestyle. Look for a breeze before the silence becomes stagnant.",
    advice: "Find one small source of positive pressure. Try something that makes you slightly uncomfortable.",
    color: 'gray',
    icon: '🌊',
  },
  hibernator: {
    name: 'The Hibernator',
    tagline: 'A season for total restoration.',
    description: "Complete low point. You feel lost, drained, and disconnected. But this isn't failure — it's nature demanding a shutdown for repairs.",
    reflectionLine: "Even the soil needs winter to prepare for spring. Stop fighting the fatigue. Fall into it. This is a time for total restoration, not navigation.",
    advice: "Accept it. Make zero decisions for 48 hours. Give yourself a full decision holiday.",
    color: 'slate',
    icon: '🌙',
  },
};

// --- Reflection lines by lowest dimension ---
export const dimensionReflections: Record<keyof DimensionScores, { line: string; advice: string; blogSlug: string }> = {
  focus: {
    line: "Your mind is currently a crowded room. You aren't lacking ideas; you're lacking space.",
    advice: "Stop adding tasks. Delete one decision from your calendar today to let the fog clear.",
    blogSlug: 'stop-planning-start-doing-right',
  },
  power: {
    line: "You are trying to win a race with an empty tank. Even the best driver can't ignore the fuel light.",
    advice: "This isn't a mindset problem; it's a biology problem. Your next strategic move should be a 20-minute nap.",
    blogSlug: 'wisdom-of-not-acting',
  },
  rhythm: {
    line: "The music is playing, but you're dancing to a different beat. There is friction in your rhythm.",
    advice: "Stop trying to convince the room. Go quiet. Observe the weather before you try to change it.",
    blogSlug: 'find-your-golden-hours',
  },
  drive: {
    line: "You have the strength, but the door is currently locked. Don't break your shoulder trying to force it.",
    advice: "This is a season for deep preparation, not high execution. Sharpen your tools; the window will open soon.",
    blogSlug: 'why-timing-matters-more-than-effort',
  },
};
