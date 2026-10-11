import cors from 'cors';
import express, { type Express, type RequestHandler } from 'express';
import helmet from 'helmet';
import type { AppConfig } from './config/env.js';
import { createErrorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { createContactRateLimiter } from './middleware/rateLimit.js';
import { createApiRouter } from './routes/index.js';
import { ContactService } from './services/contact.service.js';
import { createMailer, type Mailer } from './services/mailer/index.js';
import { findClientBundle, inlineScriptHashes, mountClient } from './static.js';
import { logger as defaultLogger, type Logger } from './utils/logger.js';

export interface AppDeps {
  config: AppConfig;
  logger?: Logger;
  /** Override the mail transport (tests inject a fake). */
  mailer?: Mailer;
  /** Override the whole contact service. */
  contactService?: ContactService;
  /** Override the contact rate limiter (tests may disable or tighten it). */
  rateLimiter?: RequestHandler;
}

/** Build the Express application. Pure: does not listen, so it can be used directly in tests. */
export function createApp(deps: AppDeps): Express {
  const { config } = deps;
  const logger = deps.logger ?? defaultLogger;
  const mailer = deps.mailer ?? createMailer(config, logger);
  const contactService =
    deps.contactService ??
    new ContactService({ mailer, logger, to: config.mail.to, from: config.mail.from });
  const rateLimiter = deps.rateLimiter ?? createContactRateLimiter(config.rateLimit);

  const bundle = findClientBundle(config.clientDistPath);
  if (config.clientDistPath && !bundle) {
    logger.warn('Static client hosting enabled but no build found', { dir: config.clientDistPath });
  }

  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', config.trustProxy ? 1 : false);

  app.use(
    helmet({
      contentSecurityPolicy: bundle
        ? {
            directives: {
              'script-src': ["'self'", ...inlineScriptHashes(bundle.indexHtml)],
              'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
              'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
              'img-src': ["'self'", 'data:'],
              'connect-src': ["'self'"],
            },
          }
        : undefined,
    }),
  );
  app.use(
    '/api',
    cors({
      origin: config.corsOrigins.length === 1 && config.corsOrigins[0] === '*' ? true : config.corsOrigins,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
      maxAge: 600,
    }),
  );
  app.use(express.json({ limit: '10kb' }));

  app.use('/api', createApiRouter({ contactService, rateLimiter }));

  if (bundle) mountClient(app, bundle, logger);

  app.use(notFound);
  app.use(createErrorHandler(logger));
  return app;
}
