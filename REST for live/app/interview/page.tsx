'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InterviewPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Integrate Calendly or other scheduling system
      // For now, save to localStorage or send to API
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          beforeFatigue: 0,
          afterFatigue: 0,
          beforeFocus: 0,
          afterFocus: 0,
          willingToPay: '',
          willingToInterview: true,
          comments: 'Requested interview call',
        }),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            We&apos;re not selling you anything.
            <br />
            <span className="font-normal">We want to understand what actually helps.</span>
          </h1>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8 border border-gray-100">
          <p className="text-lg text-gray-700 mb-8 text-center">
            This helps us decide what to build next.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  placeholder="your@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Book a 10-minute call'}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg text-gray-700 mb-2">Thank you!</p>
              <p className="text-gray-600 mb-6">
                We&apos;ll send you a calendar link shortly to schedule your 10-minute call.
              </p>
              <p className="text-sm text-gray-500">
                Check your email ({email}) for the scheduling link.
              </p>
            </div>
          )}
        </div>

        {/* Note */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            <strong>What to expect:</strong> We&apos;ll ask about your experience,
            what worked, what didn&apos;t, and what you&apos;d want from a
            personalized NSDR service. No sales pitch. Just understanding.
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/result" className="text-indigo-600 hover:text-indigo-700 text-sm">
            ← Back to results
          </Link>
        </div>
      </div>
    </div>
  );
}

