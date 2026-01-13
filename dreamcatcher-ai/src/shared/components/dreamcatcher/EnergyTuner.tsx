"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { USER_MODES } from "@/shared/lib/dreamcatcher/constants";

type Props = {
  onTuned: (code: string, mode: keyof typeof USER_MODES, birthday?: string) => void;
};

type Phase = "input" | "tuning";
type UserMode = keyof typeof USER_MODES;

function digitsOnly(s: string) {
  return s.replace(/\D/g, "");
}

function Dreamcatcher({ active }: { active: boolean }) {
  return (
    <div className="relative mx-auto h-44 w-44" aria-hidden="true">
      <div className={active ? "dc-aura" : "dc-aura dc-aura-idle"} />
      <svg
        viewBox="0 0 200 200"
        className={active ? "h-full w-full animate-dc-spin" : "h-full w-full"}
      >
        <defs>
          <linearGradient id="dcStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(203,162,255,0.9)" />
            <stop offset="55%" stopColor="rgba(122,92,255,0.75)" />
            <stop offset="100%" stopColor="rgba(80,230,255,0.45)" />
          </linearGradient>
        </defs>

        <circle
          cx="100"
          cy="100"
          r="72"
          fill="none"
          stroke="url(#dcStroke)"
          strokeWidth="2.2"
          opacity="0.9"
        />

        <g className={active ? "animate-dc-weave" : ""} opacity="0.92">
          <circle
            cx="100"
            cy="100"
            r="46"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.2"
          />
          <path
            d="M100 54 L146 100 L100 146 L54 100 Z"
            fill="none"
            stroke="url(#dcStroke)"
            strokeWidth="1.35"
            opacity="0.85"
          />
          <path d="M100 54 L100 146" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.1" />
          <path d="M54 100 L146 100" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.1" />
          <circle cx="100" cy="100" r="6" fill="rgba(255,255,255,0.08)" stroke="url(#dcStroke)" strokeWidth="1" />
        </g>

        <g opacity="0.65">
          <path d="M86 162 C95 172, 105 172, 114 162" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
          <circle cx="86" cy="162" r="3" fill="rgba(203,162,255,0.55)" />
          <circle cx="114" cy="162" r="3" fill="rgba(80,230,255,0.45)" />
        </g>
      </svg>
    </div>
  );
}

