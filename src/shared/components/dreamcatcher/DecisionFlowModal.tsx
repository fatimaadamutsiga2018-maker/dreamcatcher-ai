"use client";

import { useEffect, useState, useRef } from "react";
import NebulaSpinner from "@/shared/components/dreamcatcher/NebulaSpinner";
import EnergyTuner from "@/shared/components/dreamcatcher/EnergyTuner";
import { getContextualAdvice, DecisionDomain, EnergyLevel, classifyDomain } from "@/shared/lib/dreamcatcher/contextual-engine";
import { TodayState } from "@/shared/lib/dreamcatcher/decision-dashboard";
import { useReadingHistory, ReadingRecord } from "@/shared/lib/dreamcatcher/useReadingHistory";

interface DecisionFlowModalProps {
    open: boolean;
    todayState: TodayState;
    onClose: () => void;
    onOpenPersonal?: () => void;
}

// Domain Metadata for Result Display
const DOMAIN_INFO: Record<DecisionDomain, { icon: string; label: string }> = {
    'CAREER_WORK': { icon: '💼', label: 'Career & Work' },
    'MONEY_FINANCE': { icon: '💰', label: 'Money & Finance' },
    'RELATIONSHIP_SOCIAL': { icon: '❤️', label: 'Relationships & Social' },
    'PERSONAL_LIFE': { icon: '🌱', label: 'Personal Life' },
    'ENVIRONMENT_MOVEMENT': { icon: '🛫', label: 'Travel & Environment' },
    'GENERAL': { icon: '🌍', label: 'General Energy' },
    'QUICK': { icon: '⚡', label: 'Quick Check' },
};

type ViewState = 'SELECTION' | 'DECISION_INPUT' | 'TUNING' | 'ANALYZING' | 'RESULT_SIMPLE' | 'RESULT_DETAILED' | 'HISTORY';

