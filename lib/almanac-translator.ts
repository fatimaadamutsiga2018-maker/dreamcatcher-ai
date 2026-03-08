/**
 * Almanac Translator
 * Converts Chinese almanac terms to Western-friendly English expressions
 *
 * This file imports from content-config.ts for centralized content management
 */

import {
  getAllActivities,
  getDayOfficer,
  getSpirit,
  getDirection,
  getAlmanacEnergyLevel,
  dayCharacteristicsConfig,
  directionsConfig,
  almanacEnergyConfig,
} from './content-config';

// Re-export for backward compatibility
export const activityTranslations = getAllActivities();
export const dayOfficerTranslations = dayCharacteristicsConfig.dayOfficer;
export const spiritTranslations = dayCharacteristicsConfig.spirit;
export const directionTranslations = directionsConfig.translations;
export const energyLevelTemplates = almanacEnergyConfig;

// Energy level calculation
export function calculateEnergyLevel(
  dayOfficer: string,
  spirit: string,
  spiritLuck: string
): 1 | 2 | 3 | 4 | 5 {
  const officerData = getDayOfficer(dayOfficer);
  const spiritData = getSpirit(spirit);

  let score = 3; // Default medium

  // Day Officer influence
  if (officerData) {
    if (officerData.energy === 'high') score += 1;
    if (officerData.energy === 'low') score -= 1;
  }

  // Spirit influence
  if (spiritData) {
    if (spiritData.fortune === 'favorable') score += 1;
    if (spiritData.fortune === 'challenging') score -= 1;
  }

  // Spirit luck override
  if (spiritLuck === '吉') score += 0.5;
  if (spiritLuck === '凶') score -= 0.5;

  // Clamp to 1-5
  return Math.max(1, Math.min(5, Math.round(score))) as 1 | 2 | 3 | 4 | 5;
}
