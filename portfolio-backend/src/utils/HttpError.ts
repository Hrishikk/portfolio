export type ErrorCode = 'VALIDATION_ERROR' | 'RATE_LIMITED' | 'NOT_FOUND' | 'BAD_REQUEST' | 'INTERNAL_ERROR';

/** An error that maps directly onto an HTTP response. */
export class HttpError extends Error {
  readonly status: number;
  readonly code: ErrorCode;
  readonly fields?: Record<string, string>;

  constructor(status: number, code: ErrorCode, message: string, fields?: Record<string, string>) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.code = code;
    if (fields) this.fields = fields;
  }

  static validation(fields: Record<string, string>, message = 'Please check the highlighted fields.'): HttpError {
    return new HttpError(400, 'VALIDATION_ERROR', message, fields);
  }

  static notFound(message = 'Resource not found.'): HttpError {
    return new HttpError(404, 'NOT_FOUND', message);
  }
}
