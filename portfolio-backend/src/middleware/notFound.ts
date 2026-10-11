import type { RequestHandler } from 'express';
import { HttpError } from '../utils/HttpError.js';

export const notFound: RequestHandler = (req, _res, next) => {
  next(HttpError.notFound(`Route ${req.method} ${req.path} not found.`));
};
