"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import EnergyTuner from "@/shared/components/dreamcatcher/EnergyTuner";
import AtomicCard from "@/shared/components/dreamcatcher/AtomicCard";
import NebulaBackground from "@/shared/components/dreamcatcher/NebulaBackground";
import NebulaSpinner from "@/shared/components/dreamcatcher/NebulaSpinner";
import PersonalModal from "@/shared/components/dreamcatcher/PersonalModal";
import { calculateGuestMode, calculateAnonymousMode, calculateMemberMode, calculateSeedSum, calculateBirthdaySum, type TriFactorResult } from "@/shared/lib/dreamcatcher/engine-v3";
import { USER_MODES, TWELVE_OFFICERS, calculateTwelveOfficer } from "@/shared/lib/dreamcatcher/constants";
import { generateAmbientEnergyField } from "@/shared/lib/dreamcatcher/ambient-energy";
import { getTodayState, generatePermissionStatement, generateTacticalCards, type TodayState } from "@/shared/lib/dreamcatcher/decision-dashboard";

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

export default function LandingPage() {
  const [cardOpen, setCardOpen] = useState(false);
  const [personalModalOpen, setPersonalModalOpen] = useState(false);
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

      {/* Main content - Decision Dashboard V1.0 */}
      <main className="relative z-10 mx-auto min-h-screen w-full max-w-6xl px-4 py-6 flex flex-col">
        {/* TOP: Date - Anchored at Top */}
        <div className="text-center mb-4">
          <h1 className="text-xl md:text-2xl font-medium tracking-[0.2em] text-white/90">
            {currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
          </h1>
        </div>

        {/* TODAY State + Permission Statement */}
        <div className="text-center mb-6">
          <div className="mb-3 relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/40 to-blue-500/40 blur-3xl rounded-full"></div>
            <span className="relative text-6xl md:text-7xl font-bold tracking-[0.15em] text-white" style={{ textShadow: '0 0 20px rgba(139,92,246,0.8), 0 0 40px rgba(59,130,246,0.6)' }}>
              TODAY: {todayState}
            </span>
          </div>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto font-medium">
            {permissionStatement}
          </p>
        </div>

        {/* Tactical Cards - 4 Columns on Large Screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {/* BUSINESS Card */}
            <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 group-hover:opacity-90 transition-opacity duration-500"
                style={{ backgroundImage: 'url(/cards/BUSINESS.png)' }}
              />
              <div className="absolute inset-0 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.3),inset_0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.5),inset_0_0_30px_rgba(255,255,255,0.2)] transition-shadow duration-500 pointer-events-none" />
              <div className="relative p-4 min-h-[400px] flex flex-col">
                <div className="flex-1"></div>
                <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <p className="text-xs text-white font-medium leading-relaxed mb-3">
                    {tacticalCards.business.message}
                  </p>
                  <div className="text-[10px] text-white/90 leading-relaxed">
                    <span className="font-semibold text-white">Do:</span> {tacticalCards.business.do} <span className="mx-1 text-white/40">|</span> <span className="font-semibold text-white">Avoid:</span> {tacticalCards.business.avoid}
                  </div>
                </div>
              </div>
            </div>

            {/* SOCIAL Card */}
            <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 group-hover:opacity-90 transition-opacity duration-500"
                style={{ backgroundImage: 'url(/cards/SOCIAL.png)' }}
              />
              <div className="absolute inset-0 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.3),inset_0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.5),inset_0_0_30px_rgba(255,255,255,0.2)] transition-shadow duration-500 pointer-events-none" />
              <div className="relative p-4 min-h-[400px] flex flex-col">
                <div className="flex-1"></div>
                <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <p className="text-xs text-white font-medium leading-relaxed mb-3">
                    {tacticalCards.social.message}
                  </p>
                  <div className="text-[10px] text-white/90 leading-relaxed">
                    <span className="font-semibold text-white">Do:</span> {tacticalCards.social.do} <span className="mx-1 text-white/40">|</span> <span className="font-semibold text-white">Avoid:</span> {tacticalCards.social.avoid}
                  </div>
                </div>
              </div>
            </div>

            {/* STRATEGIC Card */}
            <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 group-hover:opacity-90 transition-opacity duration-500"
                style={{ backgroundImage: 'url(/cards/STRATEGIC.png)' }}
              />
              <div className="absolute inset-0 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.3),inset_0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.5),inset_0_0_30px_rgba(255,255,255,0.2)] transition-shadow duration-500 pointer-events-none" />
              <div className="relative p-4 min-h-[400px] flex flex-col">
                <div className="flex-1"></div>
                <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <p className="text-xs text-white font-medium leading-relaxed mb-3">
                    {tacticalCards.strategic.message}
                  </p>
                  <div className="text-[10px] text-white/90 leading-relaxed">
                    <span className="font-semibold text-white">Do:</span> {tacticalCards.strategic.do} <span className="mx-1 text-white/40">|</span> <span className="font-semibold text-white">Avoid:</span> {tacticalCards.strategic.avoid}
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION Card */}
            <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 group-hover:opacity-90 transition-opacity duration-500"
                style={{ backgroundImage: 'url(/cards/ACTION.png)' }}
              />
              <div className="absolute inset-0 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.3),inset_0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.5),inset_0_0_30px_rgba(255,255,255,0.2)] transition-shadow duration-500 pointer-events-none" />
              <div className="relative p-4 min-h-[400px] flex flex-col">
                <div className="flex-1"></div>
                <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <p className="text-xs text-white font-medium leading-relaxed mb-3">
                    {tacticalCards.action.message}
                  </p>
                  <div className="text-[10px] text-white/90 leading-relaxed">
                    <span className="font-semibold text-white">Do:</span> {tacticalCards.action.do} <span className="mx-1 text-white/40">|</span> <span className="font-semibold text-white">Avoid:</span> {tacticalCards.action.avoid}
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* YOUR UNIQUE RESONANCE Section */}
        <div className="mt-8 relative">
          {/* Nebula Spinner Background - Gentle rotating effect */}
          <div className="absolute inset-0 -z-10 h-[500px] overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-violet-950/50 to-slate-950">
              <NebulaSpinner />
            </div>
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
          </div>

          {/* Section Header */}
          <div className="text-center mb-6 pt-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-[0.2em] text-white mb-3" style={{ textShadow: '0 0 30px rgba(139,92,246,0.8), 0 0 60px_rgba(59,130,246,0.5)' }}>
              YOUR UNIQUE RESONANCE
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
              Decode how the global field aligns with your specific frequency.
            </p>
          </div>

          {/* Central Energy Node - Interactive Hub */}
          <div className="flex flex-col items-center pb-12">
            {/* Energy Node - Opens Personal Modal */}
            <button
              onClick={() => setPersonalModalOpen(true)}
              className="relative group mb-8"
            >
              {/* Outer glow rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-violet-500/20 to-blue-500/20 animate-pulse"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-2 border-violet-400/40 animate-[spin_20s_linear_infinite]"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-blue-400/40 animate-[spin_15s_linear_infinite_reverse]"></div>
              </div>

              {/* Central orb */}
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 via-blue-500 to-cyan-400 shadow-[0_0_40px_rgba(139,92,246,0.6),0_0_80px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_60px_rgba(139,92,246,0.9),0_0_100px_rgba(59,130,246,0.6)] transition-all duration-500 animate-pulse">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/70 to-transparent"></div>
              </div>

              {/* Hover text */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/60 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                TAP TO RESONATE
              </div>
            </button>

            {/* When Calibrated - Show Compact Status */}
            {userCalibration.calibrated && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-amber-400/30">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                  <span className="text-xs tracking-[0.2em] text-amber-300/80">
                RESONANCE ACTIVE
                  </span>
                  <span className="text-white/40">|</span>
                  <span className="text-xs text-white/60">{userCalibration.code}</span>
                </div>
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
        onClose={() => setPersonalModalOpen(false)}
        onCalibrated={handleCalibrated}
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
