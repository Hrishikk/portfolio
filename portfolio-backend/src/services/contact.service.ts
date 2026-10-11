import type { ContactPayload } from '../validation/contact.schema.js';
import type { Logger } from '../utils/logger.js';
import type { Mailer, MailMessage } from './mailer/Mailer.js';

export interface ContactServiceOptions {
  mailer: Mailer;
  logger: Logger;
  to: string;
  from: string;
  now?: () => Date;
}

export interface ContactMeta {
  ip?: string;
  userAgent?: string;
}

export type SubmitOutcome = { status: 'sent' } | { status: 'discarded'; reason: 'honeypot' };

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch] ?? ch);
}

/** Business logic for the contact form. Transport-agnostic: depends only on the Mailer interface. */
export class ContactService {
  private readonly now: () => Date;

  constructor(private readonly options: ContactServiceOptions) {
    this.now = options.now ?? (() => new Date());
  }

  async submit(payload: ContactPayload, meta: ContactMeta = {}): Promise<SubmitOutcome> {
    if (payload.website.trim() !== '') {
      this.options.logger.warn('Contact submission discarded (honeypot filled)', { ip: meta.ip });
      return { status: 'discarded', reason: 'honeypot' };
    }

    await this.options.mailer.send(this.buildMessage(payload, meta));
    this.options.logger.info('Contact submission accepted', {
      mailer: this.options.mailer.name,
      messageLength: payload.message.length,
    });
    return { status: 'sent' };
  }

  buildMessage(payload: ContactPayload, meta: ContactMeta = {}): MailMessage {
    const { name, email, company, message } = payload;
    const receivedAt = this.now().toISOString();
    const subject = `Portfolio contact from ${name}${company ? ` (${company})` : ''}`;

    const text = [
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Company: ${company ?? '-'}`,
      `Sent:    ${receivedAt}`,
      meta.ip ? `IP:      ${meta.ip}` : null,
      '',
      message,
    ]
      .filter((line): line is string => line !== null)
      .join('\n');

    const row = (label: string, value: string) =>
      `<tr><th align="left" style="padding:4px 12px 4px 0;color:#7a7266;font-weight:600">${label}</th><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`;

    const html = `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#1c1a17;line-height:1.6">
<h2 style="margin:0 0 12px;font-size:18px">New message from your portfolio</h2>
<table style="border-collapse:collapse;margin-bottom:16px">
${row('Name', name)}
${row('Email', email)}
${row('Company', company ?? '-')}
${row('Sent', receivedAt)}
</table>
<div style="white-space:pre-wrap;border-left:3px solid #d2462f;padding:8px 12px;background:#f6f1e7">${escapeHtml(message)}</div>
</body></html>`;

    return { to: this.options.to, from: this.options.from, replyTo: email, subject, text, html };
  }
}
