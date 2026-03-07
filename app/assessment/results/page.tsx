'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AssessmentResult, energyTypeInfo } from '@/lib/assessment';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('assessmentResult');
    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      router.push('/assessment');
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const energyInfo = energyTypeInfo[result.energyType];

  const radarData = [
    { dimension: 'Mental\nClarity', score: result.scores.mental_clarity },
    { dimension: 'Physical\nVitality', score: result.scores.physical_vitality },
    { dimension: 'Life\nHarmony', score: result.scores.life_harmony },
    { dimension: 'Growth\nMomentum', score: result.scores.growth_momentum },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Energy Assessment
          </h1>
          <p className="text-xl text-gray-600">
            Overall Score: <span className="font-bold text-amber-600">{result.totalScore.toFixed(1)}/10</span>
          </p>
        </div>

        {/* Energy Type Card */}
        <div className={`bg-${energyInfo.color}-50 border-2 border-${energyInfo.color}-200 rounded-2xl p-8 mb-8`}>
          <div className="text-center">
            <h2 className={`text-3xl font-bold text-${energyInfo.color}-900 mb-4`}>
              {energyInfo.title}
            </h2>
            <p className={`text-lg text-${energyInfo.color}-800`}>
              {energyInfo.description}
            </p>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Your Energy Profile
          </h3>
          <ResponsiveContainer width="100%" height={450}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 10]}
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                tickCount={6}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#d97706"
                fill="#f59e0b"
                fillOpacity={0.6}
                label={({ value, cx, cy, x, y }) => (
                  <text
                    x={x ?? 0}
                    y={y ?? 0}
                    fill="#d97706"
                    fontSize={14}
                    fontWeight="bold"
                    textAnchor={(x ?? 0) > (cx ?? 0) ? 'start' : 'end'}
                    dominantBaseline="middle"
                  >
                    {typeof value === 'number' ? value.toFixed(1) : '0.0'}
                  </text>
                )}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Dimension Scores */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Dimension Breakdown
          </h3>
          <div className="space-y-4">
            {Object.entries(result.scores).map(([dimension, score]) => (
              <div key={dimension}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700 capitalize">
                    {dimension.replace('_', ' ')}
                  </span>
                  <span className="font-bold text-amber-600">
                    {score.toFixed(1)}/10
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-amber-600 h-3 rounded-full transition-all"
                    style={{ width: `${(score / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/hexagram"
            className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors text-center"
          >
            Seek Decision Guidance
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
