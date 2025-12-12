import { StatusCodes } from 'http-status-codes';

import type { NextFunction, Request, Response } from 'express';

import { BaseError } from '@/shared/errors/base.error';
import { logger } from '@/shared/logger';

export const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({ success: false, errors: err.serializeErrors() });
  }

  // Encountered an unrecognized error, log it to console for debugging
  logger.error(err, 'Unhandled Error Exception');

  // When it's an unrecognized error, better not to leak info
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: [{ message: 'Something went wrong' }],
  });
};
