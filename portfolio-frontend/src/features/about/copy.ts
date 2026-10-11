import type { Localized } from '@/types/content';

/** Labels specific to the About section (not shared chrome, so kept out of ui.ts). */
export const copy = {
  atAGlance: { en: 'At a glance', ja: 'プロフィール概要' },
  currentRole: { en: 'Current role', ja: '現在の役職' },
  location: { en: 'Location', ja: '所在地' },
} satisfies Record<string, Localized>;