export default function DecisionFlowModal({ open, todayState, onClose, onOpenPersonal }: DecisionFlowModalProps) {
    const [view, setView] = useState<ViewState>('SELECTION');
    const [selectedTopic, setSelectedTopic] = useState<DecisionDomain | null>(null);
    const [userQuestion, setUserQuestion] = useState("");
    const [result, setResult] = useState<ReturnType<typeof getContextualAdvice> | null>(null);
    const [showDetailed, setShowDetailed] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // History Hook
    const { readings, saveReading } = useReadingHistory();

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    // Reset on open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
            setView('SELECTION');
            setSelectedTopic(null);
            setUserQuestion("");
            setResult(null);
            setShowDetailed(false);
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    // Close on Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        if (open) window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [open, onClose]);

    // HANDLERS
    const handleDecisionClick = () => {
        setUserQuestion(""); // Clear previous input
        setView('DECISION_INPUT');
    };

    const handleEnergyClick = () => {
        setUserQuestion(""); // Empty question signals this is Energy State check
        setView('TUNING');
    };

    const handleInputNext = () => {
        if (!userQuestion.trim()) return;
        setView('TUNING');
    };

    const processReading = (topicId: DecisionDomain) => {
        setSelectedTopic(topicId);
        setView('ANALYZING');

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            const advice = getContextualAdvice(todayState, topicId);
            setResult(advice);

            // Save to History (store Question if available)
            if (advice && advice.advice) {
                saveReading({
                    domain: topicId,
                    energyLevel: advice.energyLevel,
                    todayState: todayState,
                    conclusion: advice.advice.conclusion
                });
            }

            setView('RESULT_SIMPLE');
            setShowDetailed(false);
        }, 3000);
    };

    const handleTuningComplete = (code: string, mode: string, birthday?: string) => {
        // Logic Branch: Input vs No Input
        if (userQuestion.trim()) {
            // 1. Decision Flow: Classify based on input
            const classifiedDomain = classifyDomain(userQuestion);
            processReading(classifiedDomain);
        } else {
            // 2. Energy State Flow: Use GENERAL (described as "Me")
            processReading('GENERAL');
        }
    };

    const handleCheckAnother = () => {
        setView('SELECTION');
        setSelectedTopic(null);
        setUserQuestion("");
        setResult(null);
        setShowDetailed(false);
    };

    const handleHistoryClick = () => {
        setView('HISTORY');
    };

    const handleHistoryItemClick = (record: ReadingRecord) => {
        const advice = getContextualAdvice(record.todayState, record.domain);
        setResult(advice);
        setSelectedTopic(record.domain);
        setUserQuestion(""); // No specific question for history items unless we saved it (not yet)
        setView('RESULT_SIMPLE');
        setShowDetailed(false);
    }

    if (!open) return null;

    const currentDomainInfo = selectedTopic ? DOMAIN_INFO[selectedTopic] : DOMAIN_INFO['GENERAL'];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

            {/* Modal Container */}
            <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.3)] bg-black">

                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950"></div>

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        {view !== 'SELECTION' && (
                            <button
                                onClick={handleCheckAnother}
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                            >
                                <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}
                        <h2 className="text-lg font-bold tracking-wider text-white uppercase">
                            {view === 'SELECTION' && "Timing Check"}
                            {view === 'DECISION_INPUT' && "What's on your mind?"}
                            {view === 'TUNING' && "Calibrate"}
                            {view.startsWith('RESULT') && (userQuestion ? "Decision Timing" : "Energy State")}
                            {view === 'HISTORY' && "Past Readings"}
                        </h2>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* CONTENT AREA */}
                <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar min-h-[500px]">

                    {/* VIEW 1: SELECTION (2 Entrances) */}
                    {view === 'SELECTION' && (
                        <div className="p-6 h-full flex flex-col justify-center">
                            <div className="grid gap-4 max-w-sm mx-auto w-full">
                                {/* Option 1: Decision Timing */}
                                <button
                                    onClick={handleDecisionClick}
                                    className="group relative p-8 rounded-3xl bg-gradient-to-br from-violet-500/10 to-blue-500/5 border border-white/10 hover:border-violet-500/50 hover:from-violet-500/20 transition-all text-center overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative z-10">
                                        <span className="text-4xl mb-4 block">🔮</span>
                                        <h3 className="text-xl font-bold text-white mb-2">Check My Timing<br />for a Decision</h3>
                                        <p className="text-sm text-white/50">Thinking about doing something?<br />Check if the timing is right.</p>
                                    </div>
                                </button>

                                {/* Option 2: Energy State */}
                                <button
                                    onClick={handleEnergyClick}
                                    className="group relative p-8 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-center"
                                >
                                    <div className="relative z-10">
                                        <span className="text-4xl mb-4 block">⚡</span>
                                        <h3 className="text-xl font-bold text-white mb-2">Check My Energy State</h3>
                                        <p className="text-sm text-white/50">Not about a decision.<br />Just your current inner state.</p>
                                    </div>
                                </button>
                            </div>

                            <div className="text-center pt-8 mt-4">
                                <button
                                    onClick={handleHistoryClick}
                                    className="text-xs text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto"
                                >
                                    <span className="text-lg">📁</span> View My Past Readings
                                </button>
                            </div>
                        </div>
                    )}

                    {/* VIEW: DECISION INPUT */}
                    {view === 'DECISION_INPUT' && (
                        <div className="p-8 max-w-lg mx-auto h-full flex flex-col">
                            <label htmlFor="decision-question" className="block text-white text-lg font-bold mb-4">What are you thinking about?</label>

                            <textarea
                                id="decision-question"
                                name="decision-question"
                                value={userQuestion}
                                onChange={(e) => setUserQuestion(e.target.value)}
                                placeholder="e.g. Talk to my manager, launch a project..."
                                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-colors resize-none mb-6"
                                autoFocus
                            />

                            <div className="mb-8">
                                <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Examples</p>
                                <div className="flex flex-wrap gap-2">
                                    {["Talk to my manager", "Launch my project", "Make a big purchase", "Go on a trip"].map(ex => (
                                        <button
                                            key={ex}
                                            onClick={() => setUserQuestion(ex)}
                                            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-white/60 transition-colors"
                                        >
                                            {ex}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto text-center">
                                <button
                                    onClick={handleInputNext}
                                    disabled={!userQuestion.trim()}
                                    className="w-full py-4 rounded-xl bg-white text-black font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {/* VIEW: TUNING */}
                    {view === 'TUNING' && (
                        <div className="flex flex-col items-center justify-center p-6 min-h-[400px]">
                            <EnergyTuner onTuned={handleTuningComplete} />
                            <div className="mt-8 text-center">
                                <button
                                    onClick={handleCheckAnother}
                                    className="text-white/30 hover:text-white text-xs px-4 py-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* VIEW: ANALYZING */}
                    {view === 'ANALYZING' && (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
                            <div className="relative w-32 h-32 mb-8 opacity-80 scale-125">
                                <NebulaSpinner />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 tracking-wide animate-pulse">
                                tuning into the field...
                            </h3>
                            <p className="text-white/40 text-sm">
                                {userQuestion ? "aligning your question with today's energy" : "measuring your current resonance"}
                            </p>
                        </div>
                    )}

                    {/* VIEW: RESULTS */}
                    {(view === 'RESULT_SIMPLE' || view === 'RESULT_DETAILED') && result && result.advice && (
                        <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                            {/* 1. New Logic Header: Domain & Timing Status */}
                            <div className="text-center mb-8 border-b border-white/5 pb-8">
                                {userQuestion && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 mb-4">
                                        <span>{currentDomainInfo.icon}</span>
                                        <span>This relates to: <strong>{currentDomainInfo.label}</strong></span>
                                    </div>
                                )}

                                <h4 className="text-xs font-bold text-white/40 tracking-widest uppercase mb-2">
                                    {userQuestion ? "TIMING SIGNAL" : "YOUR CURRENT STATE"}
                                </h4>
                                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                    {userQuestion ? (
                                        // For Decisions: Simplify conclusion to "Good / Caution / Wait" style if possible, 
                                        // or just show the conclusion. The prompt asked for "Timing: GOOD TO MOVE". 
                                        // Our engine returns full sentences. We will display the full sentence for now 
                                        // as it's more nuanced than just "Good".
                                        result.advice.conclusion
                                    ) : (
                                        // For Energy State: "Your Current Energy: LOW" (mapped from engine)
                                        // Engine text: "The energy field is open..." or "Recharge is..."
                                        // We might want to construct a title based on Level.
                                        <span>
                                            Energy Level: <span className={
                                                result.energyLevel === 'FLOW_HIGH' ? "text-emerald-400" :
                                                    result.energyLevel === 'BALANCED' ? "text-amber-400" :
                                                        "text-rose-400"
                                            }>{result.energyLevel.replace('_', ' ')}</span>
                                        </span>
                                    )}
                                </h2>
                                {!userQuestion && (
                                    <p className="text-white/70 mt-4 italic">"{result.advice.conclusion}"</p>
                                )}
                            </div>

                            {/* 2. Short Explanation (Support/Caution simplified) */}
                            <div className="space-y-4 mb-8">
                                {/* 2 DOs */}
                                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5">
                                    <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3">
                                        Best Actions
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.advice.support.items.map((item, idx) => (
                                            <li key={idx} className="text-emerald-100/90 text-sm flex gap-3">
                                                <span className="text-emerald-500">✓</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* 1 AVOID */}
                                <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-5">
                                    <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-3">
                                        Avoid
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.advice.caution.items.slice(0, 1).map((item, idx) => (
                                            <li key={idx} className="text-rose-100/90 text-sm flex gap-3">
                                                <span className="text-rose-500">✕</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* 3. Detailed Guidance Toggle */}
                            <div className="text-center">
                                <button
                                    onClick={() => setShowDetailed(!showDetailed)}
                                    className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium text-sm hover:bg-white/20 transition-all active:scale-95"
                                >
                                    {showDetailed ? "Hide Detailed Guidance" : "✨ See Detailed Guidance"}
                                </button>
                            </div>

                            {/* DETAILED VIEW */}
                            {showDetailed && (
                                <div className="mt-8 pt-8 border-t border-white/5 space-y-8 animate-in fade-in duration-500 text-left">

                                    {result.advice.detailed ? (
                                        <>
                                            {/* Energy Overview */}
                                            <div>
                                                <h4 className="text-xs font-bold text-violet-300 tracking-widest uppercase mb-2">Energy Overview</h4>
                                                <p className="text-sm text-white/80 leading-relaxed">
                                                    {result.advice.detailed.energyOverview}
                                                </p>
                                            </div>

                                            {/* What This Means */}
                                            <div>
                                                <h4 className="text-xs font-bold text-blue-300 tracking-widest uppercase mb-2">
                                                    {userQuestion ? "What This Means for use" : "What This Means for You"}
                                                </h4>
                                                <p className="text-sm text-white/80 leading-relaxed">
                                                    {result.advice.detailed.whatThisMeans}
                                                </p>
                                            </div>

                                            {/* Full Smart Way / Avoid */}
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="bg-white/5 rounded-xl p-4">
                                                    <h4 className="text-xs font-bold text-white/50 mb-2">Smart Way</h4>
                                                    <ul className="text-sm text-white/70 space-y-1">
                                                        {result.advice.detailed.smartWay.map((it, i) => <li key={i}>• {it}</li>)}
                                                    </ul>
                                                </div>
                                                <div className="bg-white/5 rounded-xl p-4">
                                                    <h4 className="text-xs font-bold text-white/50 mb-2">Watch Out</h4>
                                                    <ul className="text-sm text-white/70 space-y-1">
                                                        {result.advice.detailed.avoid.map((it, i) => <li key={i}>• {it}</li>)}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Micro Adjustment */}
                                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                                                <h4 className="text-xs font-bold text-white/40 tracking-widest uppercase mb-2">
                                                    Micro Adjustment
                                                </h4>
                                                <p className="text-lg text-white font-medium italic font-serif">
                                                    "{result.advice.detailed.microAdjustment}"
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-center text-white/40">Detailed guidance not available.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* HISTORY VIEW */}
                    {view === 'HISTORY' && (
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-center mb-6">
                                <h3 className="text-white text-lg font-bold">Past Readings</h3>
                            </div>
                            {readings.length === 0 ? (
                                <div className="text-center py-10 text-white/40"><p>No readings recorded yet.</p></div>
                            ) : (
                                <div className="space-y-3">
                                    {readings.map((record) => (
                                        <button
                                            key={record.id}
                                            onClick={() => handleHistoryItemClick(record)}
                                            className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs text-violet-300 uppercase tracking-wider font-bold">
                                                    {record.domain === 'GENERAL' ? 'Energy State' : DOMAIN_INFO[record.domain]?.label}
                                                </span>
                                                <span className="text-xs text-white/30">{new Date(record.timestamp).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-white/70 line-clamp-1 italic">"{record.conclusion}"</p>
                                                <span className={`text-[10px] px-2 py-1 rounded bg-black/50 border border-white/10 
                                            ${record.energyLevel === 'FLOW_HIGH' ? 'text-emerald-400' :
                                                        record.energyLevel === 'BALANCED' ? 'text-amber-400' : 'text-rose-400'}`}>
                                                    {record.energyLevel}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                {(view === 'RESULT_SIMPLE' || view === 'RESULT_DETAILED') && (
                    <div className="p-4 border-t border-white/5 bg-white/[0.02]">
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={handleCheckAnother}
                                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                            >
                                <span>🔁</span> Check Another
                            </button>
                            <div className="grid grid-cols-2 gap-2">
                                <button onClick={handleHistoryClick} className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 text-xs transition-colors">📁 Past Readings</button>
                                <button onClick={onClose} className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 text-xs transition-colors">🏠 Home</button>
                            </div>
                        </div>
                    </div>
                )}
                {view === 'HISTORY' && (
                    <div className="p-4 border-t border-white/5 bg-white/[0.02] text-center">
                        <button onClick={handleCheckAnother} className="text-white/50 hover:text-white text-xs">Back to Selection</button>
                    </div>
                )}
            </div>
        </div>
    );
}
