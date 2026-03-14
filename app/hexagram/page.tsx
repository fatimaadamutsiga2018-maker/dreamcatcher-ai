'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { getHexagram64Reading } from '@/lib/hexagram64';

const HEXAGRAM_DRAFT_STORAGE_KEY = 'hexagramDraft';

export default function HexagramPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [question, setQuestion] = useState('');
  const [numbers, setNumbers] = useState('');
  const [error, setError] = useState('');
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmInfo, setConfirmInfo] = useState<{ source: string; cost: string; remaining: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const savedDraft = window.sessionStorage.getItem(HEXAGRAM_DRAFT_STORAGE_KEY);
    if (!savedDraft) {
      setHasRestoredDraft(true);
      return;
    }

    try {
      const parsedDraft = JSON.parse(savedDraft) as {
        question?: string;
        numbers?: string;
      };
      setQuestion(parsedDraft.question || '');
      setNumbers(parsedDraft.numbers || '');
    } catch {
      window.sessionStorage.removeItem(HEXAGRAM_DRAFT_STORAGE_KEY);
    } finally {
      setHasRestoredDraft(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !hasRestoredDraft) {
      return;
    }

    window.sessionStorage.setItem(
      HEXAGRAM_DRAFT_STORAGE_KEY,
      JSON.stringify({
        question,
        numbers,
      })
    );
  }, [hasRestoredDraft, numbers, question]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowCreditsModal(false);
    setShowConfirmModal(false);

    if (isPending) {
      return;
    }

    if (!session) {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(
          HEXAGRAM_DRAFT_STORAGE_KEY,
          JSON.stringify({
            question,
            numbers,
          })
        );
      }
      router.push('/auth/signin?callbackUrl=/hexagram');
      return;
    }

    // Numbers are required, question is optional
    if (numbers.length !== 3 || !/^\d{3}$/.test(numbers)) {
      setError('Please enter exactly 3 digits (0-9)');
      return;
    }

    // Check user rights first, then show confirmation
    try {
      const rightsRes = await fetch('/api/user/rights');
      const rights = await rightsRes.json();

      if (!rights.canRead) {
        setShowCreditsModal(true);
        return;
      }

      // Build confirmation info based on source
      if (rights.readingSource === 'membership') {
        setConfirmInfo({
          source: 'membership',
          cost: 'Included in your membership',
          remaining: 'Unlimited',
        });
      } else if (rights.readingSource === 'bonus_points') {
        setConfirmInfo({
          source: 'bonus_points',
          cost: '5 Bonus Points',
          remaining: `${rights.bonusPoints - 5} Bonus Points after this reading`,
        });
      } else {
        setConfirmInfo({
          source: 'purchased_credits',
          cost: '1 Reading Credit',
          remaining: `${rights.purchasedCredits - 1} Reading Credits after this reading`,
        });
      }
      setShowConfirmModal(true);
    } catch {
      setError('Failed to check credits. Please try again.');
    }
  };

  const handleConfirmReading = async () => {
    setShowConfirmModal(false);
    setError('');
    setSubmitting(true);

    // Consume the reading credit
    try {
      const res = await fetch('/api/user/consume-reading', { method: 'POST' });
      const data = await res.json();
      if (!data.consumed) {
        setShowCreditsModal(true);
        setSubmitting(false);
        return;
      }
    } catch {
      setError('Failed to process credits. Please try again.');
      setSubmitting(false);
      return;
    }

    // Use question if provided, otherwise use a default message
    const finalQuestion = question.trim() || 'General guidance';
    const reading = getHexagram64Reading(finalQuestion, numbers);
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(HEXAGRAM_DRAFT_STORAGE_KEY);
    }
    localStorage.setItem('hexagramReading', JSON.stringify(reading));
    setSubmitting(false);
    router.push('/hexagram/reading');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Seek Guidance
          </h1>
          <p className="text-lg text-gray-600">
            Ancient wisdom for modern decisions
          </p>
        </div>

        {/* Input Form - Moved to Top */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {/* Question Input - First */}
          <div className="mb-8">
            <label htmlFor="question" className="block text-base font-medium text-gray-700 mb-3">
              Your Question <span className="text-gray-400 font-normal">(Optional - Ask ONE question only)</span>
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={`e.g. Should I start this project now?\n\ne.g. Is this the right time to make this change?\n\ne.g. Will this approach work?`}
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none resize-none text-lg"
              rows={5}
            />
          </div>

          {/* Number Input - Second, but prominent */}
          <div className="mb-8 text-center">
            <label htmlFor="numbers" className="block text-base font-medium text-gray-700 mb-4">
              Choose Three Numbers (0-9) <span className="text-red-500">*</span>
            </label>
            <input
              id="numbers"
              type="text"
              value={numbers}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                setNumbers(value);
              }}
              placeholder="_ _ _"
              className="w-full max-w-md mx-auto px-8 py-8 border-2 border-emerald-300 rounded-2xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none text-5xl text-center tracking-[2rem] font-mono font-bold text-emerald-600 bg-emerald-50"
              maxLength={3}
            />
            <p className="text-sm text-gray-500 mt-3">
              Trust your first instinct
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending || submitting}
            className="w-full py-4 bg-emerald-600 text-white rounded-full font-medium text-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
          >
            {isPending ? 'Checking account...' : submitting ? 'Processing...' : 'Receive Guidance'}
          </button>
        </form>

        {/* Collapsible Guidelines */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <button
            onClick={() => setShowGuidelines(!showGuidelines)}
            className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <span className="text-lg font-semibold text-gray-900">
                How to ask better questions
              </span>
            </div>
            <svg
              className={`w-6 h-6 text-gray-400 transition-transform ${showGuidelines ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showGuidelines && (
            <div className="px-8 pb-8 pt-4 border-t border-gray-100">
              <p className="text-gray-700 mb-6">
                This tool assesses the likelihood of success for a specific action or decision you're considering.
                It provides guidance based on probability, not certainty.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-base font-semibold text-emerald-700 mb-3">✓ Good Questions</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>"Should I start this project now?"</li>
                    <li>"Is this the right time to make this change?"</li>
                    <li>"Will this approach work?"</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-red-700 mb-3">✗ Avoid Asking</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>"When will X happen?" (timing predictions)</li>
                    <li>"What should I do?" (open-ended)</li>
                    <li>"Will X person do Y?" (predicting others)</li>
                    <li>"Will I win the lottery?" (random events)</li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Guidelines:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Only consult when facing uncertainty</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Trust your first instinct for numbers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Ask once per question</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Guidance for reflection and inspiration, not for financial, medical, legal, or gambling decisions.
          </p>
          <p className="mt-1">
            You are the final decision-maker.
          </p>
        </div>
      </div>

      {/* Confirm Credits Modal */}
      {showConfirmModal && confirmInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 space-y-5 shadow-2xl">
            <div className="text-center">
              <div className="text-4xl mb-3">&#x2728;</div>
              <h2 className="text-xl font-bold text-slate-900">Confirm Reading</h2>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Cost</span>
                <span className="font-medium text-slate-900">{confirmInfo.cost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">After this reading</span>
                <span className="font-medium text-slate-900">{confirmInfo.remaining}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleConfirmReading}
                className="py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition"
              >
                Confirm &amp; Receive Guidance
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="py-3 border border-slate-300 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Credits Modal */}
      {showCreditsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 space-y-5 shadow-2xl">
            <div className="text-center">
              <div className="text-4xl mb-3">&#x1F512;</div>
              <h2 className="text-xl font-bold text-slate-900">Credits Needed</h2>
              <p className="text-slate-600 mt-2">
                You don&apos;t have enough credits for a reading. Get credits or upgrade to unlimited membership.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/pricing"
                className="block text-center py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition"
              >
                View Plans &amp; Pricing
              </Link>
              <button
                onClick={() => setShowCreditsModal(false)}
                className="py-3 border border-slate-300 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
