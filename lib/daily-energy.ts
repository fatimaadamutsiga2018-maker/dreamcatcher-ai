/**
 * Daily Energy Utility
 * Provides today's energy data for use across the application
 */

import { Solar } from 'lunar-typescript';
import {
  activityTranslations,
  dayOfficerTranslations,
  spiritTranslations,
  calculateEnergyLevel,
} from './almanac-translator';

export interface DailyEnergyData {
  theme: {
    title: string;
    subtitle: string;
  };
  activities: {
    suitable: Array<{ en: string; description: string }>;
    unsuitable: Array<{ en: string; description: string }>;
  };
  energyFocus: {
    finance: { level: string; score: number };
    career: { level: string; score: number };
  };
}

/**
 * Get today's energy data
 */
export function getTodayEnergy(date: Date = new Date()): DailyEnergyData {
  const solar = Solar.fromDate(date);
  const lunar = solar.getLunar();

  // Get day characteristics
  const dayOfficer = lunar.getZhiXing();
  const spirit = lunar.getDayTianShen();
  const spiritLuck = lunar.getDayTianShenLuck();

  // Get theme
  const theme = getDayTheme(dayOfficer);

  // Get activities
  const suitableActivities = lunar
    .getDayYi()
    .map((act) => activityTranslations[act as keyof typeof activityTranslations])
    .filter(Boolean)
    .slice(0, 3); // Only take top 3 for homepage

  const unsuitableActivities = lunar
    .getDayJi()
    .map((act) => activityTranslations[act as keyof typeof activityTranslations])
    .filter(Boolean)
    .slice(0, 3);

  // Calculate energy focus
  const energyFocus = calculateEnergyFocus(dayOfficer, spirit);

  return {
    theme,
    activities: {
      suitable: suitableActivities,
      unsuitable: unsuitableActivities,
    },
    energyFocus: {
      finance: energyFocus.finance,
      career: energyFocus.career,
    },
  };
}

function getDayTheme(dayOfficer: string): { title: string; subtitle: string } {
  const themes: Record<string, { title: string; subtitle: string }> = {
    建: { title: 'Initiation Day', subtitle: 'Great for starting new ventures' },
    除: { title: 'Clearing Day', subtitle: 'Perfect for removing obstacles' },
    满: { title: 'Abundance Day', subtitle: 'Ideal for celebrations' },
    平: { title: 'Completion Day', subtitle: 'Perfect for finishing what you started' },
    定: { title: 'Commitment Day', subtitle: 'Excellent for important decisions' },
    执: { title: 'Persistence Day', subtitle: 'Good for maintaining momentum' },
    破: { title: 'Breakthrough Day', subtitle: 'Time for problem-solving' },
    危: { title: 'Caution Day', subtitle: 'Proceed carefully' },
    成: { title: 'Achievement Day', subtitle: 'Perfect for completing goals' },
    收: { title: 'Harvest Day', subtitle: 'Great for gathering results' },
    开: { title: 'Opening Day', subtitle: 'Ideal for new beginnings' },
    闭: { title: 'Reflection Day', subtitle: 'Better for planning' },
  };
  return themes[dayOfficer] || { title: 'Balanced Day', subtitle: 'Steady energy' };
}

function calculateEnergyFocus(dayOfficer: string, spirit: string) {
  let finance = 50;
  let career = 50;

  // Spirit influence
  if (spirit === '金匮') finance += 40;
  if (spirit === '天德' || spirit === '玉堂') career += 30;

  // Officer influence
  if (dayOfficer === '建' || dayOfficer === '开') career += 20;
  if (dayOfficer === '满' || dayOfficer === '收') finance += 20;

  const getLevel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 65) return 'Good';
    if (score >= 50) return 'Moderate';
    return 'Low';
  };

  return {
    finance: {
      score: Math.min(100, finance),
      level: getLevel(Math.min(100, finance)),
    },
    career: {
      score: Math.min(100, career),
      level: getLevel(Math.min(100, career)),
    },
  };
}
