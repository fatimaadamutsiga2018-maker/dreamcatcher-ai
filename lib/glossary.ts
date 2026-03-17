export interface GlossaryTerm {
  id: string
  term: string
  category: 'core' | 'dimensions' | 'states' | 'archetypes' | 'quality' | 'types'
  definition: string
  link?: string
  linkLabel?: string
}

export const GLOSSARY_CATEGORIES: Record<
  string,
  { label: string; icon: string; description: string }
> = {
  core: {
    label: 'Core Concepts',
    icon: '💡',
    description: 'The foundational ideas behind energy management and personal elevation.',
  },
  dimensions: {
    label: 'Four Dimensions',
    icon: '🧭',
    description: 'The four pillars that make up your total energy state.',
  },
  states: {
    label: 'Energy States',
    icon: '🔋',
    description: 'The different levels of energy you experience day to day.',
  },
  archetypes: {
    label: 'Eight Archetypes',
    icon: '🎭',
    description: 'Dynamic snapshots of your current clarity and momentum alignment.',
  },
  quality: {
    label: 'Energy Quality',
    icon: '✨',
    description: 'Concepts that describe how energy is produced, consumed, and sustained.',
  },
  types: {
    label: 'Personal Types',
    icon: '🧬',
    description: 'Individual energy profiles based on rhythm, preference, and source.',
  },
}

