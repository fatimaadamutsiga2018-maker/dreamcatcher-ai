import { type ArchetypeKey, archetypeInfo } from './assessment'

export interface ArchetypeContent {
  slug: string
  archetypeKey: ArchetypeKey
  seoTitle: string
  metaDescription: string
  h1: string
  subtitle: string
  overview: string[]
  signs: string[]
  whyThisHappens: string[]
  hiddenRisk: string[]
  whatYouNeedNow: string[]
  resetStep: string
  relatedSlugs: [string, string]
  relatedDescriptions: [string, string]
}

export const ARCHETYPE_KEY_TO_SLUG: Record<ArchetypeKey, string> = {
  visionary_architect: 'visionary-architect',
  kinetic_fog: 'kinetic-fog',
  burnedout_sage: 'burned-out-sage',
  deep_observer: 'deep-observer',
  rogue_engine: 'rogue-engine',
  explorer: 'explorer',
  harmonious_drifter: 'harmonious-drifter',
  hibernator: 'hibernator',
}

const SLUG_TO_KEY: Record<string, ArchetypeKey> = Object.fromEntries(
  Object.entries(ARCHETYPE_KEY_TO_SLUG).map(([k, v]) => [v, k as ArchetypeKey])
) as Record<string, ArchetypeKey>

