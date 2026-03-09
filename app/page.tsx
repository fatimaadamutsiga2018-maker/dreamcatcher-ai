'use client';

import Link from "next/link";
import { ArrowRight, Calendar, Star, Radar as RadarIcon, GitBranch, Signpost, Compass } from "lucide-react";
import { getTodayEnergy } from "@/lib/daily-energy";
import { useEffect, useState } from "react";

export default function Home() {
  const [todayEnergy, setTodayEnergy] = useState<ReturnType<typeof getTodayEnergy> | null>(null);

  useEffect(() => {
    // Get today's energy data on client side
    setTodayEnergy(getTodayEnergy());
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-emerald-50/30 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      {/* Hero Section - Simplified */}
      <main className="relative z-10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Brand */}
            <div className="space-y-3">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900">
                ClarityPath
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-700">
                Right Time, Right Choice
              </h2>
            </div>

          </div>
        </div>

        {/* Feature Cards Section - 1/6 + 1/3 + 1/6 Layout */}
        <div className="container mx-auto px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Grid Layout: 1fr + 2fr + 1fr (对称布局) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

              {/* Left Card - Personal Energy */}
              <Link href="/assessment" className="lg:col-span-1 group relative block">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>

                <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl border-2 border-emerald-100 hover:border-emerald-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 h-full flex flex-col cursor-pointer">
                  <div className="space-y-4 flex-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <RadarIcon className="w-7 h-7 text-white" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Personal Energy</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-2">
                        1-minute know your current state
                      </p>
                      <p className="text-xs text-emerald-600 font-medium">
                        12 questions to understand yourself
                      </p>
                    </div>

                    {/* Mini 4D Preview */}
                    <div className="bg-emerald-50/50 rounded-lg p-3">
                      <div className="relative w-full aspect-square max-w-[140px] mx-auto">
                        {/* Simple diamond shape representing 4 dimensions */}
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          {/* Grid lines */}
                          <line x1="50" y1="10" x2="50" y2="90" stroke="#d1d5db" strokeWidth="0.5" />
                          <line x1="10" y1="50" x2="90" y2="50" stroke="#d1d5db" strokeWidth="0.5" />
                          <line x1="50" y1="10" x2="90" y2="50" stroke="#d1d5db" strokeWidth="0.5" />
                          <line x1="90" y1="50" x2="50" y2="90" stroke="#d1d5db" strokeWidth="0.5" />
                          <line x1="50" y1="90" x2="10" y2="50" stroke="#d1d5db" strokeWidth="0.5" />
                          <line x1="10" y1="50" x2="50" y2="10" stroke="#d1d5db" strokeWidth="0.5" />

                          {/* Example filled area */}
                          <polygon
                            points="50,20 75,50 50,75 25,50"
                            fill="#10b981"
                            fillOpacity="0.3"
                            stroke="#10b981"
                            strokeWidth="2"
                          />

                          {/* Dimension labels */}
                          <text x="50" y="8" textAnchor="middle" fontSize="6" fill="#6b7280">Mental</text>
                          <text x="92" y="52" textAnchor="start" fontSize="6" fill="#6b7280">Physical</text>
                          <text x="50" y="98" textAnchor="middle" fontSize="6" fill="#6b7280">Harmony</text>
                          <text x="8" y="52" textAnchor="end" fontSize="6" fill="#6b7280">Growth</text>
                        </svg>
                      </div>
                      <p className="text-xs text-center text-slate-500 mt-2">4 Dimensions Analysis</p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors mt-4">
                    <span>Start</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Center Card - Decision Guidance */}
              <Link href="/hexagram" className="lg:col-span-2 group relative block">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition duration-500 animate-pulse-slow"></div>

                <div className="relative bg-white/90 backdrop-blur-xl p-10 rounded-3xl border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1 h-full flex flex-col cursor-pointer">
                  <div className="space-y-6 flex-1">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <GitBranch className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-2">Decision Guidance</h3>
                      <p className="text-lg text-slate-600">Should I do this? Is now the right time?</p>
                    </div>

                    {/* Simple Steps */}
                    <div className="bg-emerald-50/50 rounded-xl p-6 space-y-3">
                      <div className="text-center space-y-2">
                        <p className="text-2xl font-bold text-emerald-600">Input 3 numbers</p>
                        <p className="text-sm text-slate-600">Get favorability assessment</p>
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-2">
                        <div className="w-12 h-12 bg-white border-2 border-emerald-200 rounded-lg flex items-center justify-center text-xl font-bold text-slate-400">
                          ?
                        </div>
                        <div className="w-12 h-12 bg-white border-2 border-emerald-200 rounded-lg flex items-center justify-center text-xl font-bold text-slate-400">
                          ?
                        </div>
                        <div className="w-12 h-12 bg-white border-2 border-emerald-200 rounded-lg flex items-center justify-center text-xl font-bold text-slate-400">
                          ?
                        </div>
                        <ArrowRight className="w-5 h-5 text-emerald-500 mx-2" />
                        <div className="px-4 py-2 bg-emerald-100 rounded-lg">
                          <span className="text-sm font-semibold text-emerald-700">Guidance</span>
                        </div>
                      </div>
                    </div>

                    {/* Example */}
                    <div className="border-l-4 border-emerald-400 pl-4 py-2 bg-slate-50 rounded-r-lg">
                      <p className="text-sm text-slate-600 italic">
                        "Should I start this business now?"
                      </p>
                      <p className="text-sm font-semibold text-emerald-600 mt-1">
                        → Favorable: Conditions support your direction
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 text-emerald-600 font-bold group-hover:text-emerald-700 transition-colors text-lg mt-6">
                    <span>Ask Your Question</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Right Card - Daily Energy */}
              <Link href="/almanac" className="lg:col-span-1 group relative block">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>

                <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl border-2 border-emerald-100 hover:border-emerald-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 h-full flex flex-col cursor-pointer">
                  <div className="space-y-4 flex-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Calendar className="w-7 h-7 text-white" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Daily Energy</h3>
                      {todayEnergy ? (
                        <>
                          <p className="text-sm font-semibold text-emerald-600 mb-2">
                            {todayEnergy.theme.title}
                          </p>
                          <p className="text-xs text-slate-600 mb-3">
                            {todayEnergy.theme.subtitle}
                          </p>
                          <div className="text-xs space-y-1">
                            <p className="text-slate-500 font-medium">Best for today:</p>
                            <ul className="text-slate-600 space-y-0.5">
                              {todayEnergy.activities.suitable.slice(0, 2).map((act, idx) => (
                                <li key={idx}>• {act.en}</li>
                              ))}
                            </ul>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-slate-600">Loading today's energy...</p>
                      )}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors mt-4">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 py-8 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>
            Guidance for reflection and inspiration, not for financial, medical, legal, or gambling decisions.
          </p>
          <p className="mt-1">
            You are the final decision-maker.
          </p>
        </div>
      </footer>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        .animate-blob {
          animation: blob 20s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
