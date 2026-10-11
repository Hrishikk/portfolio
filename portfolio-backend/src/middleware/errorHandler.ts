import type { ErrorRequestHandler } from 'express';
import { HttpError } from '../utils/HttpError.js';
import type { Logger } from '../utils/logger.js';

interface BodyParserError extends Error {
  type?: string;
  status?: number;
}

/** Final error handler: converts any thrown error into the API's JSON error envelope. */
export function createErrorHandler(logger: Logger): ErrorRequestHandler {
  return (err: unknown, req, res, next) => {
    if (res.headersSent) {
      next(err);
      return;
    }

    if (err instanceof HttpError) {
      res.status(err.status).json({
        ok: false,
        error: { code: err.code, message: err.message, ...(err.fields ? { fields: err.fields } : {}) },
      });
      return;
    }

    // Errors raised by express.json() (malformed JSON, payload too large, …)
    const bp = err as BodyParserError;
    if (bp && typeof bp.type === 'string' && typeof bp.status === 'number' && bp.status >= 400 && bp.status < 500) {
      const message =
        bp.type === 'entity.too.large' ? 'Request body is too large.' : 'Request body could not be parsed as JSON.';
      res.status(bp.status === 413 ? 413 : 400).json({
        ok: false,
        error: { code: bp.status === 413 ? 'BAD_REQUEST' : 'VALIDATION_ERROR', message, fields: {} },
      });
      return;
    }

    logger.error('Unhandled error', { method: req.method, path: req.path, error: err });
    res.status(500).json({
      ok: false,
      error: { code: 'INTERNAL_ERROR', message: 'Something went wrong. Please try again later.' },
    });
  };
}
