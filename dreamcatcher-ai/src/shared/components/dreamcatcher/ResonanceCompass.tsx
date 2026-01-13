"use client";

import { useState, useCallback, useEffect, useRef } from "react";

type Props = {
  onCalibrated: (code: string, mode: keyof typeof USER_MODES, birthday?: string) => void;
};

type InputMode = 'intention' | 'chance' | 'birthday';
type Phase = "input" | "calibrating" | "complete";

import { USER_MODES } from "@/shared/lib/dreamcatcher/constants";

function digitsOnly(s: string) {
  return s.replace(/\D/g, "");
}

// Compass rose component
function CompassRose({ active, calibrated }: { active: boolean; calibrated: boolean }) {
  return (
    <div className="relative mx-auto h-20 w-20" aria-hidden="true">
      <svg
        viewBox="0 0 200 200"
        className={`h-full w-full ${active ? 'animate-[compass-slow_20s_linear_infinite]' : ''}`}
      >
        <defs>
          <linearGradient id="compassStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(203,162,255,0.9)" />
            <stop offset="50%" stopColor="rgba(122,92,255,0.75)" />
            <stop offset="100%" stopColor="rgba(80,230,255,0.45)" />
          </linearGradient>
          <linearGradient id="calibratedStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.9)" />
            <stop offset="50%" stopColor="rgba(167,139,250,0.75)" />
            <stop offset="100%" stopColor="rgba(52,211,153,0.45)" />
          </linearGradient>
        </defs>

        {/* Outer ring */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke={calibrated ? "url(#calibratedStroke)" : "url(#compassStroke)"}
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Inner compass rose */}
        <g className={active ? "animate-[compass-reverse_15s_linear_infinite]" : ""}>
          <path
            d="M100 35 L115 100 L100 165 L85 100 Z"
            fill="none"
            stroke={calibrated ? "url(#calibratedStroke)" : "url(#compassStroke)"}
            strokeWidth="1.5"
            opacity={calibrated ? 0.9 : 0.7}
          />
          <path
            d="M35 100 L100 85 L165 100 L100 115 Z"
            fill="none"
            stroke={calibrated ? "url(#calibratedStroke)" : "url(#compassStroke)"}
            strokeWidth="1.5"
            opacity={calibrated ? 0.9 : 0.7}
          />
        </g>

        {/* Center point */}
        <circle
          cx="100"
          cy="100"
          r="8"
          fill={calibrated ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.08)"}
          stroke={calibrated ? "url(#calibratedStroke)" : "url(#compassStroke)"}
          strokeWidth="1.5"
        />

        {calibrated && (
          <circle
            cx="100"
            cy="100"
            r="4"
            fill="rgba(52,211,153,0.8)"
            className="animate-pulse"
          />
        )}
      </svg>

      {/* Status label */}
      <div className="absolute -bottom-5 left-0 right-0 text-center">
        <div className={`text-[9px] font-medium transition-colors duration-500 ${
          calibrated
            ? 'text-emerald-300'
            : active
            ? 'text-violet-300'
            : 'text-white/40'
        }`}>
          {calibrated ? 'LOCKED' : active ? 'CALIBRATING...' : 'READY'}
        </div>
      </div>
    </div>
  );
}

