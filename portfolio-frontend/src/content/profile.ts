import type { Metric, Profile, Strength } from '@/types/content';

export const profile: Profile = {
  name: 'Karikkad Kayarthaya Hrishikesh',
  nameKana: 'カリカド・カヤルタヤ・リシケシュ',
  headline: {
    en: 'Full Stack Engineer',
    ja: 'フルスタックエンジニア',
  },
  coreStack: ['React.js', 'NestJS', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
  tagline: {
    en: 'I design and build enterprise web applications end to end — responsive React front ends, type-safe NestJS and Node.js APIs, and scalable data on AWS.',
    ja: 'React.jsによるレスポンシブなフロントエンド、NestJS・Node.jsによる型安全なAPI、AWS上のスケーラブルなデータ基盤まで、企業向けWebアプリケーションを一貫して設計・開発しています。',
  },
  summary: {
    en: [
      'I’m a Full Stack Engineer with 2+ years of experience building enterprise web applications at VeBuIn Inc. I work across the whole stack: React.js and TypeScript on the front end, NestJS and Node.js REST APIs on the back end, and PostgreSQL and AWS for data and infrastructure.',
      'Recently I re-architected an industrial monitoring platform for AWS serverless and migrated 2 TB of time-series data from InfluxDB to Amazon Timestream. I care about clean, tested code: Jest and Cypress with TDD, Swagger-documented APIs, and type-safe API clients generated with Orval.',
      'Today I lead a development team as Team Leader while still writing code every day. I work in both English and Japanese, which keeps specifications clear between clients and engineers.',
    ],
    ja: [
      'VeBuIn株式会社にて2年以上、企業向けWebアプリケーションを開発しているフルスタックエンジニアです。フロントエンドはReact.jsとTypeScript、バックエンドはNestJS・Node.jsによるREST API、データ・インフラはPostgreSQLとAWSを担当しています。',
      '直近では産業設備監視プラットフォームをAWSサーバーレス構成へ再構築し、InfluxDBからAmazon Timestreamへ2TBの時系列データを移行しました。JestとCypressによるTDD、SwaggerによるAPIドキュメント、Orvalによる型安全なAPIクライアント生成など、テストされた読みやすいコードを大切にしています。',
      '現在はチームリーダーとして開発チームを率いながら、日々コードを書いています。日本語と英語の両方で業務ができるため、お客様とエンジニアの間で仕様を明確に保つことができます。',
    ],
  },
  location: { en: 'Ibaraki, Japan', ja: '茨城県' },
  photoAlt: {
    en: 'Portrait of Hrishikesh',
    ja: 'リシケシュの写真',
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
      label: { en: 'Location', ja: '所在地' },
      value: 'Ibaraki, Japan',
    },
  ],
};

export const metrics: Metric[] = [
  {
    id: 'experience',
    value: '2+',
    label: { en: 'Years full-stack', ja: '年のフルスタック開発' },
    detail: {
      en: 'React.js, NestJS and Node.js in production',
      ja: 'React.js・NestJS・Node.jsで本番開発',
    },
  },
  {
    id: 'migration',
    value: '2 TB',
    label: { en: 'Data migrated', ja: 'データ移行' },
    detail: {
      en: 'InfluxDB 1.8 → Amazon Timestream on AWS',
      ja: 'InfluxDB 1.8 → AWS上のAmazon Timestream',
    },
  },
  {
    id: 'products',
    value: '3',
    label: { en: 'Enterprise products', ja: '企業向けプロダクト' },
    detail: {
      en: 'Rewards platform, monitoring platform, inventory system',
      ja: 'リワード、設備監視、在庫管理の各システム',
    },
  },
  {
    id: 'satisfaction',
    value: '98%',
    label: { en: 'Client satisfaction', ja: '顧客満足度' },
    detail: {
      en: 'On a high-difficulty re-architecture',
      ja: '高難度のリアーキテクチャにて',
    },
  },
];

export const strengths: Strength[] = [
  {
    id: 'frontend',
    title: { en: 'Frontend development', ja: 'フロントエンド開発' },
    description: {
      en: 'Responsive, accessible React.js interfaces built from Figma designs, including custom data-visualisation components.',
      ja: 'Figmaのデザインをもとに、レスポンシブでアクセシブルなReact.js画面やデータ可視化コンポーネントを実装します。',
    },
    tools: ['React.js', 'TypeScript', 'Figma', 'Storybook'],
  },
  {
    id: 'backend',
    title: { en: 'Backend & APIs', ja: 'バックエンド・API開発' },
    description: {
      en: 'RESTful APIs and business logic with NestJS, Node.js and Express.js — documented with Swagger and covered by Jest tests.',
      ja: 'NestJS・Node.js・Express.jsでREST APIと業務ロジックを開発し、Swaggerでドキュメント化、Jestでテストを整備します。',
    },
    tools: ['NestJS', 'Node.js', 'Express.js', 'Swagger'],
  },
  {
    id: 'cloud',
    title: { en: 'Cloud & data', ja: 'クラウド・データ' },
    description: {
      en: 'PostgreSQL schema design and query tuning, AWS serverless architecture, and large-scale data migration.',
      ja: 'PostgreSQLのDB設計とクエリ最適化、AWSサーバーレス構成、大規模データ移行を担当します。',
    },
    tools: ['PostgreSQL', 'AWS', 'Amazon Timestream', 'Docker'],
  },
];
