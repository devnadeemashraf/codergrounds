import type { Request, Response } from 'express';

import { NotFoundError } from '@/shared/errors';

export const notFoundHandler = (_req: Request, _res: Response) => {
  throw new NotFoundError();
};
