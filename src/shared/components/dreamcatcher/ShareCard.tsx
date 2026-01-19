"use client";

import { useState, useRef } from "react";
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

export default function ShareCard({ isOpen, onClose, cardData, onShared }: ShareCardProps) {
  const { data: session } = useSession();
  const [shared, setShared] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!isOpen) return null;

  const defaultCardData = {
    title: "Dreamcatcher",
    subtitle: "Daily Energy & Timing Guide",
    mainLine: "Today is not about pushing. You'll gain more by adjusting than forcing.",
    date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase(),
  };

  const data = { ...defaultCardData, ...cardData };

  const handleShare = async () => {
    if (shared) return;

    try {
      // 调用分享 API
      const res = await fetch('/api/energy/share', { method: 'POST' });
      const result = await res.json();

      if (res.ok) {
        setShared(true);
        // 通知父组件
        onShared?.();

        // 3秒后关闭弹窗
        setTimeout(() => {
          onClose();
          setShared(false);
        }, 3000);
      } else {
        alert(result.error || 'Share failed');
      }
    } catch (error) {
      console.error('Share error:', error);
      alert('Failed to process share reward');
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
          <h3 className="text-lg font-semibold text-white">Share Your Reading</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Preview Card */}
        <div className="p-6">
          <div className="relative rounded-xl bg-gradient-to-br from-violet-900/50 to-blue-900/50 p-6 border border-white/10">
            {/* Glowing effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/20 to-violet-500/20 blur-xl"></div>

            {/* Card Content */}
            <div className="relative">
              <p className="text-[10px] tracking-[0.2em] text-white/50 mb-2">{data.date}</p>
              <p className="text-xs text-violet-300 mb-3">{data.subtitle}</p>
              <p className="text-lg font-semibold text-white leading-relaxed">
                "{data.mainLine}"
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-sm text-white/70">dreamcatcher.ai</span>
                <span className="text-xs text-white/50">Daily Energy Guide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reward Info */}
        <div className="px-6 pb-2">
          <div className="flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <span className="text-blue-400">🎁</span>
            <span className="text-sm text-blue-300">Share to get +5 Energy</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 pt-0">
          {shared ? (
            <div className="text-center py-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-300 font-semibold">+5 Energy Recharged!</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleShare}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold hover:from-blue-500 hover:to-violet-500 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632 3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share & Recharge
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
