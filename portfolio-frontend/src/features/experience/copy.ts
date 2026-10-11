import type { Localized } from '@/types/content';

/** Feature-local labels for the career line map (not shared chrome, so kept out of ui.ts). */
export const copy = {
  lead: {
    en: 'From junior engineer to team leader at VeBuIn Inc. since January 2024. Select a step to see what I built.',
    ja: '2024年1月よりVeBuIn株式会社にて、ジュニアエンジニアからチームリーダーへ。各ステップを選ぶと開発内容が表示されます。',
  },
  lineName: { en: 'VeBuIn Inc.', ja: 'VeBuIn株式会社' },
  lineDirection: { en: 'Junior engineer → Team leader', ja: 'ジュニアエンジニア → チームリーダー' },
  stationsLabel: { en: 'Roles and projects', ja: '役職とプロジェクト' },
  promoted: { en: 'Promoted', ja: '昇進' },
  joined: { en: 'Joined', ja: '入社' },
  youAreHere: { en: 'Current', ja: '現在' },
  period: { en: 'Period', ja: '期間' },
  company: { en: 'Company', ja: '会社' },
  highlights: { en: 'Highlights', ja: '主な実績' },
} satisfies Record<string, Localized>;
