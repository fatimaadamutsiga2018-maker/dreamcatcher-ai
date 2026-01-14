/**
 * NebulaSpinner - Gentle rotating nebula background
 * Creates a soothing cosmic effect without dizziness
 */

"use client";

import { useEffect, useState } from "react";

interface NebulaSpinnerProps {
  className?: string;
}

export default function NebulaSpinner({ className = '' }: NebulaSpinnerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate stars only on client to avoid SSR mismatch
  const stars = mounted ? [...Array(30)].map((_, i) => ({
    id: i,
    width: `${Math.random() * 3 + 1}px`,
    height: `${Math.random() * 3 + 1}px`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.5 + 0.2,
    animationDuration: `${Math.random() * 3 + 2}s`,
    animationDelay: `${Math.random() * 2}s`,
  })) : [];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Multiple layered gradients for depth */}
      <div className="absolute inset-0 opacity-60">
        {/* Layer 1 - Slow rotating large nebula */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(59,130,246,0.2) 30%, transparent 70%)',
            animation: 'nebula-rotate 60s linear infinite',
          }}
        />

        {/* Layer 2 - Medium nebula, counter-rotating */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)',
            animation: 'nebula-rotate-reverse 45s linear infinite',
          }}
        />

        {/* Layer 3 - Small bright core */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(139,92,246,0.2) 50%, transparent 70%)',
            animation: 'nebula-pulse 8s ease-in-out infinite',
          }}
        />

        {/* Layer 4 - Scattered stars - client only */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                width: star.width,
                height: star.height,
                top: star.top,
                left: star.left,
                opacity: star.opacity,
                animation: `star-twinkle ${star.animationDuration} ease-in-out infinite`,
                animationDelay: star.animationDelay,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes nebula-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes nebula-rotate-reverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        @keyframes nebula-pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
