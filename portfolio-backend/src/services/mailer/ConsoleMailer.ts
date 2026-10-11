import type { Logger } from '../../utils/logger.js';
import type { MailMessage, Mailer } from './Mailer.js';

/** Development fallback: prints the message instead of sending it. */
export class ConsoleMailer implements Mailer {
  readonly name = 'console';

  constructor(private readonly logger: Logger) {}

  send(message: MailMessage): Promise<void> {
    this.logger.info('[ConsoleMailer] Email not sent (SMTP not configured). Message follows:', {
      to: message.to,
      from: message.from,
      replyTo: message.replyTo,
      subject: message.subject,
    });
    console.log(`\n----- BEGIN MESSAGE -----\n${message.text}\n----- END MESSAGE -----\n`);
    return Promise.resolve();
  }
}
