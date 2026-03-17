'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { selectQuestions, calculateResult, AssessmentQuestion } from '@/lib/assessment';
import { useSession } from '@/lib/auth-client';
import { buildAssessmentResultSummary } from '@/lib/reading-history';

export default function AssessmentPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    setQuestions(selectQuestions());
  }, []);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
        <p className="text-gray-500">Preparing your reflection...</p>
      </div>
    );
  }

  const question = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleSelect = (score: number) => setSelected(score);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setAnalyzing(true);
      setTimeout(() => {
        const result = calculateResult(newAnswers);
        localStorage.setItem('assessmentResult', JSON.stringify(result));
        if (session) {
          void fetch('/api/user/consume-reading', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
            body: JSON.stringify({
              readingType: 'assessment',
              question: 'Personal energy snapshot',
              resultSummary: buildAssessmentResultSummary(result),
            }),
          });
        }
        router.push('/assessment/results');
      }, 2000);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(answers[questions[current - 1].id] ?? null);
    }
  };

  if (analyzing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-white">
        <div className="w-12 h-12 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin mb-6" />
        <p className="text-lg text-gray-700 font-medium">Analyzing your internal weather...</p>
        <p className="text-sm text-gray-500 mt-2">Building your energy profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{current + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{question.title}</h2>
          <p className="text-sm text-gray-500">Choose the option that feels closest to your current state.</p>
        </div>

        {/* Scenario Cards */}
        <div className="space-y-3 mb-8">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt.score)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                selected === opt.score
                  ? 'border-amber-500 bg-amber-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  selected === opt.score
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {optionLetters[i]}
                </span>
                <span className={`text-sm leading-relaxed ${
                  selected === opt.score ? 'text-gray-900 font-medium' : 'text-gray-700'
                }`}>
                  {opt.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={current === 0}
            className="px-6 py-3 border-2 border-gray-300 rounded-full text-gray-600 font-medium hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="px-8 py-3 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {current === questions.length - 1 ? 'See My Archetype' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
