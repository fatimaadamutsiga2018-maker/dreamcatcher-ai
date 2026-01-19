"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

type EnergyModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function EnergyModal({ open, onClose }: EnergyModalProps) {
  const { data: session } = useSession();
  const [energy, setEnergy] = useState(0);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [canCheckin, setCanCheckin] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (open) {
      fetchEnergy();
    }
  }, [open, session]);

  const fetchEnergy = async () => {
    try {
      const res = await fetch('/api/energy/balance');
      if (res.ok) {
        const data = await res.json();
        setEnergy(data.energy || 0);
        setIsSubscriber(data.isSubscriber || false);
        setCanCheckin(data.dailyActions?.canCheckin || false);
        setCanShare(data.dailyActions?.canShare || false);

        // Auto-claim welcome energy for new users (energy === 0)
        if (session?.user && data.energy === 0) {
          claimWelcomeEnergy();
        }
      }
    } catch (error) {
      console.error('Failed to fetch energy:', error);
    }
  };

  const claimWelcomeEnergy = async () => {
    try {
      const res = await fetch('/api/energy/welcome', { method: 'POST' });
      const data = await res.json();
      if (res.ok && !data.alreadyClaimed) {
        setEnergy(data.energy || 20);
        setMessage(`Welcome! +${data.reward || 20} Energy to get started!`);
        setTimeout(() => setMessage(""), 5000);
      }
    } catch (error) {
      console.error('Failed to claim welcome energy:', error);
    }
  };

  const handleCheckin = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch('/api/energy/checkin', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setEnergy(data.energy);
        setCanCheckin(false);
        setMessage(data.message || `+${data.reward} Energy!`);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(data.error || "Check-in failed");
      }
    } catch (error) {
      setMessage("Failed to check in");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch('/api/energy/share', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setEnergy(data.energy);
        setCanShare(false);
        setMessage(data.message || "+5 Energy!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(data.error || "Share failed");
      }
    } catch (error) {
      setMessage("Failed to process share");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-gray-900/95 backdrop-blur-md border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="text-lg font-semibold text-white">Your Energy</h3>
              <p className="text-xs text-white/50">Current balance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Energy Balance */}
        <div className="p-6 text-center">
          <div className={`text-6xl font-bold mb-2 ${
            isSubscriber ? 'text-amber-300' : 'text-white'
          }`}>
            {energy}
          </div>
          <p className="text-sm text-white/50">
            {isSubscriber && "⭐ Subscriber - 2x daily rewards!"}
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className="mx-4 p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-center">
            <p className="text-sm text-emerald-300">{message}</p>
          </div>
        )}

        {/* Daily Actions */}
        <div className="px-4 pb-4">
          <h4 className="text-xs tracking-wider text-white/40 mb-3">DAILY ACTIONS</h4>
          <div className="space-y-2">
            <button
              onClick={canCheckin ? handleCheckin : undefined}
              disabled={!canCheckin || loading}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                canCheckin
                  ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 cursor-pointer'
                  : 'bg-white/5 border-white/5 cursor-not-allowed opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Daily Check-in</p>
                  <p className="text-xs text-white/50">Come back every day</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-semibold ${
                  canCheckin ? 'text-violet-300' : 'text-white/30'
                }`}>
                  +{isSubscriber ? 10 : 5}
                </span>
              </div>
            </button>

            <button
              onClick={canShare ? handleShare : undefined}
              disabled={!canShare || loading}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                canShare
                  ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 cursor-pointer'
                  : 'bg-white/5 border-white/5 cursor-not-allowed opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632 3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Share Your Reading</p>
                  <p className="text-xs text-white/50">Share your card with friends</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-semibold ${
                  canShare ? 'text-blue-300' : 'text-white/30'
                }`}>
                  +5
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Top-up Section (Coming Soon) */}
        <div className="px-4 pb-4">
          <h4 className="text-xs tracking-wider text-white/40 mb-3">RECHARGE ENERGY</h4>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-sm text-white/70 mb-2">Energy packs coming soon</p>
            <p className="text-xs text-white/40">Get more energy to unlock deeper insights</p>
          </div>
        </div>

        {/* Footer - Refund Disclaimer */}
        <div className="px-4 pb-4 pt-2 border-t border-white/5">
          <p className="text-[10px] text-white/20 text-center leading-relaxed">
            Energy Units are non-transferable and non-refundable.
            <br />
            Refunds apply only to unused purchases within 7 days.
          </p>
        </div>
      </div>
    </div>
  );
}
