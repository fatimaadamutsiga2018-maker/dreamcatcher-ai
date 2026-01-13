'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Privacy & Disclaimer
          </h1>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8 border border-gray-100 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy Policy</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong>Data Collection:</strong> We collect minimal information necessary
                to provide the NSDR service. This includes your email address (for sending
                sessions) and optional feedback data (for improving the service).
              </p>
              <p>
                <strong>Data Usage:</strong> Your data is used solely to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Send you personalized NSDR sessions</li>
                <li>Improve our service based on feedback</li>
                <li>Contact you for research interviews (with your consent)</li>
              </ul>
              <p>
                <strong>Data Storage:</strong> Your data is stored securely and is not
                shared with third parties except as necessary to provide the service
                (e.g., email delivery, audio generation).
              </p>
              <p>
                <strong>Your Rights:</strong> You can request access to, correction of, or
                deletion of your data at any time by contacting us.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong>Not Medical Advice:</strong> NSDR (Non-Sleep Deep Rest) is not
                intended to diagnose, treat, cure, or prevent any medical condition. This
                service is for general wellness and relaxation purposes only.
              </p>
              <p>
                <strong>Not a Substitute:</strong> NSDR is not a substitute for
                professional medical care, mental health treatment, or sleep therapy. If
                you have concerns about your health, please consult a qualified healthcare
                provider.
              </p>
              <p>
                <strong>Individual Results:</strong> Results may vary. Some users may
                experience immediate benefits, while others may need multiple sessions.
                We make no guarantees about specific outcomes.
              </p>
              <p>
                <strong>Use at Your Own Risk:</strong> You are responsible for your own
                well-being. If you experience any discomfort or adverse effects, stop
                using the service and consult a healthcare provider.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-600">
              If you have questions about this privacy policy or disclaimer, please
              contact us through the feedback form or interview scheduling page.
            </p>
          </section>

          <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}








