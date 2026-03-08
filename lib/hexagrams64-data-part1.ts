// 64 Hexagrams Data - Part 1 (Hexagrams 1-32)
// Generated from Musk's templates

export type TimingAdvice = 'NOW' | 'WAIT' | 'ADJUST';

export interface Hexagram64 {
  id: number;
  sequence_number: number;
  name_cn: string;
  name_en: string;
  upper_trigram: string;
  lower_trigram: string;
  core_theme: string;
  energy_state: string;
  actions: [string, string, string];
  timing_advice: TimingAdvice;
  risk_warning: string;
  category: string;
}

export const hexagrams64Part1: Hexagram64[] = [
  {
    id: 1, sequence_number: 1, name_cn: '乾为天', name_en: 'Heaven over Heaven',
    upper_trigram: 'Heaven', lower_trigram: 'Heaven',
    core_theme: 'Peak Performance State',
    energy_state: 'Your energy is in a powerful creative phase. This is a time for bold action, leadership, and initiating what you\'ve been planning.',
    actions: [
      'Take the Lead — Step forward with confidence. Your vision is clear and the timing supports action.',
      'Start What Matters — Begin that project, have that conversation, make that decision you\'ve been postponing.',
      'Maintain Integrity — Success comes from alignment with your core values, not just ambition.'
    ],
    timing_advice: 'NOW',
    risk_warning: 'Avoid arrogance. Power without humility creates resistance.',
    category: 'Career'
  },
  {
    id: 2, sequence_number: 44, name_cn: '天风姤', name_en: 'Heaven over Wind',
    upper_trigram: 'Heaven', lower_trigram: 'Wind',
    core_theme: 'Unexpected Opportunity',
    energy_state: 'A surprising opportunity is emerging. This could be a chance meeting, an unexpected offer, or a sudden insight that changes your trajectory. Stay alert.',
    actions: [
      'Stay Open — Be receptive to unexpected encounters. The best opportunities often come disguised as coincidences.',
      'Act Quickly — This window may be brief. Trust your intuition and move before overthinking.',
      'Evaluate Alignment — Not every opportunity serves your long-term vision. Check if it matches your core values.'
    ],
    timing_advice: 'NOW',
    risk_warning: 'Don\'t let excitement override discernment. Haste makes waste.',
    category: 'Opportunity'
  }
];
