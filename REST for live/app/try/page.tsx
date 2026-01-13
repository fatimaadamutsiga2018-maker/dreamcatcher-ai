'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TryPage() {
  const router = useRouter();
  const [currentState, setCurrentState] = useState<string>('');
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    // Save current state to sessionStorage (optional)
    if (currentState) {
      sessionStorage.setItem('userState', currentState);
    }
    // Navigate to session page
    router.push('/session');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
          You don&apos;t need to relax.
          <br />
          <span className="font-normal">You just need a place to stop.</span>
        </h1>

        {/* Subtext */}
        <p className="text-xl text-gray-600 mb-12 max-w-lg mx-auto">
          This is a 10–15 minute guided rest.
          <br />
          No breathing control. No meditation. No effort.
        </p>

        {/* Optional Input */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
          <p className="text-sm text-gray-500 mb-4">Current state (optional)</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { id: 'tense', label: 'Body feels tense' },
              { id: 'mind', label: 'Mind won\'t slow down' },
              { id: 'drained', label: 'Emotionally drained' },
              { id: 'curious', label: 'Just curious' },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setCurrentState(option.id)}
                className={`px-4 py-3 rounded-lg border-2 transition-all text-sm ${
                  currentState === option.id
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400">
            Free version: for record only. Premium: personalizes your session.
          </p>
        </div>

        {/* Primary CTA */}
        <button
          onClick={handleStart}
          disabled={isStarting}
          className="px-12 py-4 bg-indigo-600 text-white text-lg font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {isStarting ? 'Starting...' : 'Start Free NSDR Rest'}
        </button>

        {/* Secondary Note */}
        <p className="text-sm text-gray-500">
          You can stop anytime. Nothing to do right or wrong.
        </p>

        {/* Back Link */}
        <div className="mt-12">
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

