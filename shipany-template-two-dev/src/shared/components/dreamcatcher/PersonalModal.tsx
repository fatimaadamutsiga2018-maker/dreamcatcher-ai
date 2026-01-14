"use client";

import { useEffect } from "react";
import ResonanceCompass from "@/shared/components/dreamcatcher/ResonanceCompass";
import NebulaSpinner from "@/shared/components/dreamcatcher/NebulaSpinner";

interface PersonalModalProps {
  open: boolean;
  calibrated: boolean;
  userCode?: string;
  onClose: () => void;
  onCalibrated: (code: string, mode: 'ANONYMOUS' | 'MEMBER' | 'GUEST', birthday?: string) => void;
}

export default function PersonalModal({ open, calibrated, userCode, onClose, onCalibrated }: PersonalModalProps) {
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
              /* Calibrated State - Premium Display */
              <div className="space-y-6">
                {/* Premium Card */}
                <div className="relative rounded-2xl overflow-hidden">
                  {/* Gold Premium Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-violet-500/20 to-cyan-500/20"></div>
                  <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_rgba(255,215,0,0.4),inset_0_0_40px_rgba(255,215,0,0.1)]"></div>

                  <div className="relative p-8 bg-black/40 backdrop-blur-md border border-amber-400/30 rounded-2xl">
                    {/* Premium Badge */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
                      <span className="text-sm tracking-[0.3em] text-amber-300 font-semibold">
                        YOUR UNIQUE RESONANCE
                      </span>
                      <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
                    </div>

                    {/* User Frequency Display */}
                    <div className="text-center mb-8">
                      <p className="text-white/60 mb-2 tracking-widest text-xs">YOUR FREQUENCY CODE</p>
                      <p className="text-4xl md:text-5xl font-bold text-amber-300 tracking-[0.2em] mb-4" style={{ textShadow: '0 0 30px rgba(255,215,0,0.6)' }}>
                        {userCode || '---'}
                      </p>
                      <p className="text-sm text-white/70 max-w-md mx-auto">
                        The tactical cards above now reflect your personal resonance with the global field.
                        Your unique frequency has been synchronized.
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-2xl font-bold text-violet-300 mb-1">ACTIVE</p>
                        <p className="text-[10px] text-white/50 tracking-wider">STATUS</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-2xl font-bold text-cyan-300 mb-1">SYNCED</p>
                        <p className="text-[10px] text-white/50 tracking-wider">CONNECTION</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-2xl font-bold text-amber-300 mb-1">LIVE</p>
                        <p className="text-[10px] text-white/50 tracking-wider">FEEDBACK</p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="text-center">
                      <button
                        onClick={() => {
                          /* Trigger recalibration */
                          window.location.reload();
                        }}
                        className="px-8 py-3 text-sm tracking-[0.2em] bg-gradient-to-r from-amber-500/20 to-violet-500/20 hover:from-amber-500/30 hover:to-violet-500/30 border border-amber-400/40 hover:border-amber-400/60 text-amber-100 rounded-xl transition-all duration-300"
                      >
                        RECALIBRATE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
