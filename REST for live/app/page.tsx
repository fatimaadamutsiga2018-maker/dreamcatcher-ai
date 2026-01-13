'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            For the mentally exhausted who can&apos;t stop thinking,
            <span className="text-indigo-600 block mt-2">
              AI-guided NSDR sessions deliver a proven reset
            </span>
            <span className="text-gray-700 block mt-2 text-3xl md:text-4xl">
              in under 12 minutes — no skill, no practice, just rest.
            </span>
          </h1>

          {/* Value Proposition */}
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            AI Rest is the world&apos;s first on-demand NSDR (Non-Sleep Deep Rest) recovery engine. 
            Experience personalized guided recovery sessions that help you slow down your mind and relax your body.
          </p>

          {/* Demo Audio Section */}
          <div className="mb-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              🎧 30-Second AI Voice Demo
            </h2>
            <p className="text-gray-600 mb-6">
              Experience an AI-guided NSDR session (fixed script demo)
            </p>
            <audio 
              controls 
              className="w-full max-w-md mx-auto"
              preload="metadata"
            >
              <source src="/demo-audio.mp3" type="audio/mpeg" />
              <source src="/demo-audio.ogg" type="audio/ogg" />
              Your browser does not support audio playback.
            </audio>
            <p className="text-sm text-gray-500 mt-4">
              * This is a fixed script demo. After registration, you&apos;ll receive personalized AI-guided sessions.
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Free 15-Minute NSDR Reset
            </h2>
            <p className="text-gray-600 mb-8">
              No skills required, no practice needed. In just 12 minutes, let your mind slow down and your body relax.
            </p>

            <div className="text-center">
              <Link
                href="/try"
                className="inline-block px-12 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors text-lg"
              >
                Start Free Experience
              </Link>
              <p className="text-xs text-gray-500 mt-4">
                No registration required. Start immediately. You can stop anytime.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">🧘</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Skills Required</h3>
              <p className="text-gray-600">
                No meditation or relaxation techniques needed. Just follow the AI guidance.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">12 Minutes Effective</h3>
              <p className="text-gray-600">
                More effective than an hour of sleep for deep recovery. Quickly reset your mental state.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Personalization</h3>
              <p className="text-gray-600">
                AI generates personalized NSDR guidance scripts based on your state and needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center text-gray-600">
          <p className="mb-4">
            AI Rest — The World&apos;s First On-demand NSDR Recovery Engine
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/try" className="hover:text-indigo-600 transition-colors">
              Try Free
            </Link>
            <Link href="/about-nsdr" className="hover:text-indigo-600 transition-colors">
              About NSDR
            </Link>
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
