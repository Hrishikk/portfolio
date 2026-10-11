import type { Localized } from '@/types/content';

/** Section-local labels not covered by the shared ui.ts. */
export const copy = {
  experienceScale: { en: 'Hands-on experience (bar = up to 2 years)', ja: '実務経験（バーは最大2年）' },
  alsoUsed: { en: 'Also comfortable with', ja: 'その他の対応技術' },
} satisfies Record<string, Localized>;
