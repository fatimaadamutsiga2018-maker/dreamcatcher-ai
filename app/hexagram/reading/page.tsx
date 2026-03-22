'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import { Hexagram } from '@/lib/hexagram64';
import { getNumberEnergyLevel } from '@/lib/content-config';
import { cn } from '@/lib/utils';

export default function ReadingPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // All hooks must be before any conditional return
  const [reading, setReading] = useState<Hexagram & {
    question?: string;
    inputNumbers?: string;
    movingLine?: number;
    upperTrigram?: { name: string; symbol: string; unicode: string };
    lowerTrigram?: { name: string; symbol: string; unicode: string };
  } | null>(null);

  // Deeper Insight state
  const [conversation, setConversation] = useState<{ role: string; content: string }[]>([]);
  const [previewText, setPreviewText] = useState('');
  const [insightUnlocked, setInsightUnlocked] = useState(false);
  const [insightStarted, setInsightStarted] = useState(false);
  const [roundsUsed, setRoundsUsed] = useState(0);
  const [inputText, setInputText] = useState('');
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [loadingUnlock, setLoadingUnlock] = useState(false);
  const [insightError, setInsightError] = useState<string | null>(null);

  const roundsRemaining = Math.max(0, 3 - roundsUsed);
  const canAsk = insightUnlocked && insightStarted && roundsUsed < 3;

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      router.replace('/auth/signin?callbackUrl=/hexagram');
    }
  }, [isPending, router, session]);

  // Load reading from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('hexagramReading');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data && data.action_1 && data.result_level) {
          setReading(data);
        } else {
          localStorage.removeItem('hexagramReading');
          router.push('/hexagram');
        }
      } catch {
        localStorage.removeItem('hexagramReading');
        router.push('/hexagram');
      }
    } else {
      router.push('/hexagram');
    }
  }, [router]);

  // Show loading state while checking authentication
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  // Helper functions
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

  if (!reading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const levelConfig = {
    5: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', progress: 'bg-emerald-500', width: 'w-[95%]' },
    4: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', progress: 'bg-yellow-500', width: 'w-[75%]' },
    3: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', progress: 'bg-orange-500', width: 'w-[55%]' },
    2: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', progress: 'bg-red-500', width: 'w-[35%]' },
    1: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-300', progress: 'bg-gray-500', width: 'w-[15%]' },
  };
  const config = levelConfig[reading.result_level as keyof typeof levelConfig] || levelConfig[1];

  const detectLanguage = () => /[\u4e00-\u9fff]/.test(reading.question || '') ? 'zh' : 'en';

  const buildReadingPayload = () => ({
    reading: {
      question: reading.question || 'General guidance',
      result_label: reading.result_label,
      situation: reading.situation,
      action_1: reading.action_1,
      action_2: reading.action_2,
      action_3: reading.action_3,
      insight: getExpandedInsight(reading.situation, reading.result_level, reading.movingLine),
      hexagram_number: reading.sequence_number,
      hexagram_name_cn: reading.name_cn,
      hexagram_name_en: reading.name_en,
      upper_trigram: reading.upperTrigram?.name || reading.upper_trigram || '',
      lower_trigram: reading.lowerTrigram?.name || reading.lower_trigram || '',
      moving_line: reading.movingLine,
    },
    messages: [] as { role: string; content: string }[],
    language: detectLanguage(),
  });

  // Step 1: Get AI preview (free, no charge)
  const handleGetPreview = async () => {
    if (loadingInsight) return;
    setInsightError(null);
    setLoadingInsight(true);
    try {
      const payload = buildReadingPayload();
      const response = await fetch('/api/reading/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.error ?? 'Request failed');
      }
      const data = await response.json();
      setPreviewText(data.message);
      setInsightStarted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to fetch insight';
      setInsightError(message);
    } finally {
      setLoadingInsight(false);
    }
  };

  // Step 2: Unlock full insight (charges credits)
  const handleUnlock = async () => {
    if (loadingUnlock) return;
    setInsightError(null);
    setLoadingUnlock(true);
    try {
      const response = await fetch('/api/reading/unlock-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reading: {
            question: reading.question,
            hexagram_number: reading.sequence_number,
            hexagram_name_en: reading.name_en,
            hexagram_name_cn: reading.name_cn,
          },
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        if (response.status === 401) {
          router.push('/auth/signin?callbackUrl=/hexagram/reading');
          return;
        }
        if (response.status === 402) {
          setInsightError('Not enough credits. 2 Reading Credits = 1 Deeper Insight.');
          return;
        }
        throw new Error(error?.error ?? 'Unlock failed');
      }
      setInsightUnlocked(true);
      setConversation([{ role: 'assistant', content: previewText }]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to unlock insight';
      setInsightError(message);
    } finally {
      setLoadingUnlock(false);
    }
  };

  // Step 3: Follow-up questions (no additional charge)
  const handleAskQuestion = async () => {
    if (!inputText.trim() || !canAsk || loadingInsight) return;
    setInsightError(null);
    setLoadingInsight(true);
    try {
      const payload = buildReadingPayload();
      const updatedMessages = [...conversation, { role: 'user', content: inputText.trim() }];
      payload.messages = updatedMessages;

      const response = await fetch('/api/reading/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.error ?? 'Request failed');
      }
      const data = await response.json();
      setRoundsUsed((prev) => Math.min(3, prev + 1));
      setConversation((prev) => [
        ...prev,
        { role: 'user', content: inputText.trim() },
        { role: 'assistant', content: data.message },
      ]);
      setInputText('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to fetch response';
      setInsightError(message);
    } finally {
      setLoadingInsight(false);
    }
  };

  // Get preview text for blur overlay (first ~80 chars)
  const getPreviewSnippet = () => {
    if (!previewText) return '';
    return previewText.slice(0, 80) + (previewText.length > 80 ? '...' : '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Disclaimer */}
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
              &ldquo;{reading.question}&rdquo;
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

        {/* Favorability Assessment */}
        <div className={`${config.bg} border-2 ${config.border} rounded-2xl p-8 mb-6`}>
          <div className="text-center mb-6">
            <div className="text-sm font-medium text-gray-500 mb-2">Favorability Assessment</div>
            <div className={`text-3xl font-bold ${config.text} mb-4`}>
              {reading.result_label}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div className={`${config.progress} h-full ${config.width} transition-all duration-1000 ease-out`}></div>
            </div>
          </div>
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

        {/* Deeper Insight Section */}
        <div className="mt-12 mb-8">

          {/* State 1: Not started — show button */}
          {!insightStarted && (
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Deeper Insight</h2>
              <button
                onClick={handleGetPreview}
                disabled={loadingInsight}
                className="px-6 py-2.5 bg-slate-800 text-white rounded-full text-sm font-medium hover:bg-slate-900 transition-colors disabled:opacity-50"
              >
                {loadingInsight ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Thinking...
                  </span>
                ) : 'Get Deeper Insight'}
              </button>
              <span className="text-sm text-gray-500">3 follow-up questions included</span>
            </div>
          )}

          {/* State 2: Preview loaded, not unlocked — show blur overlay */}
          {insightStarted && !insightUnlocked && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Deeper Insight</h2>
              </div>

              <div className="relative rounded-2xl border border-gray-200 bg-white overflow-hidden" style={{ minHeight: '200px' }}>
                {/* Visible preview text — first ~80 chars clearly visible */}
                <div className="p-5 text-sm text-gray-800 leading-relaxed">
                  {getPreviewSnippet()}
                </div>

                {/* Strong blur overlay */}
                <div
                  className="absolute inset-0 top-12 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.98) 60%, rgba(255,255,255,1) 100%)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="text-center p-8">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-medium text-sm mb-1">
                      Full interpretation + 3 follow-up questions
                    </p>
                    <p className="text-gray-400 text-xs mb-4">
                      Members use included Deeper Insights first
                    </p>
                    <button
                      onClick={handleUnlock}
                      disabled={loadingUnlock}
                      className="px-8 py-3 bg-emerald-600 text-white rounded-full text-sm font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow-md"
                    >
                      {loadingUnlock ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                          Unlocking...
                        </span>
                      ) : 'Unlock (2 Reading Credits)'}
                    </button>
                  </div>
                </div>
              </div>

              {insightError && (
                <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
                  {insightError}
                  {insightError.includes('credits') && (
                    <Link href="/pricing" className="ml-2 text-emerald-600 underline">Get credits</Link>
                  )}
                </div>
              )}
            </div>
          )}

          {/* State 3: Unlocked — full conversation */}
          {insightUnlocked && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Deeper Insight</h2>
                <span className="text-sm text-gray-500">
                  {roundsRemaining > 0 ? `${roundsRemaining} question${roundsRemaining > 1 ? 's' : ''} remaining` : 'Reading complete'}
                </span>
              </div>

              <div className="space-y-4">
                {conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      'rounded-2xl p-5 text-sm leading-relaxed',
                      msg.role === 'assistant'
                        ? 'bg-gray-50 border border-gray-200 text-gray-800'
                        : 'bg-emerald-50 border border-emerald-200 text-gray-800'
                    )}
                  >
                    {msg.content}
                  </div>
                ))}

                {loadingInsight && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 py-2">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                    Thinking...
                  </div>
                )}

                {insightError && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">{insightError}</div>
                )}

                {canAsk && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-400 text-right mb-1.5">
                      {roundsRemaining} {roundsRemaining === 1 ? 'question' : 'questions'} left
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAskQuestion(); } }}
                        disabled={loadingInsight}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                        placeholder="Ask a follow-up question..."
                      />
                      <button
                        onClick={handleAskQuestion}
                        disabled={loadingInsight || !inputText.trim()}
                        className="px-5 py-3 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 whitespace-nowrap"
                      >
                        {loadingInsight ? 'Thinking...' : 'Send'}
                      </button>
                    </div>
                  </div>
                )}

                {!canAsk && roundsUsed >= 3 && (
                  <div className="text-center py-4 text-sm text-gray-500">
                    You&apos;ve explored this reading fully. Save your thoughts or start a new reading.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
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
