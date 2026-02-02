import { TodayState } from './decision-dashboard';

// 1. Define Energy Levels
export type EnergyLevel = 'FLOW_HIGH' | 'BALANCED' | 'LOW' | 'DEPLETED';

// 2. Map TodayState to EnergyLevel
export const STATE_TO_ENERGY_MAP: Record<TodayState, EnergyLevel> = {
    'INITIATE': 'FLOW_HIGH',
    'ACCELERATE': 'FLOW_HIGH',
    'CONSOLIDATE': 'BALANCED',
    'ADJUST': 'LOW',
    'REST': 'DEPLETED',
};

// 3. Define Contextual Decision Domains
export type DecisionDomain =
    | 'CAREER_WORK'
    | 'MONEY_FINANCE'
    | 'RELATIONSHIP_SOCIAL'
    | 'PERSONAL_LIFE'
    | 'ENVIRONMENT_MOVEMENT'
    | 'GENERAL'
    | 'QUICK';

// 4. Content Interface
interface AdviceTemplate {
    conclusion: string;
    support: {
        title: string;
        items: string[];
    };
    caution: {
        title: string;
        items: string[];
    };
    microAdjustment: string;
    // New Detailed View Section
    detailed?: {
        energyOverview: string;
        whatThisMeans: string;
        whyThisTiming: string;
        smartWay: string[];
        avoid: string[];
        microAdjustment: string; // Detailed version might differ
    };
}

