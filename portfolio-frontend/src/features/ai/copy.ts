import type { Localized } from '@/types/content';

/** Section-local labels not covered by the shared ui.ts. */
export const copy = {
  tools: { en: 'My AI toolkit', ja: '使用しているAIツール' },
  useCases: { en: 'What I use it for', ja: '主な用途' },
  toolsUsed: { en: 'Tools used', ja: '使用ツール' },
  step: { en: 'Step', ja: 'ステップ' },
  by: { en: 'by', ja: '提供：' },
} satisfies Record<string, Localized>;
