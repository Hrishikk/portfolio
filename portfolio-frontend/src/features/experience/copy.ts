import type { Localized } from '@/types/content';

/** Feature-local labels for the career line map (not shared chrome, so kept out of ui.ts). */
export const copy = {
  lead: {
    en: 'My career drawn like a Tokyo metro line — each stop is a project or milestone. Select a station to see what I did there.',
    ja: '東京メトロの路線図のように、キャリアの歩みを描きました。各駅はプロジェクトや節目です。駅を選ぶと詳細が表示されます。',
  },
  lineName: { en: 'VeBuIn Line', ja: 'VeBuIn線' },
  lineDirection: { en: 'Junior engineer → Team leader', ja: 'ジュニアエンジニア → チームリーダー' },
  stationsLabel: { en: 'Career stations', ja: 'キャリアの駅' },
  promoted: { en: 'Promoted', ja: '昇進' },
  // Station flag: the kanji glyph reads as decoration in English, but would duplicate the Japanese label.
  promotedFlag: { en: '昇 Promoted', ja: '昇進' },
  joined: { en: 'Joined', ja: '入社' },
  youAreHere: { en: 'You are here', ja: '現在地' },
  period: { en: 'Period', ja: '期間' },
  company: { en: 'Company', ja: '会社' },
  highlights: { en: 'Highlights', ja: '主な実績' },
} satisfies Record<string, Localized>;
