// Database Types
export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  birth_date: string | null
  timezone: string | null
  created_at: string
  updated_at: string
}

export type EnergyType = 'high_flow' | 'steady_state' | 'recalibration' | 'recharge_mode'

export interface AssessmentSession {
  id: string
  user_id: string | null
  total_score: number
  energy_type: EnergyType
  mental_clarity_score: number
  physical_vitality_score: number
  life_harmony_score: number
  growth_momentum_score: number
  question_set: Record<string, any>
  answers: Record<string, any>
  created_at: string
}

export type TimingAdvice = 'NOW' | 'WAIT' | 'ADJUST'

export interface HexagramReading {
  id: string
  user_id: string | null
  question: string
  input_numbers: string
  hexagram_index: number
  hexagram_name_zh: string
  hexagram_name_en: string
  core_theme: string
  energy_state: string
  action_suggestions: string[]
  timing_advice: TimingAdvice
  risk_warning: string | null
  created_at: string
}
