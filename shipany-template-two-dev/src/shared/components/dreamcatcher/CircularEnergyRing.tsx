"use client";

import { useMemo } from "react";

type Props = {
  energyIntensity: number; // 0-100
  seed?: string; // The seed number to display in center
  size?: number; // diameter in pixels
};

export default function CircularEnergyRing({ energyIntensity, seed, size = 120 }: Props) {
  // Calculate color based on energy intensity with new color map
  const { color, gradient } = useMemo(() => {
    if (energyIntensity >= 80) {
      // 80-100%: Gold
      return {
        color: '#FCD34D',
        gradient: ['#FCD34D', '#F59E0B'],
      };
    } else if (energyIntensity >= 50) {
      // 50-79%: Teal/Green
      return {
        color: '#34D399',
        gradient: ['#34D399', '#14B8A6'],
      };
    } else if (energyIntensity >= 20) {
      // 20-49%: Blue
      return {
        color: '#60A5FA',
        gradient: ['#60A5FA', '#3B82F6'],
      };
    } else {
      // 0-19%: Deep Violet
      return {
        color: '#8B5CF6',
        gradient: ['#8B5CF6', '#7C3AED'],
      };
    }
  }, [energyIntensity]);

  // Calculate stroke properties
  const circumference = 2 * Math.PI * (size / 2 - 8);
  const strokeLength = (energyIntensity / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size / 2) - 8}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={4}
          fill="none"
        />

        {/* Energy ring with gradient */}
        <defs>
          <linearGradient id={`energy-gradient-${energyIntensity}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradient[0]} />
            <stop offset="100%" stopColor={gradient[1]} />
          </linearGradient>
        </defs>

        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size / 2) - 8}
          stroke={`url(#energy-gradient-${energyIntensity})`}
          strokeWidth={4}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - strokeLength}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.6s ease-out, stroke 0.3s ease',
          }}
          className="drop-shadow-lg"
        />
      </svg>

      {/* Inner seed display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div
            className="text-2xl font-bold"
            style={{ color, textShadow: `0 0 20px ${color}40` }}
          >
            {seed || '---'}
          </div>
          <div className="text-[9px] uppercase tracking-wider text-white/50">
            Seed
          </div>
        </div>
      </div>
    </div>
  );
}
