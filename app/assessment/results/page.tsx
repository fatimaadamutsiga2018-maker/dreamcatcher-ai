'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AssessmentResult,
  archetypeInfo,
  dimensionLabels,
  dimensionReflections,
} from '@/lib/assessment';
import { ARCHETYPE_KEY_TO_SLUG } from '@/lib/archetypes';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from 'recharts';

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
        <p className="text-gray-500">Loading your results...</p>
      </div>
    );
  }

  const info = archetypeInfo[result.archetype];
  const lowest = dimensionReflections[result.lowestDimension];

  const radarData = [
    { dimension: 'Focus', score: result.scores.focus },
    { dimension: 'Power', score: result.scores.power },
    { dimension: 'Rhythm', score: result.scores.rhythm },
    { dimension: 'Drive', score: result.scores.drive },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Archetype Header */}
        <div className="text-center mb-10">
          <span className="text-5xl mb-4 block">{info.icon}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {info.name}
          </h1>
          <p className="text-lg text-gray-600">{info.tagline}</p>
        </div>

        {/* Reflection Line */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 mb-8">
          <p className="text-lg md:text-xl leading-relaxed italic text-center">
            &ldquo;{info.reflectionLine}&rdquo;
          </p>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">About Your Current State</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{info.description}</p>
          <div className="bg-amber-50 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-amber-800 mb-1">Suggested Action</p>
            <p className="text-sm text-amber-700">{info.advice}</p>
          </div>
          <Link
            href={`/archetype/${ARCHETYPE_KEY_TO_SLUG[result.archetype]}`}
            className="inline-block text-sm font-medium text-emerald-700 hover:text-emerald-800 underline underline-offset-2"
          >
            Learn more about {info.name} →
          </Link>
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Your Energy Profile</h2>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="dimension" tick={{ fill: '#6b7280', fontSize: 13 }} />
              <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: '#9ca3af', fontSize: 11 }} tickCount={5} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#d97706"
                fill="#f59e0b"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
          {/* Dimension bars */}
          <div className="space-y-3 mt-4">
            {(Object.entries(result.scores) as [keyof typeof dimensionLabels, number][]).map(([dim, score]) => (
              <div key={dim}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{dimensionLabels[dim]}</span>
                  <span className="font-bold text-amber-600">{score.toFixed(1)}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${(score / 10) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lowest Dimension Insight */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Your Friction Point: {dimensionLabels[result.lowestDimension]}
          </h2>
          <p className="text-gray-700 italic mb-3">&ldquo;{lowest.line}&rdquo;</p>
          <p className="text-sm text-gray-600 mb-4">{lowest.advice}</p>
          <Link
            href={`/blog/${lowest.blogSlug}`}
            className="inline-block text-sm font-medium text-amber-700 hover:text-amber-800 underline underline-offset-2"
          >
            Read more on this topic →
          </Link>
        </div>

        {/* Retake note */}
        <p className="text-center text-sm text-gray-400 mb-8">
          Your energy pattern changes over time. Retake anytime to track your progress.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/assessment"
            className="px-8 py-3 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors text-center"
          >
            Retake Assessment
          </Link>
          <Link
            href="/blog"
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors text-center"
          >
            Explore Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
