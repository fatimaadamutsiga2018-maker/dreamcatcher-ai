// 40-Question Scenario Bank — 4 dimensions × 10 questions
// Each question has 4 options: A=2.5, B=5, C=7.5, D=10

export interface AssessmentOption {
  label: string;
  score: number;
}

export interface AssessmentQuestion {
  id: string;
  dimension: 'focus' | 'power' | 'rhythm' | 'drive';
  type: 'status' | 'response';
  title: string;
  options: AssessmentOption[];
}

export const questionBank: AssessmentQuestion[] = [
  // ===== FOCUS (Mental Clarity) =====
  { id:'F1', dimension:'focus', type:'status', title:'The "Browser Tabs" Test', options:[
    { label:'100+ tabs open and the system is freezing.', score:2.5 },
    { label:'Too many windows, but I can still find the search bar.', score:5 },
    { label:'3-4 organized windows. Focused, but one ping could break it.', score:7.5 },
    { label:'Full screen, single task. Pure signal, zero noise.', score:10 },
  ]},
  { id:'F2', dimension:'focus', type:'response', title:'The "Complexity" Filter', options:[
    { label:"Someone hands you a 20-page report — I'd probably cry.", score:2.5 },
    { label:"I'd skim the headlines and hope I didn't miss the important parts.", score:5 },
    { label:"I'd need a coffee and 30 minutes of silence to digest it.", score:7.5 },
    { label:"I'd devour it and immediately spot the three core logic flaws.", score:10 },
  ]},
  { id:'F3', dimension:'focus', type:'status', title:'The "Focus Lens"', options:[
    { label:"Broken: My thoughts are like shattered glass.", score:2.5 },
    { label:"Smudged: Conscious, but there's a persistent mental lag.", score:5 },
    { label:"Clear-ish: I can focus, but it takes manual effort.", score:7.5 },
    { label:"Macro-mode: I see tiny details and the big picture simultaneously.", score:10 },
  ]},
  { id:'F4', dimension:'focus', type:'response', title:'The "Podcast" Test', options:[
    { label:"Replayed the same 30 seconds five times — still lost.", score:2.5 },
    { label:"Hearing the words, but too distracted to internalize.", score:5 },
    { label:"Following along, but not exactly inspired.", score:7.5 },
    { label:"Mentally arguing with the host — brain spinning 2x faster.", score:10 },
  ]},
  { id:'F5', dimension:'focus', type:'status', title:'The "Mental Desk"', options:[
    { label:"Buried in trash: don't even know where to start.", score:2.5 },
    { label:"Piles of To-Do notes: clutter is stressing me out.", score:5 },
    { label:"Mostly organized: 1-2 big things and I'm handling them.", score:7.5 },
    { label:"Minimalism: one clean surface and the exact tool I need.", score:10 },
  ]},
  { id:'F6', dimension:'focus', type:'response', title:'The "Interruption" Impact', options:[
    { label:"Total crash: one ping and I've lost my train of thought for the hour.", score:2.5 },
    { label:"Takes me a long time to find my place again.", score:5 },
    { label:"Minor glitch: back to work in a few minutes.", score:7.5 },
    { label:"Deep-work bubble: didn't even hear the notification.", score:10 },
  ]},
  { id:'F7', dimension:'focus', type:'status', title:'The "Morning Fog"', options:[
    { label:"Static: brain feels like an un-tuned TV from the 90s.", score:2.5 },
    { label:"Low battery: awake, but loading bar stuck at 15%.", score:5 },
    { label:"Booting up: steady and ready for my first real task.", score:7.5 },
    { label:"Instant-on: woke up with the solution to yesterday's problem.", score:10 },
  ]},
  { id:'F8', dimension:'focus', type:'response', title:'The "Decision Fatigue"', options:[
    { label:"Choosing dinner feels like a life-altering crisis.", score:2.5 },
    { label:"I'd rather someone else just tell me what to do.", score:5 },
    { label:"I can make choices, weighing pros and cons carefully.", score:7.5 },
    { label:"Trusting my gut — moving through choices like a hot knife.", score:10 },
  ]},
  { id:'F9', dimension:'focus', type:'status', title:'The "Mental Inventory"', options:[
    { label:"Overdrawn: trying to spend mental energy I don't have.", score:2.5 },
    { label:"Low balance: being very stingy with my thoughts.", score:5 },
    { label:"Solvent: enough focus to get through the day.", score:7.5 },
    { label:"Surplus: extra brain-power for creative side-quests.", score:10 },
  ]},
  { id:'F10', dimension:'focus', type:'response', title:'The "White Noise" Test', options:[
    { label:"Every sound feels like someone scratching a chalkboard.", score:2.5 },
    { label:"Constantly looking up to see what's happening.", score:5 },
    { label:"Can tune out the world if I really need to.", score:7.5 },
    { label:"Background noise actually helps me lock into my rhythm.", score:10 },
  ]},

  // ===== POWER (Physical Vitality) =====
  { id:'P1', dimension:'power', type:'status', title:'The "Gravity" Factor', options:[
    { label:"My chair is a magnet. Standing up feels like a major lift.", score:2.5 },
    { label:"Leaning on my elbow. The afternoon slump is winning.", score:5 },
    { label:"Upright and steady. Could handle a walk or a long meeting.", score:7.5 },
    { label:"Ready to pounce. My body wants to move before my mind does.", score:10 },
  ]},
  { id:'P2', dimension:'power', type:'response', title:'The "Stairs" Energy', options:[
    { label:"Elevator. And I might lean against the wall while waiting.", score:2.5 },
    { label:"Elevator — trying to save what little energy I have.", score:5 },
    { label:"Stairs, if I'm not carrying anything heavy.", score:7.5 },
    { label:"Stairs — might take them two at a time for fun.", score:10 },
  ]},
  { id:'P3', dimension:'power', type:'status', title:'The "Sleep Quality" Mirror', options:[
    { label:"A Ghost: woke up feeling older and more tired than before bed.", score:2.5 },
    { label:"A Zombie: moving, but my soul hasn't checked in yet.", score:5 },
    { label:"A Human: rested enough to do my job and be a person.", score:7.5 },
    { label:"An Athlete: light, bouncy, and physically recharged.", score:10 },
  ]},
  { id:'P4', dimension:'power', type:'response', title:'The "Afternoon Slump"', options:[
    { label:"Looking for any flat surface to nap on.", score:2.5 },
    { label:"Only staying upright because of my third cup of coffee.", score:5 },
    { label:"A bit slower, but can push through with a quick stretch.", score:7.5 },
    { label:"My energy actually peaks when others are crashing.", score:10 },
  ]},
  { id:'P5', dimension:'power', type:'status', title:'The "Physical Presence"', options:[
    { label:"Numb: disconnected from my body; just a floating head of stress.", score:2.5 },
    { label:"Achy: aware of every tight muscle and bit of fatigue.", score:5 },
    { label:"Solid: good posture, grounded in my skin.", score:7.5 },
    { label:"Radiant: a buzz of physical warmth and readiness.", score:10 },
  ]},
  { id:'P6', dimension:'power', type:'response', title:'The "Gym" Thought', options:[
    { label:"Hilarious: the very idea of exercise feels like a sick joke.", score:2.5 },
    { label:"Guilt-inducing: I know I should move, but can't find the strength.", score:5 },
    { label:"Standard: I'll work out, but not going for a personal record.", score:7.5 },
    { label:"Hunger: I genuinely need to burn off this excess energy.", score:10 },
  ]},
  { id:'P7', dimension:'power', type:'status', title:'The "Post-Meal" Feel', options:[
    { label:"Food coma: digestive system stole 100% of remaining energy.", score:2.5 },
    { label:"Sluggish: heavy and slow after eating.", score:5 },
    { label:"Fueled: satisfied and ready to get back to work.", score:7.5 },
    { label:"Lightweight: food gave me a clean spike of focus and power.", score:10 },
  ]},
  { id:'P8', dimension:'power', type:'response', title:'The "Burnout" Proximity', options:[
    { label:"On fire: running on red so long I can't remember rest.", score:2.5 },
    { label:"Smoking: I can smell the burnout coming.", score:5 },
    { label:"Warm: working hard, but I know how to cool down.", score:7.5 },
    { label:"Cool: high speed with zero internal friction or heat.", score:10 },
  ]},
  { id:'P9', dimension:'power', type:'status', title:'The "End-of-Day" Battery', options:[
    { label:"1%: if one more thing happens, I will literally shut down.", score:2.5 },
    { label:"10%: just enough energy to scroll and pass out.", score:5 },
    { label:"30%: still have energy for hobbies or family after work.", score:7.5 },
    { label:"60%: could start a whole second work day if I wanted.", score:10 },
  ]},
  { id:'P10', dimension:'power', type:'response', title:'The "Recovery" Speed', options:[
    { label:"Broken: a weekend off wouldn't be enough.", score:2.5 },
    { label:"Slow: takes a long time to bounce back from stress.", score:5 },
    { label:"Normal: a good night's sleep usually fixes most problems.", score:7.5 },
    { label:"Rapid: give me a 10-minute walk and I'm back to 100%.", score:10 },
  ]},

  // ===== RHYTHM (Life Harmony) =====
  { id:'R1', dimension:'rhythm', type:'status', title:'The "Notification" Reflex', options:[
    { label:"Every ping feels like a personal attack.", score:2.5 },
    { label:"I check them with a sigh. All tasks, no joy.", score:5 },
    { label:"See them, filter them, move on. No emotional spikes.", score:7.5 },
    { label:"In sync. Conversations flowing like a well-oiled machine.", score:10 },
  ]},
  { id:'R2', dimension:'rhythm', type:'response', title:'The "Unexpected Pivot"', options:[
    { label:"Absolutely not. Already over capacity and about to snap.", score:2.5 },
    { label:"I'll do it, but I'll be distracted and slightly resentful.", score:5 },
    { label:"Sure, my schedule is flexible enough.", score:7.5 },
    { label:"Great! Been looking for a reason to connect and brainstorm.", score:10 },
  ]},
  { id:'R3', dimension:'rhythm', type:'status', title:'The "Home Sanctuary" Test', options:[
    { label:"A Battlefield: my space adds more stress than it relieves.", score:2.5 },
    { label:"A Storage Unit: just a place where I keep my stuff.", score:5 },
    { label:"A Base: comfortable and mostly functional.", score:7.5 },
    { label:"A Temple: perfectly curated to recharge my soul.", score:10 },
  ]},
  { id:'R4', dimension:'rhythm', type:'response', title:'The "Request for Help"', options:[
    { label:"Resentment: how dare they ask me for one more thing?", score:2.5 },
    { label:"Obligation: I'll do it, but feel drained and bitter.", score:5 },
    { label:"Support: happy to help if I have the time.", score:7.5 },
    { label:"Abundance: helping others feels effortless right now.", score:10 },
  ]},
  { id:'R5', dimension:'rhythm', type:'status', title:'The "Social Battery"', options:[
    { label:"Short-circuited: people are noise; need a dark room alone.", score:2.5 },
    { label:"Fading: smiling, but checking my watch every five minutes.", score:5 },
    { label:"Stable: enjoying the company and conversation.", score:7.5 },
    { label:"Magnetic: feeding off the energy of people around me.", score:10 },
  ]},
  { id:'R6', dimension:'rhythm', type:'response', title:'The "Small Talk" Capacity', options:[
    { label:"Zero: please don't ask me how my weekend was.", score:2.5 },
    { label:"Forced: I can do the polite script, but it feels like labor.", score:5 },
    { label:"Pleasant: I enjoy a bit of connection before diving in.", score:7.5 },
    { label:"Enriching: even a 2-minute chat feels like meaningful resonance.", score:10 },
  ]},
  { id:'R7', dimension:'rhythm', type:'status', title:'The "Work-Life" Boundary', options:[
    { label:"Non-existent: work has eaten my entire personal life.", score:2.5 },
    { label:"Leaky: checking emails at dinner, thinking about tasks in bed.", score:5 },
    { label:"Defined: when I'm off, I'm mostly off.", score:7.5 },
    { label:"Integrated: work and life feed each other; no war between them.", score:10 },
  ]},
  { id:'R8', dimension:'rhythm', type:'response', title:'The "Calendar" Anxiety', options:[
    { label:"Suffocating: looking at my schedule makes me unable to breathe.", score:2.5 },
    { label:"Busy: keeping my head above water for now.", score:5 },
    { label:"Rhythmic: nice flow of push and pull.", score:7.5 },
    { label:"Masterful: my schedule is a work of art.", score:10 },
  ]},
  { id:'R9', dimension:'rhythm', type:'status', title:'The "Inner Voice"', options:[
    { label:"A Screamer: internal critic yelling about everything wrong.", score:2.5 },
    { label:"A Whisperer: nagging feeling I'm forgetting something.", score:5 },
    { label:"A Coach: quietly reminding me what needs to be done.", score:7.5 },
    { label:"A Zen Master: total internal silence and peaceful awareness.", score:10 },
  ]},
  { id:'R10', dimension:'rhythm', type:'response', title:'The "Criticism" Intake', options:[
    { label:"A Wound: even small feedback feels like a devastating blow.", score:2.5 },
    { label:"A Burden: I take it personally and chew on it for days.", score:5 },
    { label:"A Lesson: I filter the useful parts and discard the rest.", score:7.5 },
    { label:"A Gift: so secure that feedback feels like a shortcut to growth.", score:10 },
  ]},

  // ===== DRIVE (Growth Momentum) =====
  { id:'D1', dimension:'drive', type:'status', title:'The "Horizon" View', options:[
    { label:"I can only see my feet. Just trying not to trip today.", score:2.5 },
    { label:"I see the goal, but it looks a thousand miles away.", score:5 },
    { label:"The path is clear. One foot in front of the other.", score:7.5 },
    { label:"Not just walking — found a shortcut and the wind is at my back.", score:10 },
  ]},
  { id:'D2', dimension:'drive', type:'response', title:'The "Bold Move" Appetite', options:[
    { label:"Hard pass. Don't have the stomach for even a tiny risk.", score:2.5 },
    { label:"I'll watch from a distance. Playing defense today.", score:5 },
    { label:"I'll run the numbers. If the logic holds, I'm interested.", score:7.5 },
    { label:"Let's go. Been waiting for a window exactly like this.", score:10 },
  ]},
  { id:'D3', dimension:'drive', type:'status', title:'The "Project" Passion', options:[
    { label:"A Chore: my current goals feel like a prison sentence.", score:2.5 },
    { label:"A Job: doing the work, but the spark is gone.", score:5 },
    { label:"A Path: interested and I can see the value in what I'm building.", score:7.5 },
    { label:"A Calling: I would do this even if I wasn't being paid.", score:10 },
  ]},
  { id:'D4', dimension:'drive', type:'response', title:'The "New Tool" Curiosity', options:[
    { label:"Exhausting: please don't show me a new way to do things.", score:2.5 },
    { label:"Skeptical: I'll stick to what I know.", score:5 },
    { label:"Open: I'll check it out if it saves me time.", score:7.5 },
    { label:"Hungry: constantly looking for the next edge or upgrade.", score:10 },
  ]},
  { id:'D5', dimension:'drive', type:'status', title:'The "Daily Win" Feel', options:[
    { label:"Defeat: just glad the day is over so I can stop losing.", score:2.5 },
    { label:"Neutral: another day, another dollar. No real progress.", score:5 },
    { label:"Gain: a little better than yesterday.", score:7.5 },
    { label:"Victory: major breakthrough; the momentum is real.", score:10 },
  ]},
  { id:'D6', dimension:'drive', type:'response', title:'The "Opportunity" Filter', options:[
    { label:"Blind: wouldn't recognize an opportunity if it hit me.", score:2.5 },
    { label:"Guarded: I see it, but too afraid of the downside.", score:5 },
    { label:"Analytical: weighing the odds; I'll move if the math is right.", score:7.5 },
    { label:"Predatory: hunting for opportunities and ready to strike.", score:10 },
  ]},
  { id:'D7', dimension:'drive', type:'status', title:'The "Future Self" Connection', options:[
    { label:"Estranged: no idea who I'll be in 5 years, and I don't care.", score:2.5 },
    { label:"Acquainted: vague idea of my future, but no plan.", score:5 },
    { label:"Friends: making choices my future self will thank me for.", score:7.5 },
    { label:"Unified: actively becoming the person I've always wanted to be.", score:10 },
  ]},
  { id:'D8', dimension:'drive', type:'response', title:'The "Obstacle" Reaction', options:[
    { label:"A Wall: a problem appears and I immediately want to quit.", score:2.5 },
    { label:"A Speedbump: slows me down and ruins my mood.", score:5 },
    { label:"A Puzzle: I'll sit down and figure a way around it.", score:7.5 },
    { label:"Fuel: I love a challenge; it's a chance to prove growth.", score:10 },
  ]},
  { id:'D9', dimension:'drive', type:'status', title:'The "Legacy" Thought', options:[
    { label:"Survival-only: just trying to make it to Friday.", score:2.5 },
    { label:"Small-scale: focused on immediate needs and nothing else.", score:5 },
    { label:"Building: creating something that might last longer than this week.", score:7.5 },
    { label:"Visionary: working on things that will impact people for years.", score:10 },
  ]},
  { id:'D10', dimension:'drive', type:'response', title:'The "Pivot" Speed', options:[
    { label:"Stuck in mud: even if I know I'm wrong, can't change direction.", score:2.5 },
    { label:"Heavy steering: takes a lot of pain to try a new way.", score:5 },
    { label:"Nimble: can adjust strategy once the evidence is clear.", score:7.5 },
    { label:"Liquid: can change my entire approach in a heartbeat.", score:10 },
  ]},
];

export default questionBank;
