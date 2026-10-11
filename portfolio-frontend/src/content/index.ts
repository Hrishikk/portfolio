import type { NavItem } from '@/types/content';

export { profile, metrics, strengths } from './profile';
export { career } from './career';
export { projects } from './projects';
export { skillGroups } from './skills';
export { certifications, education, languages } from './credentials';

export const navItems: NavItem[] = [
  { id: 'about', label: { en: 'About', ja: '自己紹介' } },
  { id: 'experience', label: { en: 'Experience', ja: '経歴' } },
  { id: 'projects', label: { en: 'Projects', ja: 'プロジェクト' } },
  { id: 'skills', label: { en: 'Skills', ja: 'スキル' } },
  { id: 'certifications', label: { en: 'Credentials', ja: '資格' } },
  { id: 'contact', label: { en: 'Contact', ja: 'お問い合わせ' } },
];
