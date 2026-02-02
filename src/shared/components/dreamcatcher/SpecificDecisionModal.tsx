"use client";

import { useEffect, useState } from "react";
import NebulaSpinner from "@/shared/components/dreamcatcher/NebulaSpinner";
import { getContextualAdvice, DecisionDomain, EnergyLevel } from "@/shared/lib/dreamcatcher/contextual-engine";
import { TodayState } from "@/shared/lib/dreamcatcher/decision-dashboard";

interface SpecificDecisionModalProps {
    open: boolean;
    todayState: TodayState;
    onClose: () => void;
}

const TOPICS: { id: DecisionDomain; icon: string; label: string; desc: string }[] = [
    {
        id: 'CAREER_WORK',
        icon: '💼',
        label: 'Career & Work',
        desc: 'Partnerships, projects, interviews, proposals'
    },
    {
        id: 'MONEY_FINANCE',
        icon: '💰',
        label: 'Money & Finance',
        desc: 'Investments, purchases, negotiations, contracts'
    },
    {
        id: 'RELATIONSHIP_SOCIAL',
        icon: '❤️',
        label: 'Relationships',
        desc: 'Communication, boundaries, connecting, dates'
    },
    {
        id: 'PERSONAL_LIFE',
        icon: '🌱',
        label: 'Personal Life',
        desc: 'Habits, big life changes, self-improvement'
    },
    {
        id: 'ENVIRONMENT_MOVEMENT',
        icon: '🛫',
        label: 'Travel & Change',
        desc: 'Moving, trips, changing environments'
    },
];

export default function SpecificDecisionModal({ open, todayState, onClose }: SpecificDecisionModalProps) {
    const [selectedTopic, setSelectedTopic] = useState<DecisionDomain | null>(null);
    const [result, setResult] = useState<ReturnType<typeof getContextualAdvice> | null>(null);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
            // Reset state on open based on prop? No, keep it fresh or remember last? Let's reset.
            setSelectedTopic(null);
            setResult(null);
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (open) {
            window.addEventListener('keydown', handleEscape);
            return () => window.removeEventListener('keydown', handleEscape);
        }
    }, [open, onClose]);

    const handleTopicSelect = (topicId: DecisionDomain) => {
        setSelectedTopic(topicId);
        const advice = getContextualAdvice(todayState, topicId);
        setResult(advice);
    };

    const handleBack = () => {
        setSelectedTopic(null);
        setResult(null);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.3)] bg-black">

                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        {selectedTopic && (
                            <button
                                onClick={handleBack}
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                            >
                                <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold tracking-wider text-white">
                                {selectedTopic ? TOPICS.find(t => t.id === selectedTopic)?.label : "Specific Guide"}
                            </h2>
                            <p className="text-xs text-white/50 tracking-wide uppercase">
                                {selectedTopic ? `Analysis for ${todayState} State` : "Choose a domain to analyze"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
                    >
                        <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content Area */}
                <div className="relative z-10 flex-1 overflow-y-auto p-6 custom-scrollbar">

                    {/* VIEW: TOPIC SELECTION */}
                    {!selectedTopic && (
                        <div className="grid grid-cols-1 gap-3">
                            {TOPICS.map((topic) => (
                                <button
                                    key={topic.id}
                                    onClick={() => handleTopicSelect(topic.id)}
                                    className="group relative flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 text-left"
                                >
                                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/5 text-2xl group-hover:scale-105 transition-transform">
                                        {topic.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-white group-hover:text-violet-200 transition-colors">
                                            {topic.label}
                                        </h3>
                                        <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                                            {topic.desc}
                                        </p>
                                    </div>
                                    <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity text-white/30">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* VIEW: RESULT DISPLAY */}
                    {selectedTopic && result && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                            {/* Energy Level Indicator */}
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
                                    <span className="text-xs font-medium text-white/80 tracking-widest uppercase">
                                        Energy Level: {result.energyLevel.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>

                            {/* GREEN LIGHT - Support Direction */}
                            <div className="relative rounded-2xl overflow-hidden group">
                                <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
                                <div className="relative p-5 border border-emerald-500/20 rounded-2xl">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20 text-emerald-300 font-bold text-sm">
                                            ✓
                                        </div>
                                        <h3 className="text-lg font-bold text-emerald-100/90 tracking-wide">
                                            Support Direction
                                        </h3>
                                    </div>
                                    <p className="text-emerald-100/70 text-sm leading-relaxed pl-1">
                                        {result.advice.support}
                                    </p>
                                </div>
                            </div>

                            {/* RED LIGHT - Caution Direction */}
                            <div className="relative rounded-2xl overflow-hidden group">
                                <div className="absolute inset-0 bg-rose-500/5 group-hover:bg-rose-500/10 transition-colors duration-500"></div>
                                <div className="relative p-5 border border-rose-500/20 rounded-2xl">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/20 text-rose-300 font-bold text-sm">
                                            ✕
                                        </div>
                                        <h3 className="text-lg font-bold text-rose-100/90 tracking-wide">
                                            Caution Direction
                                        </h3>
                                    </div>
                                    <p className="text-rose-100/70 text-sm leading-relaxed pl-1">
                                        {result.advice.caution}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 text-center">
                                <p className="text-xs text-white/30 max-w-sm mx-auto">
                                    This guidance is based on the current energetic pattern ({todayState}) and how it typically affects {TOPICS.find(t => t.id === selectedTopic)?.label.toLowerCase()}.
                                </p>
                            </div>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
