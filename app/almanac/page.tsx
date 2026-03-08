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
import EnergyRing from '@/components/EnergyRing';

export default function AlmanacPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  // Format date
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekday = weekdays[solar.getWeek()];
  const formattedDate = `${solar.toYmd()} (${weekday})`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              ClarityPath
            </Link>
            <nav className="flex gap-6">
              <Link href="/assessment" className="text-gray-600 hover:text-gray-900">
                Energy Assessment
              </Link>
              <Link href="/hexagram" className="text-gray-600 hover:text-gray-900">
                Decision Guidance
              </Link>
              <Link href="/almanac" className="text-indigo-600 font-medium">
                Daily Energy
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Daily Energy Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the best timing for your important decisions and activities
            </p>
          </div>

          {/* Date Display */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">TODAY</p>
              <p className="text-3xl font-bold text-gray-900">{formattedDate}</p>
            </div>
          </div>

          {/* Energy Level Card */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Energy Ring */}
              <div className="flex-shrink-0">
                <EnergyRing level={energyLevel} size={140} strokeWidth={14} showLabel={false} />
              </div>

              {/* Energy Description */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-3">{energyTemplate.title}</h2>
                <p className="text-lg text-indigo-100 leading-relaxed">
                  {energyTemplate.message}
                </p>
              </div>
            </div>

            {/* Day Characteristics */}
            <div className="grid md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-indigo-400">
              <div>
                <p className="text-indigo-200 text-sm mb-2">Energy Type</p>
                <p className="text-xl font-semibold">{officerData?.en || dayOfficer}</p>
                <p className="text-indigo-100 text-sm mt-1">{officerData?.description}</p>
              </div>
              <div>
                <p className="text-indigo-200 text-sm mb-2">Daily Influence</p>
                <p className="text-xl font-semibold">{spiritData?.en || spirit}</p>
                <p className="text-indigo-100 text-sm mt-1">
                  {spiritData?.description || 'Proceed mindfully'}
                </p>
              </div>
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
                <h3 className="text-xl font-semibold text-gray-900">Favorable Activities</h3>
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
                <h3 className="text-xl font-semibold text-gray-900">Activities to Avoid</h3>
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

          {/* Auspicious Directions */}
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
