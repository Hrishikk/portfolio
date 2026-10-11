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
      en: 'Joined VeBuIn and built a rewards and loyalty SPA where users earn, track and redeem points.',
      ja: 'VeBuInに入社し、ポイントの獲得・管理・交換ができるリワードSPAを開発。',
    },
    highlights: {
      en: [
        'Built the full-stack SPA with React.js and Node.js / NestJS REST APIs',
        'Used Orval with Swagger (OpenAPI) to generate type-safe API clients',
        'Set up TDD with Jest unit tests and Cypress E2E tests from day one',
        'Designed PostgreSQL schemas and Figma UI screens',
        'Strong delivery got me picked for the JAIME project',
      ],
      ja: [
        'React.jsとNode.js / NestJSによるSPAおよびREST APIを設計・実装',
        'Orval×Swagger（OpenAPI）で型安全なAPIクライアントを自動生成',
        'JestとCypressによるテスト駆動開発（TDD）環境を構築',
        'PostgreSQLのDB設計とFigmaによる画面設計を担当',
        '設計から実装までの完遂力が評価され、JAIMEプロジェクトへ抜擢',
      ],
    },
    phases: [
      { en: 'Requirements', ja: '要件定義' },
      { en: 'Design', ja: '設計' },
      { en: 'Coding', ja: 'コーディング' },
      { en: 'Testing / QA', ja: 'テスト・QA' },
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
      en: 'Built AI-powered Named Entity Recognition features that pull out and visualise key information from maintenance documents.',
      ja: '保守ドキュメントから情報を抽出・分類・可視化するAI固有表現抽出（NER）機能を開発。',
    },
    highlights: {
      en: [
        'Turned Figma designs into responsive React.js screens',
        'Built NestJS REST APIs backed by PostgreSQL',
        'Created custom data-visualisation components for NER results',
        'Released the NER features on schedule',
      ],
      ja: [
        'Figmaのデザインをレスポンシブな React.js 画面として実装',
        'NestJS と PostgreSQL による REST API を開発',
        'NER解析結果のためのデータ可視化コンポーネントを設計・実装',
        'NER機能を納期通りにリリース',
      ],
    },
    phases: [
      { en: 'Requirements', ja: '要件定義' },
      { en: 'UI/UX Design', ja: 'UI/UXデザイン' },
      { en: 'Coding', ja: 'コーディング' },
      { en: 'Testing / QA', ja: 'テスト・QA' },
    ],
    stack: ['React.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Figma', 'Jest', 'Swagger', 'AWS'],
  },
  {
    id: 'jaime-ops',
    kind: 'promotion',
    start: '2025-03',
    end: '2025-06',
    title: { en: 'JAIME — Maintenance & Operations', ja: 'JAIME（保守運用）' },
    role: { en: 'Senior Web Engineer · Sub-leader', ja: 'シニアWebエンジニア・サブリーダー' },
    company: COMPANY,
    teamSize: { en: 'Team of up to 4', ja: '4人以下' },
    summary: {
      en: 'Promoted to Senior Web Engineer. Ran production releases, handled client questions and acted as the bridge between the client and the team.',
      ja: 'シニアWebエンジニアに昇進。本番リリースと顧客対応を担い、クライアントと開発チームの橋渡し役を務める。',
    },
    highlights: {
      en: [
        'Set up and ran the release flow to production',
        'Supported teammates on hard technical problems and reviewed their code',
        'Agreed specifications with Japanese clients to avoid rework',
        'Fast bug fixes and stable releases improved system uptime',
      ],
      ja: [
        '本番環境へのリリース作業と運用フローを確立・実行',
        'メンバーの技術課題をサポートし、コードレビューを実施',
        '日本側クライアントと仕様を調整し、認識齟齬による手戻りを防止',
        '迅速なバグ修正と安定したリリースで稼働率向上に貢献',
      ],
    },
    phases: [
      { en: 'Operations', ja: '保守運用' },
      { en: 'Code Review', ja: 'レビュー' },
      { en: 'Management', ja: 'マネジメント' },
      { en: 'Analysis', ja: '分析' },
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
    teamSize: { en: 'Led 7 engineers (project of 11–20)', ja: '7名を統率（全体11〜20人）' },
    summary: {
      en: 'Led the move to a modern AWS serverless architecture and a 2 TB time-series data migration.',
      ja: 'AWSサーバーレス構成へのシステム再構築と、2TBの時系列データ移行をリード。',
    },
    highlights: {
      en: [
        'Directed the 2 TB migration from InfluxDB 1.8 to Amazon Timestream',
        'Built AWS proofs of concept to solve storage limits and compatibility issues',
        'Assigned tasks, tracked progress and mentored a team of 7',
        'Kept 98% client satisfaction during a technically hard phase',
      ],
      ja: [
        'InfluxDB 1.8 から Amazon Timestream への2TBデータ移行を総指揮',
        'AWSでPoCを行い、ストレージ制約や互換性の課題を解決',
        '7名のメンバーのタスク割り当て・進捗管理・技術指導',
        '技術難易度の高いフェーズでも顧客満足度98%を維持',
      ],
    },
    phases: [
      { en: 'Requirements', ja: '要件定義' },
      { en: 'Architecture', ja: '設計' },
      { en: 'Infrastructure', ja: 'インフラ構築' },
      { en: 'Management', ja: 'マネジメント' },
    ],
    stack: ['React.js', 'NestJS', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Amazon Timestream', 'InfluxDB', 'PostgreSQL', 'Swagger'],
  },
  {
    id: 'inventory',
    kind: 'current',
    start: '2026-03',
    title: { en: 'Inventory Management System', ja: '在庫管理システム' },
    role: { en: 'Team Leader (Full Stack)', ja: 'チームリーダー（フルスタック）' },
    company: COMPANY,
    teamSize: { en: 'Team of 6–8', ja: '6〜8人' },
    summary: {
      en: 'Promoted to Team Leader. Leading a new web system for stock tracking, stock movement, orders and reports.',
      ja: 'チームリーダーに就任。在庫・入出庫・受注・レポートを管理する新規Webシステムの開発をリード。',
    },
    highlights: {
      en: [
        'Gathered client requirements and wrote the proposal with scope and estimates',
        'Turned business needs into technical specifications',
        'Designing and building core modules with React.js, Node.js, Express.js and SQL',
        'Running Agile sprints, code reviews and testing',
      ],
      ja: [
        '顧客ヒアリングを行い、スコープと工数見積りを含む提案書を作成',
        'ビジネス要件を技術仕様へ落とし込み',
        'React.js・Node.js・Express.js・SQL でコアモジュールを設計・開発',
        'アジャイルスプリント、コードレビュー、テストを管理',
      ],
    },
    phases: [
      { en: 'Requirements', ja: '要件定義' },
      { en: 'Proposal & Estimate', ja: '提案・見積り' },
      { en: 'Coding', ja: 'コーディング' },
      { en: 'Review / QA', ja: 'レビュー・QA' },
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'JavaScript', 'SQL', 'REST APIs', 'Agile / Scrum'],
  },
];
