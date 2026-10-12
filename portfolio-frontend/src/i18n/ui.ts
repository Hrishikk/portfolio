import type { Localized } from '@/types/content';

/**
 * Static UI labels (buttons, section headings, shared labels).
 * Feature copy lives in `src/content`; only chrome/labels belong here.
 */
export const ui = {
  sections: {
    about: { eyebrow: { en: 'About', ja: '自己紹介' }, title: { en: 'Building reliable web products, front to back', ja: 'フロントからバックエンドまで、信頼できるWebプロダクトを' } },
    experience: { eyebrow: { en: 'Experience', ja: '職務経歴' }, title: { en: 'My development journey', ja: '開発者としての歩み' } },
    projects: { eyebrow: { en: 'Projects', ja: 'プロジェクト' }, title: { en: 'Selected work', ja: '主な開発実績' } },
    skills: { eyebrow: { en: 'Skills', ja: 'スキル' }, title: { en: 'Technologies I work with', ja: '使用技術' } },
    certifications: { eyebrow: { en: 'Credentials', ja: '資格・学歴' }, title: { en: 'Certifications & education', ja: '資格・学歴' } },
    contact: { eyebrow: { en: 'Contact', ja: 'お問い合わせ' }, title: { en: 'Let’s work together', ja: 'お気軽にご連絡ください' } },
  },
  actions: {
    contact: { en: 'Get in touch', ja: 'お問い合わせ' },
    viewWork: { en: 'View my work', ja: '開発実績を見る' },
    switchLanguage: { en: '日本語', ja: 'English' },
    toggleTheme: { en: 'Toggle dark mode', ja: 'ダークモード切替' },
    openMenu: { en: 'Open menu', ja: 'メニューを開く' },
    closeMenu: { en: 'Close menu', ja: 'メニューを閉じる' },
    backToTop: { en: 'Back to top', ja: 'トップへ戻る' },
  },
  labels: {
    present: { en: 'Present', ja: '現在' },
    stack: { en: 'Tech used', ja: '使用技術' },
    phases: { en: 'Focus areas', ja: '担当領域' },
    team: { en: 'Team', ja: '体制' },
    problem: { en: 'The problem', ja: '課題' },
    solution: { en: 'What I did', ja: '取り組み' },
    outcome: { en: 'Result', ja: '成果' },
    education: { en: 'Education', ja: '学歴' },
    languages: { en: 'Languages', ja: '語学' },
    earned: { en: 'Earned', ja: '取得済み' },
    inProgress: { en: 'In progress', ja: '学習中' },
  },
} satisfies Record<string, Record<string, Localized | { eyebrow: Localized; title: Localized }>>;