export default function EnergyTuner({ onTuned }: Props) {
  const [selectedMode, setSelectedMode] = useState<UserMode>("ANONYMOUS");
  const [showBirthday, setShowBirthday] = useState(false);
  const [digits, setDigits] = useState<string[]>(["", "", ""]);
  const [birthday, setBirthday] = useState("");
  const [phase, setPhase] = useState<Phase>("input");
  const [pulseKey, setPulseKey] = useState(0);
  const [shouldTrigger, setShouldTrigger] = useState(false);

  const refs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const complete = useMemo(() => digits.every((d) => d.length === 1), [digits]);
  const code = useMemo(() => digits.join(""), [digits]);

  // Use ref to track if we've already triggered
  const triggeredRef = useRef(false);

  // Always call hooks in same order
  // Focus first input on mount only
  useEffect(() => {
    if (phase === "input") {
      refs[0].current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Trigger callback when complete
  useEffect(() => {
    if (phase !== "input" || triggeredRef.current) {
      return;
    }

    // Guest mode proceeds immediately
    if (selectedMode === "GUEST") {
      triggeredRef.current = true;
      setPhase("tuning");
      setPulseKey((k) => k + 1);

      // Use requestAnimationFrame to ensure state updates first
      requestAnimationFrame(() => {
        onTuned("", selectedMode);
      });
      return;
    }

    // For ANONYMOUS and MEMBER modes, wait for complete digits
    if (!complete) {
      return;
    }

    // Mark as triggered
    triggeredRef.current = true;
    setPhase("tuning");
    setPulseKey((k) => k + 1);

    // Use requestAnimationFrame to ensure state updates first, then callback
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        onTuned(code, selectedMode, selectedMode === "MEMBER" ? birthday : undefined);
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete, code, selectedMode, birthday, phase, digits]);

  const setAt = (idx: number, raw: string) => {
    const d = digitsOnly(raw).slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[idx] = d;
      return next;
    });
  };

  const onChange = (idx: number, v: string) => {
    if (phase !== "input") return;

    const cleaned = digitsOnly(v);
    if (cleaned.length <= 1) {
      setAt(idx, v);
      if (cleaned.length === 1 && idx < 2) refs[idx + 1].current?.focus();
      return;
    }

    // paste like "123"
    const arr = cleaned.slice(0, 3).split("");
    setDigits([arr[0] ?? "", arr[1] ?? "", arr[2] ?? ""]);
    refs[Math.min(2, arr.length - 1)].current?.focus();
  };

  const onKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (phase !== "input") return;

    if (e.key === "Backspace" && digits[idx] === "" && idx > 0) {
      refs[idx - 1].current?.focus();
      setDigits((prev) => {
        const next = [...prev];
        next[idx - 1] = "";
        return next;
      });
    }

    if (e.key === "ArrowLeft" && idx > 0) refs[idx - 1].current?.focus();
    if (e.key === "ArrowRight" && idx < 2) refs[idx + 1].current?.focus();
  };

  const handleModeSelect = (mode: UserMode) => {
    // Reset triggered state when changing modes
    triggeredRef.current = false;
    setSelectedMode(mode);
    setDigits(["", "", ""]);
    setBirthday("");

    // GUEST mode immediately enters tuning phase
    if (mode === "GUEST") {
      setPhase("tuning");
      setPulseKey((k) => k + 1);
    } else {
      // Other modes enter input phase
      setPhase("input");
    }
  };

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
  };

  // Render helpers (no hooks)
  const renderInputs = () => (
    <div className="mx-auto flex w-full items-center justify-center gap-3">
      {digits.map((d, idx) => (
        <input
          key={idx}
          ref={refs[idx]}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={d}
          disabled={phase !== "input"}
          onChange={(e) => onChange(idx, e.target.value)}
          onKeyDown={(e) => onKeyDown(idx, e)}
          className={[
            "h-14 w-14 rounded-xl text-center text-xl font-semibold text-white outline-none",
            "border border-white/15 bg-white/5 backdrop-blur-md",
            "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_24px_rgba(122,92,255,0.22)]",
            "focus:border-violet-300/50 focus:shadow-[0_0_0_1px_rgba(203,162,255,0.22),0_0_34px_rgba(122,92,255,0.38)]",
            phase === "tuning" ? "opacity-60" : "",
          ].join(" ")}
          aria-label={`Digit ${idx + 1}`}
        />
      ))}
    </div>
  );

  const renderPulseRing = () => (
    <div key={pulseKey} className={phase === "tuning" ? "pulse-ring" : "hidden"} />
  );

  const renderDreamcatcher = () => (
    <div className="mt-6">
      <Dreamcatcher active={phase === "tuning"} />
      <div className="mt-3 text-center text-xs text-white/55">
        {phase === "tuning" ? "Calibrating resonance…" : "Awaiting a clean sequence."}
      </div>
    </div>
  );

  const renderBirthdayInput = () => (
    <div className="mt-4">
      <label className="block text-xs font-medium text-white/70 mb-2">
        Birthday (YYYY-MM-DD)
      </label>
      <input
        type="date"
        value={birthday}
        onChange={handleBirthdayChange}
        className={[
          "w-full h-12 rounded-xl px-4 text-sm text-white outline-none",
          "border border-white/15 bg-white/5 backdrop-blur-md",
          "focus:border-violet-300/50 focus:shadow-[0_0_0_1px_rgba(203,162,255,0.22),0_0_24px_rgba(122,92,255,0.38)]",
        ].join(" ")}
      />
    </div>
  );

  return (
    <section className="relative w-full max-w-md">
      {/* Mode Selector - Always visible */}
      <div className="mb-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-3 text-center">
          SELECT YOUR MODE
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleModeSelect("GUEST")}
            className={`px-3 py-3 rounded-lg text-xs font-medium transition-all ${
              selectedMode === "GUEST"
                ? "bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/50 text-white"
                : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            Environmental
          </button>
          <button
            onClick={() => handleModeSelect("ANONYMOUS")}
            className={`px-3 py-3 rounded-lg text-xs font-medium transition-all ${
              selectedMode === "ANONYMOUS"
                ? "bg-gradient-to-r from-green-500/20 to-emerald-400/20 border border-green-400/50 text-white"
                : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            Quick
          </button>
          <button
            onClick={() => handleModeSelect("MEMBER")}
            className={`px-3 py-3 rounded-lg text-xs font-medium transition-all ${
              selectedMode === "MEMBER"
                ? "bg-gradient-to-r from-violet-500/20 to-purple-400/20 border border-violet-400/50 text-white"
                : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            With Birthday
          </button>
        </div>
      </div>

      {/* Input Section */}
      {selectedMode !== "GUEST" && (
        <div className="mb-6">
          <div className="text-center mb-4">
            <h1 className="text-lg font-semibold text-white">
              {selectedMode === "MEMBER" ? "Enter your bio-signature" : "Enter a 3-digit sequence"}
            </h1>
            <p className="mt-1 text-xs text-white/60">
              {selectedMode === "MEMBER"
                ? "Your birthday establishes the baseline. Add optional digits for specific intention."
                : "Three digits. One intention. Let the pattern settle before it speaks."}
            </p>
          </div>

          {renderInputs()}
          {selectedMode === "MEMBER" && renderBirthdayInput()}
        </div>
      )}

      {/* Dreamcatcher Animation */}
      <div className="relative">
        {renderPulseRing()}
        {renderDreamcatcher()}

        {/* Status overlay for tuning phase */}
        {phase === "tuning" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm font-medium text-white/90">
                {selectedMode === "GUEST" ? "Reading environmental patterns..." : "Calibrating resonance..."}
              </div>
              <div className="mt-1 text-xs text-white/60">
                {selectedMode === "GUEST" ? "Using date and time" : "Tuning to your input"}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}