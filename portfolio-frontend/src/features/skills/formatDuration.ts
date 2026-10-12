import type { Locale } from '@/types/content';

/**
 * Formats a number of months as a short duration.
 * en: 33 → "2 yrs 9 mos", 12 → "1 yr", 6 → "6 mos"
 * ja: 33 → "2年9ヶ月",    12 → "1年",   6 → "半年"
 */
export function formatDuration(months: number, locale: Locale): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;

  if (locale === 'ja') {
    if (years === 0 && rest === 6) return '半年';
    return `${years > 0 ? `${years}年` : ''}${rest > 0 ? `${rest}ヶ月` : ''}`;
  }

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
  if (rest > 0) parts.push(`${rest} ${rest === 1 ? 'mo' : 'mos'}`);
  return parts.join(' ');
}
