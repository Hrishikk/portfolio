import type { Project } from '@/types/content';

/** Featured projects told as problem → solution → outcome stories. */
export const projects: Project[] = [
  {
    id: 'jaime-migration',
    name: 'JAIME Re-architecture & 2 TB Migration',
    period: { en: 'Jul 2025 – Feb 2026', ja: '2025年7月〜2026年2月' },
    role: { en: 'Backend developer & team lead', ja: 'バックエンド開発・チームリーダー' },
    problem: {
      en: 'An industrial-equipment monitoring platform had outgrown InfluxDB 1.8. 2 TB of time-series data had to move without breaking existing features.',
      ja: '産業設備の監視プラットフォームがInfluxDB 1.8の限界に達し、既存機能を止めずに2TBの時系列データを移行する必要がありました。',
    },
    solution: {
      en: 'Refactored the NestJS backend for AWS serverless and built the migration to Amazon Timestream. AWS proofs of concept solved storage limits and InfluxDB-specific compatibility issues.',
      ja: 'NestJSのバックエンドをAWSサーバーレス向けにリファクタリングし、Amazon Timestreamへの移行を実装。AWSのPoCでストレージ制約やInfluxDB特有の互換性問題を解決しました。',
    },
    outcomes: {
      en: ['Migration approach proven and moving to production', 'Faster queries and better scalability', 'Existing features kept working throughout'],
      ja: ['移行手法を確立し本番移行を推進', 'クエリ性能とスケーラビリティを改善', '既存機能を維持したまま移行'],
    },
    stack: ['NestJS', 'TypeScript', 'AWS', 'Amazon Timestream', 'InfluxDB', 'PostgreSQL', 'Python'],
  },
  {
    id: 'jaime-ner',
    name: 'JAIME NER — AI Entity Extraction',
    period: { en: 'Jul 2024 – Feb 2025', ja: '2024年7月〜2025年2月' },
    role: { en: 'Full stack developer', ja: 'フルスタック開発' },
    problem: {
      en: 'Maintenance documents held useful information, but it was hard to find and hard to search.',
      ja: '保守ドキュメントには有用な情報があるものの、探しにくく検索も困難でした。',
    },
    solution: {
      en: 'Built Named Entity Recognition features that extract and classify entities, with custom React.js visualisations and NestJS + PostgreSQL APIs.',
      ja: '固有表現を抽出・分類するNER機能を開発し、React.jsの可視化コンポーネントとNestJS + PostgreSQLのAPIを実装しました。',
    },
    outcomes: {
      en: ['Released on schedule', 'Better search and operational insight', 'Tested with Jest, documented with Swagger'],
      ja: ['納期通りにリリース', '検索性と業務の可視性が向上', 'Jestでテスト、Swaggerでドキュメント化'],
    },
    stack: ['React.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Figma', 'Jest', 'Swagger'],
  },
  {
    id: 'inventory',
    name: 'Inventory Management System',
    period: { en: 'Mar 2026 – Present', ja: '2026年3月〜現在' },
    role: { en: 'Full stack developer & team leader', ja: 'フルスタック開発・チームリーダー' },
    problem: {
      en: 'The client needed one system to track stock, stock movement, orders and reports.',
      ja: '在庫・入出庫・受注・レポートを一元管理できるシステムが求められていました。',
    },
    solution: {
      en: 'Designing and building the core modules with React.js, Node.js, Express.js and SQL: responsive screens, REST APIs and inventory business logic.',
      ja: 'React.js・Node.js・Express.js・SQLで、レスポンシブな画面、REST API、在庫業務ロジックなどのコアモジュールを設計・開発しています。',
    },
    outcomes: {
      en: ['Scalable full-stack foundation', 'Clear technical specs before coding', 'Delivered in Agile sprints with code reviews'],
      ja: ['拡張性のあるフルスタック基盤', '実装前に技術仕様を明確化', 'コードレビューを伴うアジャイル開発'],
    },
    stack: ['React.js', 'Node.js', 'Express.js', 'JavaScript', 'SQL', 'REST APIs'],
  },
  {
    id: 'reward-zone',
    name: 'Reward Zone',
    period: { en: 'Jan 2024 – Jun 2024', ja: '2024年1月〜2024年6月' },
    role: { en: 'Full stack developer', ja: 'フルスタック開発' },
    problem: {
      en: 'The company wanted an engaging way for people to earn, track and redeem reward points.',
      ja: 'ポイントを楽しく獲得・管理・交換できる仕組みが求められていました。',
    },
    solution: {
      en: 'Built a React.js SPA with Node.js APIs. Orval generated type-safe API clients from Swagger, and TDD with Jest and Cypress kept quality high.',
      ja: 'React.js SPAとNode.js APIを開発。SwaggerからOrvalで型安全なクライアントを生成し、JestとCypressのTDDで品質を確保しました。',
    },
    outcomes: {
      en: ['Fewer bugs thanks to early E2E tests', 'Less manual API typing with generated clients', 'Led to selection for the JAIME project'],
      ja: ['早期のE2Eテストで手戻りを削減', 'クライアント自動生成で型定義の手作業を削減', 'JAIMEプロジェクトへの抜擢につながる'],
    },
    stack: ['React.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Orval', 'Jest', 'Cypress'],
  },
];