// 5. The Content Matrix
const ADVICE_MATRIX: Record<DecisionDomain, Record<EnergyLevel, AdviceTemplate>> = {
    'CAREER_WORK': {
        'FLOW_HIGH': {
            conclusion: "Today’s energy supports moving this forward.",
            support: {
                title: "If you move forward, keep it:",
                items: ["visible and proactive", "focused on progress, not perfection"]
            },
            caution: {
                title: "Avoid:",
                items: ["overthinking small risks", "waiting for the “perfect” moment"]
            },
            microAdjustment: "Stand up, roll your shoulders back, and take one confident breath before acting.",
            detailed: {
                energyOverview: "Your system and the external environment are moving in the same direction. Momentum is easier to build than usual.",
                whatThisMeans: "This is a supportive window for forward movement. Progress comes more naturally, and small actions can create bigger results.",
                whyThisTiming: "You have enough internal drive, and external conditions are not strongly blocking you. This creates a “green light with flexibility” situation.",
                smartWay: ["Start before you feel 100% ready", "Take visible steps, not just planning", "Adjust as you go instead of waiting for perfect clarity"],
                avoid: ["Over-polishing", "Waiting for total certainty", "Adding unnecessary complexity"],
                microAdjustment: "Straighten your posture, take one steady breath, and take the first small action immediately."
            }
        },
        'BALANCED': {
            conclusion: "This decision is workable, but pacing matters.",
            support: {
                title: "If you move forward, keep it:",
                items: ["structured", "step-by-step"]
            },
            caution: {
                title: "Avoid:",
                items: ["rushing the outcome", "taking on extra pressure"]
            },
            microAdjustment: "Write down the next small step — not the whole plan.",
            detailed: {
                energyOverview: "Your energy is steady but not strongly amplified. This is a maintenance-and-progress window.",
                whatThisMeans: "You can move forward, but pacing and structure matter more than speed.",
                whyThisTiming: "Nothing is strongly blocking you, but nothing is strongly pushing you either.",
                smartWay: ["Break the task into clear steps", "Focus on consistency over intensity", "Keep expectations realistic"],
                avoid: ["Forcing rapid results", "Taking on extra responsibilities unnecessarily"],
                microAdjustment: "Write down just the next step, not the entire plan."
            }
        },
        'LOW': {
            conclusion: "This may require more energy than you have today.",
            support: {
                title: "If you move forward, keep it:",
                items: ["small in scope", "easy to adjust"]
            },
            caution: {
                title: "Avoid:",
                items: ["big commitments", "high-stakes conversations"]
            },
            microAdjustment: "Close your eyes for 30 seconds and slow your breathing.",
            detailed: {
                energyOverview: "Your system is carrying more load than usual. Pushing hard now creates friction faster than progress.",
                whatThisMeans: "This is not ideal timing for bold moves, big launches, or high-stakes decisions.",
                whyThisTiming: "Part of your energy is tied up in processing, stress, or unfinished mental loops. Output capacity is lower than normal.",
                smartWay: ["Focus on maintenance, not expansion", "Finish small pending tasks", "Reduce the number of decisions you need to make"],
                avoid: ["Major commitments", "Confrontational conversations at work", "Taking on new responsibility to “prove yourself”"],
                microAdjustment: "Close all extra tabs or windows and work on just one small task for 10 minutes."
            }
        },
        'DEPLETED': {
            conclusion: "Today is better for pausing than pushing.",
            support: {
                title: "If you move forward, keep it:",
                items: ["extremely light", "optional"]
            },
            caution: {
                title: "Avoid:",
                items: ["launches", "confrontations"]
            },
            microAdjustment: "Step away from all screens for 3 minutes.",
            detailed: {
                energyOverview: "Your system is in a recovery state. Forcing productivity now increases long-term cost.",
                whatThisMeans: "This is not a green light for major work decisions or performance pressure.",
                whyThisTiming: "Your cognitive and emotional resources are near their limit. Efficiency drops sharply under strain.",
                smartWay: ["Do only essential tasks", "Communicate delays early if possible", "Protect rest as a priority, not a reward"],
                avoid: ["Big launches", "Career-defining decisions", "Working long hours to “catch up”"],
                microAdjustment: "Step away from the screen, look into the distance, and unclench your jaw and shoulders."
            }
        }
    },
    'MONEY_FINANCE': {
        'FLOW_HIGH': {
            conclusion: "This is a supportive window for financial decisions.",
            support: {
                title: "If you move forward, keep it:",
                items: ["within your planned range", "aligned with long-term value"]
            },
            caution: {
                title: "Avoid:",
                items: ["impulse upgrades", "stretching beyond your comfort zone"]
            },
            microAdjustment: "Review the number once calmly, then decide — no second guessing.",
            detailed: {
                energyOverview: "Clarity and forward flow are relatively strong. Decisions can move without heavy resistance.",
                whatThisMeans: "This is a decent window for financial action, as long as it’s grounded and intentional.",
                whyThisTiming: "Your judgment is more aligned with long-term direction, not just short-term emotion.",
                smartWay: ["Stick to pre-planned budgets", "Think in terms of long-term value, not quick wins", "Make the decision once, then let it settle"],
                avoid: ["Emotional upgrades", "“Since things are good, let’s go bigger” thinking", "Ignoring practical limits"],
                microAdjustment: "Look at the final number calmly once, then decide without looping."
            }
        },
        'BALANCED': {
            conclusion: "Neutral timing — clarity is more important than speed.",
            support: {
                title: "If you move forward, keep it:",
                items: ["practical", "within clear limits"]
            },
            caution: {
                title: "Avoid:",
                items: ["emotional spending", "vague agreements"]
            },
            microAdjustment: "Check the numbers once more, slowly.",
            detailed: {
                energyOverview: "Your system is relatively stable. You can think clearly without being rushed or emotionally pulled.",
                whatThisMeans: "This is a good time for practical, well-researched financial decisions — not gambling, not freezing.",
                whyThisTiming: "Your emotional and cognitive systems are in balance, which supports realistic risk assessment.",
                smartWay: ["Review options carefully", "Make decisions based on facts, not fear or hype", "Choose steady growth over dramatic gains"],
                avoid: ["High-risk, high-volatility moves", "Decisions driven by FOMO", "Overcomplicating simple choices"],
                microAdjustment: "Write down the decision in one sentence. If it still makes sense after reading it back, you're likely thinking clearly."
            }
        },
        'LOW': {
            conclusion: "Not ideal for major financial moves.",
            support: {
                title: "If you move forward, keep it:",
                items: ["minimal", "reversible"]
            },
            caution: {
                title: "Avoid:",
                items: ["large purchases", "long-term financial promises"]
            },
            microAdjustment: "Step away from the decision for 10 minutes.",
            detailed: {
                energyOverview: "Your financial judgment may be colored by fatigue or emotional pressure.",
                whatThisMeans: "This is a better time for protecting stability than making bold financial moves.",
                whyThisTiming: "When energy is low, the brain seeks relief or security, which can distort risk perception.",
                smartWay: ["Delay non-essential purchases", "Revisit existing plans instead of creating new ones", "Double-check details slowly"],
                avoid: ["Impulse spending", "“I deserve this” decisions", "Risky investments made from pressure"],
                microAdjustment: "Wait 24 hours before confirming any non-urgent financial decision."
            }
        },
        'DEPLETED': {
            conclusion: "Delay financial decisions if possible.",
            support: {
                title: "If you move forward, keep it:",
                items: ["small", "low-risk"]
            },
            caution: {
                title: "Avoid:",
                items: ["signing agreements", "emotional spending"]
            },
            microAdjustment: "Take a short walk before deciding anything.",
            detailed: {
                energyOverview: "Decision clarity is significantly reduced. This is a protection window, not a growth window.",
                whatThisMeans: "Avoid major financial choices unless absolutely necessary.",
                whyThisTiming: "When exhausted, the brain seeks quick relief or escape, which increases risk of regret.",
                smartWay: ["Freeze non-urgent financial decisions", "Stick strictly to existing commitments", "Review again after rest"],
                avoid: ["Big purchases", "Emotional “reset” spending", "High-risk moves"],
                microAdjustment: "Put the decision physically away (close the tab, put the card back) and revisit tomorrow."
            }
        }
    },
    'RELATIONSHIP_SOCIAL': {
        'FLOW_HIGH': {
            conclusion: "Energy favors connection and honest expression.",
            support: {
                title: "If you move forward, keep it:",
                items: ["open and warm", "focused on understanding, not winning"]
            },
            caution: {
                title: "Avoid:",
                items: ["bringing up old unresolved issues", "pushing for immediate answers"]
            },
            microAdjustment: "Relax your jaw and soften your tone before the conversation.",
            detailed: {
                energyOverview: "Connection energy is open and flowing. You’re more likely to be understood if you express yourself clearly.",
                whatThisMeans: "Good timing for reaching out, softening distance, or moving a connection forward.",
                whyThisTiming: "Your emotional field is more flexible than defensive, which makes interaction smoother.",
                smartWay: ["Be direct but warm", "Speak from your experience, not accusations", "Allow space for the other person to respond at their pace"],
                avoid: ["Forcing immediate outcomes", "Re-opening old unresolved conflicts unnecessarily"],
                microAdjustment: "Relax your face and lower your speaking speed slightly before the conversation."
            }
        },
        'BALANCED': {
            conclusion: "Steady energy — communication works if you stay calm.",
            support: {
                title: "If you move forward, keep it:",
                items: ["honest but gentle", "focused on listening"]
            },
            caution: {
                title: "Avoid:",
                items: ["dramatic reactions", "assuming the other person’s intent"]
            },
            microAdjustment: "Take one slow breath before responding.",
            detailed: {
                energyOverview: "Your emotional system is steady. You can engage without being overly reactive.",
                whatThisMeans: "This is a supportive window for honest conversations and strengthening connections.",
                whyThisTiming: "You have enough emotional capacity to listen, respond thoughtfully, and stay grounded.",
                smartWay: ["Have the conversation you’ve been postponing", "Express appreciation clearly", "Clarify small misunderstandings before they grow"],
                avoid: ["Creating drama to “feel something”", "Avoiding important talks out of habit", "Expecting others to read your mind"],
                microAdjustment: "Before speaking, ask yourself: “What outcome do I actually want from this conversation?”"
            }
        },
        'LOW': {
            conclusion: "Emotions may be heavier than usual today.",
            support: {
                title: "If you move forward, keep it:",
                items: ["light", "low-pressure"]
            },
            caution: {
                title: "Avoid:",
                items: ["serious talks", "emotional ultimatums"]
            },
            microAdjustment: "Put your phone down and breathe before replying.",
            detailed: {
                energyOverview: "Your emotional buffer is thinner than usual. Interactions may feel heavier.",
                whatThisMeans: "This is a sensitive window. Gentle communication works better than intense discussions.",
                whyThisTiming: "You have less spare emotional capacity, so small misunderstandings can feel bigger.",
                smartWay: ["Keep conversations simple and honest", "Ask for space if you need it", "Choose listening over debating"],
                avoid: ["Bringing up old conflicts", "Forcing clarity in one talk", "Over-interpreting tone or delays"],
                microAdjustment: "Take one slow breath before replying to any emotionally loaded message."
            }
        },
        'DEPLETED': {
            conclusion: "You may not have the emotional bandwidth today.",
            support: {
                title: "If you move forward, keep it:",
                items: ["brief", "kind"]
            },
            caution: {
                title: "Avoid:",
                items: ["deep emotional talks", "resolving old conflicts"]
            },
            microAdjustment: "Relax your shoulders and unclench your jaw.",
            detailed: {
                energyOverview: "Your emotional system is overloaded. Even small interactions can feel draining.",
                whatThisMeans: "This is a time to reduce social pressure, not intensify connection demands.",
                whyThisTiming: "You have very little surplus emotional energy to manage complexity.",
                smartWay: ["Keep communication short and kind", "Postpone heavy conversations", "Focus on feeling safe, not solving everything"],
                avoid: ["Relationship ultimatums", "Deep emotional processing talks", "Over-explaining yourself while exhausted"],
                microAdjustment: "Place a hand on your chest, take a slow breath, and allow yourself to pause replying."
            }
        }
    },
    'PERSONAL_LIFE': {
        'FLOW_HIGH': {
            conclusion: "Good timing to start or restart this for yourself.",
            support: {
                title: "If you move forward, keep it:",
                items: ["simple and doable", "action-based, not just planning"]
            },
            caution: {
                title: "Avoid:",
                items: ["building an overly strict system", "expecting instant transformation"]
            },
            microAdjustment: "Set a 5-minute timer and begin — just start.",
            detailed: {
                energyOverview: "Internal alignment is stronger than usual. It’s easier to translate intention into action.",
                whatThisMeans: "This is a good time to begin something you’ve been postponing.",
                whyThisTiming: "Mental resistance is lower, and your system is more open to forward motion.",
                smartWay: ["Start small but start now", "Focus on action, not designing the perfect system", "Build momentum through repetition"],
                avoid: ["Turning this into an all-or-nothing plan", "Overloading yourself on day one"],
                microAdjustment: "Set a 5-minute timer and begin before your brain negotiates."
            }
        },
        'BALANCED': {
            conclusion: "A good time for steady, low-pressure progress.",
            support: {
                title: "If you move forward, keep it:",
                items: ["consistent", "realistic"]
            },
            caution: {
                title: "Avoid:",
                items: ["extreme changes", "self-criticism"]
            },
            microAdjustment: "Do one small thing that future-you will thank you for.",
            detailed: {
                energyOverview: "Your internal state is organized and steady, making this a good time for constructive effort.",
                whatThisMeans: "This is ideal for building habits, learning, and making gradual improvements.",
                whyThisTiming: "You are neither overstimulated nor depleted, which supports consistency and focus.",
                smartWay: ["Work on skill-building or learning", "Strengthen routines instead of reinventing everything", "Make small upgrades that compound over time"],
                avoid: ["Extreme goal-setting", "Overloading your schedule with self-improvement", "Expecting overnight transformation"],
                microAdjustment: "Spend 15 focused minutes on one meaningful task with all distractions off."
            }
        },
        'LOW': {
            conclusion: "Focus on maintenance, not major change.",
            support: {
                title: "If you move forward, keep it:",
                items: ["gentle", "restorative"]
            },
            caution: {
                title: "Avoid:",
                items: ["pushing yourself hard", "harsh self-judgment"]
            },
            microAdjustment: "Drink water and stretch for 2 minutes.",
            detailed: {
                energyOverview: "Your system needs consolidation more than expansion.",
                whatThisMeans: "This is better for stabilizing habits than starting ambitious new goals.",
                whyThisTiming: "Energy is being used internally for processing and recovery.",
                smartWay: ["Do the minimum version of your habit", "Focus on consistency, not improvement", "Protect sleep and recovery time"],
                avoid: ["Starting complex routines", "Self-criticism for low output", "Comparing yourself to peak-energy days"],
                microAdjustment: "Do one tiny version of your habit (1 push-up, 1 sentence, 1 minute)."
            }
        },
        'DEPLETED': {
            conclusion: "Rest is more productive than effort right now.",
            support: {
                title: "If you move forward, keep it:",
                items: ["restorative", "pressure-free"]
            },
            caution: {
                title: "Avoid:",
                items: ["strict plans", "self-improvement pressure"]
            },
            microAdjustment: "Lie back, close your eyes, and take five slow breaths.",
            detailed: {
                energyOverview: "This is a recovery phase, not a growth phase.",
                whatThisMeans: "The most productive thing right now is restoring your baseline.",
                whyThisTiming: "Your system is signaling that restoration is more urgent than improvement.",
                smartWay: ["Focus on sleep, food, and quiet time", "Keep routines extremely simple", "Measure success by rest, not output"],
                avoid: ["Starting new self-improvement plans", "Harsh self-judgment", "Forcing motivation"],
                microAdjustment: "Close your eyes for 60 seconds and slow your breathing."
            }
        }
    },
    'ENVIRONMENT_MOVEMENT': {
        'FLOW_HIGH': {
            conclusion: "Energy supports forward movement and change.",
            support: {
                title: "If you move forward, keep it:",
                items: ["flexible", "open to small adjustments"]
            },
            caution: {
                title: "Avoid:",
                items: ["locking every detail too early", "resisting unexpected shifts"]
            },
            microAdjustment: "Take a short walk and imagine the next step going smoothly.",
            detailed: {
                energyOverview: "Movement energy is active. Shifts and transitions are more supported than usual.",
                whatThisMeans: "Good timing for taking steps toward change, especially if you’ve already been considering it.",
                whyThisTiming: "Your system is more adaptable, which reduces friction during transitions.",
                smartWay: ["Move step-by-step, not all at once", "Leave space for adjustments", "Stay flexible with expectations"],
                avoid: ["Over-controlling every detail", "Expecting everything to go exactly as planned"],
                microAdjustment: "Take a short walk and visualize the next step going smoothly."
            }
        },
        'BALANCED': {
            conclusion: "Timing is stable — preparation makes the difference.",
            support: {
                title: "If you move forward, keep it:",
                items: ["organized", "flexible"]
            },
            caution: {
                title: "Avoid:",
                items: ["last-minute chaos", "ignoring practical details"]
            },
            microAdjustment: "Double-check one key detail, then relax.",
            detailed: {
                energyOverview: "Your system is steady enough to handle moderate change without overload.",
                whatThisMeans: "This is a favorable time for planned transitions, adjustments, or short-term travel.",
                whyThisTiming: "Your adaptability is online, and you can respond to small surprises without losing balance.",
                smartWay: ["Prepare the basics and then move", "Keep plans flexible but structured", "Take one step at a time instead of over-planning everything"],
                avoid: ["Overpacking your schedule", "Making change more complicated than necessary", "Waiting endlessly for “perfect certainty”"],
                microAdjustment: "Identify just the first physical step of the change and complete only that."
            }
        },
        'LOW': {
            conclusion: "Not the best day for big changes.",
            support: {
                title: "If you move forward, keep it:",
                items: ["slow", "well-buffered"]
            },
            caution: {
                title: "Avoid:",
                items: ["tight schedules", "irreversible decisions"]
            },
            microAdjustment: "Sit still for a moment and ground yourself.",
            detailed: {
                energyOverview: "Transitions feel heavier and require more effort than usual.",
                whatThisMeans: "Not ideal for sudden or large changes unless necessary.",
                whyThisTiming: "Your adaptability is lower, so change feels more stressful than exciting.",
                smartWay: ["Move slowly and plan buffer time", "Handle logistics early", "Keep expectations simple"],
                avoid: ["Overpacked schedules", "Last-minute decisions", "Adding extra optional changes"],
                microAdjustment: "Sit still for one minute and mentally rehearse just the first step."
            }
        },
        'DEPLETED': {
            conclusion: "This is a recovery window, not a transition point.",
            support: {
                title: "If you move forward, keep it:",
                items: ["minimal", "reversible"]
            },
            caution: {
                title: "Avoid:",
                items: ["major life changes", "fast decisions"]
            },
            microAdjustment: "Do nothing for one full minute — just breathe.",
            detailed: {
                energyOverview: "Change requires energy you don’t currently have in surplus.",
                whatThisMeans: "Postpone non-essential travel or major changes if possible.",
                whyThisTiming: "Low reserves make unexpected issues feel overwhelming.",
                smartWay: ["Simplify plans as much as possible", "Build in extra rest time", "Ask for help with logistics if available"],
                avoid: ["Tight schedules", "Multi-step complex transitions", "“Push through” thinking"],
                microAdjustment: "Sit down, support your back, and breathe slowly until your body softens slightly."
            }
        }
    },
    'GENERAL': {
        'FLOW_HIGH': {
            conclusion: "The energy field is open. Movement is rewarded today.",
            support: {
                title: "Energy supports:",
                items: ["Starting before you feel ready", "Trusting your first impulse", "Visible action"]
            },
            caution: {
                title: "Avoid:",
                items: ["Over-planning", "Waiting for permission", "Hesitation"]
            },
            microAdjustment: "Do the first small thing that comes to mind immediately.",
            detailed: {
                energyOverview: "The external field is active and aligned with forward motion. Friction is at its lowest point.",
                whatThisMeans: "Small sparks catch fire easily. You don't need to push hard to get results; you just need to start.",
                whyThisTiming: "Your internal drive and external opportunities are synchronized.",
                smartWay: ["Ride the wave while it's here", "Speed beats perfection today", "Share your ideas boldly"],
                avoid: ["Bottling up your energy", "Spending the day in analysis paralysis"],
                microAdjustment: "Stand up and physically move into your next task."
            }
        },
        'BALANCED': {
            conclusion: "Steady and secure. A day for building, not gambling.",
            support: {
                title: "Energy supports:",
                items: ["Consolidating gains", " finishing what you started", "Strengthening foundations"]
            },
            caution: {
                title: "Avoid:",
                items: ["Risking what you've built", "Starting from scratch", "Hasty pivots"]
            },
            microAdjustment: "Review your work one last time before finalizing.",
            detailed: {
                energyOverview: "The field is stabilizing. It favors protection and organization over expansion.",
                whatThisMeans: "Your focus should be on securing what you have, not chasing what you don't.",
                whyThisTiming: "The energy is grounded, making it perfect for maintenance and structure.",
                smartWay: ["Organize and optimize", "Clarify your boundaries", "Stick to the plan"],
                avoid: ["Distracting yourself with new shiny objects", "Taking unnecessary risks"],
                microAdjustment: "Fix one small broken thing in your environment."
            }
        },
        'LOW': {
            conclusion: "Friction is a signal to refine, not a sign of failure.",
            support: {
                title: "Energy supports:",
                items: ["Internal reflection", "Editing and refining", "Low-stakes planning"]
            },
            caution: {
                title: "Avoid:",
                items: ["Forcing big outcomes", "High-pressure launches", "Ignoring your fatigue"]
            },
            microAdjustment: "Clear the clutter before you try to work.",
            detailed: {
                energyOverview: "The field is quiet. It asks for depth, not width.",
                whatThisMeans: "Output might feel harder today. That’s okay—use this resistance to sand down the rough edges of your plans.",
                whyThisTiming: "Your system needs a moment to catch up with recent growth.",
                smartWay: ["Work smarter, not harder", "Focus on quality over quantity", "Batch your admin tasks"],
                avoid: ["Pushing through the resistance", "Judging your pace"],
                microAdjustment: "Take 5 minutes to just breathe and reset."
            }
        },
        'DEPLETED': {
            conclusion: "Recharge is the most productive use of today.",
            support: {
                title: "Energy supports:",
                items: ["Rest without guilt", "Disconnecting", "Gentle inputs"]
            },
            caution: {
                title: "Avoid:",
                items: ["Big decisions", "Social obligations", "Trying to 'power through'"]
            },
            microAdjustment: "Do absolutely nothing for 5 minutes.",
            detailed: {
                energyOverview: "The field is still. It's a mandatory recovery period.",
                whatThisMeans: "Your battery is low. Any energy spent now costs double. Save it.",
                whyThisTiming: "Natural cycles require dormancy to prepare for the next bloom.",
                smartWay: ["Preserve your resources", "Say no to non-essentials", "Sleep early"],
                avoid: ["Apologizing for resting", "Worrying about productivity"],
                microAdjustment: "Lie down or sit comfortably and close your eyes."
            }
        }
    },
    'QUICK': {
        'FLOW_HIGH': {
            conclusion: "Green Light: Go for it.",
            support: { title: "Yes to:", items: ["Action", "Speed"] },
            caution: { title: "No to:", items: ["Waiting"] },
            microAdjustment: "Just start.",
            detailed: {
                energyOverview: "Peak energy. Don't waste it.",
                whatThisMeans: "Move now.",
                whyThisTiming: "Everything is aligned.",
                smartWay: ["Fast and loose"],
                avoid: ["Stopping"],
                microAdjustment: "Go."
            }
        },
        'BALANCED': {
            conclusion: "Yellow Light: Proceed with caution.",
            support: { title: "Yes to:", items: ["Stability", "Focus"] },
            caution: { title: "No to:", items: ["Chaos"] },
            microAdjustment: "Check your work.",
            detailed: {
                energyOverview: "Stable energy.",
                whatThisMeans: "Keep it steady.",
                whyThisTiming: "Balance is key.",
                smartWay: ["Steady pace"],
                avoid: ["Rocking the boat"],
                microAdjustment: "Breath."
            }
        },
        'LOW': {
            conclusion: "Orange Light: Slow down.",
            support: { title: "Yes to:", items: ["Thinking", "Resting"] },
            caution: { title: "No to:", items: ["Pushing"] },
            microAdjustment: "Pause.",
            detailed: {
                energyOverview: "Low energy.",
                whatThisMeans: " conserve.",
                whyThisTiming: "Recharging.",
                smartWay: ["Slowly"],
                avoid: ["Rushing"],
                microAdjustment: "Stop."
            }
        },
        'DEPLETED': {
            conclusion: "Red Light: Stop.",
            support: { title: "Yes to:", items: ["Sleep", "Offline"] },
            caution: { title: "No to:", items: ["Everything else"] },
            microAdjustment: "Sleep.",
            detailed: {
                energyOverview: "No energy.",
                whatThisMeans: "Stop.",
                whyThisTiming: "Empty.",
                smartWay: ["Rest"],
                avoid: ["Work"],
                microAdjustment: "Rest."
            }
        }
    }
};

