import type { Localized } from '@/types/content';

/**
 * Static UI labels (buttons, section eyebrows, form text).
 * Feature copy lives in `src/content`; only chrome/labels belong here.
 */
export const ui = {
  sections: {
    about: { kanji: '私', title: { en: 'About me', ja: '自己紹介' } },
    experience: { kanji: '歩', title: { en: 'Career journey', ja: 'キャリアの歩み' } },
    projects: { kanji: '創', title: { en: 'Featured projects', ja: '主なプロジェクト' } },
    skills: { kanji: '技', title: { en: 'Skills & tools', ja: 'スキル・ツール' } },
    ai: { kanji: '智', title: { en: 'AI-assisted development', ja: 'AIを活用した開発' } },
    certifications: { kanji: '証', title: { en: 'Credentials', ja: '資格・学歴' } },
    contact: { kanji: '縁', title: { en: 'Let’s work together', ja: 'お気軽にご連絡ください' } },
  },
  actions: {
    contact: { en: 'Get in touch', ja: 'お問い合わせ' },
    viewJourney: { en: 'See my journey', ja: '経歴を見る' },
    switchLanguage: { en: '日本語', ja: 'English' },
    toggleTheme: { en: 'Toggle dark mode', ja: 'ダークモード切替' },
    openMenu: { en: 'Open menu', ja: 'メニューを開く' },
    closeMenu: { en: 'Close menu', ja: 'メニューを閉じる' },
    backToTop: { en: 'Back to top', ja: 'トップへ戻る' },
  },
  labels: {
    present: { en: 'Present', ja: '現在' },
    now: { en: 'Now', ja: '現在地' },
    stack: { en: 'Tech used', ja: '使用技術' },
    phases: { en: 'My part', ja: '担当工程' },
    team: { en: 'Team', ja: '体制' },
    problem: { en: 'The problem', ja: '課題' },
    solution: { en: 'What I did', ja: '取り組み' },
    outcome: { en: 'Result', ja: '成果' },
    years: { en: 'yrs', ja: '年' },
    workflow: { en: 'How I work with AI', ja: 'AIとの開発フロー' },
    principles: { en: 'My rules for AI', ja: 'AI活用のルール' },
    education: { en: 'Education', ja: '学歴' },
    languages: { en: 'Languages', ja: '語学' },
    earned: { en: 'Earned', ja: '取得済み' },
    inProgress: { en: 'In progress', ja: '学習中' },
    builtWith: { en: 'Built with React and TypeScript — and Claude Code.', ja: 'React・TypeScript、そしてClaude Codeで構築。' },
  },
} satisfies Record<string, Record<string, Localized | { kanji: string; title: Localized }>>;
