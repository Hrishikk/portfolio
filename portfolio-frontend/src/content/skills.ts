import type { SkillGroup } from '@/types/content';

/** Years come from the 職務経歴書 technical-skills table where available. */
export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: { en: 'Frontend', ja: 'フロントエンド' },
    description: { en: 'Interfaces users see and touch', ja: 'ユーザーが見て操作する画面' },
    items: [
      { name: 'React.js', years: 2 },
      { name: 'TypeScript', years: 2 },
      { name: 'JavaScript (ES6+)', years: 2 },
      { name: 'HTML5 / CSS3' },
      { name: 'Figma' },
      { name: 'Responsive UI' },
    ],
  },
  {
    id: 'backend',
    title: { en: 'Backend', ja: 'バックエンド' },
    description: { en: 'APIs, services and business logic', ja: 'API・サービス・業務ロジック' },
    items: [
      { name: 'NestJS', years: 2 },
      { name: 'Node.js', years: 1.5 },
      { name: 'Python', years: 0.5 },
      { name: 'Express.js' },
      { name: 'REST APIs' },
      { name: 'Swagger / OpenAPI' },
      { name: 'Microservices' },
    ],
  },
  {
    id: 'data-cloud',
    title: { en: 'Data & Cloud', ja: 'データ・クラウド' },
    description: { en: 'Storing data and running it at scale', ja: 'データ管理と大規模運用' },
    items: [
      { name: 'PostgreSQL', years: 2 },
      { name: 'AWS', years: 1 },
      { name: 'Microsoft Azure', years: 0.5 },
      { name: 'Amazon Timestream' },
      { name: 'InfluxDB' },
      { name: 'Docker' },
      { name: 'Linux' },
      { name: 'CI/CD · Git' },
    ],
  },
  {
    id: 'quality',
    title: { en: 'Testing & Quality', ja: 'テスト・品質' },
    description: { en: 'Catching bugs before users do', ja: 'ユーザーより先に不具合を見つける' },
    items: [
      { name: 'Jest', years: 2 },
      { name: 'Cypress', years: 0.5 },
      { name: 'Storybook', years: 0.5 },
      { name: 'TDD' },
      { name: 'E2E testing' },
      { name: 'Code review' },
    ],
  },
  {
    id: 'ai',
    title: { en: 'AI-assisted Development', ja: 'AI活用開発' },
    description: {
      en: 'Faster delivery — every AI change is reviewed by me',
      ja: '開発を加速。AIによる変更はすべて自分でレビュー',
    },
    items: [{ name: 'GitHub Copilot' }, { name: 'Claude Code' }],
  },
  {
    id: 'collaboration',
    title: { en: 'Collaboration', ja: 'コラボレーション' },
    description: { en: 'Working well with clients and teams', ja: '顧客・チームとの協働' },
    items: [
      { name: 'Bridge SE (English ⇄ Japanese)' },
      { name: 'Team leadership' },
      { name: 'Requirements analysis' },
      { name: 'Agile / Scrum' },
    ],
  },
];
