"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

type EnergyDisplayProps = {
  onOpenModal?: () => void;
  compact?: boolean; // Compact mode - show number only
};

export default function EnergyDisplay({ onOpenModal, compact = false }: EnergyDisplayProps) {
  const { data: session, status } = useSession();
  const [energy, setEnergy] = useState(0);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [showPlus, setShowPlus] = useState(false);

  useEffect(() => {
    if (session?.user) {
      fetchEnergy();
    }
  }, [session]);

  const fetchEnergy = async () => {
    try {
      const res = await fetch('/api/energy/balance');
      if (res.ok) {
        const data = await res.json();
        setEnergy(data.energy || 0);
        setIsSubscriber(data.isSubscriber || false);
        setShowPlus(true);

        // Auto-claim welcome energy for new users (energy === 0)
        if (data.energy === 0) {
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
      }
    } catch (error) {
      console.error('Failed to claim welcome energy:', error);
    }
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
        <div className="w-3 h-3 rounded-full bg-white/10 animate-pulse"></div>
        {!compact && <span className="text-xs text-white/50">Loading...</span>}
      </div>
    );
  }

  // Not logged in
  if (!session) {
    return null;
  }

  // Compact mode (for mobile)
  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <span className="text-lg">⚡</span>
        <span className="text-sm font-semibold text-amber-300">{energy}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Energy Display */}
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
          isSubscriber
            ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500/30'
            : 'bg-white/5 border-white/10'
        } backdrop-blur-md border transition-all`}
        title={isSubscriber ? 'Subscriber - 2x daily energy!' : 'Energy'}
      >
        <span className="text-base">⚡</span>
        <span className="text-sm font-semibold text-white">
          {energy}
        </span>
        {isSubscriber && (
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
        )}
      </div>

      {/* Plus button to open modal */}
      {showPlus && onOpenModal && (
        <button
          onClick={onOpenModal}
          className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
          title="Get more energy"
        >
          <span className="text-sm font-semibold">+</span>
        </button>
      )}
    </div>
  );
}
