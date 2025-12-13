import { ZodError, ZodTypeAny } from 'zod';

import type { ExpressMiddleware } from '@/shared/types/server.types';
import type { NextFunction, Request, Response } from 'express';

import { ValidationError } from '@/shared/errors';
import { withErrorTraced } from '@/shared/hofs';

interface RequestValidationMiddlewareParams {
  bodySchema?: ZodTypeAny;
  querySchema?: ZodTypeAny;
  paramsSchema?: ZodTypeAny;
}

const transformZodErrors = (zodError: ZodError): Array<{ field: string; message: string }> => {
  return zodError.issues.map((issue) => {
    // Handle nested paths (e.g., ['user', 'email'] -> 'user.email')
    const field = issue.path.length > 0 ? issue.path.join('.') : 'root';
    return {
      field,
      message: issue.message,
    };
  });
};

export const requestValidationMiddleware = ({
  bodySchema,
  querySchema,
  paramsSchema,
}: RequestValidationMiddlewareParams) => {
  return withErrorTraced(async (req: Request, _res: Response, next: NextFunction) => {
    const { body, query, params } = req;

    if (bodySchema) {
      const result = bodySchema.safeParse(body);
      if (!result.success) {
        const fields = transformZodErrors(result.error);
        throw new ValidationError('Invalid request body', fields);
      }
    }

    if (querySchema) {
      const result = querySchema.safeParse(query);
      if (!result.success) {
        const fields = transformZodErrors(result.error);
        throw new ValidationError('Invalid request query parameters', fields);
      }
    }

    if (paramsSchema) {
      const result = paramsSchema.safeParse(params);
      if (!result.success) {
        const fields = transformZodErrors(result.error);
        throw new ValidationError('Invalid request parameters', fields);
      }
    }

    // If all passes, continue
    next();
  }, 'Failed to validate request') as ExpressMiddleware;
};
