'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    email: '',
    beforeFatigue: '5',
    afterFatigue: '5',
    beforeFocus: '5',
    afterFocus: '5',
    willingToPay: '',
    willingToInterview: false,
    comments: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          email: '',
          beforeFatigue: '5',
          afterFatigue: '5',
          beforeFocus: '5',
          afterFocus: '5',
          willingToPay: '',
          willingToInterview: false,
          comments: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fatigueImprovement = parseInt(formData.afterFatigue) - parseInt(formData.beforeFatigue);
  const focusImprovement = parseInt(formData.afterFocus) - parseInt(formData.beforeFocus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link href="/" className="text-indigo-600 hover:text-indigo-700 mb-8 inline-block">
          ← Back to home
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            NSDR Experience Feedback
          </h1>
          <p className="text-gray-600 mb-8">
            Your feedback is very important to us and helps us improve the AI Rest service.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                placeholder="your@email.com"
              />
            </div>

            {/* Before Fatigue */}
            <div>
              <label htmlFor="beforeFatigue" className="block text-sm font-medium text-gray-700 mb-2">
                How mentally tired did you feel before the session? (1-10, 10 = extremely tired) <span className="text-red-500">*</span>
              </label>
              <input
                type="range"
                id="beforeFatigue"
                name="beforeFatigue"
                min="1"
                max="10"
                value={formData.beforeFatigue}
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 - Not tired</span>
                <span className="text-gray-900 font-semibold">{formData.beforeFatigue}</span>
                <span>10 - Extremely tired</span>
              </div>
            </div>

            {/* After Fatigue */}
            <div>
              <label htmlFor="afterFatigue" className="block text-sm font-medium text-gray-700 mb-2">
                How mentally tired do you feel after the session? (1-10) <span className="text-red-500">*</span>
              </label>
              <input
                type="range"
                id="afterFatigue"
                name="afterFatigue"
                min="1"
                max="10"
                value={formData.afterFatigue}
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 - Not tired</span>
                <span className="text-gray-900 font-semibold">{formData.afterFatigue}</span>
                <span>10 - Extremely tired</span>
              </div>
              {fatigueImprovement < 0 && (
                <p className="text-green-600 text-sm mt-2">
                  ✓ Fatigue decreased by <strong>{Math.abs(fatigueImprovement)}</strong> points
                </p>
              )}
            </div>

            {/* Before Focus */}
            <div>
              <label htmlFor="beforeFocus" className="block text-sm font-medium text-gray-700 mb-2">
                How focused did you feel before the session? (1-10, 10 = extremely focused) <span className="text-red-500">*</span>
              </label>
              <input
                type="range"
                id="beforeFocus"
                name="beforeFocus"
                min="1"
                max="10"
                value={formData.beforeFocus}
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 - Not focused</span>
                <span className="text-gray-900 font-semibold">{formData.beforeFocus}</span>
                <span>10 - Extremely focused</span>
              </div>
            </div>

            {/* After Focus */}
            <div>
              <label htmlFor="afterFocus" className="block text-sm font-medium text-gray-700 mb-2">
                How focused do you feel after the session? (1-10) <span className="text-red-500">*</span>
              </label>
              <input
                type="range"
                id="afterFocus"
                name="afterFocus"
                min="1"
                max="10"
                value={formData.afterFocus}
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 - Not focused</span>
                <span className="text-gray-900 font-semibold">{formData.afterFocus}</span>
                <span>10 - Extremely focused</span>
              </div>
              {focusImprovement > 0 && (
                <p className="text-green-600 text-sm mt-2">
                  ✓ Focus increased by <strong>{focusImprovement}</strong> points
                </p>
              )}
            </div>

            {/* Willing to Pay */}
            <div>
              <label htmlFor="willingToPay" className="block text-sm font-medium text-gray-700 mb-2">
                Would you be willing to pay for personalized NSDR service? <span className="text-red-500">*</span>
              </label>
              <select
                id="willingToPay"
                name="willingToPay"
                value={formData.willingToPay}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
              >
                <option value="">Please select</option>
                <option value="yes">Yes, I would</option>
                <option value="maybe">Maybe, depends on price</option>
                <option value="no">No, I would not</option>
              </select>
            </div>

            {/* Willing to Interview */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="willingToInterview"
                name="willingToInterview"
                checked={formData.willingToInterview}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="willingToInterview" className="ml-2 block text-sm text-gray-700">
                I&apos;m willing to schedule a deep interview (to help us better understand your needs)
              </label>
            </div>

            {/* Comments */}
            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                Other feedback or suggestions
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                placeholder="Please share your experience, suggestions, or any thoughts..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>

            {/* Submit Status */}
            {submitStatus === 'success' && (
              <div className="text-green-600 text-center font-medium">
                ✓ Feedback submitted successfully! Thank you for your participation.{formData.willingToInterview && ' We will contact you soon to schedule an interview.'}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="text-red-600 text-center font-medium">
                ✗ Submission failed, please try again later.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
