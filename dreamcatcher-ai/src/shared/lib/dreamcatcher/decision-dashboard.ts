/**
 * Decision Dashboard V1.0 - Core Logic
 * Maps Twelve Officers to 5 States and generates tactical directives
 */

import { TWELVE_OFFICERS } from './constants';
import { AmbientEnergyField } from './ambient-energy';

// The 5 Legal States
export type TodayState = 'INITIATE' | 'ACCELERATE' | 'CONSOLIDATE' | 'ADJUST' | 'REST';

// Tactical Status Types
export type TacticalStatus = 'PUSH' | 'HOLD' | 'TUNE' | 'PAUSE';

// Fixed STATUS mappings for each TODAY state (绝对禁止Claude自行选择)
const STATUS_MAPPINGS: Record<TodayState, {
  business: TacticalStatus;
  social: TacticalStatus;
  strategic: TacticalStatus;
  action: TacticalStatus;
}> = {
  'ACCELERATE': {
    business: 'PUSH',
    social: 'PUSH',
    strategic: 'HOLD',
    action: 'PUSH',
  },
  'CONSOLIDATE': {
    business: 'HOLD',
    social: 'TUNE',
    strategic: 'HOLD',
    action: 'PAUSE',
  },
  'ADJUST': {
    business: 'TUNE',
    social: 'HOLD',
    strategic: 'TUNE',
    action: 'TUNE',
  },
  'REST': {
    business: 'PAUSE',
    social: 'PAUSE',
    strategic: 'HOLD',
    action: 'PAUSE',
  },
  'INITIATE': {
    business: 'PUSH',
    social: 'TUNE',
    strategic: 'HOLD',
    action: 'PUSH',
  },
};

// Map Twelve Officers to 5 States
export function getTodayState(officerName: string): TodayState {
  const stateMap: Record<string, TodayState> = {
    'Establish': 'INITIATE',
    'Open': 'INITIATE',
    'Execute': 'ACCELERATE',
    'Achieve': 'ACCELERATE',
    'Full': 'ACCELERATE',
    'Fix': 'CONSOLIDATE',
    'Stable': 'CONSOLIDATE',
    'Harvest': 'CONSOLIDATE',
    'Clear': 'ADJUST',
    'Risk': 'ADJUST',
    'Break': 'ADJUST',
    'Close': 'REST',
  };
  return stateMap[officerName] || 'ADJUST';
}

// Generate Permission Statement
export function generatePermissionStatement(state: TodayState): string {
  const permissions: Record<TodayState, { a: string; b: string; c: string }> = {
    'INITIATE': { a: 'starting', b: 'waiting', c: 'launch new ventures' },
    'ACCELERATE': { a: 'momentum', b: 'caution', c: 'push forward aggressively' },
    'CONSOLIDATE': { a: 'securing', b: 'expanding', c: 'lock in gains' },
    'ADJUST': { a: 'flexibility', b: 'rigidity', c: 'pivot and adapt' },
    'REST': { a: 'recovery', b: 'action', c: 'conserve energy' },
  };

  const p = permissions[state];
  return `Today favors ${p.a} over ${p.b}. Permission to ${p.c}.`;
}

// Map compatibility status to tactical status - FIXED MAPPINGS ONLY
export function getTacticalStatus(module: 'business' | 'social' | 'strategic' | 'action', state: TodayState): TacticalStatus {
  // 绝对禁止Claude自行选择 - 必须使用固定映射
  return STATUS_MAPPINGS[state][module];
}

// Generate tactical card message
export function generateTacticalCard(
  module: 'Business' | 'Social' | 'Strategic' | 'Action',
  compatibility: AmbientEnergyField['compatibility'][keyof AmbientEnergyField['compatibility']],
  todayState: TodayState
): {
  module: string;
  status: TacticalStatus;
  message: string;
  do: string;
  avoid: string;
} {
  const moduleKey = module.toLowerCase() as 'business' | 'social' | 'strategic' | 'action';
  const status = getTacticalStatus(moduleKey, todayState);

  // Extract directive or note from compatibility data
  const text = (compatibility as any).directive || (compatibility as any).note || '';
  const message = text.split('.')[0] + '.';

  // Behavioral translations based on STATUS (not explanations)
  const behavioralMap: Record<TacticalStatus, { do: string; avoid: string }> = {
    'PUSH': { do: 'Act decisively', avoid: 'Hesitation' },
    'HOLD': { do: 'Maintain', avoid: 'Expansion' },
    'TUNE': { do: 'Adjust', avoid: 'Rigidity' },
    'PAUSE': { do: 'Wait', avoid: 'Action' },
  };

  const behavior = behavioralMap[status];

  return {
    module: module.toUpperCase(),
    status,
    message,
    do: behavior.do,
    avoid: behavior.avoid,
  };
}

// Generate all 4 tactical cards
export function generateTacticalCards(compatibility: AmbientEnergyField['compatibility'], todayState: TodayState) {
  return {
    business: generateTacticalCard('Business', compatibility.business, todayState),
    social: generateTacticalCard('Social', compatibility.social, todayState),
    strategic: generateTacticalCard('Strategic', compatibility.strategic, todayState),
    action: generateTacticalCard('Action', compatibility.action, todayState),
  };
}
