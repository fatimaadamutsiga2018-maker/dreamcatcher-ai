"use client";

import { useState, useEffect } from 'react';
import { DecisionDomain, EnergyLevel } from './contextual-engine';
import { TodayState } from './decision-dashboard';

export interface ReadingRecord {
    id: string;
    timestamp: number;
    domain: DecisionDomain;
    energyLevel: EnergyLevel;
    todayState: TodayState;
    // We can store the conclusion for easier list display without re-calculating
    conclusion: string;
}

const STORAGE_KEY = 'dreamcatcher_readings_v1';

export function useReadingHistory() {
    const [readings, setReadings] = useState<ReadingRecord[]>([]);

    useEffect(() => {
        // Load on mount
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setReadings(JSON.parse(stored));
            }
        } catch (e) {
            console.error("Failed to load readings", e);
        }
    }, []);

    const saveReading = (reading: Omit<ReadingRecord, 'id' | 'timestamp'>) => {
        const newRecord: ReadingRecord = {
            ...reading,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
        };

        setReadings(prev => {
            const updated = [newRecord, ...prev];
            // Limit to last 50 readings
            const trimmed = updated.slice(0, 50);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
            return trimmed;
        });
    };

    const clearReadings = () => {
        setReadings([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return { readings, saveReading, clearReadings };
}