export const glossaryTerms: GlossaryTerm[] = [
  // ── Core Concepts ──
  {
    id: 'energy',
    term: 'Energy',
    category: 'core',
    definition:
      'Your personal capacity to think, act, feel, and grow. In ClarityPath, energy is not mystical — it is the measurable sum of your physical, mental, emotional, and spiritual resources.',
  },
  {
    id: 'energy-account',
    term: 'Energy Account',
    category: 'core',
    definition:
      'A metaphor for tracking your energy like a bank balance. Activities either deposit (recharge) or withdraw (drain) energy. The goal is to maintain a positive flow and avoid overdraft.',
  },
  {
    id: 'energy-management',
    term: 'Energy Management',
    category: 'core',
    definition:
      'The practice of intentionally monitoring and directing your energy across all four dimensions. It is not about staying at 100% — it is about finding your optimal range and sustaining it.',
  },
  {
    id: 'elevation',
    term: 'Elevation',
    category: 'core',
    definition:
      'The process of raising your overall energy capacity and quality over time. Elevation is the long-term outcome of consistent energy management — becoming a better version of yourself.',
  },
  {
    id: 'energy-cycle',
    term: 'Energy Cycle',
    category: 'core',
    definition:
      'The natural rhythm of recharge → store → use → recover → recharge. Healthy energy management works with this cycle rather than against it.',
  },

  // ── Four Dimensions ──
  {
    id: 'focus-mental',
    term: 'Focus (Mental Dimension)',
    category: 'dimensions',
    definition:
      'The mental dimension of your energy — your capacity for clarity, learning, concentration, and creative thought. Recharged through deep work, reading, and problem-solving.',
  },
  {
    id: 'power-physical',
    term: 'Power (Physical Dimension)',
    category: 'dimensions',
    definition:
      'The physical dimension of your energy — your bodily vitality, stamina, and readiness for action. Recharged through sleep, exercise, and proper nutrition.',
  },
  {
    id: 'rhythm-emotional',
    term: 'Rhythm (Emotional Dimension)',
    category: 'dimensions',
    definition:
      'The emotional dimension of your energy — your sense of harmony, belonging, and emotional resilience. Recharged through meaningful relationships, joy, and authentic self-expression.',
  },
  {
    id: 'drive-spiritual',
    term: 'Drive (Spiritual Dimension)',
    category: 'dimensions',
    definition:
      'The spiritual dimension of your energy — your connection to purpose, meaning, and values. Recharged through meditation, nature, service, and alignment with your core beliefs.',
  },

  // ── Energy States ──
  {
    id: 'high-energy',
    term: 'High Energy',
    category: 'states',
    definition:
      'A state where you feel focused, motivated, efficient, and creative. Corresponds to high self-efficacy. This is when you do your best strategic work.',
  },
  {
    id: 'balanced-energy',
    term: 'Balanced Energy',
    category: 'states',
    definition:
      'A stable, sustainable state where your energy is steady and your emotions are even. Corresponds to psychological homeostasis — the ideal baseline to maintain.',
  },
  {
    id: 'energy-drain',
    term: 'Energy Drain',
    category: 'states',
    definition:
      'A state of fatigue, anxiety, low efficiency, and impulsive behavior caused by energy overdraft. Prolonged drain leads to burnout syndrome and requires immediate recovery.',
  },

  // ── Eight Archetypes ──
  {
    id: 'visionary-architect',
    term: 'The Visionary Architect',
    category: 'archetypes',
    definition:
      'The peak alignment state — high clarity meets strong momentum. You see the path and have the fuel to walk it. Use this rare window for your highest-impact goals.',
    link: '/archetype/visionary-architect',
    linkLabel: 'Full profile →',
  },
  {
    id: 'kinetic-fog',
    term: 'The Kinetic Fog',
    category: 'archetypes',
    definition:
      'High energy with low direction. You are busy but not productive — like a sports car in a blizzard. The fix is stillness and strategic clarity, not more speed.',
    link: '/archetype/kinetic-fog',
    linkLabel: 'Full profile →',
  },
  {
    id: 'burned-out-sage',
    term: 'The Burned-out Sage',
    category: 'archetypes',
    definition:
      'Sharp mind, empty tank. You know exactly what to do but lack the physical energy to do it. Rest your body before your mind forces a shutdown.',
    link: '/archetype/burned-out-sage',
    linkLabel: 'Full profile →',
  },
  {
    id: 'deep-observer',
    term: 'The Deep Observer',
    category: 'archetypes',
    definition:
      'Calm, clear, and strategically patient. You are gathering intelligence and waiting for the optimal moment to act. Stillness here is strength, not laziness.',
    link: '/archetype/deep-observer',
    linkLabel: 'Full profile →',
  },
  {
    id: 'rogue-engine',
    term: 'The Rogue Engine',
    category: 'archetypes',
    definition:
      'High drive with low harmony. You are achieving results but at the cost of health, relationships, or inner peace. Success without balance leads to breakdown.',
    link: '/archetype/rogue-engine',
    linkLabel: 'Full profile →',
  },
  {
    id: 'explorer',
    term: 'The Explorer',
    category: 'archetypes',
    definition:
      'Open and searching. Multiple paths call to you but none has been chosen yet. You need a temporary direction — clarity comes from brief commitment, not more thinking.',
    link: '/archetype/explorer',
    linkLabel: 'Full profile →',
  },
  {
    id: 'harmonious-drifter',
    term: 'The Harmonious Drifter',
    category: 'archetypes',
    definition:
      'Comfortable but stagnant. Life feels fine, but momentum has flatlined. Comfort is a recovery tool, not a destination — introduce healthy pressure to grow again.',
    link: '/archetype/harmonious-drifter',
    linkLabel: 'Full profile →',
  },
  {
    id: 'hibernator',
    term: 'The Hibernator',
    category: 'archetypes',
    definition:
      'All dimensions are low. This is nature demanding a total shutdown for repairs. Do not fight it — surrender, rest, and let the biological reset complete.',
    link: '/archetype/hibernator',
    linkLabel: 'Full profile →',
  },

  // ── Energy Quality ──
  {
    id: 'premium-energy',
    term: 'Premium Energy',
    category: 'quality',
    definition:
      'Energy gained from sustainable sources that leave you feeling fulfilled, not depleted. Examples: deep sleep, meaningful work, authentic relationships. The return is lasting.',
  },
  {
    id: 'low-quality-energy',
    term: 'Low-Quality Energy',
    category: 'quality',
    definition:
      'Short-lived stimulation that leaves you emptier than before. Examples: doomscrolling, sugar rushes, people-pleasing. It feels like charging but actually drains your account.',
  },
  {
    id: 'energy-density',
    term: 'Energy Density',
    category: 'quality',
    definition:
      'The intensity of energy gained or spent per unit of time. High-density activities (deep sleep, flow-state work) produce the most energy in the least time.',
  },
  {
    id: 'energy-compatibility',
    term: 'Energy Compatibility',
    category: 'quality',
    definition:
      'How well a particular energy source matches your personal profile. The same activity (running, socializing, reading) recharges some people and drains others.',
  },
  {
    id: 'flow-state',
    term: 'Flow State',
    category: 'quality',
    definition:
      'A high-density energy state where personal energy and environmental support are perfectly aligned. Action feels effortless and output is at its highest quality.',
  },

  // ── Personal Types ──
  {
    id: 'morning-person',
    term: 'Morning Person',
    category: 'types',
    definition:
      'An energy type whose peak performance window is in the early hours. Best charged by morning rituals and early solitude; ideal for making important decisions before noon.',
  },
  {
    id: 'night-person',
    term: 'Night Person',
    category: 'types',
    definition:
      'An energy type whose peak performance window is in the evening or late at night. Best charged by evening creativity and deep-night thinking.',
  },
  {
    id: 'social-type',
    term: 'Social Type',
    category: 'types',
    definition:
      'An energy type that draws power from human interaction — conversations, collaboration, and group activities. Social settings are their primary recharge mechanism.',
  },
  {
    id: 'solitude-type',
    term: 'Solitude Type',
    category: 'types',
    definition:
      'An energy type that draws power from being alone — reading, walking, independent thinking. Extended social exposure drains them; quiet time restores them.',
  },
  {
    id: 'creative-type',
    term: 'Creative Type',
    category: 'types',
    definition:
      'An energy type that draws power from novelty and innovation — brainstorming, experimentation, and artistic expression. Routine drains them; new challenges fuel them.',
  },
  {
    id: 'order-seeking-type',
    term: 'Order-Seeking Type',
    category: 'types',
    definition:
      'An energy type that draws power from structure and stability — organizing, planning, and building systems. Chaos drains them; clear processes restore them.',
  },
]

export function getTermsByCategory(category: string): GlossaryTerm[] {
  return glossaryTerms.filter((t) => t.category === category)
}
