import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

const booleanish = z
  .union([z.boolean(), z.string()])
  .transform((v) => (typeof v === 'boolean' ? v : ['1', 'true', 'yes', 'on'].includes(v.trim().toLowerCase())));

const emptyToUndefined = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? undefined : v);

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  TRUST_PROXY: z.preprocess(emptyToUndefined, booleanish.optional()),
  SERVE_CLIENT: z.preprocess(emptyToUndefined, booleanish.optional()),
  CLIENT_DIST_PATH: z.preprocess(emptyToUndefined, z.string().optional()),
  SMTP_HOST: z.preprocess(emptyToUndefined, z.string().optional()),
  SMTP_PORT: z.preprocess(emptyToUndefined, z.coerce.number().int().min(1).max(65535).default(587)),
  SMTP_USER: z.preprocess(emptyToUndefined, z.string().optional()),
  SMTP_PASS: z.preprocess(emptyToUndefined, z.string().optional()),
  CONTACT_TO: z.preprocess(emptyToUndefined, z.email().default('hrishikk8547@gmail.com')),
  CONTACT_FROM: z.preprocess(emptyToUndefined, z.string().optional()),
});

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
}

export interface AppConfig {
  env: 'development' | 'production' | 'test';
  isProduction: boolean;
  port: number;
  corsOrigins: string[];
  trustProxy: boolean;
  /** Absolute path to the built client, or null when static hosting is disabled. */
  clientDistPath: string | null;
  mail: {
    to: string;
    from: string;
    smtp: SmtpConfig | null;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
}

const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

/** Parse and validate environment variables into a typed, immutable config. */
export function loadConfig(source: NodeJS.ProcessEnv = process.env): AppConfig {
  const parsed = EnvSchema.safeParse(source);
  if (!parsed.success) {
    const details = parsed.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new ConfigError(`Invalid environment configuration:\n${details}`);
  }
  const env = parsed.data;
  const isProduction = env.NODE_ENV === 'production';

  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = env;
  const smtp: SmtpConfig | null =
    SMTP_HOST && SMTP_USER && SMTP_PASS
      ? { host: SMTP_HOST, port: env.SMTP_PORT, secure: env.SMTP_PORT === 465, user: SMTP_USER, pass: SMTP_PASS }
      : null;

  const serveClient = env.SERVE_CLIENT ?? isProduction;
  const clientDistPath = serveClient
    ? path.resolve(serverRoot, env.CLIENT_DIST_PATH ?? path.join('..', 'portfolio-frontend', 'dist'))
    : null;

  const config: AppConfig = {
    env: env.NODE_ENV,
    isProduction,
    port: env.PORT,
    corsOrigins: env.CORS_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean),
    trustProxy: env.TRUST_PROXY ?? false,
    clientDistPath,
    mail: {
      to: env.CONTACT_TO,
      from: env.CONTACT_FROM ?? (smtp ? smtp.user : 'Portfolio <no-reply@localhost>'),
      smtp,
    },
    rateLimit: { windowMs: 15 * 60 * 1000, max: 5 },
  };
  return Object.freeze(config);
}