export default function ResonanceCompass({ onCalibrated }: Props) {
  const [inputMode, setInputMode] = useState<InputMode>('intention');
  const [digits, setDigits] = useState<string[]>(["", "", ""]);
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [phase, setPhase] = useState<Phase>("input");
  const [calibrated, setCalibrated] = useState(false);

  const ref0 = useRef<HTMLInputElement>(null);
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const refs = [ref0, ref1, ref2];

  const complete = digits.every((d) => d.length === 1);
  const code = digits.join("");
  const triggeredRef = useState(false)[0];

  // Generate random 3 digits
  const generateRandomDigits = useCallback(() => {
    const randomDigits = [
      Math.floor(Math.random() * 10).toString(),
      Math.floor(Math.random() * 10).toString(),
      Math.floor(Math.random() * 10).toString(),
    ];
    setDigits(randomDigits);
    return randomDigits.join("");
  }, []);

  // Calculate digits from birthday
  const calculateBirthdayDigits = useCallback(() => {
    if (!birthMonth || !birthDay || !birthYear) return "";

    // Sum year digits
    const yearSum = birthYear.split('').reduce((sum, digit) => sum + parseInt(digit), 0);

    // Month is already 1-12
    const monthNum = parseInt(birthMonth);

    // Day is already 1-31
    const dayNum = parseInt(birthDay);

    // Use last digit of each sum (or single digit if less than 10)
    const digit1 = yearSum % 10;
    const digit2 = monthNum % 10;
    const digit3 = dayNum % 10;

    const birthdayDigits = [digit1.toString(), digit2.toString(), digit3.toString()];
    setDigits(birthdayDigits);

    return birthdayDigits.join("");
  }, [birthMonth, birthDay, birthYear]);

  // Handle calibration trigger
  const triggerCalibration = useCallback((finalCode: string) => {
    if (!finalCode || finalCode.length !== 3) return;

    setPhase("calibrating");

    setTimeout(() => {
      try {
        setPhase("complete");
        setCalibrated(true);

        let mode: keyof typeof USER_MODES = "ANONYMOUS";
        let birthday: string | undefined;

        if (inputMode === 'birthday' && birthMonth && birthDay && birthYear) {
          mode = "MEMBER";
          birthday = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;
        } else {
          mode = "ANONYMOUS";
        }

        onCalibrated(finalCode, mode, birthday);
      } catch (error) {
        console.error('Calibration failed:', error);
      }
    }, 1500);
  }, [inputMode, birthMonth, birthDay, birthYear, onCalibrated]);

  // Handle Intention mode
  const handleIntentionSubmit = () => {
    if (complete) {
      triggerCalibration(code);
    }
  };

  // Handle Chance mode
  const handleChanceSpin = () => {
    const randomCode = generateRandomDigits();
    triggerCalibration(randomCode);
  };

  // Handle Birthday mode
  const handleBirthdaySubmit = () => {
    if (birthMonth && birthDay && birthYear) {
      const birthdayCode = calculateBirthdayDigits();
      triggerCalibration(birthdayCode);
    }
  };

  const handleRecalibrate = () => {
    setCalibrated(false);
    setDigits(["", "", ""]);
    setBirthMonth("");
    setBirthDay("");
    setBirthYear("");
    setPhase("input");
  };

  const handleModeChange = (mode: InputMode) => {
    setInputMode(mode);
    setCalibrated(false);
    setDigits(["", "", ""]);
    setBirthMonth("");
    setBirthDay("");
    setBirthYear("");
    setPhase("input");
  };

  return (
    <section className="relative w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/40 mb-2">
          PERSONAL CALIBRATION
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
          Resonance Tuner
        </h2>
        <p className="text-xs text-white/60 max-w-lg mx-auto">
          Choose your input method to synchronize with the global energy field
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {(['intention', 'chance', 'birthday'] as InputMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => handleModeChange(mode)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              inputMode === mode
                ? calibrated
                  ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-400/50 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 border-2 border-violet-400/50 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                : 'bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {/* Central Compass */}
      <div className="mb-6">
        <CompassRose active={phase === "calibrating"} calibrated={calibrated} />
      </div>

      {/* Input Sections */}
      {phase !== "complete" && (
        <div className="space-y-4">
          {/* Intention Mode */}
          {inputMode === 'intention' && (
            <div className="text-center space-y-4">
              <h3 className="text-xs font-semibold text-white mb-2">
                Enter Your 3-Digit Intention
              </h3>
              <p className="text-[10px] text-white/50 mb-4">
                Three digits that represent your current state or intention
              </p>

              <div className="mx-auto flex w-full items-center justify-center gap-4 max-w-xs">
                {digits.map((d, idx) => (
                  <input
                    key={idx}
                    ref={refs[idx]}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={d}
                    disabled={phase !== "input"}
                    onChange={(e) => {
                      const cleaned = digitsOnly(e.target.value);
                      if (cleaned.length <= 1) {
                        setDigits((prev) => {
                          const next = [...prev];
                          next[idx] = cleaned;
                          return next;
                        });
                        if (cleaned.length === 1 && idx < 2) {
                          refs[idx + 1].current?.focus();
                        }
                      }
                    }}
                    className={[
                      "h-14 w-14 rounded-xl text-center text-xl font-bold text-white outline-none transition-all duration-300",
                      "border border-white/15 bg-white/5 backdrop-blur-md",
                      "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_24px_rgba(122,92,255,0.22)]",
                      "focus:border-violet-300/50 focus:shadow-[0_0_0_1px_rgba(203,162,255,0.22),0_0_34px_rgba(122,92,255,0.38)]",
                      phase === "calibrating" ? "opacity-40" : "",
                    ].join(" ")}
                    aria-label={`Digit ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleIntentionSubmit}
                disabled={!complete || phase === "calibrating"}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  complete && phase === "input"
                    ? 'bg-violet-500 hover:bg-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                    : 'bg-white/10 text-white/50 cursor-not-allowed'
                }`}
              >
                Calibrate
              </button>
            </div>
          )}

          {/* Chance Mode */}
          {inputMode === 'chance' && (
            <div className="text-center space-y-6">
              <h3 className="text-xs font-semibold text-white mb-2">
                Spin for Random Alignment
              </h3>
              <p className="text-[10px] text-white/50">
                Let chance guide your resonance with the universal energy
              </p>

              <button
                onClick={handleChanceSpin}
                disabled={phase === "calibrating"}
                className={`relative w-32 h-32 rounded-full transition-all duration-300 ${
                  phase === "calibrating"
                    ? 'bg-white/5 opacity-40'
                    : 'bg-gradient-to-br from-violet-500/20 to-purple-500/20 border-2 border-violet-400/50 hover:border-violet-300/70 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]'
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🎲</div>
                    <div className="text-xs font-semibold text-white/80">
                      {phase === "calibrating" ? 'Spinning...' : 'SPIN'}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Birthday Mode */}
          {inputMode === 'birthday' && (
            <div className="max-w-md mx-auto space-y-4">
              <h3 className="text-xs font-semibold text-white mb-2 text-center">
                Enter Your Birthday
              </h3>
              <p className="text-[10px] text-white/50 text-center mb-4">
                Your birth date generates a unique energy signature
              </p>

              <div className="flex items-center justify-center gap-2">
                {/* Month */}
                <div className="w-20">
                  <label className="block text-[9px] text-white/40 mb-1">MONTH</label>
                  <select
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                    disabled={phase !== "input"}
                    className={[
                      "w-full h-10 px-2 rounded-lg text-xs text-white outline-none transition-all duration-300 appearance-none",
                      "border border-white/15 bg-violet-950/60 backdrop-blur-md cursor-pointer",
                      "focus:border-violet-300/50 focus:shadow-[0_0_0_1px_rgba(203,162,255,0.22),0_0_24px_rgba(122,92,255,0.38)]",
                      phase === "calibrating" ? "opacity-40" : "",
                    ].join(" ")}
                  >
                    <option value="" className="bg-violet-950 text-white/50">Select</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={String(i + 1).padStart(2, '0')} className="bg-violet-950 text-white">
                        {new Date(2000, i, 1).toLocaleDateString('en-US', { month: 'short' })}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Day */}
                <div className="w-20">
                  <label className="block text-[9px] text-white/40 mb-1">DAY</label>
                  <select
                    value={birthDay}
                    onChange={(e) => setBirthDay(e.target.value)}
                    disabled={phase !== "input"}
                    className={[
                      "w-full h-10 px-3 rounded-lg text-xs text-white outline-none transition-all duration-300 appearance-none",
                      "border border-white/15 bg-violet-950/60 backdrop-blur-md cursor-pointer",
                      "focus:border-violet-300/50 focus:shadow-[0_0_0_1px_rgba(203,162,255,0.22),0_0_24px_rgba(122,92,255,0.38)]",
                      phase === "calibrating" ? "opacity-40" : "",
                    ].join(" ")}
                  >
                    <option value="" className="bg-violet-950 text-white/50">Select</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i} value={String(i + 1).padStart(2, '0')} className="bg-violet-950 text-white">
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year */}
                <div className="w-24">
                  <label className="block text-[9px] text-white/40 mb-1">YEAR</label>
                  <select
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    disabled={phase !== "input"}
                    className={[
                      "w-full h-10 px-2 rounded-lg text-xs text-white outline-none transition-all duration-300 appearance-none",
                      "border border-white/15 bg-violet-950/60 backdrop-blur-md cursor-pointer",
                      "focus:border-violet-300/50 focus:shadow-[0_0_0_1px_rgba(203,162,255,0.22),0_0_24px_rgba(122,92,255,0.38)]",
                      phase === "calibrating" ? "opacity-40" : "",
                    ].join(" ")}
                  >
                    <option value="" className="bg-violet-950 text-white/50">Select</option>
                    {Array.from({ length: 100 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <option key={year} value={String(year)} className="bg-violet-950 text-white">
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleBirthdaySubmit}
                  disabled={!birthMonth || !birthDay || !birthYear || phase === "calibrating"}
                  className={`h-10 px-4 rounded-lg text-sm font-semibold transition-all duration-300 self-end ${
                    birthMonth && birthDay && birthYear && phase === "input"
                      ? 'bg-violet-500 hover:bg-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                      : 'bg-white/10 text-white/50 cursor-not-allowed'
                  }`}
                >
                  GO
                </button>
              </div>

              {phase === "calibrating" && (
                <div className="text-center py-2">
                  <p className="text-[10px] text-violet-300 animate-pulse">
                    Calculating your energy signature...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Calibrated State */}
      {phase === "complete" && (
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-300">
              Personalized Result Active
            </span>
          </div>

          <div className="text-[10px] text-white/50 max-w-md mx-auto">
            Your Strategy Cards below now reflect the resonance between Global Energy and your Personal State.
          </div>

          <button
            onClick={handleRecalibrate}
            className="text-[10px] text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
          >
            Recalibrate
          </button>
        </div>
      )}
    </section>
  );
}
