import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';
import { HttpError } from '../utils/HttpError.js';

/**
 * Validate `req.body` against a zod schema. On success the parsed (trimmed, normalised) value
 * replaces the body; on failure a 400 VALIDATION_ERROR with per-field messages is raised.
 */
export function validateBody<T>(schema: ZodType<T>): RequestHandler {
  return (req, _res, next) => {
    const body: unknown = req.body ?? {};
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      next(HttpError.validation({}, 'Request body must be a JSON object.'));
      return;
    }
    const result = schema.safeParse(body);
    if (!result.success) {
      const fields: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path.length > 0 ? issue.path.map(String).join('.') : '_root';
        fields[key] ??= issue.message;
      }
      next(HttpError.validation(fields));
      return;
    }
    req.body = result.data;
    next();
  };
}
