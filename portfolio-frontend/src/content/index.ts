import type { NavItem } from '@/types/content';

export { profile, metrics } from './profile';
export { career } from './career';
export { projects } from './projects';
export { skillGroups } from './skills';
export { aiExperience } from './ai';
export { certifications, education, languages } from './credentials';

export const navItems: NavItem[] = [
  { id: 'about', label: { en: 'About', ja: '自己紹介' } },
  { id: 'experience', label: { en: 'Journey', ja: '経歴' } },
  { id: 'projects', label: { en: 'Projects', ja: 'プロジェクト' } },
  { id: 'skills', label: { en: 'Skills', ja: 'スキル' } },
  { id: 'ai', label: { en: 'AI Dev', ja: 'AI活用' } },
  { id: 'certifications', label: { en: 'Credentials', ja: '資格' } },
  { id: 'contact', label: { en: 'Contact', ja: 'お問い合わせ' } },
];
