/**
 * Ambient Energy Field Generator
 * Generates 4-section structure based on Twelve Officers
 */

import { TWELVE_OFFICERS } from './constants';

export interface AmbientEnergyField {
  anchor: {
    date: string;
    label: string;
    officer: string;
  };
  narrative: {
    sentence1: string;
    sentence2: string;
  };
  metrics: {
    clarity: number; // 0-100
    friction: number; // 0-100 (lower is better)
    flow: number; // 0-100
  };
  compatibility: {
    business: {
      status: 'High' | 'Medium' | 'Low';
      directive: string;
    };
    social: {
      status: 'High' | 'Medium' | 'Low';
      directive: string;
    };
    strategic: {
      status: 'High' | 'Medium' | 'Low';
      directive: string;
    };
    action: {
      status: 'High' | 'Medium' | 'Low';
      directive: string;
    };
  };
}

/**
 * Generate narrative based on officer type
 */
const generateNarrative = (officer: typeof TWELVE_OFFICERS[keyof typeof TWELVE_OFFICERS]) => {
  const narratives: Record<string, { sentence1: string; sentence2: string }> = {
    'Establish': {
      sentence1: 'Foundation energy supports new beginnings and structural initiatives.',
      sentence2: 'Forward momentum is available for projects requiring long-term commitment.'
    },
    'Clear': {
      sentence1: 'Obstacles dissolve naturally as old patterns release their grip.',
      sentence2: 'Use this clearing energy to remove bottlenecks and streamline operations.'
    },
    'Full': {
      sentence1: 'Energy fields are saturated with potential for completion and fulfillment.',
      sentence2: 'Focus on wrapping up existing initiatives rather than starting new ones.'
    },
    'Stable': {
      sentence1: 'Equilibrium prevails across all systems, providing a reliable baseline.',
      sentence2: 'Maintain current operations and avoid radical changes during this steady state.'
    },
    'Fix': {
      sentence1: 'The environment supports consolidation and fixing established patterns.',
      sentence2: 'Lock in gains and solidify your position before the next cycle begins.'
    },
    'Execute': {
      sentence1: 'Active energy favors decisive movement and implementation of plans.',
      sentence2: 'Push forward with high-priority tasks that require momentum.'
    },
    'Break': {
      sentence1: 'Structural integrity is tested as old forms begin to crack.',
      sentence2: 'Identify weak points proactively and prepare contingency plans.'
    },
    'Risk': {
      sentence1: 'Volatility increases as systems enter a transition period.',
      sentence2: 'Exercise caution with high-stakes decisions and preserve resources.'
    },
    'Achieve': {
      sentence1: 'Completion energy supports finalizing projects and reaching milestones.',
      sentence2: 'Celebrate wins and document outcomes while the energy of success lingers.'
    },
    'Harvest': {
      sentence1: 'Results manifest from prior cycles—review outcomes and integrate lessons.',
      sentence2: 'Gather value from completed work before directing energy elsewhere.'
    },
    'Open': {
      sentence1: 'Barriers lower and pathways clear for new opportunities to emerge.',
      sentence2: 'Initiate connections and explore options that were previously blocked.'
    },
    'Close': {
      sentence1: 'Energy contracts as systems prepare for dormancy and renewal.',
      sentence2: 'Focus on internal development and avoid external expansion.'
    }
  };

  return narratives[officer.name] || {
    sentence1: officer.environment_report.split('.')[0] + '.',
    sentence2: officer.environment_report.split('.').slice(1).join('.').trim() || 'Navigate the day with awareness of system patterns.'
  };
};

/**
 * Generate metrics based on officer type
 */
const generateMetrics = (officer: typeof TWELVE_OFFICERS[keyof typeof TWELVE_OFFICERS]) => {
  const expanding = officer.color_type === 'expanding';

  return {
    clarity: expanding ? 75 : 55,
    friction: expanding ? 30 : 60, // lower is better
    flow: expanding ? 82 : 48,
  };
};

