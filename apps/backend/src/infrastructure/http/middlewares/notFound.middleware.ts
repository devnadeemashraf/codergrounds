import type { NextFunction, Request, Response } from 'express';

import { NotFoundError } from '@/shared/errors';

export const notFoundMiddleware = (_req: Request, _res: Response, _next: NextFunction) => {
  // Throw not found error for global error handler to handle
  throw new NotFoundError('Failed to find the resource you are looking for');
};
