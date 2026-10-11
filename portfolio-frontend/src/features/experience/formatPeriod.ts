import type { Locale } from '@/types/content';

const EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Format a "YYYY-MM" string as "Jan 2024" / "2024年1月". Falls back to the raw input if malformed. */
export function formatMonth(value: string, locale: Locale): string {
  const match = /^(\d{4})-(\d{1,2})/.exec(value);
  if (!match) return value;
  const year = match[1];
  const month = Number(match[2]);
  if (month < 1 || month > 12) return value;
  return locale === 'ja' ? `${year}年${month}月` : `${EN_MONTHS[month - 1]} ${year}`;
}

/** Format a start/end pair, e.g. "Jan 2024 – Jun 2024" / "2024年1月〜2024年6月". Missing end → presentLabel. */
export function formatPeriod(start: string, end: string | undefined, locale: Locale, presentLabel: string): string {
  const from = formatMonth(start, locale);
  const to = end ? formatMonth(end, locale) : presentLabel;
  return locale === 'ja' ? `${from}〜${to}` : `${from} – ${to}`;
}
