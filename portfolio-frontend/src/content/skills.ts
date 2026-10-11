import type { SkillGroup } from '@/types/content';

/** Years come from the 職務経歴書 technical-skills table where available. */
export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: { en: 'Frontend', ja: 'フロントエンド' },
    description: { en: 'What users see and touch', ja: 'ユーザーが見て操作する部分' },
    items: [
      { name: 'React.js', years: 2 },
      { name: 'TypeScript', years: 2 },
      { name: 'JavaScript (ES6+)', years: 2 },
      { name: 'HTML5 / CSS3' },
      { name: 'Figma / UI-UX' },
    ],
  },
  {
    id: 'backend',
    title: { en: 'Backend', ja: 'バックエンド' },
    description: { en: 'APIs and business logic', ja: 'API と業務ロジック' },
    items: [
      { name: 'NestJS', years: 2 },
      { name: 'Node.js', years: 1.5 },
      { name: 'Express.js' },
      { name: 'Python', years: 0.5 },
      { name: 'REST APIs / Swagger' },
      { name: 'Microservices' },
    ],
  },
  {
    id: 'data',
    title: { en: 'Data', ja: 'データベース' },
    description: { en: 'Where information lives', ja: '情報を保存する場所' },
    items: [
      { name: 'PostgreSQL', years: 2 },
      { name: 'Amazon Timestream' },
      { name: 'InfluxDB' },
      { name: 'SQL' },
    ],
  },
  {
    id: 'cloud',
    title: { en: 'Cloud & DevOps', ja: 'クラウド・インフラ' },
    description: { en: 'Running it reliably at scale', ja: '大規模で安定稼働させる仕組み' },
    items: [
      { name: 'AWS', years: 1 },
      { name: 'Microsoft Azure', years: 0.5 },
      { name: 'Docker' },
      { name: 'Linux', years: 0.5 },
      { name: 'CI/CD · Git · GitHub' },
    ],
  },
  {
    id: 'quality',
    title: { en: 'Testing & Quality', ja: 'テスト・品質保証' },
    description: { en: 'Catching bugs before users do', ja: 'ユーザーより先にバグを見つける' },
    items: [
      { name: 'Jest', years: 2 },
      { name: 'Cypress', years: 0.5 },
      { name: 'Storybook', years: 0.5 },
      { name: 'TDD / E2E' },
    ],
  },
  {
    id: 'leadership',
    title: { en: 'Leadership & Bridge SE', ja: 'リーダーシップ・ブリッジSE' },
    description: { en: 'Bringing people and plans together', ja: '人と計画をつなぐ力' },
    items: [
      { name: 'Team Leadership' },
      { name: 'Requirements Gathering' },
      { name: 'Proposals & Estimation' },
      { name: 'Stakeholder Management' },
      { name: 'Agile / Scrum / Waterfall' },
    ],
  },
];
