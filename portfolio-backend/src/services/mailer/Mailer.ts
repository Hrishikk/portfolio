export interface MailMessage {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
}

/** Abstraction over outgoing mail so business logic never depends on a transport. */
export interface Mailer {
  readonly name: string;
  send(message: MailMessage): Promise<void>;
  /** Optional connectivity check performed at startup. */
  verify?(): Promise<void>;
  close?(): Promise<void> | void;
}
