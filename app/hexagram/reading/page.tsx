'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Hexagram } from '@/lib/hexagram64';
import { getNumberEnergyLevel } from '@/lib/content-config';
import EnergyRing from '@/components/EnergyRing';

export default function ReadingPage() {
  const router = useRouter();
  const [reading, setReading] = useState<Hexagram & {
    question?: string;
    inputNumbers?: string;
    movingLine?: number;
    upperTrigram?: { name: string; symbol: string; unicode: string };
    lowerTrigram?: { name: string; symbol: string; unicode: string };
  } | null>(null);

  // Get level-based content from centralized config
  const getLevelConclusion = (level: number): string => {
    const config = getNumberEnergyLevel(level as 1 | 2 | 3 | 4 | 5);
    return config?.conclusion || "Assess carefully and proceed with awareness";
  };

  const getLevelSuggestion = (level: number): string => {
    const config = getNumberEnergyLevel(level as 1 | 2 | 3 | 4 | 5);
    return config?.suggestion || "Consider your options carefully";
  };

  const getExpandedInsight = (situation: string, level: number, movingLine?: number): string => {
    const config = getNumberEnergyLevel(level as 1 | 2 | 3 | 4 | 5);
    return config?.expandedInsight(situation, movingLine) || `${situation}. Assess carefully and proceed with awareness.`;
  };

  useEffect(() => {
    const stored = localStorage.getItem('hexagramReading');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        // Check if data has the correct structure (new format with action_1, action_2, action_3)
        if (data && data.action_1 && data.result_level) {
          setReading(data);
        } else {
          // Old format or invalid data, redirect to input page
          localStorage.removeItem('hexagramReading');
          router.push('/hexagram');
        }
      } catch (error) {
        localStorage.removeItem('hexagramReading');
        router.push('/hexagram');
      }
    } else {
      router.push('/hexagram');
    }
  }, [router]);

  if (!reading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Map result level to colors (New 5-level system)
  const levelColors = {
    5: { bg: 'emerald', text: 'emerald-700', border: 'emerald-200' },  // 🟢 Green Light (85-99%)
    4: { bg: 'yellow', text: 'yellow-700', border: 'yellow-200' },     // 🟡 Favorable (70-84%)
    3: { bg: 'orange', text: 'orange-700', border: 'orange-200' },     // 🟠 Work for It (55-69%)
    2: { bg: 'red', text: 'red-700', border: 'red-200' },              // 🔴 Hold Off (35-54%)
    1: { bg: 'gray', text: 'gray-700', border: 'gray-300' },           // ⚫ Not Now (1-34%)
  };
  const colors = levelColors[reading.result_level as keyof typeof levelColors] || levelColors[1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Disclaimer at top */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-gray-700">
          <p className="text-center">
            This reading assesses the favorability of conditions for your question.
            It provides guidance based on probability, not certainty.
            You remain the decision-maker and are responsible for your choices.
          </p>
        </div>

        {/* User Question */}
        {reading.question && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="text-sm font-medium text-gray-500 mb-2">Your Question</div>
            <div className="text-xl text-gray-800 leading-relaxed">
              "{reading.question}"
            </div>
          </div>
        )}

        {/* User Input Numbers */}
        {reading.inputNumbers && (
          <div className="text-center mb-6">
            <div className="text-sm text-gray-500 mb-2">Your Numbers</div>
            <div className="flex justify-center gap-4">
              {reading.inputNumbers.split('').map((num, index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center text-2xl font-bold text-emerald-600"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Result Level - Prominent Display */}
        <div className={`bg-${colors.bg}-50 border-2 border-${colors.border} rounded-2xl p-8 mb-6`}>
          <div className="flex items-center justify-center gap-6 mb-6">
            {/* Energy Ring */}
            <EnergyRing
              level={reading.result_level as 1 | 2 | 3 | 4 | 5}
              size={120}
              strokeWidth={12}
              showLabel={false}
            />

            {/* Result Label Only */}
            <div>
              <div className={`text-3xl font-bold text-${colors.text}`}>
                {reading.result_label}
              </div>
            </div>
          </div>

          {/* New Template Format */}
          <div className="space-y-4 text-left">
            <div>
              <div className="text-sm font-semibold text-gray-500 mb-1">【Conclusion】</div>
              <div className="text-lg text-gray-800 leading-relaxed">
                {getLevelConclusion(reading.result_level)}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-gray-500 mb-1">【Suggestion】</div>
              <div className="text-lg text-gray-800 leading-relaxed">
                {getLevelSuggestion(reading.result_level)}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-gray-500 mb-1">【Insight】</div>
              <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {getExpandedInsight(reading.situation, reading.result_level, reading.movingLine)}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/hexagram"
            className="px-8 py-4 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors text-center"
          >
            Ask Another Question
          </Link>
          <Link
            href="/"
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
