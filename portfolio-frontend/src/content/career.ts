import type { CareerStation } from '@/types/content';

const COMPANY = 'VeBuIn Inc.';

/** Career stations in chronological order (oldest first). */
export const career: CareerStation[] = [
  {
    id: 'reward-zone',
    kind: 'join',
    start: '2024-01',
    end: '2024-06',
    title: { en: 'Reward Zone', ja: 'Reward Zone' },
    role: { en: 'Junior Web Engineer', ja: 'ジュニアWebエンジニア' },
    company: COMPANY,
    teamSize: { en: 'Team of up to 4', ja: '4人以下' },
    summary: {
      en: 'Built a full-stack rewards and loyalty SPA where users earn, track and redeem points.',
      ja: 'ポイントの獲得・管理・交換ができるリワードSPAをフルスタックで開発。',
    },
    highlights: {
      en: [
        'Built the SPA with React.js and Node.js / NestJS REST APIs from Figma designs',
        'Generated type-safe API clients from Swagger (OpenAPI) with Orval',
        'Practised TDD with Jest unit tests and Cypress end-to-end tests',
        'Designed PostgreSQL schemas and implemented backend business logic',
      ],
      ja: [
        'FigmaのデザインをもとにReact.jsとNode.js / NestJSのREST APIでSPAを開発',
        'Swagger（OpenAPI）からOrvalで型安全なAPIクライアントを自動生成',
        'JestのユニットテストとCypressのE2EテストでTDDを実践',
        'PostgreSQLのスキーマ設計とバックエンドの業務ロジックを実装',
      ],
    },
    phases: [
      { en: 'Frontend', ja: 'フロントエンド' },
      { en: 'REST APIs', ja: 'REST API' },
      { en: 'Database design', ja: 'DB設計' },
      { en: 'TDD', ja: 'TDD' },
    ],
    stack: ['React.js', 'NestJS', 'Node.js', 'TypeScript', 'PostgreSQL', 'Orval', 'Jest', 'Cypress', 'Azure'],
  },
  {
    id: 'jaime-ner',
    kind: 'project',
    start: '2024-07',
    end: '2025-02',
    title: { en: 'JAIME — NER Development', ja: 'JAIME（NER開発フェーズ）' },
    role: { en: 'Junior Web Engineer', ja: 'ジュニアWebエンジニア' },
    company: COMPANY,
    teamSize: { en: 'Team of 11–20', ja: '11〜20人' },
    summary: {
      en: 'Built AI-powered Named Entity Recognition features that extract, classify and visualise information from maintenance documents.',
      ja: '保守ドキュメントから情報を抽出・分類・可視化するAI固有表現抽出（NER）機能を開発。',
    },
    highlights: {
      en: [
        'Implemented NER features end to end with React.js, NestJS and TypeScript',
        'Turned Figma designs into responsive React.js screens',
        'Built NestJS REST APIs backed by PostgreSQL for NER data processing',
        'Created custom data-visualisation components for analysis results',
        'Wrote Jest unit tests and documented APIs with Swagger',
      ],
      ja: [
        'React.js・NestJS・TypeScriptでNER機能をフロントからバックまで実装',
        'FigmaのデザインをレスポンシブなReact.js画面として実装',
        'NER データ処理のためのNestJS REST APIをPostgreSQLと連携して開発',
        '解析結果を表示するデータ可視化コンポーネントを開発',
        'Jestでユニットテストを作成し、SwaggerでAPIをドキュメント化',
      ],
    },
    phases: [
      { en: 'Frontend', ja: 'フロントエンド' },
      { en: 'REST APIs', ja: 'REST API' },
      { en: 'Data visualisation', ja: 'データ可視化' },
      { en: 'Unit testing', ja: 'ユニットテスト' },
    ],
    stack: ['React.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Figma', 'Jest', 'Swagger', 'AWS'],
  },
  {
    id: 'jaime-ops',
    kind: 'promotion',
    start: '2025-03',
    end: '2025-06',
    title: { en: 'JAIME — Maintenance & Operations', ja: 'JAIME（保守運用）' },
    role: { en: 'Senior Web Engineer', ja: 'シニアWebエンジニア' },
    company: COMPANY,
    teamSize: { en: 'Team of up to 4', ja: '4人以下' },
    summary: {
      en: 'Promoted to Senior Web Engineer. Kept the production platform stable: fixed bugs, shipped releases and improved existing modules.',
      ja: 'シニアWebエンジニアに昇進。バグ修正やリリース、既存機能の改善により本番システムを安定稼働させる。',
    },
    highlights: {
      en: [
        'Diagnosed and fixed production issues through code analysis, debugging and Jest tests',
        'Enhanced and optimised existing NestJS modules for performance and reliability',
        'Set up and ran the release flow to production',
        'Reviewed code and clarified specifications with the client to avoid rework',
      ],
      ja: [
        'コード解析・デバッグ・Jestテストにより本番環境の不具合を特定・修正',
        '既存のNestJSモジュールを改善し、性能と信頼性を向上',
        '本番環境へのリリースフローを確立・実行',
        'コードレビューを行い、顧客と仕様を調整して手戻りを防止',
      ],
    },
    phases: [
      { en: 'Bug fixing', ja: '不具合修正' },
      { en: 'Performance', ja: '性能改善' },
      { en: 'Releases', ja: 'リリース' },
      { en: 'Code review', ja: 'コードレビュー' },
    ],
    stack: ['React.js', 'NestJS', 'TypeScript', 'Python', 'PostgreSQL', 'Linux', 'AWS'],
  },
  {
    id: 'jaime-rearch',
    kind: 'project',
    start: '2025-07',
    end: '2026-02',
    title: { en: 'JAIME — System Re-architecture', ja: 'JAIME（リアーキテクチャ）' },
    role: { en: 'Senior Web Engineer · Team Lead', ja: 'シニアWebエンジニア・チームリーダー' },
    company: COMPANY,
    teamSize: { en: 'Led 7 engineers', ja: '7名を統率' },
    summary: {
      en: 'Rebuilt the platform’s backend for AWS serverless and migrated 2 TB of time-series data to Amazon Timestream.',
      ja: 'バックエンドをAWSサーバーレス構成へ再構築し、2TBの時系列データをAmazon Timestreamへ移行。',
    },
    highlights: {
      en: [
        'Designed and refactored NestJS services and APIs for an AWS serverless architecture',
        'Designed, built and validated the 2 TB migration from InfluxDB 1.8 to Amazon Timestream',
        'Built AWS proofs of concept to solve storage limits and compatibility issues',
        'Optimised PostgreSQL and Timestream queries for faster data processing',
        'Guided 7 engineers through code reviews and technical decisions',
      ],
      ja: [
        'AWSサーバーレス構成に向けてNestJSのサービスとAPIを設計・リファクタリング',
        'InfluxDB 1.8からAmazon Timestreamへの2TBデータ移行を設計・実装・検証',
        'AWSでPoCを行い、ストレージ制約や互換性の課題を解決',
        'PostgreSQLとTimestreamのクエリを最適化し、データ処理を高速化',
        'コードレビューと技術判断を通じて7名のエンジニアを指導',
      ],
    },
    phases: [
      { en: 'Serverless architecture', ja: 'サーバーレス設計' },
      { en: 'Data migration', ja: 'データ移行' },
      { en: 'Query optimisation', ja: 'クエリ最適化' },
      { en: 'Code review', ja: 'コードレビュー' },
    ],
    stack: ['NestJS', 'Node.js', 'TypeScript', 'AWS', 'Amazon Timestream', 'InfluxDB', 'PostgreSQL', 'Python', 'React.js', 'Swagger'],
  },
  {
    id: 'inventory',
    kind: 'current',
    start: '2026-03',
    title: { en: 'Inventory Management System', ja: '在庫管理システム' },
    role: { en: 'Team Leader · Full Stack', ja: 'チームリーダー・フルスタック' },
    company: COMPANY,
    teamSize: { en: 'Team of 6–8', ja: '6〜8人' },
    summary: {
      en: 'Promoted to Team Leader. Building a new web system for stock tracking, stock movement, orders and reporting.',
      ja: 'チームリーダーに昇進。在庫・入出庫・受注・レポートを管理する新規Webシステムを開発。',
    },
    highlights: {
      en: [
        'Designing and building core modules with React.js, Node.js, Express.js and SQL',
        'Building responsive React components and REST API integrations',
        'Implementing business logic for inventory and order workflows',
        'Turned client requirements into technical specifications and estimates',
      ],
      ja: [
        'React.js・Node.js・Express.js・SQLでコアモジュールを設計・開発',
        'レスポンシブなReactコンポーネントとREST API連携を実装',
        '在庫・受注業務のビジネスロジックを実装',
        '顧客要件を技術仕様と見積りに落とし込み',
      ],
    },
    phases: [
      { en: 'Frontend', ja: 'フロントエンド' },
      { en: 'REST APIs', ja: 'REST API' },
      { en: 'SQL', ja: 'SQL' },
      { en: 'Technical specs', ja: '技術仕様' },
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'JavaScript', 'SQL', 'REST APIs'],
  },
];
