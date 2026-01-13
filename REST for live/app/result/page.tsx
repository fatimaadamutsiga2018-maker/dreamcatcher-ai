'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResultPage() {
  const router = useRouter();
  const [beforeTired, setBeforeTired] = useState<number>(5);
  const [afterTired, setAfterTired] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to sessionStorage for /log page
      const sessionData = {
        date: new Date().toISOString(),
        beforeTired,
        afterTired,
        delta: afterTired - beforeTired,
      };

      // Save to local storage (for /log page)
      const existingLogs = JSON.parse(localStorage.getItem('nsdrLogs') || '[]');
      existingLogs.push(sessionData);
      localStorage.setItem('nsdrLogs', JSON.stringify(existingLogs));

      // Submit to API (optional)
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: '', // Optional
          beforeFatigue: beforeTired,
          afterFatigue: afterTired,
          beforeFocus: 5, // Simplified version only records fatigue
          afterFocus: 5,
          willingToPay: '',
          willingToInterview: false,
          comments: '',
        }),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const delta = afterTired - beforeTired;
  const hasShift = delta < 0; // Decreased fatigue indicates improvement

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Primary Message */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Something shifted.
            <br />
            <span className="font-normal">Even if it was subtle.</span>
          </h1>
        </div>

        {/* Recovery Perception Log */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recovery Perception Log</h2>

          {/* Before */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Before the session, how mentally tired did you feel?
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={beforeTired}
              onChange={(e) => setBeforeTired(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 (not tired)</span>
              <span className="text-gray-900 font-semibold">{beforeTired}</span>
              <span>10 (extremely tired)</span>
            </div>
          </div>

          {/* After */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Right now, how mentally tired do you feel?
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={afterTired}
              onChange={(e) => setAfterTired(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 (not tired)</span>
              <span className="text-gray-900 font-semibold">{afterTired}</span>
              <span>10 (extremely tired)</span>
            </div>
          </div>

          {/* Delta Display (visual only) */}
          {hasShift && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                Your mental tiredness decreased by <strong>{Math.abs(delta)}</strong> points.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isSubmitted ? 'Saved ✓' : 'Save Record'}
          </button>
        </form>

        {/* Divider Message */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100 text-center">
          <p className="text-lg text-gray-700 mb-4">
            This session was general.
            <br />
            It didn&apos;t adapt to what keeps <strong>YOUR</strong> system tense.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Personalized NSDR adjusts language, pacing, and anchors
            <br />
            based on how your system responds.
          </p>

          {/* Primary CTA */}
          <Link
            href="/upgrade"
            className="inline-block px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors mb-4"
          >
            See what personalized rest feels like
          </Link>

          {/* Secondary CTA */}
          <div className="mt-4">
            <Link
              href="/interview"
              className="text-indigo-600 hover:text-indigo-700 text-sm"
            >
              Join a short feedback call (10 min)
            </Link>
          </div>
        </div>

        {/* Alternative Actions */}
        <div className="text-center space-x-4">
          <Link href="/log" className="text-indigo-600 hover:text-indigo-700 text-sm">
            View recovery log →
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/try" className="text-indigo-600 hover:text-indigo-700 text-sm">
            Try another session →
          </Link>
        </div>
      </div>
    </div>
  );
}

