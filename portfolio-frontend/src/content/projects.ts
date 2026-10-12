import type { Project } from '@/types/content';

/** Featured projects told as problem → solution → outcome stories. */
export const projects: Project[] = [
  {
    id: 'anomaly-migration',
    name: 'Power Plant Anomaly Detection — Re-architecture & 2 TB Migration',
    period: { en: 'Jul 2025 – Feb 2026', ja: '2025年7月〜2026年2月' },
    role: { en: 'Backend developer & sub-lead', ja: 'バックエンド開発・サブリーダー' },
    problem: {
      en: 'An enterprise system used inside power plants builds anomaly detection models from equipment time-series data. It had outgrown InfluxDB 1.8, and 2 TB of data had to move without breaking existing features.',
      ja: '発電所内で使用される異常検知システムは、設備の時系列データから異常検知モデルを作成します。InfluxDB 1.8の限界に達し、既存機能を維持したまま2TBのデータを移行する必要がありました。',
    },
    solution: {
      en: 'Evaluated AWS migration tooling and built PoCs that solved storage limits and InfluxDB 1.8 compatibility issues, then applied the approach to the full production migration. Refactored the NestJS backend for AWS serverless along the way.',
      ja: 'AWS移行ツールを検証し、ストレージ制約とInfluxDB 1.8の互換性課題をPoCで解決。その手法を本番移行に適用し、あわせてNestJSのバックエンドをAWSサーバーレス向けにリファクタリングしました。',
    },
    outcomes: {
      en: ['2 TB migration completed, PoC to production cutover', 'Faster queries and data processing', '98% client satisfaction through a demanding phase'],
      ja: ['2TB移行をPoCから本番移行まで完遂', 'クエリ性能とデータ処理効率を改善', '高難度のフェーズでも顧客満足度98%を維持'],
    },
    stack: ['NestJS', 'TypeScript', 'AWS (serverless)', 'Amazon Timestream', 'InfluxDB 1.8', 'PostgreSQL', 'Python'],
  },
  {
    id: 'anomaly-ner',
    name: 'NER Features — Power Plant Anomaly Detection',
    period: { en: 'Jul 2024 – Feb 2025', ja: '2024年7月〜2025年2月' },
    role: { en: 'Full stack developer', ja: 'フルスタック開発' },
    problem: {
      en: 'Maintenance documents and operational data held useful information, but it was hard to find, classify and understand.',
      ja: '保守文書や運用データには有用な情報があるものの、探しにくく、分類や把握が困難でした。',
    },
    solution: {
      en: 'Built Named Entity Recognition features end to end: a React.js UI with custom data visualisations, NestJS REST APIs and PostgreSQL storage for entity data.',
      ja: 'Reactのデータ可視化UI、NestJSのREST API、PostgreSQLでのエンティティデータ格納まで、NER機能を一貫して開発しました。',
    },
    outcomes: {
      en: ['Released on schedule', 'Client requirements matched through Figma designs', 'Led to promotion to Senior Web Engineer'],
      ja: ['納期通りにリリース', 'Figmaでの画面設計により顧客要件を正確に具現化', 'シニアWebエンジニアへの昇進につながる'],
    },
    stack: ['React.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Figma', 'Jest', 'Swagger'],
  },
  {
    id: 'inventory',
    name: 'Inventory Management System',
    period: { en: 'Mar 2026 – Present', ja: '2026年3月〜現在' },
    role: { en: 'Full stack developer & team leader', ja: 'フルスタック開発・チームリーダー' },
    problem: {
      en: 'The client needed one system for inventory tracking, stock movements, order management and reporting.',
      ja: '在庫管理・入出庫・受注管理・レポートを一元化できるシステムが求められていました。',
    },
    solution: {
      en: 'Architecting the core modules with a React.js frontend, Express.js / Node.js REST APIs and a SQL data layer, and implementing the inventory calculation, stock movement, order and reporting logic.',
      ja: 'React.jsのフロントエンド、Express.js / Node.jsのREST API、SQLのデータ層でコアモジュールを設計し、在庫計算・入出庫・受注・レポートの業務ロジックを実装しています。',
    },
    outcomes: {
      en: ['Scalable full-stack foundation', 'Clear technical specs and estimates before coding', 'On-time delivery across Agile sprints'],
      ja: ['拡張性のあるフルスタック基盤', '実装前に技術仕様と見積りを明確化', 'アジャイルスプリントで納期通りに納品'],
    },
    stack: ['React.js', 'Node.js', 'Express.js', 'JavaScript', 'SQL', 'REST APIs'],
  },
  {
    id: 'rewards-app',
    name: 'Rewards & Recognition Web App',
    period: { en: 'Jan 2024 – Jun 2024', ja: '2024年1月〜2024年6月' },
    role: { en: 'Full stack developer', ja: 'フルスタック開発' },
    problem: {
      en: 'The company wanted to make employee contributions visible and keep the team engaged.',
      ja: '社内の貢献を可視化し、チームのエンゲージメントを高める仕組みが求められていました。',
    },
    solution: {
      en: 'Built a React.js SPA with Node.js REST APIs where people earn, track and redeem reward points. Orval generated type-safe API clients from OpenAPI, and TDD with Jest and Cypress kept quality high.',
      ja: 'ポイントの獲得・管理・交換ができるReact.js SPAとNode.js REST APIを開発。OpenAPIからOrvalで型安全なクライアントを生成し、JestとCypressのTDDで品質を確保しました。',
    },
    outcomes: {
      en: ['Fewer bugs thanks to E2E tests from day one', 'Less manual API typing with generated clients', 'Led to selection for the next large project'],
      ja: ['初期からのE2Eテストで手戻りを削減', 'クライアント自動生成で型定義の保守工数を削減', '次期大規模プロジェクトへの抜擢につながる'],
    },
    stack: ['React.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Orval', 'Jest', 'Cypress'],
  },
];
