import type { Localized } from '@/types/content';

/** Section-local labels not covered by the shared ui.ts. */
export const copy = {
  certifications: { en: 'Certifications', ja: '資格' },
  issuedBy: { en: 'Issued by', ja: '発行元' },
  showDetails: { en: 'Show details', ja: '詳細を表示' },
  hideDetails: { en: 'Hide details', ja: '詳細を閉じる' },
} satisfies Record<string, Localized>;
