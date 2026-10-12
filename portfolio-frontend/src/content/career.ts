import type { CareerStation } from '@/types/content';

const COMPANY = 'VeBuIn Inc.';

/** Career stations in chronological order (oldest first). */
export const career: CareerStation[] = [
  {
    id: 'rewards-app',
    kind: 'join',
    start: '2024-01',
    end: '2024-06',
    title: { en: 'Rewards & Recognition App', ja: 'リワード管理Webアプリ' },
    role: { en: 'Junior Web Engineer', ja: 'ジュニアWebエンジニア' },
    company: COMPANY,
    teamSize: { en: 'Team of up to 4', ja: '4人以下' },
    summary: {
      en: 'Built an internal SPA that makes employee contributions visible through earning, tracking and redeeming reward points.',
      ja: 'ポイントの付与・管理・交換を通じて社内貢献を可視化する社内向けSPAを開発。',
    },
    highlights: {
      en: [
        'Built a full-stack SPA with a React.js frontend and Node.js REST APIs, from requirements to testing',
        'Integrated Orval with OpenAPI (Swagger) to generate type-safe TypeScript API clients',
        'Set up TDD from day one with Jest unit tests and Cypress E2E tests',
        'Designed PostgreSQL schemas and turned Figma designs into production-ready UI',
      ],
      ja: [
        'React.js（フロントエンド）とNode.js（REST API）でSPAを要件定義からテストまで開発',
        'OrvalとOpenAPI（Swagger）を連携し、型安全なTypeScript APIクライアントを自動生成',
        '開発初期からJestの単体テストとCypressのE2EテストでTDDを実践',
        'PostgreSQLのスキーマ設計と、Figmaデザインに基づくUI実装',
      ],
    },
    phases: [
      { en: 'Frontend', ja: 'フロントエンド' },
      { en: 'REST APIs', ja: 'REST API' },
      { en: 'Database design', ja: 'DB設計' },
      { en: 'TDD', ja: 'TDD' },
    ],
    stack: ['React.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Orval', 'Swagger / OpenAPI', 'Jest', 'Cypress'],
  },
  {
    id: 'anomaly-ner',
    kind: 'project',
    start: '2024-07',
    end: '2025-02',
    title: { en: 'Anomaly Detection — NER Features', ja: '異常検知システム（NER機能開発）' },
    role: { en: 'Junior Web Engineer', ja: 'ジュニアWebエンジニア' },
    company: COMPANY,
    teamSize: { en: 'Team of 11–20', ja: '11〜20人' },
    summary: {
      en: 'Built Named Entity Recognition features for a power-plant anomaly detection system, extracting, classifying and visualising entities from maintenance documents and operational data.',
      ja: '発電所向け異常検知システムにて、保守文書・運用データからエンティティを抽出・分類・可視化するNER機能を開発。',
    },
    highlights: {
      en: [
        'Built NER features end to end: React.js UI, NestJS REST APIs and PostgreSQL storage',
        'Designed and built custom React data-visualisation components for entity analysis',
        'Designed UI/UX in Figma and implemented it as responsive React.js screens',
        'Wrote Jest unit tests and Swagger API documentation; took part in code reviews',
        'Delivered on schedule — recognised with promotion to Senior Web Engineer',
      ],
      ja: [
        'React.jsのUI、NestJSのREST API、PostgreSQLでのデータ格納までNER機能を一貫して開発',
        '複雑な分析結果を表示するReactのデータ可視化コンポーネントを設計・実装',
        'FigmaでUI/UXを設計し、レスポンシブなReact.js画面として実装',
        'Jestによる単体テストとSwaggerによるAPIドキュメントを整備し、コードレビューに参加',
        '納期通りにリリースし、シニアWebエンジニアへの昇進につながる',
      ],
    },
    phases: [
      { en: 'Frontend', ja: 'フロントエンド' },
      { en: 'REST APIs', ja: 'REST API' },
      { en: 'Data visualisation', ja: 'データ可視化' },
      { en: 'UI/UX design', ja: 'UI/UX設計' },
    ],
    stack: ['React.js', 'NestJS', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Azure', 'Jest', 'Swagger', 'Figma'],
  },
  {
    id: 'anomaly-ops',
    kind: 'promotion',
    start: '2025-03',
    end: '2025-06',
    title: { en: 'Anomaly Detection — Maintenance & Operations', ja: '異常検知システム（保守運用）' },
    role: { en: 'Senior Web Engineer · Sub-lead', ja: 'シニアWebエンジニア・サブリーダー' },
    company: COMPANY,
    teamSize: { en: 'Team of up to 4', ja: '4人以下' },
    summary: {
      en: 'Promoted to Senior Web Engineer. Kept the production system stable: new API features, bug fixes and releases.',
      ja: 'シニアWebエンジニアに昇進。API機能追加、不具合修正、リリースにより本番システムを安定稼働させる。',
    },
    highlights: {
      en: [
        'Built and maintained NestJS REST APIs with Swagger docs, adding features and optimising modules',
        'Diagnosed and fixed production issues through code analysis, debugging and Jest tests',
        'Owned production releases and set up the release and operations workflow',
        'Reviewed code and clarified specifications with Japanese-speaking client stakeholders',
      ],
      ja: [
        'NestJSのREST APIを開発・保守（新機能追加、既存モジュールの最適化、Swaggerでのドキュメント化）',
        'コード解析・デバッグ・Jestテストにより本番障害を調査・修正',
        '本番リリースを担当し、リリース・運用フローを確立',
        'コードレビューを行い、日本側クライアントと仕様を調整',
      ],
    },
    phases: [
      { en: 'REST APIs', ja: 'REST API' },
      { en: 'Bug fixing', ja: '不具合修正' },
      { en: 'Releases', ja: 'リリース' },
      { en: 'Code review', ja: 'コードレビュー' },
    ],
    stack: ['React.js', 'NestJS', 'TypeScript', 'Python', 'PostgreSQL', 'AWS', 'Azure', 'Linux', 'Jest', 'Swagger'],
  },
  {
    id: 'anomaly-rearch',
    kind: 'project',
    start: '2025-07',
    end: '2026-02',
    title: { en: 'Anomaly Detection — Re-architecture & Migration', ja: '異常検知システム（リアーキテクチャ・データ移行）' },
    role: { en: 'Senior Web Engineer · Sub-lead', ja: 'シニアWebエンジニア・サブリーダー' },
    company: COMPANY,
    teamSize: { en: 'Led 7 engineers (project of 11–20)', ja: '7名を指揮（全体11〜20人）' },
    summary: {
      en: 'Re-architected the system for AWS serverless and led the 2 TB time-series migration to Amazon Timestream — completed from PoC to production.',
      ja: 'システムをAWSサーバーレス構成へ再構築し、Amazon Timestreamへの2TB時系列データ移行をPoCから本番まで完遂。',
    },
    highlights: {
      en: [
        'Led and completed the 2 TB migration from InfluxDB 1.8 to Amazon Timestream, PoC through production',
        'Evaluated AWS migration tooling and built PoCs that solved storage-limit and compatibility issues',
        'Redesigned and refactored NestJS services and APIs for AWS serverless, preserving existing features',
        'Optimised PostgreSQL and Timestream data access for faster queries and processing',
        'Owned requirements, specification, database design and infrastructure for the new architecture',
        'Led 7 engineers while hands-on: task assignment, code reviews and mentoring',
      ],
      ja: [
        'InfluxDB 1.8からAmazon Timestreamへの2TBデータ移行をPoCから本番移行まで主導し完了',
        'AWS移行ツールを検証し、ストレージ制約と互換性の課題をPoCで解決',
        '既存機能を維持しながら、NestJSのサービスとAPIをAWSサーバーレス向けに再設計・リファクタリング',
        'PostgreSQLとTimestreamのデータアクセスを最適化し、クエリ性能と処理効率を改善',
        '新アーキテクチャの要件定義・仕様策定・DB設計・インフラ構築を担当',
        '自ら開発しながら7名を指揮（タスク割り当て、コードレビュー、技術指導）',
      ],
    },
    phases: [
      { en: 'Serverless architecture', ja: 'サーバーレス設計' },
      { en: 'Data migration', ja: 'データ移行' },
      { en: 'Database design', ja: 'DB設計' },
      { en: 'Query optimisation', ja: 'クエリ最適化' },
    ],
    stack: ['NestJS', 'Node.js', 'TypeScript', 'Python', 'AWS (serverless)', 'Amazon Timestream', 'InfluxDB 1.8', 'PostgreSQL', 'React.js', 'Azure', 'Linux', 'Jest', 'Swagger'],
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
      en: 'Promoted to Team Leader. Building a full-stack system for inventory tracking, stock movements, order management and reporting.',
      ja: 'チームリーダーに昇進。在庫管理・入出庫・受注管理・レポートを扱うフルスタックシステムを開発。',
    },
    highlights: {
      en: [
        'Architecting and building the core modules: React.js frontend, Express.js / Node.js REST APIs and a SQL data layer',
        'Implementing inventory calculation, stock movements, order management and reporting logic',
        'Leading 6–8 engineers through task planning, code reviews, debugging and testing in Agile sprints',
        'Turned client requirements into technical specifications, scope and estimates',
        'Also retained leadership of the re-architecture team and took the 2 TB migration through its production run',
      ],
      ja: [
        'React.jsのフロントエンド、Express.js / Node.jsのREST API、SQLのデータ層からなるコアモジュールを設計・開発',
        '在庫計算・入出庫管理・受注管理・レポートの業務ロジックを実装',
        'タスク計画、コードレビュー、デバッグ、テストを通じて6〜8名のチームをアジャイルで運営',
        '顧客要件を技術仕様・スコープ・工数見積りに落とし込み',
        'リアーキテクチャチームのリーダー責任も担い、2TBデータ移行の本番移行を完遂',
      ],
    },
    phases: [
      { en: 'Frontend', ja: 'フロントエンド' },
      { en: 'REST APIs', ja: 'REST API' },
      { en: 'SQL', ja: 'SQL' },
      { en: 'Technical specs', ja: '技術仕様' },
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'JavaScript', 'SQL', 'REST APIs', 'Git', 'Agile / Scrum'],
  },
];
