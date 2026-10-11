import 'dotenv/config';
import type { Server } from 'node:http';
import { createApp } from './app.js';
import { ConfigError, loadConfig } from './config/env.js';
import { createMailer } from './services/mailer/index.js';
import { logger } from './utils/logger.js';

function bootstrap(): void {
  let config;
  try {
    config = loadConfig();
  } catch (err) {
    if (err instanceof ConfigError) {
      logger.error(err.message);
      process.exit(1);
    }
    throw err;
  }

  const mailer = createMailer(config, logger);
  if (mailer.verify) {
    mailer.verify().then(
      () => logger.info('SMTP connection verified'),
      (err: unknown) => logger.warn('SMTP verification failed; messages may not be delivered', { error: err }),
    );
  } else {
    logger.warn('SMTP not configured — contact messages will be printed to the console');
  }

  const app = createApp({ config, logger, mailer });
  const server: Server = app.listen(config.port, () => {
    logger.info(`Server listening on http://localhost:${config.port}`, { env: config.env, mailer: mailer.name });
  });

  let shuttingDown = false;
  const shutdown = (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;
    logger.info(`${signal} received, shutting down gracefully`);
    const force = setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10_000);
    force.unref();
    server.close((err) => {
      void Promise.resolve(mailer.close?.()).finally(() => {
        if (err) {
          logger.error('Error during shutdown', { error: err });
          process.exit(1);
        }
        process.exit(0);
      });
    });
    server.closeIdleConnections?.();
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('unhandledRejection', (reason) => logger.error('Unhandled promise rejection', { error: reason }));
}

bootstrap();
