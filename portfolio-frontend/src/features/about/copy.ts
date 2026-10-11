import type { Localized } from '@/types/content';

/** Labels specific to the About section (not shared chrome, so kept out of ui.ts). */
export const copy = {
  atAGlance: { en: 'At a glance', ja: 'プロフィール概要' },
  location: { en: 'Based in', ja: '所在地' },
  contact: { en: 'Contact', ja: '連絡先' },
  bridgeTitle: { en: 'What a “Bridge SE” does', ja: '「ブリッジSE」とは' },
  client: { en: 'Japanese client', ja: '日本のお客様' },
  clientNote: { en: 'Needs & feedback', ja: '要望・フィードバック' },
  team: { en: 'Global dev team', ja: '海外開発チーム' },
  teamNote: { en: 'Design & build', ja: '設計・開発' },
  me: { en: 'Me', ja: '私' },
  meNote: { en: 'Japanese ⇄ English', ja: '日本語 ⇄ 英語' },
  bridgeCaption: {
    en: 'I turn what clients ask for into clear specs for engineers — and bring progress back in the client’s language, so nothing gets lost in translation.',
    ja: 'お客様の要望をエンジニア向けの明確な仕様に落とし込み、進捗はお客様の言葉でお伝えします。言葉の壁による認識のずれを防ぎます。',
  },
} satisfies Record<string, Localized>;
