import nodemailer, { type Transporter } from 'nodemailer';
import type { SmtpConfig } from '../../config/env.js';
import type { Logger } from '../../utils/logger.js';
import type { MailMessage, Mailer } from './Mailer.js';

/** Sends mail through an SMTP server via nodemailer. Never logs message bodies. */
export class SmtpMailer implements Mailer {
  readonly name = 'smtp';
  private readonly transporter: Transporter;

  constructor(
    config: SmtpConfig,
    private readonly logger: Logger,
  ) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user: config.user, pass: config.pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
  }

  async verify(): Promise<void> {
    await this.transporter.verify();
  }

  async send(message: MailMessage): Promise<void> {
    const info = (await this.transporter.sendMail({
      to: message.to,
      from: message.from,
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
    })) as { messageId?: string };
    this.logger.info('Contact email sent', { messageId: info.messageId });
  }

  close(): void {
    this.transporter.close();
  }
}
