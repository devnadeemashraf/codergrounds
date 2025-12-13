import type { NextFunction, Request, Response } from 'express';

export interface ServerError {
  message: string;
  field?: string;
}
export interface ServerMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface ServerResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: ServerError[];
  meta?: Partial<ServerMeta>;
}

export type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;
