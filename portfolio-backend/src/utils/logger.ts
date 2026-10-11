type Level = 'debug' | 'info' | 'warn' | 'error' | 'silent';

const ORDER: Record<Level, number> = { debug: 10, info: 20, warn: 30, error: 40, silent: 100 };

export interface Logger {
  debug(msg: string, meta?: Record<string, unknown>): void;
  info(msg: string, meta?: Record<string, unknown>): void;
  warn(msg: string, meta?: Record<string, unknown>): void;
  error(msg: string, meta?: Record<string, unknown>): void;
}

function serializeMeta(meta?: Record<string, unknown>): string {
  if (!meta || Object.keys(meta).length === 0) return '';
  try {
    return ' ' + JSON.stringify(meta, (_key, value: unknown) =>
      value instanceof Error ? { name: value.name, message: value.message, stack: value.stack } : value,
    );
  } catch {
    return ' [unserializable meta]';
  }
}

/** Minimal leveled logger. Writes single-line, timestamped entries to stdout/stderr. */
export function createLogger(level: Level = 'info'): Logger {
  const threshold = ORDER[level];
  const write = (lvl: Exclude<Level, 'silent'>, msg: string, meta?: Record<string, unknown>) => {
    if (ORDER[lvl] < threshold) return;
    const line = `${new Date().toISOString()} ${lvl.toUpperCase().padEnd(5)} ${msg}${serializeMeta(meta)}`;
    if (lvl === 'error' || lvl === 'warn') console.error(line);
    else console.log(line);
  };
  return {
    debug: (m, meta) => write('debug', m, meta),
    info: (m, meta) => write('info', m, meta),
    warn: (m, meta) => write('warn', m, meta),
    error: (m, meta) => write('error', m, meta),
  };
}

function defaultLevel(): Level {
  const fromEnv = process.env.LOG_LEVEL as Level | undefined;
  if (fromEnv && fromEnv in ORDER) return fromEnv;
  if (process.env.NODE_ENV === 'test' || process.env.VITEST) return 'silent';
  return 'info';
}

export const logger: Logger = createLogger(defaultLevel());
