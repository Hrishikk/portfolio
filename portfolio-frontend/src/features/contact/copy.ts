import type { Localized } from '@/types/content';

/** All contact-section strings, in English and Japanese. */
export const copy = {
  lead: {
    en: 'Hiring, a project, or just a hello — my inbox is open.',
    ja: '採用のご相談、プロジェクトのご依頼、ちょっとしたご挨拶まで、どうぞお気軽に。',
  },
  invitation: {
    en: 'I build web systems end to end and lead small teams that ship. If you think I could help your team, I’d be glad to hear from you.',
    ja: 'Webシステムを設計から運用まで一貫して手がけ、少人数チームを率いて確実に届けてきました。お力になれそうでしたら、お気軽にご連絡ください。',
  },
  availabilityLabel: { en: 'Status', ja: '現在の状況' },
  emailMe: { en: 'Email me', ja: 'メールを送る' },
  copyEmail: { en: 'Copy email address', ja: 'メールアドレスをコピー' },
  copyHint: { en: 'Paste it into any mail app', ja: 'お使いのメールアプリに貼り付けできます' },
  copied: { en: 'Email address copied', ja: 'メールアドレスをコピーしました' },
  copyFailed: { en: 'Couldn’t copy — please select it manually', ja: 'コピーできませんでした。手動で選択してください' },
  connectLinkedIn: { en: 'Connect on LinkedIn', ja: 'LinkedInでつながる' },
  cardLabel: { en: 'Business card', ja: '名刺' },
  detailsHeading: { en: 'Contact details', ja: '連絡先' },
  opensInNewTab: { en: '(opens in a new tab)', ja: '（新しいタブで開きます）' },
} satisfies Record<string, Localized>;
