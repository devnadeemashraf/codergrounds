import { StatusCodes } from 'http-status-codes';

import { BaseError } from './baseError';

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string = 'Resource Not Found') {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class DatabaseConnectionError extends BaseError {
  constructor(message: string = 'Failed to Connect to Database') {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
