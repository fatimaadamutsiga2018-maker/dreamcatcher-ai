"use client";

import { useEffect } from "react";
import ResonanceCompass from "@/shared/components/dreamcatcher/ResonanceCompass";
import NebulaSpinner from "@/shared/components/dreamcatcher/NebulaSpinner";

type TodayState = 'INITIATE' | 'ACCELERATE' | 'CONSOLIDATE' | 'ADJUST' | 'REST';

interface PersonalModalProps {
  open: boolean;
  calibrated: boolean;
  userCode?: string;
  todayState?: TodayState;
  onClose: () => void;
  onCalibrated: (code: string, mode: 'ANONYMOUS' | 'MEMBER' | 'GUEST', birthday?: string) => void;
}

// Personal insight copy based on today's state
const PERSONAL_INSIGHTS: Record<TodayState, {
  currentState: {
    phase: string;
    description: string;
  };
  resonanceInsight: string[];
  whatsHappening: string;
  recommendedAction: string[];
}> = {
  INITIATE: {
    currentState: {
      phase: "Start",
      description: "The current field is awakening. Small sparks catch fire easily now.",
    },
    resonanceInsight: [
      "Trust your first impulse.",
      "Start before you feel ready.",
      "Small steps create momentum.",
    ],
    whatsHappening: "The energy around you is fresh and supportive. That urge to begin? That's the field saying yes.",
    recommendedAction: [
      "Do the first small thing today.",
      "Don't overthink the first step.",
      "Let momentum build naturally.",
    ],
  },
  ACCELERATE: {
    currentState: {
      phase: "Momentum",
      description: "The current field is active. Movement is rewarded right now.",
    },
    resonanceInsight: [
      "Ride the wave while it's here.",
      "Speed beats perfection today.",
      "Keep doing what's already working.",
    ],
    whatsHappening: "Conditions support your forward motion. Resistance is low — this is the time to press ahead.",
    recommendedAction: [
      "Double down on what works.",
      "Don't change direction now.",
      "Move fast on important things.",
    ],
  },
  CONSOLIDATE: {
    currentState: {
      phase: "Secure",
      description: "The current field is stabilizing. Protection beats expansion today.",
    },
    resonanceInsight: [
      "Protect what you've built.",
      "Finish what you started.",
      "Strengthen your foundation.",
    ],
    whatsHappening: "The energy is asking you to slow down and secure gains. New ventures can wait — what you have needs care.",
    recommendedAction: [
      "Organize and review your work.",
      "Tie up loose ends.",
      "Avoid starting something new.",
    ],
  },
  ADJUST: {
    currentState: {
      phase: "Refine",
      description: "The current field is quiet. Perfect time to look inward and polish.",
    },
    resonanceInsight: [
      "Trust your quiet thoughts.",
      "Batch your administrative tasks.",
      "Less multitasking, more focus.",
    ],
    whatsHappening: "The world around you is moving fast, but your personal energy needs a moment to catch up. That friction you feel? It's just a signal to fine-tune, not push harder.",
    recommendedAction: [
      "Work smarter, not harder.",
      "Fix the small leaks today.",
      "Refine your approach, not your goals.",
    ],
  },
  REST: {
    currentState: {
      phase: "Recharge",
      description: "The current field is still. Recovery is the most productive use of today.",
    },
    resonanceInsight: [
      "Rest without guilt.",
      "Delay big decisions.",
      "Preserve your energy.",
    ],
    whatsHappening: "Your personal battery needs charging. That heaviness you feel isn't failure — it's your body asking for proper rest.",
    recommendedAction: [
      "Pause your big decisions.",
      "Do less than usual.",
      "Let things be for today.",
    ],
  },
};

export default function PersonalModal({ open, calibrated, userCode, todayState = 'INITIATE', onClose, onCalibrated }: PersonalModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-violet-500/30 shadow-[0_0_80px_rgba(139,92,246,0.5)]">
        {/* Nebula Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-violet-950/80 to-slate-950">
          <NebulaSpinner />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-[0.2em] text-white" style={{ textShadow: '0 0 20px rgba(139,92,246,0.8)' }}>
                PERSONAL RESONANCE
              </h2>
              <p className="text-sm text-white/60 mt-1">
                Align your unique frequency with the global energy field
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {!calibrated ? (
              /* Calibration Section */
              <div className="space-y-8">
                {/* Intro Text */}
                <div className="text-center max-w-2xl mx-auto">
                  <p className="text-lg text-white/80 leading-relaxed">
                    Choose your synchronization method to decode how the universal energies
                    specifically resonate with your individual frequency.
                  </p>
                </div>

                {/* Resonance Compass */}
                <ResonanceCompass onCalibrated={onCalibrated} />
              </div>
            ) : (
              /* Calibrated State - Personal Insights Display */
              <div className="space-y-5">
                {(() => {
                  const insights = PERSONAL_INSIGHTS[todayState];
                  return (
                    <>
                      {/* 1. Current State */}
                      <div className="relative rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-blue-500/10"></div>
                        <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-violet-400/20 rounded-2xl">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] tracking-wider text-violet-300/80 px-2 py-0.5 rounded bg-violet-500/10 border border-violet-400/20">
                              CURRENT STATE
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            You're in a "{insights.currentState.phase}" Phase
                          </h3>
                          <p className="text-sm text-white/60 leading-relaxed">
                            {insights.currentState.description}
                          </p>
                        </div>
                      </div>

                      {/* 2. Resonance Insight */}
                      <div className="relative rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10"></div>
                        <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-2xl">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] tracking-wider text-amber-300/80 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-400/20">
                              RESONANCE INSIGHT
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {insights.resonanceInsight.map((item, index) => (
                              <li key={index} className="text-sm text-white/70 leading-relaxed flex items-start gap-2">
                                <span className="text-amber-400 mt-1">✦</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* 3. What's Happening */}
                      <div className="relative rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
                        <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-cyan-400/20 rounded-2xl">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] tracking-wider text-cyan-300/80 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/20">
                              WHAT'S HAPPENING
                            </span>
                          </div>
                          <p className="text-sm text-white/70 leading-relaxed">
                            {insights.whatsHappening}
                          </p>
                        </div>
                      </div>

                      {/* 4. Recommended Action */}
                      <div className="relative rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10"></div>
                        <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-emerald-400/20 rounded-2xl">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] tracking-wider text-emerald-300/80 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-400/20">
                              RECOMMENDED ACTION
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {insights.recommendedAction.map((item, index) => (
                              <li key={index} className="text-sm text-white/70 leading-relaxed flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">→</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Footer - Your Code */}
                      <div className="text-center pt-4">
                        <p className="text-white/40 mb-1 tracking-widest text-[10px]">YOUR FREQUENCY CODE</p>
                        <p className="text-2xl font-bold text-amber-300/80 tracking-[0.15em]" style={{ textShadow: '0 0 20px rgba(255,215,0,0.4)' }}>
                          {userCode || '---'}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
