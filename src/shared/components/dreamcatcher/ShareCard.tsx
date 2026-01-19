"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

type ShareCardProps = {
  isOpen: boolean;
  onClose: () => void;
  cardData?: {
    title?: string;
    subtitle?: string;
    mainLine?: string;
    date?: string;
  };
  onShared?: () => void;
};

// Main line hook pool - curiosity-driven, no "fortune/luck" language
const MAIN_HOOKS = [
  "Are you sure today is a good day to decide?",
  "Some days punish effort. Today might be one of them.",
  "Today is not about pushing.",
  "Before you rush today, you may want to check this.",
  "I almost made a fast decision today. Glad I paused.",
  "Timing changes everything. Effort doesn't.",
  "You don't need more confidence. You need better timing.",
  "Some days reward action. Some days punish it.",
  "The slope is against you today. Adjust, don't force.",
  "I checked my timing before acting. It changed everything.",
];

export default function ShareCard({ isOpen, onClose, cardData, onShared }: ShareCardProps) {
  const { data: session } = useSession();
  const [shared, setShared] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  if (!isOpen) return null;

  // Random hook if no mainLine provided
  const randomHook = MAIN_HOOKS[Math.floor(Math.random() * MAIN_HOOKS.length)];

  const defaultCardData = {
    mainLine: randomHook,
    subLine: "I checked my personal timing today. It changed how I plan my day.",
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  };

  const data = { ...defaultCardData, ...cardData };

  const handleShare = async () => {
    if (shared || isSharing) return;
    setIsSharing(true);

    try {
      // Call share API for +5 Energy
      const res = await fetch('/api/energy/share', { method: 'POST' });
      const result = await res.json();

      setShared(true);
      onShared?.();

      // Close after 3 seconds
      setTimeout(() => {
        onClose();
        setShared(false);
      }, 3000);
    } catch (error) {
      console.error('Share error:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm rounded-2xl bg-gray-900/95 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Share Today's Timing</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Preview Card - 1080x1920 ratio style */}
        <div className="p-6">
          <div className="relative rounded-xl bg-gradient-to-br from-violet-950/80 via-blue-950/80 to-slate-950/80 p-6 border border-white/10 aspect-[9/16] max-h-[400px] flex flex-col justify-between overflow-hidden">
            {/* Cosmic background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-violet-500/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl"></div>

            {/* Card Content */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Main Hook - Large Typography */}
              <div className="flex-1 flex items-center">
                <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                  "{data.mainLine}"
                </p>
              </div>

              {/* Sub Line */}
              <p className="text-sm text-white/60 italic my-4">
                {data.subLine}
              </p>

              {/* Footer */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] text-white/40 mb-1">{data.date}</p>
                <div className="flex items-center gap-1.5 text-white/30">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L9.5 9H2l6 4.5L5.5 21 12 16.5 18.5 21 16 13.5l6-4.5h-7.5L12 2z"/>
                  </svg>
                  <span className="text-[10px]">via dreamcatcherai.us</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reward Info - Only show for logged in users */}
        {session && (
          <div className="px-6 pb-2">
            <div className="flex items-center justify-center gap-2 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-400">✨</span>
              <span className="text-sm text-amber-300">Share to get +5 Energy</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-4 pt-2">
          {shared ? (
            <div className="text-center py-3">
              <div className="inline-flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-300 font-semibold text-sm">+5 Energy recharged</span>
                <span className="text-emerald-400/70 text-xs">You helped someone avoid bad timing</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleShare}
              disabled={isSharing}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold hover:from-blue-500 hover:to-violet-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSharing ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632 3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share & Recharge
                </>
              )}
            </button>
          )}

          {!session && (
            <p className="text-xs text-center text-white/40 mt-2">
              Sign in to earn Energy from sharing
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
