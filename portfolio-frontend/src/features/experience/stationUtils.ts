import type { CSSProperties } from 'react';

/** Step number for a station, e.g. index 0 → "01". */
export function stationCode(index: number): string {
  return String(index + 1).padStart(2, '0');
}

/**
 * How far along the career line a station sits (0–100), used for the line's progress fill.
 * Used as a CSS custom property so colour stays token-driven.
 */
export function growthPercent(index: number, total: number): number {
  if (total <= 1) return 100;
  return Math.round((index / (total - 1)) * 100);
}

/** Inline style that exposes the growth percentage to CSS as `--growth`. */
export function growthStyle(index: number, total: number): CSSProperties {
  return { '--growth': `${growthPercent(index, total)}%` } as CSSProperties;
}
