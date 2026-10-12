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
      'I’m a Full Stack Engineer with over two and a half years of experience (since January 2024) building enterprise web applications at VeBuIn Inc. I work across the whole stack in TypeScript: React.js on the front end, NestJS, Node.js and Express.js REST APIs on the back end, and PostgreSQL on AWS and Azure for data and infrastructure.',
      'I re-architected a power-plant anomaly detection system for AWS serverless and completed its 2 TB time-series migration from InfluxDB 1.8 to Amazon Timestream, from proofs of concept through the production cutover. I care about clean, tested code: Jest and Cypress with TDD, Swagger-documented APIs, type-safe clients generated with Orval, and AI-assisted development with Claude and GitHub Copilot.',
      'Promoted twice — to Senior Web Engineer in March 2025 and Team Leader in March 2026 — I now lead development of an inventory management system while still writing code every day. I use Japanese daily at work, including client meetings and specification discussions.',
    ],
    ja: [
      '2024年1月よりVeBuIn株式会社にて企業向けWebアプリケーションを開発しているフルスタックエンジニアです。TypeScriptを中心に、フロントエンドはReact.js、バックエンドはNestJS・Node.js・Express.jsによるREST API、データ・インフラはAWS・Azure上のPostgreSQLを担当しています。',
      '発電所向け異常検知システムをAWSサーバーレス構成へ再構築し、InfluxDB 1.8からAmazon Timestreamへの2TB時系列データ移行をPoCから本番移行まで完遂しました。JestとCypressによるTDD、SwaggerによるAPIドキュメント、Orvalによる型安全なAPIクライアント生成、ClaudeやGitHub Copilotを活用したAI支援開発など、品質の高いコードを大切にしています。',
      '2025年3月にシニアWebエンジニア、2026年3月にチームリーダーへ昇進し、現在は在庫管理システムの開発をリードしながら日々コードを書いています。顧客との打ち合わせや仕様調整など、業務で日常的に日本語を使用しています。',
    ],
  },
  location: { en: 'Tsuchiura, Ibaraki, Japan', ja: '茨城県土浦市' },
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
      value: 'Tsuchiura, Ibaraki, Japan',
    },
  ],
};

export const metrics: Metric[] = [
  {
    id: 'experience',
    value: '2.5+',
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
      en: 'InfluxDB 1.8 → Amazon Timestream, PoC to production',
      ja: 'InfluxDB 1.8 → Amazon Timestream、PoCから本番まで完遂',
    },
  },
  {
    id: 'products',
    value: '3',
    label: { en: 'Enterprise products', ja: '企業向けプロダクト' },
    detail: {
      en: 'Rewards app, anomaly detection system, inventory system',
      ja: 'リワード、異常検知、在庫管理の各システム',
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
      en: 'PostgreSQL schema design and query tuning, AWS serverless architecture, and large-scale cloud data migration.',
      ja: 'PostgreSQLのDB設計とクエリ最適化、AWSサーバーレス構成、大規模なクラウドデータ移行を担当します。',
    },
    tools: ['PostgreSQL', 'AWS', 'Amazon Timestream', 'Docker'],
  },
];
