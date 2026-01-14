"use client";

import { useEffect, useState } from "react";
import CircularEnergyRing from "@/shared/components/dreamcatcher/CircularEnergyRing";

type Props = {
  open: boolean;
  status: string;
  oracle: string;
  supported: string[];
  adjustment: string;
  disclaimer: string;
  hexagram?: {
    upper_trigram: number;
    lower_trigram: number;
    moving_position: number;
    upper_name: string;
    lower_name: string;
  };
  l2_interpretation?: {
    theme: string;
    resonance_pattern: string;
    bio_field_intensity: number;
    state_description: string;
    friction_point: string;
    strategic_recalibration: string[];
    optimal_window: string;
    execution_blueprint: string[];
  };
  onClose: () => void;
};

export default function AtomicCard({
  open,
  status,
  oracle,
  supported,
  adjustment,
  disclaimer,
  hexagram,
  l2_interpretation,
  onClose,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [showL2, setShowL2] = useState(false);

  console.log('AtomicCard render:', { open, status, oracle, hexagram, showL2 });

  // Reset showL2 when card opens
  useEffect(() => {
    if (open) {
      setShowL2(false);
    }
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      console.log('AtomicCard is open, adding Escape listener');
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [open, onClose]);

  const handleCopy = () => {
    const hexagramInfo = hexagram ? `\nHexagram: ${hexagram.upper_name} over ${hexagram.lower_name} (Moving Position: ${hexagram.moving_position})` : '';
    const text = `Dreamcatcher Reading • ${new Date().toLocaleDateString()}\n\nState: ${status}${hexagramInfo}\n\n${oracle}\n\nAligned Actions:\n${supported.map(s => '• ' + s).join('\n')}\n\nRecommended Action:\n${adjustment}\n\n${disclaimer}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* UX Integrity Lock: Background disabled - only explicit close allowed */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      {/* Scrollable container for long content */}
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-white/12 bg-white/8 p-5 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
           style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-widest text-white/70">
              Current State
            </div>
            <div className="mt-2 text-xl font-semibold leading-tight text-white">{status}</div>

            {/* Hexagram Information */}
            {hexagram && (
              <div className="mt-1 text-xs text-white/60">
                {hexagram.upper_name} over {hexagram.lower_name} • Position {hexagram.moving_position}
              </div>
            )}
          </div>

          <button
            className="rounded-full border border-white/14 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
            onClick={onClose}
          >
            Done
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="text-sm leading-6 text-white/80">{oracle}</div>
        </div>

        <div className="mt-4">
          <div className="text-[11px] font-medium uppercase tracking-widest text-white/60 mb-2">
            Resonance Insight
          </div>
          <ul className="space-y-1">
            {supported.map((item, index) => (
              <li key={index} className="text-sm text-white/70">
                • {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <div className="text-[11px] font-medium uppercase tracking-widest text-white/60 mb-2">
            Recommended Action
          </div>
          <div className="rounded-lg border border-white/8 bg-white/5 px-3 py-2">
            <div className="text-xs leading-5 text-white/80">{adjustment}</div>
          </div>
        </div>

        {/* L2 Deep Reading - System Analysis */}
        {l2_interpretation && (
          <div className="mt-6">
            {!showL2 ? (
              <button
                onClick={() => setShowL2(true)}
                className="w-full text-center text-xs uppercase tracking-wider text-white/40 hover:text-white/60 transition-colors duration-300 border-t border-white/10 pt-4"
              >
                Deep System Analysis →
              </button>
            ) : (
              <div className="border-t border-white/10 pt-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Bio-field Intensity */}
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-widest text-white/40 mb-1">
                    Bio-field Intensity
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-500"
                        style={{ width: `${l2_interpretation.bio_field_intensity}%` }}
                      />
                    </div>
                    <div className="text-sm font-bold text-white">{l2_interpretation.bio_field_intensity}%</div>
                  </div>
                </div>

                {/* State Description */}
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-widest text-white/40 mb-2">
                    What's Happening
                  </div>
                  <div className="text-sm leading-relaxed text-white/90">
                    {l2_interpretation.state_description}
                  </div>
                </div>

                {/* Theme */}
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-widest text-white/40 mb-1">
                    Pattern
                  </div>
                  <div className="text-sm font-medium text-white/90">{l2_interpretation.theme}</div>
                </div>

                {/* Resonance Pattern */}
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-widest text-white/40 mb-2">
                    System Resonance
                  </div>
                  <div className="text-xs leading-relaxed text-white/70">
                    {l2_interpretation.resonance_pattern}
                  </div>
                </div>

                {/* Friction Point */}
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-widest text-amber-300/80 mb-2">
                    Focus Point
                  </div>
                  <div className="text-xs text-amber-200/90">
                    {l2_interpretation.friction_point}
                  </div>
                </div>

                {/* Strategic Recalibration */}
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-widest text-white/40 mb-2">
                    Strategic Moves
                  </div>
                  <ul className="space-y-1">
                    {l2_interpretation.strategic_recalibration.map((action, idx) => (
                      <li key={idx} className="text-xs text-white/80 flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Execution Blueprint */}
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-widest text-white/40 mb-2">
                    Your Blueprint (Next 48 Hours)
                  </div>
                  <div className="space-y-2">
                    {l2_interpretation.execution_blueprint.map((step, idx) => (
                      <div key={idx} className="text-xs text-white/80 flex items-start gap-2 bg-white/5 p-2 rounded">
                        <span className="text-violet-400 font-bold">{idx + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optimal Window */}
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-widest text-white/40 mb-2">
                    Best Use of This Window
                  </div>
                  <div className="text-xs leading-relaxed text-white/70">
                    {l2_interpretation.optimal_window}
                  </div>
                </div>

                {/* Collapse button */}
                <button
                  onClick={() => setShowL2(false)}
                  className="w-full text-center text-[10px] uppercase tracking-wider text-white/30 hover:text-white/50 transition-colors duration-200"
                >
                  ← Back to overview
                </button>
              </div>
            )}
          </div>
        )}

        {/* Capture Insight */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleCopy}
            className="text-[10px] uppercase tracking-wider text-white/40 hover:text-white/60 transition-colors duration-200"
          >
            {copied ? '✓ Copied' : 'Capture Insight'}
          </button>
        </div>

        {/* Global Disclaimer */}
        <div className="mt-4 text-xs text-white/55 border-t border-white/10 pt-3">
          {disclaimer}
        </div>
      </div>
    </div>
  );
}
