'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Hexagram } from '@/lib/hexagram64';
import { getNumberEnergyLevel } from '@/lib/content-config';

export default function ReadingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [reading, setReading] = useState<Hexagram & {
    question?: string;
    inputNumbers?: string;
    movingLine?: number;
    upperTrigram?: { name: string; symbol: string; unicode: string };
    lowerTrigram?: { name: string; symbol: string; unicode: string };
  } | null>(null);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/hexagram');
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!session) {
    return null;
  }

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

  // Map result level to colors and progress (New favorability system)
  const levelConfig = {
    5: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', progress: 'bg-emerald-500', width: 'w-[95%]' },
    4: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', progress: 'bg-yellow-500', width: 'w-[75%]' },
    3: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', progress: 'bg-orange-500', width: 'w-[55%]' },
    2: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', progress: 'bg-red-500', width: 'w-[35%]' },
    1: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-300', progress: 'bg-gray-500', width: 'w-[15%]' },
  };
  const config = levelConfig[reading.result_level as keyof typeof levelConfig] || levelConfig[1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Disclaimer at top */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-gray-700">
          <p className="text-center">
            This guidance is for reflection and inspiration, not for financial, medical, legal, or gambling decisions. You are the final decision-maker.
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

        {/* Favorability Assessment - Prominent Display */}
        <div className={`${config.bg} border-2 ${config.border} rounded-2xl p-8 mb-6`}>
          {/* Favorability Label */}
          <div className="text-center mb-6">
            <div className="text-sm font-medium text-gray-500 mb-2">Favorability Assessment</div>
            <div className={`text-3xl font-bold ${config.text} mb-4`}>
              {reading.result_label}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div className={`${config.progress} h-full ${config.width} transition-all duration-1000 ease-out`}></div>
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
