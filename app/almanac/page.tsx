'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Solar } from 'lunar-typescript';
import {
  activityTranslations,
  directionTranslations,
  dayOfficerTranslations,
  spiritTranslations,
  calculateEnergyLevel,
  energyLevelTemplates,
} from '@/lib/almanac-translator';

export default function AlmanacPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showWhy, setShowWhy] = useState(false);

  const solar = Solar.fromDate(selectedDate);
  const lunar = solar.getLunar();

  // Calculate energy level
  const dayOfficer = lunar.getZhiXing();
  const spirit = lunar.getDayTianShen();
  const spiritLuck = lunar.getDayTianShenLuck();
  const energyLevel = calculateEnergyLevel(dayOfficer, spirit, spiritLuck);
  const energyTemplate = energyLevelTemplates[energyLevel];

  // Get day characteristics
  const officerData = dayOfficerTranslations[dayOfficer as keyof typeof dayOfficerTranslations];
  const spiritData = spiritTranslations[spirit as keyof typeof spiritTranslations];

  // Get activities
  const suitableActivities = lunar.getDayYi()
    .map(act => activityTranslations[act as keyof typeof activityTranslations])
    .filter(Boolean)
    .slice(0, 8);

  const unsuitableActivities = lunar.getDayJi()
    .map(act => activityTranslations[act as keyof typeof activityTranslations])
    .filter(Boolean)
    .slice(0, 8);

  // Get directions
  const wealthDir = directionTranslations[lunar.getDayPositionCai() as keyof typeof directionTranslations] || lunar.getDayPositionCai();
  const joyDir = directionTranslations[lunar.getDayPositionXi() as keyof typeof directionTranslations] || lunar.getDayPositionXi();
  const fortuneDir = directionTranslations[lunar.getDayPositionFu() as keyof typeof directionTranslations] || lunar.getDayPositionFu();

  // Generate today's theme based on day officer
  const getDayTheme = () => {
    const themes: Record<string, { title: string; subtitle: string }> = {
      '建': { title: 'Initiation Day', subtitle: 'Great for starting new ventures' },
      '除': { title: 'Clearing Day', subtitle: 'Perfect for removing obstacles' },
      '满': { title: 'Abundance Day', subtitle: 'Ideal for celebrations and completions' },
      '平': { title: 'Completion Day', subtitle: 'Perfect for finishing what you started' },
      '定': { title: 'Commitment Day', subtitle: 'Excellent for making important decisions' },
      '执': { title: 'Persistence Day', subtitle: 'Good for maintaining momentum' },
      '破': { title: 'Breakthrough Day', subtitle: 'Time for problem-solving' },
      '危': { title: 'Caution Day', subtitle: 'Proceed carefully with major decisions' },
      '成': { title: 'Achievement Day', subtitle: 'Perfect for completing goals' },
      '收': { title: 'Harvest Day', subtitle: 'Great for gathering results' },
      '开': { title: 'Opening Day', subtitle: 'Ideal for new beginnings' },
      '闭': { title: 'Reflection Day', subtitle: 'Better for planning than action' },
    };
    return themes[dayOfficer] || { title: 'Balanced Day', subtitle: 'Steady energy for all activities' };
  };

  // Calculate energy focus areas with specific activity suggestions
  const getEnergyFocus = () => {
    // Base scores
    let relationships = 50;
    let career = 50;
    let finance = 50;
    let health = 50;

    // Spirit influence
    if (spirit === '金匮') finance += 40; // Prosperous
    if (spirit === '青龙' || spirit === '明堂') relationships += 30;
    if (spirit === '天德' || spirit === '玉堂') career += 30;
    if (spirit === '司命') health += 20;

    // Officer influence
    if (dayOfficer === '建' || dayOfficer === '开') career += 20;
    if (dayOfficer === '满' || dayOfficer === '收') finance += 20;
    if (dayOfficer === '定') relationships += 30;
    if (dayOfficer === '平') health += 20;

    const getLevel = (score: number) => {
      if (score >= 80) return 'Excellent';
      if (score >= 65) return 'Good';
      if (score >= 50) return 'Moderate';
      return 'Low';
    };

    const getSuggestions = (area: string, score: number) => {
      if (area === 'relationships') {
        if (score >= 80) return 'Great for important commitments, deep conversations';
        if (score >= 65) return 'Good for social gatherings, networking';
        if (score >= 50) return 'Suitable for casual meetups, maintaining connections';
        return 'Better for solo reflection';
      }
      if (area === 'career') {
        if (score >= 80) return 'Excellent for job interviews, presentations, negotiations';
        if (score >= 65) return 'Good for completing projects, team collaboration';
        if (score >= 50) return 'Good for wrapping up ongoing work, not for starting new ventures';
        return 'Focus on preparation and planning';
      }
      if (area === 'finance') {
        if (score >= 80) return 'Perfect for financial decisions on existing ventures, contracts, major purchases';
        if (score >= 65) return 'Good for budgeting, financial planning';
        if (score >= 50) return 'Suitable for routine transactions';
        return 'Better to wait for important financial decisions';
      }
      if (area === 'health') {
        if (score >= 80) return 'Great for starting new wellness routines, medical checkups';
        if (score >= 65) return 'Good for exercise, healthy habits';
        if (score >= 50) return 'Suitable for maintenance and rest';
        return 'Focus on rest and recovery';
      }
      return '';
    };

    return {
      relationships: {
        score: Math.min(100, relationships),
        level: getLevel(Math.min(100, relationships)),
        suggestion: getSuggestions('relationships', Math.min(100, relationships))
      },
      career: {
        score: Math.min(100, career),
        level: getLevel(Math.min(100, career)),
        suggestion: getSuggestions('career', Math.min(100, career))
      },
      finance: {
        score: Math.min(100, finance),
        level: getLevel(Math.min(100, finance)),
        suggestion: getSuggestions('finance', Math.min(100, finance))
      },
      health: {
        score: Math.min(100, health),
        level: getLevel(Math.min(100, health)),
        suggestion: getSuggestions('health', Math.min(100, health))
      },
    };
  };

  const dayTheme = getDayTheme();
  const energyFocus = getEnergyFocus();

  // Format date
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekday = weekdays[solar.getWeek()];
  const formattedDate = `${solar.toYmd()} (${weekday})`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Daily Activity Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what activities are best suited for today
            </p>
          </div>

          {/* Date Display */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">TODAY</p>
              <p className="text-3xl font-bold text-gray-900">{formattedDate}</p>
            </div>
          </div>

          {/* Activity Recommendations Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="text-center mb-8">
              <p className="text-sm text-gray-500 mb-2">TODAY'S THEME</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {dayTheme.title}
              </h2>
              <p className="text-gray-600">
                {dayTheme.subtitle}
              </p>
            </div>
          </div>

          {/* Activities Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Favorable Activities */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">✅</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Best for Today</h3>
              </div>
              <div className="space-y-4">
                {suitableActivities.length > 0 ? (
                  suitableActivities.map((act, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">{act.en}</p>
                        <p className="text-sm text-gray-600">{act.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">Focus on reflection and planning</p>
                )}
              </div>
            </div>

            {/* Activities to Avoid */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">⚠️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Not Today</h3>
              </div>
              <div className="space-y-4">
                {unsuitableActivities.length > 0 ? (
                  unsuitableActivities.map((act, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">{act.en}</p>
                        <p className="text-sm text-gray-600">{act.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No specific restrictions</p>
                )}
              </div>
            </div>
          </div>

          {/* Energy Focus Areas */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Today's Energy by Area</h3>
            </div>
            <div className="space-y-6">
              {/* Relationships */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-900">Relationships</span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                    {energyFocus.relationships.level}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${energyFocus.relationships.score}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">{energyFocus.relationships.suggestion}</p>
              </div>

              {/* Career */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-900">Career</span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                    {energyFocus.career.level}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${energyFocus.career.score}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">{energyFocus.career.suggestion}</p>
              </div>

              {/* Finance */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-900">Finance</span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                    {energyFocus.finance.level}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${energyFocus.finance.score}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">{energyFocus.finance.suggestion}</p>
              </div>

              {/* Health */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-900">Health</span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                    {energyFocus.health.level}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${energyFocus.health.score}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">{energyFocus.health.suggestion}</p>
              </div>
            </div>

            {/* Why explanation */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowWhy(!showWhy)}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                <span>💡</span>
                <span>{showWhy ? 'Hide explanation' : 'How This Works'}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${showWhy ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showWhy && (
                <div className="mt-4 p-4 bg-indigo-50 rounded-lg text-sm text-gray-700 leading-relaxed">
                  <p className="mb-3">
                    <strong>Today is a {dayTheme.title}.</strong> {dayTheme.subtitle}
                  </p>
                  <p className="mb-3">
                    We analyze cosmic timing patterns from the traditional Chinese almanac —
                    a 2,000-year-old system for identifying optimal timing. Think of it as a weather
                    forecast for your decisions.
                  </p>
                  <p>
                    The energy ratings show which life areas have the strongest cosmic support today.
                    "Excellent" timing means conditions are particularly favorable for important actions in that area.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Auspicious Directions - Temporarily hidden for Western users */}
          {/*
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl">🧭</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Favorable Directions</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Wealth</p>
                <p className="text-2xl font-bold text-amber-600 mb-1">{wealthDir}</p>
                <p className="text-xs text-gray-500">Optimal for financial matters</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Joy</p>
                <p className="text-2xl font-bold text-rose-600 mb-1">{joyDir}</p>
                <p className="text-xs text-gray-500">Best for positive outcomes</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Fortune</p>
                <p className="text-2xl font-bold text-indigo-600 mb-1">{fortuneDir}</p>
                <p className="text-xs text-gray-500">Favorable for general success</p>
              </div>
            </div>
          </div>
          */}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 text-center border border-amber-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Need More Specific Guidance?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              For personalized decision support on specific questions, try our Decision Guidance tool
            </p>
            <Link
              href="/hexagram"
              className="inline-block px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors"
            >
              Get Decision Guidance
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
