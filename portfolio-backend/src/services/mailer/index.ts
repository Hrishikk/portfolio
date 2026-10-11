import type { AppConfig } from '../../config/env.js';
import type { Logger } from '../../utils/logger.js';
import { ConsoleMailer } from './ConsoleMailer.js';
import type { Mailer } from './Mailer.js';
import { SmtpMailer } from './SmtpMailer.js';

export type { Mailer, MailMessage } from './Mailer.js';
export { ConsoleMailer } from './ConsoleMailer.js';
export { SmtpMailer } from './SmtpMailer.js';

/** Pick the mail transport based on configuration. */
export function createMailer(config: AppConfig, logger: Logger): Mailer {
  return config.mail.smtp ? new SmtpMailer(config.mail.smtp, logger) : new ConsoleMailer(logger);
}
