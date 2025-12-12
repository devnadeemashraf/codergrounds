import { StatusCodes } from 'http-status-codes';

import { BaseError } from './base.error';

/**
 * Database connection failure
 */
export class DatabaseConnectionError extends BaseError {
  constructor(message: string = 'Failed to Connect to Database') {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

/**
 * Database query execution failure
 */
export class DatabaseQueryError extends BaseError {
  constructor(message: string = 'Database Query Failed') {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

/**
 * Validation error - typically used with field-specific errors
 */
export class ValidationError extends BaseError {
  private readonly fields?: Array<{ field: string; message: string }>;

  constructor(
    message: string = 'Validation Failed',
    fields?: Array<{ field: string; message: string }>,
  ) {
    super(message, StatusCodes.BAD_REQUEST);
    this.fields = fields;
  }

  serializeErrors() {
    if (this.fields && this.fields.length > 0) {
      return this.fields.map((f) => ({
        message: f.message,
        field: f.field,
      }));
    }
    return [{ message: this.message }];
  }
}
