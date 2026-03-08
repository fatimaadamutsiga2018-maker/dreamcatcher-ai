'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { assessmentQuestions, calculateAssessmentResult } from '@/lib/assessment';

export default function AssessmentPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const question = assessmentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;

  const handleScoreSelect = (score: number) => {
    setSelectedScore(score);
  };

  const handleNext = () => {
    if (selectedScore === null) return;

    const newAnswers = { ...answers, [question.id]: selectedScore };
    setAnswers(newAnswers);

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedScore(null);
    } else {
      // Calculate result and navigate to results page
      const result = calculateAssessmentResult(newAnswers);
      localStorage.setItem('assessmentResult', JSON.stringify(result));
      router.push('/assessment/results');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedScore(answers[assessmentQuestions[currentQuestion - 1].id] || null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {assessmentQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-amber-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="mb-6">
            <div className="text-sm text-amber-600 font-medium mb-2">
              {question.dimension.replace('_', ' ').toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {question.question}
            </h2>
            <p className="text-gray-600">
              {question.description}
            </p>
          </div>

          {/* Score Selection */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Low</span>
              <span>High</span>
            </div>
            <div className="grid grid-cols-10 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                <button
                  key={score}
                  onClick={() => handleScoreSelect(score)}
                  className={`
                    aspect-square rounded-lg border-2 font-semibold transition-all
                    ${selectedScore === score
                      ? 'border-amber-600 bg-amber-600 text-white scale-110'
                      : 'border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                    }
                  `}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="px-6 py-3 border-2 border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={selectedScore === null}
            className="px-8 py-3 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {currentQuestion === assessmentQuestions.length - 1 ? 'See Results' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