// 6. Main Logic Function
export function getContextualAdvice(todayState: TodayState, domain: DecisionDomain) {
    // 1. Get Energy Level
    const energyLevel = STATE_TO_ENERGY_MAP[todayState];

    // 2. Get Template from Matrix
    const template = ADVICE_MATRIX[domain][energyLevel];

    return {
        energyLevel,
        advice: template
    };
}

// 7. Domain Classification Logic
export function classifyDomain(text: string): DecisionDomain {
    const t = text.toLowerCase();

    const keywords: Record<DecisionDomain, string[]> = {
        'CAREER_WORK': ['job', 'work', 'career', 'project', 'boss', 'manager', 'hiring', 'interview', 'raise', 'promotion', 'team', 'client', 'email', 'presentation', 'launch', 'business', 'startup', 'contract'],
        'MONEY_FINANCE': ['buy', 'purchase', 'cost', 'spend', 'invest', 'price', 'budget', 'save', 'afford', 'expensive', 'cheap', 'bank', 'debt', 'loan', 'credit', 'sale'],
        'RELATIONSHIP_SOCIAL': ['date', 'love', 'break up', 'friend', 'social', 'meet', 'party', 'call', 'text', 'mom', 'dad', 'parent', 'family', 'partner', 'husband', 'wife', 'girlfriend', 'boyfriend', 'conflict', 'forgive'],
        'PERSONAL_LIFE': ['habit', 'health', 'diet', 'exercise', 'gym', 'meditate', 'sleep', 'read', 'learn', 'grow', 'hobby', 'creative', 'write', 'paint'],
        'ENVIRONMENT_MOVEMENT': ['move', 'travel', 'trip', 'fly', 'drive', 'vacation', 'home', 'apartment', 'renovate', 'clean', 'change'],
        'GENERAL': [],
        'QUICK': []
    };

    for (const [domain, words] of Object.entries(keywords)) {
        if (words.some(w => t.includes(w))) {
            return domain as DecisionDomain;
        }
    }

    return 'GENERAL';
}
