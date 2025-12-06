import { envConfig } from '@/config';
import { ApiErrorObject } from '@/shared/types';

export abstract class BaseError extends Error {
  // Make statusCode public readonly so it can be accessed by middleware
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Fix Prototypal Chain
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture Stack Trace
    if (envConfig.NODE_ENV === 'development') {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Base Class method defining default json
  // Extended Class can override to define custom json
  serializeErrors(): ApiErrorObject[] {
    return [{ message: this.message }];
  }
}
