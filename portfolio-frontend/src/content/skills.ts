import type { SkillGroup } from '@/types/content';

/** Months of hands-on experience come from the 職務経歴書 technical-skills table (as of Oct 2026). */
export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: { en: 'Frontend', ja: 'フロントエンド' },
    description: { en: 'Interfaces users see and touch', ja: 'ユーザーが見て操作する画面' },
    items: [
      { name: 'React.js', months: 33 },
      { name: 'TypeScript', months: 33 },
      { name: 'JavaScript (ES6+)', months: 33 },
      { name: 'Figma (UI/UX)', months: 12 },
      { name: 'Storybook', months: 6 },
      { name: 'HTML5 / CSS3' },
    ],
  },
  {
    id: 'backend',
    title: { en: 'Backend', ja: 'バックエンド' },
    description: { en: 'APIs, services and business logic', ja: 'API・サービス・業務ロジック' },
    items: [
      { name: 'Node.js', months: 33 },
      { name: 'NestJS', months: 27 },
      { name: 'Swagger / OpenAPI', months: 33 },
      { name: 'Python', months: 12 },
      { name: 'Express.js', months: 6 },
      { name: 'Orval', months: 6 },
      { name: 'RESTful APIs' },
      { name: 'SQL' },
    ],
  },
  {
    id: 'data-cloud',
    title: { en: 'Data & Cloud', ja: 'データ・クラウド' },
    description: { en: 'Storing data and running it at scale', ja: 'データ管理と大規模運用' },
    items: [
      { name: 'PostgreSQL', months: 33 },
      { name: 'AWS', months: 24 },
      { name: 'Microsoft Azure', months: 20 },
      { name: 'AWS Serverless', months: 12 },
      { name: 'Amazon Timestream', months: 12 },
      { name: 'InfluxDB', months: 12 },
      { name: 'Linux', months: 12 },
      { name: 'Docker', months: 6 },
    ],
  },
  {
    id: 'quality',
    title: { en: 'Testing & Quality', ja: 'テスト・品質' },
    description: { en: 'Catching bugs before users do', ja: 'ユーザーより先に不具合を見つける' },
    items: [
      { name: 'Jest', months: 33 },
      { name: 'Cypress (E2E)', months: 6 },
      { name: 'TDD' },
      { name: 'Code review' },
    ],
  },
  {
    id: 'ai',
    title: { en: 'AI-assisted Development', ja: 'AI活用開発' },
    description: {
      en: 'Code generation, refactoring, testing and documentation — every change reviewed by me',
      ja: '実装・リファクタリング・テスト・ドキュメント作成に活用し、変更はすべて自分でレビュー',
    },
    items: [{ name: 'AI-assisted development', months: 12 }, { name: 'Claude' }, { name: 'GitHub Copilot' }],
  },
  {
    id: 'practices',
    title: { en: 'Engineering Practices', ja: '開発手法' },
    description: { en: 'How I deliver with clients and teams', ja: '顧客・チームと進める開発のやり方' },
    items: [
      { name: 'System re-architecture' },
      { name: 'Cloud data migration' },
      { name: 'Proofs of Concept' },
      { name: 'Git / GitHub' },
      { name: 'Agile / Scrum' },
      { name: 'Waterfall' },
      { name: 'Bridge SE (English ⇄ Japanese)' },
      { name: 'Team leadership' },
    ],
  },
];
