import { type AssessmentResult, archetypeInfo, dimensionLabels } from './assessment';
import { getHexagram64ReadingAt } from './hexagram64';

export interface ReadingResultSummary {
  primary?: string;
  secondary?: string;
  icon?: string;
  label?: string;
  hexagramNumber?: number;
  hexagramName?: string;
  archetype?: string;
  lowestDimension?: string;
}

interface ReadingHistoryLike {
  reading_type: string;
  question?: string | null;
  input_numbers?: string | null;
  created_at?: string | null;
  result_summary?: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function normalizeReadingResultSummary(value: unknown): ReadingResultSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const summary: ReadingResultSummary = {};

  if (typeof value.primary === 'string') summary.primary = value.primary;
  if (typeof value.secondary === 'string') summary.secondary = value.secondary;
  if (typeof value.icon === 'string') summary.icon = value.icon;
  if (typeof value.label === 'string') summary.label = value.label;
  if (typeof value.hexagramNumber === 'number') summary.hexagramNumber = value.hexagramNumber;
  if (typeof value.hexagramName === 'string') summary.hexagramName = value.hexagramName;
  if (typeof value.archetype === 'string') summary.archetype = value.archetype;
  if (typeof value.lowestDimension === 'string') summary.lowestDimension = value.lowestDimension;

  return Object.keys(summary).length > 0 ? summary : null;
}

export function buildHexagramResultSummary(params: {
  question: string;
  inputNumbers: string;
  createdAt: string | Date;
}): ReadingResultSummary {
  const reading = getHexagram64ReadingAt(params.question, params.inputNumbers, params.createdAt);

  return {
    primary: `${reading.result_icon} ${reading.result_label}`,
    secondary: reading.situation,
    icon: reading.result_icon,
    label: reading.result_label,
    hexagramNumber: reading.sequence_number,
    hexagramName: reading.name_en,
  };
}

export function buildAssessmentResultSummary(result: AssessmentResult): ReadingResultSummary {
  const info = archetypeInfo[result.archetype];
  const lowestDimensionLabel = dimensionLabels[result.lowestDimension];

  return {
    primary: `${info.icon} ${info.name}`,
    secondary: `Friction: ${lowestDimensionLabel}`,
    icon: info.icon,
    archetype: info.name,
    lowestDimension: lowestDimensionLabel,
  };
}

export function getRecentActivityResultPreview(item: ReadingHistoryLike): {
  primary: string;
  secondary?: string;
} {
  const storedSummary = normalizeReadingResultSummary(item.result_summary);
  if (storedSummary?.primary) {
    return {
      primary: storedSummary.primary,
      secondary: storedSummary.secondary,
    };
  }

  if (
    item.reading_type === 'hexagram' &&
    typeof item.input_numbers === 'string' &&
    /^\d{3}$/.test(item.input_numbers) &&
    item.created_at
  ) {
    const derivedSummary = buildHexagramResultSummary({
      question: item.question || 'General guidance',
      inputNumbers: item.input_numbers,
      createdAt: item.created_at,
    });

    return {
      primary: derivedSummary.primary || 'Guidance saved',
      secondary: derivedSummary.secondary,
    };
  }

  if (item.reading_type === 'assessment') {
    return {
      primary: 'Energy snapshot completed',
      secondary: 'Profile saved to your dashboard',
    };
  }

  return {
    primary: 'Guidance saved',
  };
}
