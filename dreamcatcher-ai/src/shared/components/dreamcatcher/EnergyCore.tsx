"use client";

/**
 * Energy Core - Central visual element inspired by Dashboard design
 * Features: Multi-layered concentric circles with neon glow effects
 */

interface EnergyCoreProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function EnergyCore({ size = 'md', className = '' }: EnergyCoreProps) {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <div className={`relative ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient definitions matching design */}
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.9)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.6)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.2)" />
          </radialGradient>

          <radialGradient id="innerCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
            <stop offset="30%" stopColor="rgba(139, 92, 246, 0.8)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.4)" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer glow ring */}
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="url(#coreGlow)"
          strokeWidth="1"
          opacity="0.3"
          className="animate-pulse"
        />

        {/* Second ring - rotating */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="2"
          strokeDasharray="10 5"
          className="animate-[spin_12s_linear_infinite]"
          filter="url(#neonGlow)"
        />

        {/* Third ring - counter-rotating */}
        <circle
          cx="100"
          cy="100"
          r="75"
          fill="none"
          stroke="rgba(139, 92, 246, 0.6)"
          strokeWidth="1.5"
          strokeDasharray="15 10"
          className="animate-[spin_8s_linear_infinite_reverse]"
          filter="url(#neonGlow)"
        />

        {/* Fourth ring */}
        <circle
          cx="100"
          cy="100"
          r="65"
          fill="none"
          stroke="rgba(6, 182, 212, 0.5)"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Inner geometric pattern */}
        <g className="animate-[spin_20s_linear_infinite]" opacity="0.3">
          <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="35" fill="none" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="0.5" />
        </g>

        {/* Core energy center */}
        <circle
          cx="100"
          cy="100"
          r="25"
          fill="url(#innerCore)"
          filter="url(#neonGlow)"
          className="animate-pulse"
        />

        {/* Inner bright core */}
        <circle
          cx="100"
          cy="100"
          r="10"
          fill="rgba(255, 255, 255, 0.95)"
          filter="url(#neonGlow)"
        />
      </svg>
    </div>
  );
}
