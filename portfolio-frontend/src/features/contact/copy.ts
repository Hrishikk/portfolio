import type { Localized } from '@/types/content';

/** All contact-section strings, in English and Japanese. */
export const copy = {
  lead: {
    en: 'Hiring, a project, or just a hello — my inbox is open.',
    ja: '採用のご相談、プロジェクトのご依頼、ちょっとしたご挨拶まで、どうぞお気軽に。',
  },
  invitation: {
    en: 'I build web systems end to end and lead small teams that ship. If you think I could help your team, send a note.',
    ja: 'Webシステムを設計から運用まで一貫して手がけ、少人数チームを率いて確実に届けてきました。お力になれそうでしたら、お気軽にメッセージをお送りください。',
  },
  availabilityLabel: { en: 'Status', ja: '現在の状況' },
  cardLabel: { en: 'Business card', ja: '名刺' },
  directHeading: { en: 'Or reach me directly', ja: '直接のご連絡はこちら' },
  opensInNewTab: { en: '(opens in a new tab)', ja: '（新しいタブで開きます）' },

  formHeading: { en: 'Send a message', ja: 'メッセージを送る' },
  requiredNote: { en: 'Fields marked * are required.', ja: '* は必須項目です。' },
  optional: { en: 'optional', ja: '任意' },

  nameLabel: { en: 'Name', ja: 'お名前' },
  namePlaceholder: { en: 'Taro Yamada', ja: '山田 太郎' },
  emailLabel: { en: 'Email', ja: 'メールアドレス' },
  emailPlaceholder: { en: 'you@example.com', ja: 'you@example.com' },
  companyLabel: { en: 'Company', ja: '会社名' },
  companyPlaceholder: { en: 'Your company or organisation', ja: '株式会社〇〇' },
  messageLabel: { en: 'Message', ja: 'お問い合わせ内容' },
  messagePlaceholder: {
    en: 'Tell me a little about the role or project…',
    ja: 'ポジションやプロジェクトの概要をご記入ください…',
  },
  honeypotLabel: { en: 'Leave this field empty', ja: 'この欄は空のままにしてください' },

  submit: { en: 'Send message', ja: '送信する' },
  sending: { en: 'Sending…', ja: '送信中…' },
  sendAnother: { en: 'Send another message', ja: '別のメッセージを送る' },

  errorRequired: { en: 'This field is required.', ja: 'この項目は必須です。' },
  errorNameShort: { en: 'Please enter at least 2 characters.', ja: '2文字以上で入力してください。' },
  errorNameLong: { en: 'Please keep it under 80 characters.', ja: '80文字以内で入力してください。' },
  errorEmailInvalid: {
    en: 'Please enter a valid email address.',
    ja: '正しいメールアドレスを入力してください。',
  },
  errorEmailLong: { en: 'Please keep it under 120 characters.', ja: '120文字以内で入力してください。' },
  errorCompanyLong: { en: 'Please keep it under 100 characters.', ja: '100文字以内で入力してください。' },
  errorMessageShort: {
    en: 'Please write at least 10 characters.',
    ja: '10文字以上でご記入ください。',
  },
  errorMessageLong: { en: 'Please keep it under 2,000 characters.', ja: '2,000文字以内でご記入ください。' },
  errorServerField: { en: 'Please check this field.', ja: '入力内容をご確認ください。' },

  errorSummary: {
    en: 'Please fix the highlighted fields and try again.',
    ja: '入力内容に誤りがあります。ご確認のうえ、もう一度お試しください。',
  },
  failRateLimited: {
    en: 'You’ve sent several messages in a short time. Please wait a few minutes and try again.',
    ja: '短時間に複数回送信されました。数分おいてから再度お試しください。',
  },
  failTimeout: {
    en: 'The server took too long to respond. Please try again.',
    ja: 'サーバーの応答がありませんでした。もう一度お試しください。',
  },
  failNetwork: {
    en: 'Couldn’t reach the server. Check your connection, or email me directly.',
    ja: 'サーバーに接続できませんでした。通信環境をご確認いただくか、メールで直接ご連絡ください。',
  },
  failServer: {
    en: 'Something went wrong on my side. Please try again later, or email me directly.',
    ja: 'サーバー側でエラーが発生しました。時間をおいて再度お試しいただくか、メールで直接ご連絡ください。',
  },

  successStamp: { en: 'Sent', ja: '送信完了' },
  successTitle: { en: 'Thank you — message received.', ja: 'お問い合わせありがとうございます。' },
  successBody: {
    en: 'I’ll read it and get back to you soon.',
    ja: '内容を確認のうえ、折り返しご連絡いたします。',
  },
  sendingStatus: { en: 'Sending your message…', ja: 'メッセージを送信しています…' },
} satisfies Record<string, Localized>;

export type CopyKey = keyof typeof copy;
