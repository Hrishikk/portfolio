import type { Localized } from '@/types/content';

/** Section-local labels not covered by the shared ui.ts. */
export const copy = {
  lead: {
    en: 'My stack as a system: three layers a request passes through, and the practices that run across all of them. Select any technology to see how long I’ve used it and where.',
    ja: 'リクエストが通る3つの層と、すべての層にまたがる取り組みとして技術スタックを整理しました。技術を選ぶと、経験年数と使用したプロジェクトが表示されます。',
  },
  acrossStack: { en: 'Across the whole stack', ja: 'すべての層にまたがる取り組み' },
  experience: { en: 'Hands-on experience', ja: '実務経験' },
  scaleLabel: { en: 'Scale: up to 3 years', ja: '目盛り：最大3年' },
  usedIn: { en: 'Used in', ja: '使用したプロジェクト' },
  inspector: { en: 'Technology details', ja: '技術の詳細' },
} satisfies Record<string, Localized>;
