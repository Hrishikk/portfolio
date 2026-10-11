import type { Project } from '@/types/content';

/** Featured projects told as problem → solution → outcome stories. */
export const projects: Project[] = [
  {
    id: 'jaime-migration',
    name: 'JAIME Re-architecture & 2 TB Migration',
    period: { en: 'Jul 2025 – Feb 2026', ja: '2025年7月〜2026年2月' },
    role: { en: 'Team Lead · 7 engineers', ja: 'チームリーダー・7名' },
    problem: {
      en: 'An industrial-equipment monitoring platform had outgrown its InfluxDB 1.8 setup. 2 TB of time-series data had to move without breaking the business.',
      ja: '産業設備の監視プラットフォームがInfluxDB 1.8の限界に達し、業務を止めずに2TBの時系列データを移行する必要がありました。',
    },
    solution: {
      en: 'Moved to an AWS serverless design with Amazon Timestream. Proved the approach with PoCs that solved storage limits and InfluxDB-specific compatibility issues, then led the team through the rebuild.',
      ja: 'Amazon TimestreamとAWSサーバーレス構成へ移行。PoCでストレージ制約やInfluxDB特有の互換性問題を解決し、チームを率いて再構築を推進しました。',
    },
    outcomes: {
      en: ['2 TB migration path proven and moving to production', '98% client satisfaction kept', 'Faster queries and better scalability'],
      ja: ['2TB移行の手法を確立し本番移行を推進', '顧客満足度98%を維持', 'クエリ性能とスケーラビリティを改善'],
    },
    stack: ['AWS', 'Amazon Timestream', 'InfluxDB', 'NestJS', 'React.js', 'TypeScript', 'Python'],
    accent: 'vermilion',
  },
  {
    id: 'jaime-ner',
    name: 'JAIME NER — AI Entity Extraction',
    period: { en: 'Jul 2024 – Feb 2025', ja: '2024年7月〜2025年2月' },
    role: { en: 'Full Stack Engineer', ja: 'フルスタックエンジニア' },
    problem: {
      en: 'Maintenance documents held useful information, but it was hard to find and hard to search.',
      ja: '保守ドキュメントには有用な情報があるものの、探しにくく検索も困難でした。',
    },
    solution: {
      en: 'Built Named Entity Recognition features that extract and classify entities, with custom React.js visualisations and NestJS + PostgreSQL APIs.',
      ja: '固有表現を抽出・分類するNER機能を開発し、React.jsの可視化コンポーネントとNestJS + PostgreSQLのAPIを実装しました。',
    },
    outcomes: {
      en: ['Released on schedule', 'Better search and operational insight', 'Client needs matched through Figma designs'],
      ja: ['納期通りにリリース', '検索性と業務の可視性が向上', 'Figma設計で顧客要件を正確に具現化'],
    },
    stack: ['React.js', 'NestJS', 'PostgreSQL', 'Figma', 'Jest', 'Swagger'],
    accent: 'indigo',
  },
  {
    id: 'inventory',
    name: 'Inventory Management System',
    period: { en: 'Mar 2026 – Present', ja: '2026年3月〜現在' },
    role: { en: 'Team Leader', ja: 'チームリーダー' },
    problem: {
      en: 'The client needed one place to track stock, stock movement, orders and reports.',
      ja: '在庫・入出庫・受注・レポートを一元管理できる仕組みが求められていました。',
    },
    solution: {
      en: 'Led requirements and the proposal with estimates, then designed core modules with React.js, Node.js, Express.js and SQL.',
      ja: '要件定義と見積りを含む提案をリードし、React.js・Node.js・Express.js・SQLでコアモジュールを設計しました。',
    },
    outcomes: {
      en: ['Clear scope agreed with the client', 'Scalable full-stack base', 'Delivered in Agile sprints'],
      ja: ['顧客とスコープを明確に合意', '拡張性のあるフルスタック基盤', 'アジャイルスプリントで納品'],
    },
    stack: ['React.js', 'Node.js', 'Express.js', 'SQL', 'REST APIs'],
    accent: 'matcha',
  },
  {
    id: 'reward-zone',
    name: 'Reward Zone',
    period: { en: 'Jan 2024 – Jun 2024', ja: '2024年1月〜2024年6月' },
    role: { en: 'Full Stack Engineer', ja: 'フルスタックエンジニア' },
    problem: {
      en: 'The company wanted a fun way for people to earn, track and redeem reward points.',
      ja: 'ポイントを楽しく獲得・管理・交換できる仕組みが求められていました。',
    },
    solution: {
      en: 'Built a React.js SPA with Node.js APIs. Orval generated type-safe API clients from Swagger, and TDD with Jest and Cypress kept quality high.',
      ja: 'React.js SPAとNode.js APIを開発。SwaggerからOrvalで型安全なクライアントを生成し、JestとCypressのTDDで品質を確保しました。',
    },
    outcomes: {
      en: ['Fewer bugs thanks to early E2E tests', 'Higher team engagement', 'Led to selection for JAIME'],
      ja: ['早期E2Eテストで手戻りを削減', 'チームのエンゲージメント向上', 'JAIMEプロジェクトへの抜擢につながる'],
    },
    stack: ['React.js', 'Node.js', 'PostgreSQL', 'Orval', 'Jest', 'Cypress'],
    accent: 'gold',
  },
];
