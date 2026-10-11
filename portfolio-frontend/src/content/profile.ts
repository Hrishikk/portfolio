import type { Metric, Profile } from '@/types/content';

export const profile: Profile = {
  name: 'Karikkad Kayarthaya Hrishikesh',
  nameKana: 'カリカド・カヤルタヤ・リシケシュ',
  seal: 'リシ',
  headline: {
    en: 'Full Stack Engineer & Team Leader',
    ja: 'フルスタックエンジニア／チームリーダー',
  },
  roles: [
    { en: 'React.js / NestJS', ja: 'React.js / NestJS' },
    { en: 'AWS Cloud & Data Migration', ja: 'AWS クラウド・データ移行' },
    { en: 'Bilingual Bridge SE', ja: 'バイリンガル ブリッジSE' },
    { en: 'AI-assisted Development', ja: 'AI 活用開発' },
  ],
  tagline: {
    en: 'I build enterprise web apps end to end and help Japanese clients and international teams work as one.',
    ja: '要件定義からリリースまで一貫して開発し、日本のお客様と海外の開発チームの「橋渡し」を担います。',
  },
  summary: {
    en: [
      'I am a Full Stack Engineer based in Ibaraki, Japan. Since 2024 I have built enterprise web applications with React.js, NestJS and Node.js at VeBuIn Inc.',
      'In two years I went from Junior Engineer to Team Leader. I led a 7-engineer team through the JAIME system re-architecture, including a 2 TB migration from InfluxDB to Amazon Timestream on AWS, and we kept client satisfaction at 98%.',
      'I also work as a Bridge SE. I speak with Japanese clients in Japanese and English, turn their needs into clear specifications, and keep rework low. Today I lead requirements, proposals and development for a new Inventory Management System.',
    ],
    ja: [
      '茨城県在住のフルスタックエンジニアです。2024年よりVeBuIn株式会社にて、React.js・NestJS・Node.jsを用いた企業向けWebアプリケーション開発に従事しています。',
      '2年間でジュニアエンジニアからチームリーダーへ昇進。JAIMEシステムのリアーキテクチャでは7名のチームを率い、InfluxDBからAmazon Timestreamへの2TBデータ移行を推進しながら、顧客満足度98%を維持しました。',
      'ブリッジSEとして日本語・英語で顧客と折衝し、要件を明確な仕様に落とし込むことで手戻りを防いでいます。現在は在庫管理システムの新規開発で、要件定義・提案・開発をリードしています。',
    ],
  },
  location: { en: 'Tsuchiura, Ibaraki, Japan', ja: '茨城県土浦市' },
  availability: {
    en: 'Open to new opportunities in Japan',
    ja: '新しい挑戦の機会を探しています',
  },
  contacts: [
    {
      id: 'email',
      label: { en: 'Email', ja: 'メール' },
      value: 'hrishikk8547@gmail.com',
      href: 'mailto:hrishikk8547@gmail.com',
    },
    {
      id: 'linkedin',
      label: { en: 'LinkedIn', ja: 'LinkedIn' },
      value: 'linkedin.com/in/hrishikesh-k-k',
      href: 'https://www.linkedin.com/in/hrishikesh-k-k/',
    },
    {
      id: 'location',
      label: { en: 'Based in', ja: '所在地' },
      value: 'Tsuchiura, Ibaraki 🇯🇵',
    },
  ],
};

export const metrics: Metric[] = [
  {
    id: 'migration',
    value: '2 TB',
    label: { en: 'Data migrated', ja: 'データ移行' },
    detail: {
      en: 'InfluxDB 1.8 → Amazon Timestream, led end to end',
      ja: 'InfluxDB 1.8 → Amazon Timestream の移行を総指揮',
    },
  },
  {
    id: 'team',
    value: '7',
    label: { en: 'Engineers led', ja: '名のチームを統率' },
    detail: {
      en: 'Across a full system re-architecture',
      ja: 'システム全体のリアーキテクチャにて',
    },
  },
  {
    id: 'satisfaction',
    value: '98%',
    label: { en: 'Client satisfaction', ja: '顧客満足度' },
    detail: {
      en: 'Kept on a high-difficulty enterprise project',
      ja: '高難度の企業向けプロジェクトで維持',
    },
  },
  {
    id: 'promotions',
    value: '2',
    label: { en: 'Promotions in 2 years', ja: '2年間で2回昇進' },
    detail: {
      en: 'Junior → Senior (Mar 2025) → Team Leader (Mar 2026)',
      ja: 'ジュニア → シニア（2025年3月）→ チームリーダー（2026年3月）',
    },
  },
];