const archetypeContents: ArchetypeContent[] = [
  {
    slug: 'visionary-architect',
    archetypeKey: 'visionary_architect',
    seoTitle: 'The Visionary Architect: Mastering High-Density Action',
    metaDescription:
      'Discover the Visionary Architect energy state — high clarity meets strong momentum. Learn how to maximize your window of peak alignment and avoid over-extension.',
    h1: 'The Visionary Architect: Mastering the Art of High-Density Action',
    subtitle:
      'The map is clear, the engine is fueled, and the wind is at your back. This is your window of maximum impact.',
    overview: [
      'This is the "Gold Standard" of energy alignment. A Visionary Architect possesses both the Mental Clarity to see the long-term horizon and the Growth Momentum to move toward it with precision.',
      'In this state, your internal "weather" is perfectly clear, and every action you take has a compounding effect.',
    ],
    signs: [
      'Complex problems feel like simple puzzles. You are solving challenges before they even manifest.',
      "You don't feel the need to rush because you trust your timing. You know exactly when to strike.",
      'Opportunities seem to "appear" just as you need them — the result of being perfectly tuned to your environment.',
    ],
    whyThisHappens: [
      'The Visionary Architect state emerges when all four energy dimensions are elevated and aligned. Mental clarity provides direction, physical vitality provides fuel, life harmony reduces friction, and growth momentum creates forward motion.',
      'This alignment is rare and usually follows a period of intentional preparation — you have done the inner work to arrive here.',
    ],
    hiddenRisk: [
      'The risk of being a Visionary Architect is over-extension. Because everything feels easy, you may be tempted to take on too much.',
      'High-density energy should be used for high-impact goals, not for filling up your calendar with more "stuff." Protect this state by being selective.',
    ],
    whatYouNeedNow: [
      'This state is rare and precious. Don\'t waste it on maintenance; use it for architecture.',
      'Attack the "Big Rocks" — move on the project you\'ve been procrastinating on for months. Your friction is at its lowest.',
      'Document the vision. Capture your current clarity. Write down your strategy now, so you can follow it later when the "weather" inevitably shifts.',
    ],
    resetStep:
      'Identify the ONE high-impact goal you\'ve been avoiding. Start it today — your alignment window is open.',
    relatedSlugs: ['deep-observer', 'kinetic-fog'],
    relatedDescriptions: [
      'When momentum slows but clarity remains, you may shift into a Deep Observer state.',
      'When action increases but clarity drops, you may be entering a Kinetic Fog.',
    ],
  },
  {
    slug: 'kinetic-fog',
    archetypeKey: 'kinetic_fog',
    seoTitle: 'The Kinetic Fog: Why Moving Fast Isn\'t Making Progress',
    metaDescription:
      'Are you busy all day but can\'t name one significant achievement? Discover the Kinetic Fog energy state and learn how to clear the mental fog while keeping your momentum.',
    h1: "The Kinetic Fog: Why Moving Fast Isn't the Same as Making Progress",
    subtitle:
      "You have the engine of a Ferrari, but the visibility of a blizzard. It's time to stop driving and start clearing the windshield.",
    overview: [
      'A Kinetic Fog occurs when your Physical Vitality is at peak levels, but your Mental Clarity is obscured.',
      'You feel an intense, almost frantic urge to "do something," but you lack the strategic compass to know what that something should be.',
    ],
    signs: [
      'You finish 20 small tasks by noon, but the one project that actually matters hasn\'t been touched.',
      'You feel guilty when you aren\'t "busy," yet you can\'t define what success looks like for today.',
      'Choosing what to eat or which email to answer feels as heavy as a board meeting.',
    ],
    whyThisHappens: [
      'When you act from a place of fog, you aren\'t building — you\'re reacting. Every "fast" move you make creates internal friction.',
      'This leads to a specific type of exhaustion where your body is tired but your mind is still racing in circles.',
    ],
    hiddenRisk: [
      'Prolonged Kinetic Fog leads to burnout without meaningful progress. You exhaust your physical reserves while making no strategic advancement.',
      'Over time, this erodes confidence — you begin to doubt your ability to achieve anything, even though the real problem is direction, not effort.',
    ],
    whatYouNeedNow: [
      'To shift from a Kinetic Fog to clarity, you must prioritize reflective silence over active hustle.',
      'The 2-Hour Isolation: Disconnect from all digital inputs. Your brain cannot find clarity while being bombarded by noise.',
      'The "One Thing" Filter: If you could only achieve ONE thing this week to feel proud, what would it be? Ignore everything else until that is done.',
    ],
    resetStep:
      'Pause all new projects. Enter 2 hours of stillness until you can state your core priority in one sentence.',
    relatedSlugs: ['visionary-architect', 'rogue-engine'],
    relatedDescriptions: [
      'When clarity returns to match your energy, you become a Visionary Architect.',
      'When friction intensifies, you may be operating as a Rogue Engine.',
    ],
  },
  {
    slug: 'burned-out-sage',
    archetypeKey: 'burnedout_sage',
    seoTitle: 'The Burned-out Sage: When the Mind Outruns the Body',
    metaDescription:
      'Sharp mind but empty tank? The Burned-out Sage state occurs when mental clarity is high but physical vitality has crashed. Learn the restoration protocol.',
    h1: 'The Burned-out Sage: When the Mind Outruns the Body',
    subtitle:
      "Your vision is sharp, but your vessel is empty. You've seen the mountain top, but your legs have stopped moving.",
    overview: [
      'This occurs when your Mental Clarity is at an all-time high, but your Physical Vitality has crashed.',
      'You know exactly what needs to be done, how to do it, and why it matters — but the mere act of opening a laptop feels like climbing Everest.',
    ],
    signs: [
      'You spend hours refining a strategy but zero minutes implementing it.',
      'You get frustrated when others don\'t "get it" as fast as you, even though you aren\'t doing anything about it.',
      "You feel like you've worked all day because your brain is exhausted, but your task list hasn't moved.",
    ],
    whyThisHappens: [
      'The Burned-out Sage state typically follows a period of intense output. Your mind kept running long after your body asked you to stop.',
      'If you stay here too long, you will begin to resent your own goals. Cynicism is the shadow side of the Burned-out Sage.',
    ],
    hiddenRisk: [
      'You start to believe that "nothing works," when in reality, you just don\'t have the biological fuel to make it work.',
      'The longer you push mentally without physical recovery, the deeper the burnout becomes — and the longer the recovery will take.',
    ],
    whatYouNeedNow: [
      'Stop searching for productivity hacks. You need sleep, hydration, and rest. Your priority is your nervous system, not your to-do list.',
      'The 10-Minute Sprint: Do not try to work for 4 hours. Set a timer for 10 minutes. Do one thing. Then stop.',
      "Radical Simplification: Delete 80% of your current plans. Keep only the 20% that your current body can actually handle.",
    ],
    resetStep:
      'Go offline for 24 hours. Your brain needs deep rest, not more information.',
    relatedSlugs: ['visionary-architect', 'hibernator'],
    relatedDescriptions: [
      'When physical energy returns to match your clarity, you become a Visionary Architect.',
      'If energy continues to drop across all dimensions, you may be entering Hibernation.',
    ],
  },
  {
    slug: 'deep-observer',
    archetypeKey: 'deep_observer',
    seoTitle: 'The Deep Observer: The Power of Strategic Stillness',
    metaDescription:
      'Calm, clear, and calculating. The Deep Observer state is about strategic patience — waiting for the right window to act. Learn why stillness is strength.',
    h1: 'The Deep Observer: The Power of Strategic Stillness',
    subtitle:
      "The predator is still, not because it is lazy, but because it is precise.",
    overview: [
      "You are in a state of high alignment. Your mind is clear, and your life is in harmony.",
      "You aren't moving fast, but that's intentional. You are waiting for the right window of opportunity.",
    ],
    signs: [
      "While everyone else is panicking, you feel calm.",
      "You have a gut feeling about where your life or work is heading.",
      "You'd rather do nothing than do the wrong thing.",
    ],
    whyThisHappens: [
      'The Deep Observer state emerges when inner balance is high but external conditions haven\'t aligned yet. You sense that the timing isn\'t right for action.',
      "This is Dreamcatcher's most valued preparation state. You're balanced, aware, and patient — accumulating intelligence before your next strategic move.",
    ],
    hiddenRisk: [
      'The risk is waiting too long. Strategic patience can become comfortable inaction if you never define what "the right moment" looks like.',
      'Hustle culture may make you feel guilty for your stillness — but don\'t let external pressure push you into premature action.',
    ],
    whatYouNeedNow: [
      'Sharpen the Axe: Use this time for deep learning, research, or skill-building.',
      'Set the Trigger: Define exactly what "opportunity" looks like so you can strike instantly when it appears.',
      'Enjoy the peace. This state is rare. Do not let outside pressure make you feel guilty for your stillness.',
    ],
    resetStep:
      'Write down the exact conditions that would trigger your next move. Then return to patient observation.',
    relatedSlugs: ['visionary-architect', 'harmonious-drifter'],
    relatedDescriptions: [
      'When the window opens and momentum builds, you become a Visionary Architect.',
      'If patience turns into passivity, you may drift into a Harmonious Drifter state.',
    ],
  },
  {
    slug: 'rogue-engine',
    archetypeKey: 'rogue_engine',
    seoTitle: 'The Rogue Engine: Success at an Unsustainable Cost',
    metaDescription:
      'Driven but carrying too much friction. The Rogue Engine state is about high momentum with low harmony — winning the race but losing everything else. Find balance.',
    h1: 'The Rogue Engine: Success at an Unsustainable Cost',
    subtitle:
      'You are winning the race, but the car is on fire. How long can you stay on the track before the crash?',
    overview: [
      'You have incredible Growth Momentum. You are hitting targets, making progress, and scaling fast.',
      "But your Life Harmony is in the negatives. Your health is slipping, your relationships feel distant, and your inner peace is non-existent.",
    ],
    signs: [
      "You can't stop working even when you're with loved ones.",
      'You achieve a goal and immediately look for the next one without a single second of celebration.',
      'Your desk, your home, and your personal relationships are a mess of unresolved issues.',
    ],
    whyThisHappens: [
      'The Rogue Engine state typically develops when ambition outpaces self-awareness. Success becomes a coping mechanism rather than a genuine pursuit.',
      "You're standing at the intersection of breakthrough and breakdown. The question is which one arrives first.",
    ],
    hiddenRisk: [
      'You will get the result, but you might hate the person you become once you get it.',
      'Relationships, health, and inner peace — once lost — take far longer to rebuild than any business metric.',
    ],
    whatYouNeedNow: [
      'Hard Boundaries: Set a "No-Fly Zone" for work. No devices after a certain hour.',
      "Relationship Repair: Your next big project isn't a business deal — it's a 2-hour uninterrupted conversation with someone you've been neglecting.",
      'Audit Your "Why": Are you running toward a dream, or running away from a fear?',
    ],
    resetStep:
      "Address the personal conflict you've been avoiding. It will become the obstacle that trips you next week.",
    relatedSlugs: ['kinetic-fog', 'visionary-architect'],
    relatedDescriptions: [
      'When direction becomes unclear, you may slip into a Kinetic Fog.',
      'When harmony returns, your drive transforms into aligned Visionary Architect energy.',
    ],
  },
  {
    slug: 'explorer',
    archetypeKey: 'explorer',
    seoTitle: 'The Explorer: Between Possibility and Direction',
    metaDescription:
      'Curious, open, and searching. The Explorer state is about discovery — multiple paths are calling. Learn how to gently turn exploration into clarity.',
    h1: 'The Explorer: Between Possibility and Direction',
    subtitle:
      'You are not stuck. You are exploring. The question is when to stop discovering and start committing.',
    overview: [
      'You are in a state of openness. There is movement — but not yet commitment. Energy exists — but direction is still forming.',
      'You are not stuck. You are exploring.',
    ],
    signs: [
      'You feel drawn to multiple paths, ideas, or futures.',
      "You struggle to commit to one direction.",
      'You often ask: "What else is possible?"',
      "You start things, but don't always continue.",
      'You feel curious, but slightly ungrounded.',
    ],
    whyThisHappens: [
      'The Explorer state often appears after a shift. You may have outgrown a previous identity, goal, or structure — but haven\'t yet anchored into a new one.',
      'This creates expansion: more options, more ideas, less certainty. It is not confusion — it is a transition from definition to possibility.',
    ],
    hiddenRisk: [
      'Exploration without direction can slowly turn into drift. If prolonged, this state may lead to decision fatigue, loss of momentum, and shallow progress across many areas.',
      'The biggest risk is staying in exploration too long without choosing a direction.',
    ],
    whatYouNeedNow: [
      "You don't need more ideas. You need a temporary direction.",
      "Not a life decision — just something stable enough to move with. Clarity is not found by thinking longer. It is built by committing briefly.",
    ],
    resetStep:
      'Choose ONE path to explore for the next 7 days. Treat it as an experiment — not a final choice.',
    relatedSlugs: ['kinetic-fog', 'harmonious-drifter'],
    relatedDescriptions: [
      'When energy spikes but direction stays unclear, you may enter a Kinetic Fog.',
      'When exploration loses momentum entirely, you may drift into a Harmonious Drifter state.',
    ],
  },
  {
    slug: 'harmonious-drifter',
    archetypeKey: 'harmonious_drifter',
    seoTitle: 'The Harmonious Drifter: The Danger of a Perfect Harbor',
    metaDescription:
      "Comfortable but not growing. The Harmonious Drifter state is peaceful stagnation — life feels fine, but momentum has flatlined. Learn how to raise the sails.",
    h1: 'The Harmonious Drifter: The Danger of a Perfect Harbor',
    subtitle:
      "The water is calm and the sun is out. But remember: ships aren't built for the harbor.",
    overview: [
      'You have reached a rare level of Life Harmony. Your relationships are steady, your stress is low, and your environment is comfortable.',
      'However, your Growth Momentum has flatlined. You are no longer navigating; you are drifting with the current.',
    ],
    signs: [
      'You feel "fine," but you haven\'t felt "excited" or "challenged" in months.',
      'You skip tasks or conversations that might disrupt your current peace, even if they lead to growth.',
      'Your skills are staying the same while the world around you is evolving.',
    ],
    whyThisHappens: [
      'Comfort is a recovery tool, not a destination. The Harmonious Drifter state often follows a period of turbulence — you found peace and now you\'re reluctant to risk losing it.',
      'Prolonged harmony without momentum leads to stagnation, which eventually turns into a crisis when you realize how much time has passed.',
    ],
    hiddenRisk: [
      "Peace can become a prison. When comfort is your highest value, you stop growing — and eventually, the world moves on without you.",
      'The longer you drift, the harder it becomes to restart momentum. Inertia works both ways.',
    ],
    whatYouNeedNow: [
      'Introduce a "Healthy Stressor": Sign up for a challenge, a public commitment, or a high-stakes course. You need to break the glass of your comfort zone.',
      'The "Discomfort" Daily Habit: Do one thing every day that makes you slightly nervous.',
      'Find a peer in a Visionary Architect state. Their energy will naturally pull you out of your drift.',
    ],
    resetStep:
      'Find one small source of positive pressure. Try something that makes you slightly uncomfortable this week.',
    relatedSlugs: ['explorer', 'hibernator'],
    relatedDescriptions: [
      'When curiosity returns, you may shift into an Explorer state.',
      'If energy drops further, you may be entering Hibernation.',
    ],
  },
  {
    slug: 'hibernator',
    archetypeKey: 'hibernator',
    seoTitle: 'The Hibernator: Honoring the Winter of Your Life',
    metaDescription:
      "All dimensions low. The Hibernator state is nature demanding a total shutdown for repairs. This isn't failure — it's a necessary season of restoration.",
    h1: 'The Hibernator: Honoring the Winter of Your Life',
    subtitle:
      "The ground must freeze before the seeds can grow. This isn't a failure; it's a reset.",
    overview: [
      'All four energy dimensions are currently low. You feel lost, tired, disconnected, and stagnant.',
      "This is the most critical state to handle correctly. If you try to hustle out of this, you will break.",
    ],
    signs: [
      "You don't care about your goals or your social life right now.",
      'No amount of sleep feels like enough.',
      'You feel like you\'ve lost your "spark" or your identity.',
    ],
    whyThisHappens: [
      'The Hibernator state is nature demanding a shutdown for repairs. It usually follows prolonged stress, a major life event, or a period where you pushed through every warning sign your body gave you.',
      "This isn't failure — it's a biological reset. Even the soil needs winter to prepare for spring.",
    ],
    hiddenRisk: [
      'The danger is fighting the hibernation. Trying to force productivity right now will deepen the exhaustion and extend the recovery period.',
      "The other risk is shame — feeling like you 'should' be doing more. This guilt adds emotional weight to an already depleted system.",
    ],
    whatYouNeedNow: [
      "Surrender to the season. Stop trying to fix yourself. Acceptance is the first step to recovery.",
      'The "Bare Minimum" Rule: Your only job is to eat, sleep, and breathe. Everything else is optional.',
      'Digital Detox: Get away from the highlight reels of others. Your healing happens in the quiet.',
    ],
    resetStep:
      'Accept it. Make zero decisions for 48 hours. Give yourself a full decision holiday.',
    relatedSlugs: ['burned-out-sage', 'harmonious-drifter'],
    relatedDescriptions: [
      'As mental clarity returns first, you may shift into a Burned-out Sage state.',
      'As gentle harmony returns, you may become a Harmonious Drifter before full recovery.',
    ],
  },
]

export function getArchetypeBySlug(slug: string): (ArchetypeContent & { info: typeof archetypeInfo[ArchetypeKey] }) | null {
  const content = archetypeContents.find((a) => a.slug === slug)
  if (!content) return null
  const key = SLUG_TO_KEY[slug]
  return { ...content, info: archetypeInfo[key] }
}

export function getAllArchetypeSlugs(): string[] {
  return archetypeContents.map((a) => a.slug)
}

export function getAllArchetypes() {
  return archetypeContents.map((a) => {
    const key = SLUG_TO_KEY[a.slug]
    return { ...a, info: archetypeInfo[key] }
  })
}
