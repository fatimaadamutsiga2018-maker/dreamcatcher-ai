'use client';

import Link from 'next/link';

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            What You Unlock
          </h1>
        </div>

        {/* What You Get */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8 border border-gray-100">
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <span className="text-indigo-600 text-lg">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Personalized NSDR sessions</h3>
                <p className="text-gray-600 text-sm">Based on your current state and response patterns</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <span className="text-indigo-600 text-lg">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Unlimited rest sessions</h3>
                <p className="text-gray-600 text-sm">Access whenever you need a reset</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <span className="text-indigo-600 text-lg">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Adaptive language & pacing</h3>
                <p className="text-gray-600 text-sm">The session adjusts to how your system responds in real-time</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <span className="text-indigo-600 text-lg">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Recovery trend visualization</h3>
                <p className="text-gray-600 text-sm">See how your recovery patterns change over time</p>
              </div>
            </div>
          </div>
        </div>

        {/* What This Is NOT */}
        <div className="bg-gray-50 rounded-xl p-8 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What This Is NOT</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">✗</span>
              <span>Not meditation training</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">✗</span>
              <span>Not sleep tracking</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">✗</span>
              <span>Not breathing exercises</span>
            </li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            We&apos;re currently validating what personalized rest feels like.
            <br />
            Join our early access to help shape the experience.
          </p>
          
          {/* Note: No Stripe integration yet - just validation */}
          <div className="space-y-4">
            <button
              disabled
              className="px-8 py-3 bg-gray-300 text-gray-500 font-medium rounded-lg cursor-not-allowed"
            >
              Early Access (Coming Soon)
            </button>
            <p className="text-xs text-gray-500">
              We&apos;re not ready to take payments yet.
              <br />
              This page helps us understand if you&apos;d be willing to pay for personalized NSDR.
            </p>
          </div>

          <div className="mt-8">
            <Link href="/interview" className="text-indigo-600 hover:text-indigo-700 text-sm">
              Or join a feedback call to help us build this →
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link href="/result" className="text-indigo-600 hover:text-indigo-700 text-sm">
            ← Back to results
          </Link>
        </div>
      </div>
    </div>
  );
}








