"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import EnergyTuner from "@/shared/components/dreamcatcher/EnergyTuner";
import AtomicCard from "@/shared/components/dreamcatcher/AtomicCard";
import NebulaBackground from "@/shared/components/dreamcatcher/NebulaBackground";
import PersonalModal from "@/shared/components/dreamcatcher/PersonalModal";
import AuthModal from "@/shared/components/dreamcatcher/AuthModal";
import UserMenu from "@/shared/components/dreamcatcher/UserMenu";
import { calculateGuestMode, calculateAnonymousMode, calculateMemberMode, calculateSeedSum, calculateBirthdaySum } from "@/shared/lib/dreamcatcher/engine-v3";
import { USER_MODES, TWELVE_OFFICERS, calculateTwelveOfficer } from "@/shared/lib/dreamcatcher/constants";
import { generateAmbientEnergyField } from "@/shared/lib/dreamcatcher/ambient-energy";
import { getTodayState, generatePermissionStatement, generateTacticalCards, type TodayState } from "@/shared/lib/dreamcatcher/decision-dashboard";
import { getActionAdvice } from "@/shared/lib/dreamcatcher/worldview-copy-v1";
import type { TriFactorResult } from "@/shared/lib/dreamcatcher/engine-v3";

type CardData = {
  mode: keyof typeof USER_MODES;
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
  timestamp?: number;
  seed?: string;
};

const STORAGE_KEY = 'dreamcatcher-recent-reading';
const STORAGE_VERSION = 'v1';

// ============================================
// Wisdom Quotes Library
// ============================================

interface Quote {
  text: string;
  category: 'philosophy' | 'timing' | 'rest' | 'action' | 'wealth';
}

const WISDOM_QUOTES: Quote[] = [
  // Philosophy - Core system beliefs
  { text: "Align with the field. Flow with the day.", category: 'philosophy' },
  { text: "Don't just act. Respond to the rhythm.", category: 'philosophy' },
  { text: "Effort has a cost. Timing decides whether that cost pays back.", category: 'timing' },
  { text: "You don't need confidence. You need the right moment.", category: 'timing' },
  { text: "Wealth follows alignment, not just effort.", category: 'wealth' },
  { text: "Opportunities don't disappear; they just move to those who are ready.", category: 'wealth' },
  { text: "Rest isn't weakness. It's waiting for the slope to change.", category: 'rest' },
  { text: "Sometimes the smartest move isn't doing more—it's choosing a better moment to act.", category: 'timing' },
  { text: "Not every day is designed for action. Some days are designed for recovery.", category: 'rest' },
  { text: "Momentum comes before confidence, not after.", category: 'action' },
];

