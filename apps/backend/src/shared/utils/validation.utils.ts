import { z } from 'zod';

import type { Request } from 'express';

export const getValidatedBody = <T extends z.ZodTypeAny>(req: Request, _schema: T) => {
  return req.body as z.infer<T>;
};

export const getValidatedQuery = <T extends z.ZodTypeAny>(req: Request, _schema: T) => {
  return req.query as z.infer<T>;
};

export const getValidatedParams = <T extends z.ZodTypeAny>(req: Request, _schema: T) => {
  return req.params as z.infer<T>;
};
