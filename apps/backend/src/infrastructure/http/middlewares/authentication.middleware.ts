import type { ExpressMiddleware } from '@/shared/types/server.types';
import type { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '@/shared/errors';
import { withErrorTraced } from '@/shared/hofs';
import { verifyAccessToken } from '@/shared/utils/jwt.utils';

export const authenticationMiddleware = withErrorTraced(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Invalid or Missing Token');
    }

    const token = authHeader.substring(7);
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  },
  'Failed to authenticate request',
) as ExpressMiddleware;
