import type { Certification, Education, LanguageSkill } from '@/types/content';

export const certifications: Certification[] = [
  {
    id: 'aws-ccp',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: { en: 'Jan 2026', ja: '2026年1月' },
    status: 'earned',
  },
  {
    id: 'jlpt-n3',
    name: 'JLPT N3',
    issuer: 'Japanese Language Proficiency Test',
    date: { en: 'Aug 2024', ja: '2024年8月' },
    status: 'earned',
  },
  {
    id: 'aws-saa',
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: { en: 'In progress', ja: '取得に向けて学習中' },
    status: 'in-progress',
  },
];

export const education: Education = {
  degree: {
    en: 'Bachelor of Engineering, Computer Science & Engineering',
    ja: 'コンピュータサイエンス工学 学士',
  },
  school: 'CMR Institute of Technology, India',
  period: { en: 'Aug 2019 – May 2023', ja: '2019年8月〜2023年5月' },
};

export const languages: LanguageSkill[] = [
  { id: 'en', name: { en: 'English', ja: '英語' }, level: { en: 'Professional', ja: 'ビジネスレベル' } },
  { id: 'ja', name: { en: 'Japanese', ja: '日本語' }, level: { en: 'Business (JLPT N3)', ja: 'ビジネス会話（JLPT N3）' } },
];
