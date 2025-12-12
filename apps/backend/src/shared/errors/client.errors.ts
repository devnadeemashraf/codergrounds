import { StatusCodes } from 'http-status-codes';

import { BaseError } from './base.error';

/**
 * 400 Bad Request - The request is malformed or invalid
 */
export class BadRequestError extends BaseError {
  constructor(message: string = 'Bad Request') {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

/**
 * 401 Unauthorized - Authentication required or failed
 */
export class UnauthorizedError extends BaseError {
  constructor(message: string = 'Unauthorized') {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

/**
 * 403 Forbidden - Authenticated but lacks permission
 */
export class ForbiddenError extends BaseError {
  constructor(message: string = 'Forbidden') {
    super(message, StatusCodes.FORBIDDEN);
  }
}

/**
 * 404 Not Found - Resource doesn't exist
 */
export class NotFoundError extends BaseError {
  constructor(message: string = 'Resource Not Found') {
    super(message, StatusCodes.NOT_FOUND);
  }
}

/**
 * 409 Conflict - Resource conflict (e.g., duplicate entry)
 */
export class ConflictError extends BaseError {
  constructor(message: string = 'Resource Conflict') {
    super(message, StatusCodes.CONFLICT);
  }
}

/**
 * 422 Unprocessable Entity - Valid syntax but semantic errors
 */
export class UnprocessableEntityError extends BaseError {
  constructor(message: string = 'Unprocessable Entity') {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY);
  }
}

/**
 * 429 Too Many Requests - Rate limit exceeded
 */
export class TooManyRequestsError extends BaseError {
  constructor(message: string = 'Too Many Requests') {
    super(message, StatusCodes.TOO_MANY_REQUESTS);
  }
}