/**
 * Generate compatibility cards based on officer type
 */
const generateCompatibility = (officer: typeof TWELVE_OFFICERS[keyof typeof TWELVE_OFFICERS]) => {
  const compatibilityMap: Record<string, AmbientEnergyField['compatibility']> = {
    'Establish': {
      business: { status: 'High', directive: 'Foundation Build. Deploy new ventures; secure long-term capital contracts.' },
      social: { status: 'Medium', directive: 'Core Linking. Schedule key 1-on-1s; deepen alliance bonds through consistency.' },
      strategic: { status: 'High', directive: 'Vision Casting. Draft annual roadmaps; lock 5-year objectives; align core mission.' },
      action: { status: 'High', directive: 'Launch Sequence. Initiate flagship projects; execute business travel; establish new protocols.' },
    },
    'Clear': {
      business: { status: 'Medium', directive: 'Operations Scrub. Streamline workflows; eliminate bottlenecks; audit process efficiency.' },
      social: { status: 'High', directive: 'Conflict Reset. Address crucial conversations; dissolve misunderstandings; realign team dynamics.' },
      strategic: { status: 'Medium', directive: 'Logic Audit. Review existing strategies; revise legacy systems; update documentation.' },
      action: { status: 'Medium', directive: 'Path Clearing. Declutter workspace; resolve blockers; simplify execution flows.' },
    },
    'Full': {
      business: { status: 'Medium', directive: 'Completion Cycle. Finalize pending deals; deliver key outputs; close quarter objectives.' },
      social: { status: 'High', directive: 'Maximum Amplification. Host team gatherings; expand network reach; strengthen group cohesion.' },
      strategic: { status: 'Medium', directive: 'Decision Lock. Sign off strategic plans; document outcomes; finalize initiative scope.' },
      action: { status: 'Low', directive: 'Hold Position. Complete current tasks; celebrate milestones; conserve resources.' },
    },
    'Stable': {
      business: { status: 'High', directive: 'Operational Excellence. Optimize existing processes; reinforce client relationships; strengthen base.' },
      social: { status: 'Medium', directive: 'Rhythm Maintenance. Execute consistent follow-ups; preserve harmonious connections; maintain check-ins.' },
      strategic: { status: 'Medium', directive: 'Course Lock. Execute current plans; monitor progress metrics; sustain strategic alignment.' },
      action: { status: 'Medium', directive: 'Reliable Execution. Complete daily priorities; honor established protocols; build via repetition.' },
    },
    'Fix': {
      business: { status: 'High', directive: 'Position Fortification. Secure key contracts; defend market share; solidify revenue streams.' },
      social: { status: 'Medium', directive: 'Alliance Reinforcement. Reconnect core contacts; deepen loyalty bonds; strengthen support network.' },
      strategic: { status: 'High', directive: 'Gain Consolidation. Lock competitive advantages; document success patterns; deploy contingency buffers.' },
      action: { status: 'Medium', directive: 'Outcome Cementing. Finalize agreements; secure commitments; embed sustainable results.' },
    },
    'Execute': {
      business: { status: 'High', directive: 'Decision Velocity. Accelerate approval cycles; push pending deals; close open contracts.' },
      social: { status: 'Medium', directive: 'Direct Transmission. Deliver crucial messages; issue clear directives; confront issues head-on.' },
      strategic: { status: 'Medium', directive: 'Implementation Drive. Execute quarterly goals; deploy approved initiatives; maximize execution speed.' },
      action: { status: 'High', directive: 'Priority Deployment. Launch key initiatives; travel for critical meetings; execute decisive moves.' },
    },
    'Break': {
      business: { status: 'Low', directive: 'Risk Containment. Delay major decisions; postpone new contracts; audit exposure levels.' },
      social: { status: 'Low', directive: 'Conflict Avoidance. Suppress confrontations; leverage diplomatic channels; preserve relationships.' },
      strategic: { status: 'Medium', directive: 'Vulnerability Scan. Audit strategic assumptions; identify risk factors; stress-test alternatives.' },
      action: { status: 'Low', directive: 'Caution Protocol. Validate before committing; limit exposure; prioritize preparation over action.' },
    },
    'Risk': {
      business: { status: 'Medium', directive: 'Exposure Analysis. Review financial liabilities; assess contract risks; evaluate market conditions.' },
      social: { status: 'Medium', directive: 'Precision Navigation. Select words carefully; avoid sensitive topics; enforce professional boundaries.' },
      strategic: { status: 'Low', directive: 'Strategic Pause. Delay pivotal pivots; gather intelligence; maintain maximum flexibility.' },
      action: { status: 'Medium', directive: 'Pilot Testing. Run small-scale probes; validate key assumptions; limit initial investment.' },
    },
    'Achieve': {
      business: { status: 'High', directive: 'Deal Closure. Finalize pending transactions; execute contracts; complete negotiation cycles.' },
      social: { status: 'High', directive: 'Public Recognition. Celebrate team wins; broadcast success stories; acknowledge contributions.' },
      strategic: { status: 'High', directive: 'Milestone Mapping. Document achievements; review goal attainment; scope next phase.' },
      action: { status: 'High', directive: 'Final Delivery. Ship completed outputs; launch finished work; secure defined outcomes.' },
    },
    'Harvest': {
      business: { status: 'High', directive: 'Value Capture. Collect payments; harvest revenue; extract key learnings.' },
      social: { status: 'Medium', directive: 'Knowledge Transfer. Distribute case studies; document lessons; present outcome data.' },
      strategic: { status: 'High', directive: 'Performance Audit. Conduct retrospectives; analyze efficiency metrics; calculate ROI.' },
      action: { status: 'Medium', directive: 'Results Integration. Compile data; organize documentation; structure knowledge assets.' },
    },
    'Open': {
      business: { status: 'High', directive: 'Opportunity Scan. Explore emerging markets; identify gaps; detect strategic openings.' },
      social: { status: 'High', directive: 'Network Expansion. Schedule networking events; engage prospects; amplify connection reach.' },
      strategic: { status: 'Medium', directive: 'Option Exploration. Research alternatives; test pathways; preserve strategic flexibility.' },
      action: { status: 'High', directive: 'Initiation Energy. Kick off projects; establish first contact; deploy novel approaches.' },
    },
    'Close': {
      business: { status: 'Medium', directive: 'Internal Focus. Audit operations; target core business; freeze external commitments.' },
      social: { status: 'Low', directive: 'Energy Conservation. Limit social events; prioritize key relationships; avoid exposure.' },
      strategic: { status: 'Medium', directive: 'Cycle Preparation. Design next phase; prepare for opening; execute strategic planning.' },
      action: { status: 'Low', directive: 'Internal Development. Execute desk-based tasks; suppress external activity; conserve resources.' },
    },
  };

  return compatibilityMap[officer.name] || {
    business: { status: 'Medium', directive: 'Assessment Mode. Review current state; evaluate options; plan next steps.' },
    social: { status: 'Medium', directive: 'Balanced Engagement. Maintain contact; honor commitments; sustain connection.' },
    strategic: { status: 'Medium', directive: 'Option Evaluation. Audit strategic paths; assess alternatives; weigh trade-offs.' },
    action: { status: 'Medium', directive: 'Measured Progress. Validate before committing; limit exposure; execute incrementally.' },
  };
};

/**
 * Generate complete Ambient Energy Field data
 */
export const generateAmbientEnergyField = (date: Date): AmbientEnergyField => {
  const officerKey = (['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'][
    Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000) % 12
  ] as keyof typeof TWELVE_OFFICERS);

  const officer = TWELVE_OFFICERS[officerKey];

  return {
    anchor: {
      date: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase(),
      label: 'AMBIENT ENERGY FIELD',
      officer: `${officer.name} DAY`,
    },
    narrative: generateNarrative(officer),
    metrics: generateMetrics(officer),
    compatibility: generateCompatibility(officer),
  };
};
