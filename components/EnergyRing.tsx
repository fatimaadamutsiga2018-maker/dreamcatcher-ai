/**
 * Energy Ring Component
 * Visual representation of energy level (1-5) as a circular progress ring
 */

interface EnergyRingProps {
  level: 1 | 2 | 3 | 4 | 5;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  label?: string;
}

export default function EnergyRing({
  level,
  size = 120,
  strokeWidth = 12,
  showLabel = true,
  label,
}: EnergyRingProps) {
  // Calculate percentage based on level
  const percentage = (level / 5) * 100;

  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Color gradient based on level
  const colorMap = {
    1: { from: '#ef4444', to: '#dc2626', glow: '#fca5a5' }, // red
    2: { from: '#f97316', to: '#ea580c', glow: '#fdba74' }, // orange
    3: { from: '#eab308', to: '#ca8a04', glow: '#fde047' }, // yellow
    4: { from: '#3b82f6', to: '#2563eb', glow: '#93c5fd' }, // blue
    5: { from: '#10b981', to: '#059669', glow: '#6ee7b7' }, // green
  };

  const colors = colorMap[level];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          <defs>
            <linearGradient id={`gradient-${level}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.from} />
              <stop offset="100%" stopColor={colors.to} />
            </linearGradient>
            <filter id={`glow-${level}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />

          {/* Progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#gradient-${level})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            filter={`url(#glow-${level})`}
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out',
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold" style={{ color: colors.to }}>
            {level}
          </div>
          <div className="text-xs text-gray-500 font-medium">of 5</div>
        </div>
      </div>

      {/* Label */}
      {showLabel && (
        <div className="text-center">
          <div className="text-sm font-medium text-gray-700">
            {label || 'Energy Level'}
          </div>
          <div className="text-xs text-gray-500">
            {percentage.toFixed(0)}% Capacity
          </div>
        </div>
      )}
    </div>
  );
}
