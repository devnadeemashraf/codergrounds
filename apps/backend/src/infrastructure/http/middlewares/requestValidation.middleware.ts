import { ZodError, ZodTypeAny } from 'zod';

import type { ExpressMiddleware } from '@/shared/types/server.types';
import type { NextFunction, Request, Response } from 'express';

import { ValidationError } from '@/shared/errors';
import { withErrorTraced } from '@/shared/hofs';

interface RequestValidationConfig {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
  cookies?: ZodTypeAny;
  headers?: ZodTypeAny;
}

const validationErrorMessages: Record<keyof RequestValidationConfig, string> = {
  body: 'Invalid request body',
  query: 'Invalid request query parameters',
  params: 'Invalid request parameters',
  cookies: 'Invalid request cookies',
  headers: 'Invalid request headers',
};

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

export const requestValidationMiddleware = (config: RequestValidationConfig) => {
  return withErrorTraced(async (req: Request, _res: Response, next: NextFunction) => {
    // Map of request parts to their data sources
    const validationMap: Array<{
      key: keyof RequestValidationConfig;
      data: unknown;
      schema: ZodTypeAny;
    }> = [];

    if (config.body) {
      validationMap.push({ key: 'body', data: req.body, schema: config.body });
    }
    if (config.query) {
      validationMap.push({ key: 'query', data: req.query, schema: config.query });
    }
    if (config.params) {
      validationMap.push({ key: 'params', data: req.params, schema: config.params });
    }
    if (config.cookies) {
      validationMap.push({ key: 'cookies', data: req.cookies || {}, schema: config.cookies });
    }
    if (config.headers) {
      validationMap.push({ key: 'headers', data: req.headers, schema: config.headers });
    }

    for (const { key, data, schema } of validationMap) {
      const result = schema.safeParse(data);
      if (!result.success) {
        const fields = transformZodErrors(result.error);
        throw new ValidationError(validationErrorMessages[key], fields);
      }
    }

    next();
  }, 'Request validation middleware failure') as ExpressMiddleware;
};