// Get 2 random quotes (different from each other)
function getRandomQuotes(count: number = 2): Quote[] {
  const shuffled = [...WISDOM_QUOTES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ============================================
// Simple Human Language Copy V2.0
// Maps system states to user-friendly messages
// ============================================

interface StateCopy {
  label: string;      // Simple Label - large, bold, gradient
  mainLine: string;   // Main Line - medium, bright (gold/white)
  why: string;        // Why - small gray, bottom
  whatToDo: string;   // What to do - small gray, bottom
}

const SIMPLE_STATE_COPY: Record<TodayState, StateCopy> = {
  INITIATE: {
    label: "A Good Day to Start",
    mainLine: "You aren't behind—this is the perfect moment to begin.",
    why: "Today, the energy favors first steps over perfect plans.",
    whatToDo: "Start small. Don't wait until you feel 100% ready; just launch.",
  },
  ACCELERATE: {
    label: "Keep the Momentum",
    mainLine: "You're already on the right track—just keep going.",
    why: "Momentum is on your side right now. Stopping would be a waste of energy.",
    whatToDo: "Double down on what's already working. Avoid changing direction.",
  },
  CONSOLIDATE: {
    label: "Focus & Secure",
    mainLine: "You don't need more—you just need to protect what you have.",
    why: "Today's energy supports refining and securing your current position.",
    whatToDo: "Organize and review. Strengthen your foundation instead of expanding.",
  },
  ADJUST: {
    label: "Course Correction",
    mainLine: "Something is slightly off, and that's perfectly fine.",
    why: "Today is about fine-tuning your path, not making big, dramatic moves.",
    whatToDo: "Make small, smart changes. Don't throw everything away and restart.",
  },
  REST: {
    label: "Listen & Recharge",
    mainLine: "You aren't failing—today simply isn't a day for pushing.",
    why: "Pushing now will cost you more energy than it's worth.",
    whatToDo: "Pause your big decisions. Rest without guilt; you'll be faster tomorrow.",
  },
};

export default function Home() {
  const [cardOpen, setCardOpen] = useState(false);
  const [personalModalOpen, setPersonalModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  // Track flip state for each tactical card individually
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const toggleCardFlip = (cardKey: string) => {
    setFlippedCards(prev => ({ ...prev, [cardKey]: !prev[cardKey] }));
  };

  // Random wisdom quotes (client-side only to avoid hydration mismatch)
  const [dailyQuotes, setDailyQuotes] = useState<Quote[]>([]);

  const [cardData, setCardData] = useState<CardData>({
    mode: "GUEST",
    status: "",
    oracle: "",
    supported: [],
    adjustment: "",
    disclaimer: "",
  });
  const [recentReading, setRecentReading] = useState<CardData | null>(null);
  const [currentDate] = useState(new Date());

  // Generate random quotes on client side
  useEffect(() => {
    setDailyQuotes(getRandomQuotes(2));
  }, []);

  // User calibration state
  const [userCalibration, setUserCalibration] = useState<{
    calibrated: boolean;
    mode: keyof typeof USER_MODES;
    code?: string;
    birthday?: string;
    energyColor?: 'kinetic-green' | 'stillness-violet' | 'neutral';
    triFactorResult?: TriFactorResult;
  }>({
    calibrated: false,
    mode: "GUEST",
  });

  // Generate Ambient Energy Field data
  const ambientField = generateAmbientEnergyField(currentDate);
  const currentOfficerKey = calculateTwelveOfficer(currentDate);
  const currentOfficer = TWELVE_OFFICERS[currentOfficerKey];

  // Decision Dashboard V1.0 Logic
  const todayState: TodayState = getTodayState(currentOfficer.name);
  const permissionStatement = generatePermissionStatement(todayState);
  const tacticalCards = generateTacticalCards(ambientField.compatibility, todayState);

  // Load recent reading on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.version === STORAGE_VERSION) {
          setRecentReading(data.reading);
        }
      }
    } catch (error) {
      console.error('Failed to load recent reading:', error);
    }

    // Auto-trigger Guest Mode reading on mount
    try {
      const result = calculateGuestMode(currentDate);

      const newCardData: CardData = {
        mode: result.mode,
        status: result.l1_card.status,
        oracle: result.l1_card.oracle,
        supported: result.l1_card.supported,
        adjustment: result.l1_card.adjustment,
        disclaimer: result.l1_card.disclaimer,
        hexagram: {
          upper_trigram: result.hexagram.upper_trigram,
          lower_trigram: result.hexagram.lower_trigram,
          moving_position: result.hexagram.moving_position,
          upper_name: result.hexagram.upper_name,
          lower_name: result.hexagram.lower_name,
        },
        l2_interpretation: {
          theme: result.l2_interpretation.theme,
          resonance_pattern: result.l2_interpretation.resonance_pattern,
          bio_field_intensity: result.l2_interpretation.bio_field_intensity,
          state_description: result.l2_interpretation.state_description,
          friction_point: result.l2_interpretation.friction_point,
          strategic_recalibration: result.l2_interpretation.strategic_recalibration,
          optimal_window: result.l2_interpretation.optimal_window,
          execution_blueprint: result.l2_interpretation.execution_blueprint,
        },
        timestamp: result.timestamp,
        seed: `GUEST-${currentDate.toISOString()}`,
      };

      setCardData(newCardData);
      saveReading(newCardData);
    } catch (error) {
      console.error('Guest mode calculation failed:', error);
    }
  }, []);

  // Save reading to localStorage
  const saveReading = useCallback((data: CardData) => {
    try {
      const storageData = {
        version: STORAGE_VERSION,
        reading: {
          ...data,
          timestamp: Date.now(),
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
      setRecentReading(storageData.reading);
    } catch (error) {
      console.error('Failed to save reading:', error);
    }
  }, []);

  // Calculate personalized compatibility based on Global Vibe x User State interaction
  const personalizedCompatibility = useMemo(() => {
    console.log('RELOAD Calculating personalized compatibility...');
    console.log('  - userCalibration.calibrated:', userCalibration.calibrated);
    console.log('  - userCalibration.triFactorResult:', userCalibration.triFactorResult);
    console.log('  - ambientField.compatibility:', ambientField.compatibility);

    if (!userCalibration.calibrated || !userCalibration.triFactorResult) {
      console.log('  WARNING Not calibrated, returning ambient compatibility');
      console.log('  - ambient compatibility data:', {
        business: { status: ambientField.compatibility.business.status, directive: (ambientField.compatibility.business as any).directive },
        social: { status: ambientField.compatibility.social.status, directive: (ambientField.compatibility.social as any).directive },
        strategic: { status: ambientField.compatibility.strategic.status, directive: (ambientField.compatibility.strategic as any).directive },
        action: { status: ambientField.compatibility.action.status, directive: (ambientField.compatibility.action as any).directive }
      });
      // Return ambient compatibility if not calibrated
      return ambientField.compatibility;
    }

    const triFactor = userCalibration.triFactorResult;
    const baseCompatibility = ambientField.compatibility;

    // Calculate resonance factor based on hexagram
    const upperTrigram = triFactor.hexagram.upper_trigram;
    const lowerTrigram = triFactor.hexagram.lower_trigram;
    const movingPosition = triFactor.hexagram.moving_position;

    // Trigram harmony (0-2: 2=perfect match, 0=clash)
    const trigramHarmony = upperTrigram === lowerTrigram ? 2 : 1;

    // Moving position influence (1-6: even numbers are more stable)
    const positionStability = movingPosition % 2 === 0 ? 1 : 0.5;

    // Bio-field intensity from L2 interpretation
    const bioIntensity = triFactor.l2_interpretation.bio_field_intensity / 100;

    // Calculate resonance multiplier (0.5 to 1.5)
    const resonanceMultiplier = 0.5 + (trigramHarmony * 0.3) + (positionStability * 0.2) + (bioIntensity * 0.5);

    // Note: Energy color is already set in userCalibration.state

    // Adjust each compatibility category
    const adjustStatus = (baseStatus: 'High' | 'Medium' | 'Low', resonance: number) => {
      if (resonance > 1.2) {
        return baseStatus === 'Low' ? 'Medium' : 'High';
      } else if (resonance < 0.8) {
        return baseStatus === 'High' ? 'Medium' : 'Low';
      }
      return baseStatus;
    };

    const result = {
      business: {
        status: adjustStatus(baseCompatibility.business.status, resonanceMultiplier * (upperTrigram % 2 === 0 ? 1.1 : 0.9)),
        directive: (baseCompatibility.business as any).directive,
      },
      social: {
        status: adjustStatus(baseCompatibility.social.status, resonanceMultiplier * (lowerTrigram % 2 === 0 ? 1.1 : 0.9)),
        directive: (baseCompatibility.social as any).directive,
      },
      strategic: {
        status: adjustStatus(baseCompatibility.strategic.status, resonanceMultiplier * (movingPosition <= 3 ? 1.1 : 0.9)),
        directive: (baseCompatibility.strategic as any).directive,
      },
      action: {
        status: adjustStatus(baseCompatibility.action.status, resonanceMultiplier * bioIntensity),
        directive: (baseCompatibility.action as any).directive,
      },
    };

    console.log('  OK Personalized compatibility calculated:', {
      business: { status: result.business.status, original: baseCompatibility.business.status },
      social: { status: result.social.status, original: baseCompatibility.social.status },
      strategic: { status: result.strategic.status, original: baseCompatibility.strategic.status },
      action: { status: result.action.status, original: baseCompatibility.action.status },
    });

    return result;
  }, [userCalibration.calibrated, userCalibration.triFactorResult, ambientField.compatibility]);

  const handleTuned = (code: string, mode: keyof typeof USER_MODES, birthday?: string) => {
    try {
      let result: TriFactorResult;

      switch (mode) {
        case "GUEST":
          result = calculateGuestMode(new Date());
          break;
        case "ANONYMOUS":
          const seedSum = calculateSeedSum(code);
          result = calculateAnonymousMode(seedSum, new Date());
          break;
        case "MEMBER":
          const birthdaySum = birthday ? calculateBirthdaySum(birthday) : calculateSeedSum(code);
          const intentSum = code ? calculateSeedSum(code) : undefined;
          result = calculateMemberMode(birthdaySum, intentSum, new Date());
          break;
        default:
          result = calculateAnonymousMode(calculateSeedSum(code || "123"), new Date());
      }

      const newCardData: CardData = {
        mode: result.mode,
        status: result.l1_card.status,
        oracle: result.l1_card.oracle,
        supported: result.l1_card.supported,
        adjustment: result.l1_card.adjustment,
        disclaimer: result.l1_card.disclaimer,
        hexagram: {
          upper_trigram: result.hexagram.upper_trigram,
          lower_trigram: result.hexagram.lower_trigram,
          moving_position: result.hexagram.moving_position,
          upper_name: result.hexagram.upper_name,
          lower_name: result.hexagram.lower_name,
        },
        l2_interpretation: {
          theme: result.l2_interpretation.theme,
          resonance_pattern: result.l2_interpretation.resonance_pattern,
          bio_field_intensity: result.l2_interpretation.bio_field_intensity,
          state_description: result.l2_interpretation.state_description,
          friction_point: result.l2_interpretation.friction_point,
          strategic_recalibration: result.l2_interpretation.strategic_recalibration,
          optimal_window: result.l2_interpretation.optimal_window,
          execution_blueprint: result.l2_interpretation.execution_blueprint,
        },
        timestamp: result.timestamp,
        seed: code || `${mode}-${new Date().toISOString()}`,
      };

      setCardData(newCardData);
      saveReading(newCardData);
      setCardOpen(true);

      // Store tri-factor result for calibration
      setUserCalibration({
        calibrated: true,
        mode: mode,
        code: code,
        birthday: birthday,
        triFactorResult: result,
      });
    } catch (error) {
      console.error('Tri-factor resonance calculation failed:', error);
    }
  };

  // Handle calibration from Resonance Compass
  const handleCalibrated = useCallback((code: string, mode: keyof typeof USER_MODES, birthday?: string) => {
    console.log('CALIBRATED handleCalibrated called:', { code, mode, birthday });
    try {
      let result: TriFactorResult;

      switch (mode) {
        case "ANONYMOUS":
          const seedSum = calculateSeedSum(code);
          result = calculateAnonymousMode(seedSum, new Date());
          break;
        case "MEMBER":
          const birthdaySum = birthday ? calculateBirthdaySum(birthday) : calculateSeedSum(code);
          const intentSum = code ? calculateSeedSum(code) : undefined;
          result = calculateMemberMode(birthdaySum, intentSum, new Date());
          break;
        default:
          result = calculateAnonymousMode(calculateSeedSum(code || "123"), new Date());
      }

      console.log('DATA Tri-factor result:', result);

      // Calculate energy color based on tri-factor result
      const upperTrigram = result.hexagram.upper_trigram;
      const lowerTrigram = result.hexagram.lower_trigram;
      const movingPosition = result.hexagram.moving_position;
      const bioIntensity = result.l2_interpretation.bio_field_intensity;

      const trigramHarmony = upperTrigram === lowerTrigram ? 2 : 1;
      const positionStability = movingPosition % 2 === 0 ? 1 : 0.5;

      let energyColor: 'kinetic-green' | 'stillness-violet' | 'neutral';
      if (bioIntensity > 70 && trigramHarmony >= 1) {
        energyColor = 'kinetic-green';
      } else if (bioIntensity < 50 || positionStability < 1) {
        energyColor = 'stillness-violet';
      } else {
        energyColor = 'neutral';
      }

      console.log('COLOR Energy color:', energyColor);

      // Store calibration state
      const newCalibration = {
        calibrated: true,
        mode: mode,
        code: code,
        birthday: birthday,
        energyColor: energyColor,
        triFactorResult: result,
      };

      console.log('STATE Setting user calibration:', newCalibration);
      setUserCalibration(newCalibration);

      // Force a re-render by updating card data
      const newCardData: CardData = {
        mode: result.mode,
        status: result.l1_card.status,
        oracle: result.l1_card.oracle,
        supported: result.l1_card.supported,
        adjustment: result.l1_card.adjustment,
        disclaimer: result.l1_card.disclaimer,
        hexagram: {
          upper_trigram: result.hexagram.upper_trigram,
          lower_trigram: result.hexagram.lower_trigram,
          moving_position: result.hexagram.moving_position,
          upper_name: result.hexagram.upper_name,
          lower_name: result.hexagram.lower_name,
        },
        l2_interpretation: {
          theme: result.l2_interpretation.theme,
          resonance_pattern: result.l2_interpretation.resonance_pattern,
          bio_field_intensity: result.l2_interpretation.bio_field_intensity,
          state_description: result.l2_interpretation.state_description,
          friction_point: result.l2_interpretation.friction_point,
          strategic_recalibration: result.l2_interpretation.strategic_recalibration,
          optimal_window: result.l2_interpretation.optimal_window,
          execution_blueprint: result.l2_interpretation.execution_blueprint,
        },
        timestamp: result.timestamp,
        seed: code || `${mode}-${new Date().toISOString()}`,
      };

      setCardData(newCardData);
      saveReading(newCardData);

      // Close Personal Modal after calibration
      setPersonalModalOpen(false);

      // Open the detailed reading card
      setCardOpen(true);

      console.log('SUCCESS Calibration complete, card data updated, modal closed');
    } catch (error) {
      console.error('ERROR Calibration failed:', error);
    }
  }, [saveReading]);

  const handleViewRecent = () => {
    if (recentReading) {
      setCardData(recentReading);
      setCardOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Nebula/Vortex animated background */}
      <NebulaBackground date={currentDate} />

      {/* Top Right Navigation */}
      <nav className="fixed top-0 right-0 z-50 p-4">
        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <svg className="w-4 h-4 text-white/60 group-hover:text-white/80 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span className="text-xs tracking-wider text-white/70 group-hover:text-white/90 transition-colors">BLOG</span>
          </Link>
          <UserMenu onLoginClick={() => setAuthModalOpen(true)} />
        </div>
      </nav>

      {/* Main content - Decision Dashboard V1.0 */}
      <main className="relative z-10 mx-auto min-h-screen w-full max-w-6xl px-4 py-6 flex flex-col">
        {/* TOP: Date - Anchored at Top */}
        <div className="text-center mb-4">
          <h1 className="text-xl md:text-2xl font-medium tracking-[0.2em] text-white/90">
            {currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
          </h1>
        </div>

        {/* Header - Simple Human Language V2.0 */}
        <div className="text-center mb-6">
          {/* Label - Large, Bold, Gradient */}
          <div className="mb-5 relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/40 to-amber-500/40 blur-3xl rounded-full"></div>
            <span className="relative text-5xl md:text-6xl font-bold tracking-[0.15em] text-white" style={{ textShadow: '0 0 20px rgba(139,92,246,0.8), 0 0 40px rgba(245,158,11,0.6)' }}>
              {SIMPLE_STATE_COPY[todayState].label}
            </span>
          </div>
          {/* Main Line - Medium, Bright (Gold/White) */}
          <p className="text-xl md:text-2xl text-amber-100/90 leading-relaxed max-w-3xl mx-auto font-semibold mb-6">
            {SIMPLE_STATE_COPY[todayState].mainLine}
          </p>
          {/* Why & What to do - Small gray, bottom */}
          <div className="mt-6 max-w-2xl mx-auto space-y-3">
            <div>
              <p className="text-xs text-white/40 tracking-wider mb-1">WHY</p>
              <p className="text-sm text-white/50 leading-relaxed">
                {SIMPLE_STATE_COPY[todayState].why}
              </p>
            </div>
            <div>
              <p className="text-xs text-white/40 tracking-wider mb-1">WHAT TO DO</p>
              <p className="text-sm text-white/50 leading-relaxed">
                {SIMPLE_STATE_COPY[todayState].whatToDo}
              </p>
            </div>
          </div>
        </div>

        {/* Tactical Cards - 4 Columns on Large Screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-5 max-w-5xl mx-auto">
          {(() => {
            // Get worldview content for all domains
            const worldviewBIZ = getActionAdvice(todayState, 'BIZ');
            const worldviewSOC = getActionAdvice(todayState, 'SOC');
            const worldviewSTRAT = getActionAdvice(todayState, 'STRAT');
            const worldviewACT = getActionAdvice(todayState, 'ACT');

            const subtitleMapping: Record<string, string> = {
              BIZ: "Money & Growth",
              SOC: "People & Circle",
              STRAT: "Thinking & Focus",
              ACT: "Energy & Speed",
            };

            const logicTagMapping: Record<string, string> = {
              BIZ: "Work, money, and results",
              SOC: "Who you talk to and how",
              STRAT: "Decisions and direction",
              ACT: "Momentum and speed",
            };

            const simpleDescriptions: Record<string, { tagline: string; judgment: string; explanation: string; bestMove: string }> = {
              BIZ: {
                tagline: "Money & Growth",
                judgment: "This is not a risky money day. Small, practical moves work better than big bets.",
                explanation: "If you push too hard, returns may shrink instead of grow. Steady progress compounds faster today.",
                bestMove: "Do something useful, not something flashy.",
              },
              SOC: {
                tagline: "People & Circle",
                judgment: "You don't need everyone today. One right conversation beats ten random ones.",
                explanation: "Your energy is better spent listening than explaining. Quality connection matters more than exposure.",
                bestMove: "Stay selective. Say less, mean more.",
              },
              STRAT: {
                tagline: "Vision & Focus",
                judgment: "Your thinking is clear enough. Don't over-adjust just to feel busy.",
                explanation: "Second-guessing costs more than staying the course today. Trust what you already know.",
                bestMove: "Stick to the plan. Avoid sudden changes.",
              },
              ACT: {
                tagline: "Energy & Speed",
                judgment: "You have enough energy — if you use it right. Over-planning will drain momentum.",
                explanation: "Doing the first step creates the next one. Waiting won't improve clarity.",
                bestMove: "Start now. Improve later.",
              },
            };

            // REST day alternative versions
            const restDescriptions: Record<string, { tagline: string; judgment: string; explanation: string; bestMove: string }> = {
              BIZ: {
                tagline: "Money & Growth",
                judgment: "Money can wait today.",
                explanation: "Protect what you have instead of chasing more.",
                bestMove: "Pause new decisions.",
              },
              SOC: {
                tagline: "People & Circle",
                judgment: "Limit interaction.",
                explanation: "Too much input will feel draining.",
                bestMove: "Keep your circle small.",
              },
              STRAT: {
                tagline: "Vision & Focus",
                judgment: "Not a decision day.",
                explanation: "Clarity returns after rest.",
                bestMove: "Observe, don't conclude.",
              },
              ACT: {
                tagline: "Energy & Speed",
                judgment: "Rest is productive today.",
                explanation: "Pushing now costs extra energy.",
                bestMove: "Slow down on purpose.",
              },
            };

            const statusColors: Record<string, string> = {
              PUSH: 'text-emerald-300',
              PAUSE: 'text-amber-300',
              TUNE: 'text-blue-300',
              HOLD: 'text-violet-300',
            };

            const domainLabels: Record<string, string> = {
              BIZ: "BUSINESS",
              SOC: "SOCIAL",
              STRAT: "STRATEGY",
              ACT: "ACTION",
            };

            const cardData_list = [
              { key: 'business', domain: 'BIZ', front: tacticalCards.business, worldview: worldviewBIZ, image: 'BUSINESS.png' },
              { key: 'social', domain: 'SOC', front: tacticalCards.social, worldview: worldviewSOC, image: 'SOCIAL.png' },
              { key: 'strategic', domain: 'STRAT', front: tacticalCards.strategic, worldview: worldviewSTRAT, image: 'STRATEGIC.png' },
              { key: 'action', domain: 'ACT', front: tacticalCards.action, worldview: worldviewACT, image: 'ACTION.png' },
            ];

            return cardData_list.map(card => {
              if (!card.worldview) return null;
              const isFlipped = flippedCards[card.key];

              return (
                <div key={card.key} className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer transition-all duration-500 hover:scale-[1.02]" onClick={() => toggleCardFlip(card.key)}>
                  {!isFlipped ? (
                    <>
                      {/* FRONT - Original Card */}
                      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 group-hover:opacity-90 transition-opacity duration-500" style={{ backgroundImage: `url(/cards/${card.image})` }} />
                      <div className="absolute inset-0 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.3),inset_0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.5),inset_0_0_30px_rgba(255,255,255,0.2)] transition-shadow duration-500" />
                      <div className="relative p-3 h-full flex flex-col">
                        <div className="flex-1"></div>
                        <div className="bg-black/40 backdrop-blur-md rounded-lg p-3 border border-white/20">
                          <p className="text-[11px] text-white font-medium leading-relaxed mb-2">{card.front.message}</p>
                          <div className="text-[9px] text-white/90 leading-relaxed">
                            <span className="font-semibold text-white">Do:</span> {card.front.do} <span className="mx-1 text-white/40">|</span> <span className="font-semibold text-white">Avoid:</span> {card.front.avoid}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* BACK - Simplified Content */}
                      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/cards/back.png)' }} />
                      <div className="absolute inset-0 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.3),inset_0_0_20px_rgba(255,255,255,0.1)]" />
                      <div className="relative p-3 h-full flex flex-col bg-gradient-to-b from-black/60 via-transparent to-black/70">
                        {/* Header */}
                        <div className="text-center mt-2">
                          <h3 className={`text-base font-bold ${statusColors[card.worldview.action]}`}>
                            {simpleDescriptions[card.domain].tagline}
                          </h3>
                        </div>
                        {/* Content */}
                        <div className="flex-1 flex items-center mt-1">
                          <div className="w-full bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                            {/* Choose descriptions based on today's state */}
                            {(() => {
                              const desc = todayState === 'REST' ? restDescriptions[card.domain] : simpleDescriptions[card.domain];
                              return (
                                <>
                                  <p className="text-white/90 text-[10px] leading-snug mb-2 font-medium">
                                    {desc.judgment}
                                  </p>
                                  <p className="text-white/70 text-[10px] leading-snug mb-3">
                                    {desc.explanation}
                                  </p>
                                  <div className="border-t border-white/10 pt-2">
                                    <p className="text-emerald-300/90 text-[9px] tracking-wider mb-0.5">BEST MOVE</p>
                                    <p className="text-white/80 text-[10px]">
                                      {desc.bestMove}
                                    </p>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            });
          })()}
        </div>

        {/* YOUR UNIQUE RESONANCE Section */}
        <div className="mt-8 relative flex justify-center">
          {/* Pulsing glow button - entire text area is clickable */}
          <button
            onClick={() => setPersonalModalOpen(true)}
            className="relative group w-full max-w-3xl rounded-3xl p-10 md:p-12 transition-all duration-700"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(59,130,246,0.05) 50%, rgba(139,92,246,0.08) 100%)',
              border: '1px solid rgba(139,92,246,0.15)',
              boxShadow: '0 0 60px rgba(139,92,246,0.2), inset 0 0 60px rgba(139,92,246,0.05)',
              animation: 'pulse-glow 3s ease-in-out infinite'
            }}
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 rounded-3xl opacity-50 bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-violet-500/10 animate-[shimmer_4s_ease-in-out_infinite]"></div>

            {/* Breathing glow ring */}
            <div className="absolute inset-0 rounded-3xl animate-[breathing-glow_3s_ease-in-out_infinite]"></div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-[0.2em] text-white mb-4 transition-all duration-500 group-hover:scale-105" style={{ textShadow: '0 0 40px rgba(139,92,246,0.9), 0 0 80px rgba(59,130,246,0.6)' }}>
                Get your personal guide
              </h2>
              <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto transition-all duration-500 group-hover:text-white/90">
                See how today's energy works for <em className="not-italic">you</em>.
              </p>

              {/* Status indicator when calibrated */}
              {userCalibration.calibrated && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                  <span className="text-xs tracking-[0.2em] text-amber-300/80">
                    SYNCED · {userCalibration.code}
                  </span>
                </div>
              )}

              {/* Tap to sync hint */}
              {!userCalibration.calibrated && (
                <div className="mt-6 flex items-center justify-center">
                  <span className="text-xs tracking-[0.2em] text-white/50">
                    Tap to sync
                  </span>
                </div>
              )}
            </div>
          </button>
        </div>

        {/* Decision Briefs Section - Blog Articles V2.0 */}
        <div className="mt-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {(() => {
              // Dynamic blog articles based on today's state
              const insightsByState: Record<string, Array<{
                tag: string;
                title: string;
                description: string;
              }>> = {
                REST: [
                  {
                    tag: 'INSIGHT',
                    title: 'Why Resting at the Right Time Is Not Quitting',
                    description: 'There are days when pushing costs you more than it gives back. Rest is waiting for the slope to change.',
                  },
                  {
                    tag: 'CONCEPT',
                    title: 'It\'s Not That You\'re Not Working Hard',
                    description: 'Effort has a cost. Timing decides whether that cost pays back.',
                  },
                ],
                INITIATE: [
                  {
                    tag: 'INSIGHT',
                    title: 'You Don\'t Need Confidence — You Need the Right Moment',
                    description: 'Confidence doesn\'t come first. Momentum does. You might just be waiting for the right green light.',
                  },
                  {
                    tag: 'CONCEPT',
                    title: 'It\'s Not That You\'re Not Working Hard',
                    description: 'Effort has a cost. Timing decides whether that cost pays back.',
                  },
                ],
                ADJUST: [
                  {
                    tag: 'CONCEPT',
                    title: 'It\'s Not That You\'re Not Working Hard',
                    description: 'Effort has a cost. Timing decides whether that cost pays back.',
                  },
                  {
                    tag: 'INSIGHT',
                    title: 'Why Timing Changes Everything',
                    description: 'The difference between success and struggle is rarely talent. It\'s timing.',
                  },
                ],
                CONSOLIDATE: [
                  {
                    tag: 'CONCEPT',
                    title: 'It\'s Not That You\'re Not Working Hard',
                    description: 'Effort has a cost. Timing decides whether that cost pays back.',
                  },
                  {
                    tag: 'INSIGHT',
                    title: 'Why Timing Changes Everything',
                    description: 'The difference between success and struggle is rarely talent. It\'s timing.',
                  },
                ],
                ACCELERATE: [
                  {
                    tag: 'CONCEPT',
                    title: 'It\'s Not That You\'re Not Working Hard',
                    description: 'Effort has a cost. Timing decides whether that cost pays back.',
                  },
                  {
                    tag: 'INSIGHT',
                    title: 'Why Timing Changes Everything',
                    description: 'The difference between success and struggle is rarely talent. It\'s timing.',
                  },
                ],
              };

              const currentInsights = insightsByState[todayState] || insightsByState.INITIATE;
              const tagColors: Record<string, string> = {
                CONCEPT: 'text-violet-400/70 border-violet-400/20 bg-violet-500/5',
                INSIGHT: 'text-amber-400/70 border-amber-400/20 bg-amber-500/5',
              };

              return currentInsights.map((insight, index) => {
                const links: Record<string, string> = {
                  'Why Resting at the Right Time Is Not Quitting': '/blog/rest-is-not-quitting',
                  'It\'s Not That You\'re Not Working Hard': '/blog/timing-matters-more-than-effort',
                  'You Don\'t Need Confidence — You Need the Right Moment': '/blog/momentum-not-confidence',
                  'Why Timing Changes Everything (Even When Nothing Else Does)': '/blog/why-timing-changes-everything',
                };

                return (
                  <Link
                    key={index}
                    href={links[insight.title] || '/blog'}
                    className="group relative rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-4 transition-all duration-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:border-white/10 cursor-pointer block"
                  >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[8px] tracking-wider px-1.5 py-0.5 rounded border ${tagColors[insight.tag]}`}>
                          {insight.tag}
                        </span>
                      </div>
                      <h4 className="text-sm font-serif font-medium text-white/70 mb-1.5 leading-snug">
                        {insight.title}
                      </h4>
                      <p className="text-xs text-white/40 font-serif leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-white/20 text-[10px] tracking-wider group-hover:text-white/40 transition-colors">
                      <span>Read</span>
                      <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )});
            })()}
          </div>
        </div>

        {/* Unified Footer Copy + Wisdom Quotes */}
        <div className="mt-8 mb-4 text-center max-w-2xl mx-auto">
          <p className="text-sm text-white/30 leading-relaxed">
            This isn't a command.
            <br />
            It's a guide to lower effort and better timing.
          </p>
          <p className="text-xs text-white/20 mt-2 italic">
            You're always the final decision-maker.
          </p>

          {/* Random Wisdom Quotes */}
          <div className="mt-6 pt-4 border-t border-white/5">
            {dailyQuotes.length > 0 ? (
              <div className="space-y-2">
                {dailyQuotes.map((quote, index) => (
                  <p key={index} className="text-xs text-white/25 italic leading-relaxed">
                    "{quote.text}"
                  </p>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-white/25 italic leading-relaxed">"</p>
                <p className="text-xs text-white/25 italic leading-relaxed">"</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Personal Resonance Modal */}
      <PersonalModal
        open={personalModalOpen}
        calibrated={userCalibration.calibrated}
        userCode={userCalibration.code}
        todayState={todayState}
        onClose={() => setPersonalModalOpen(false)}
        onCalibrated={handleCalibrated}
      />

      {/* Auth Modal - Login/Signup */}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Result card */}
      <AtomicCard
        open={cardOpen}
        status={cardData.status}
        oracle={cardData.oracle}
        supported={cardData.supported}
        adjustment={cardData.adjustment}
        disclaimer={cardData.disclaimer}
        hexagram={cardData.hexagram}
        l2_interpretation={cardData.l2_interpretation}
        onClose={() => setCardOpen(false)}
      />
    </div>
  );
}
