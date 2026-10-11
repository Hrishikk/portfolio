import { rateLimit, type RateLimitRequestHandler } from 'express-rate-limit';

export interface RateLimitOptions {
  windowMs: number;
  max: number;
}

/** Per-IP limiter for the contact endpoint. Responds with the API's RATE_LIMITED error shape. */
export function createContactRateLimiter({ windowMs, max }: RateLimitOptions): RateLimitRequestHandler {
  return rateLimit({
    windowMs,
    limit: max,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (_req, res, _next, options) => {
      res.status(options.statusCode).json({
        ok: false,
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many messages sent. Please try again later.',
        },
      });
    },
  });
}
