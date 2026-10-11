import type { Localized } from '@/types/content';

/** All contact-section strings, in English and Japanese. */
export const copy = {
  lead: {
    en: 'Based in Japan and open to opportunities in Japan and internationally.',
    ja: '日本在住。国内外のポジションに関心があります。',
  },
  invitation: {
    en: 'I build full-stack web applications with React, NestJS, Node.js and AWS. If you’re hiring or have a project in mind, I’d be glad to hear from you.',
    ja: 'React・NestJS・Node.js・AWSでフルスタックのWebアプリケーションを開発しています。採用やプロジェクトのご相談など、お気軽にご連絡ください。',
  },
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
