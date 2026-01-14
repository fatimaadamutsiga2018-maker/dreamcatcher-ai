'use client';

import Link from 'next/link';

export default function AboutNSDRPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            What is NSDR?
          </h1>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8 border border-gray-100 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              NSDR ≠ Meditation
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Meditation requires focus, control, and practice. NSDR doesn&apos;t.
              You don&apos;t need to clear your mind or follow instructions.
              You just need to let your nervous system go offline.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              NSDR ≠ Sleep
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You don&apos;t need to fall asleep. In fact, you can stay aware
              while your body enters a deep rest state. It&apos;s like putting
              your system on standby mode.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              It&apos;s a &quot;Nervous System Offline Mode&quot;
            </h2>
            <p className="text-gray-600 leading-relaxed">
              When you&apos;re mentally exhausted but can&apos;t stop thinking,
              your nervous system is stuck in &quot;on&quot; mode. NSDR helps it
              switch to &quot;offline&quot; mode—a state of deep rest that&apos;s
              more restorative than sleep in some ways.
            </p>
          </div>

          <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
            <p className="text-gray-700 leading-relaxed">
              <strong>Research shows:</strong> 10 minutes of NSDR can be more
              effective than an hour of sleep for mental recovery. It&apos;s not
              about doing something—it&apos;s about allowing your system to reset.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <p className="text-lg text-gray-700 mb-6">
            Reading about it won&apos;t help you understand it.
          </p>
          <Link
            href="/try"
            className="inline-block px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try a session instead of reading more
          </Link>
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








