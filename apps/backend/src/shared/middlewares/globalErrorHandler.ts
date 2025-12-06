import { StatusCodes } from 'http-status-codes';

import type { NextFunction, Request, Response } from 'express';

import { BaseError } from '@/shared/errors/baseError';
import { logger } from '@/shared/logger';

export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  // If the error is an instance of our custom BaseError, we know how to handle it
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({ success: false, errors: err.serializeErrors() });
  }

  // If it's not one of our known errors, it's an unhandled exception.
  // We should log this immediately for debugging.
  logger.error(err, 'Unhandled Error Exception');

  // Send a generic response to the client to avoid leaking implementation details
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: [{ message: 'Something went wrong' }],
  });
};
