import { StatusCodes } from 'http-status-codes';

import type { Response } from 'express';

import { ServerMeta, ServerResponse } from '@/shared/types/server.types';

const sendResponse = <T>(
  res: Response,
  status: number,
  data: T,
  message?: string,
  meta?: Partial<ServerMeta>,
) => {
  // For 204 No Content, we must not send a body.
  if (status === StatusCodes.NO_CONTENT) {
    return res.status(status).send();
  }
  // Create a Response Object
  const apiResponse: ServerResponse<T> = {
    success: true,
    message,
    data,
    meta,
  };
  // Return
  return res.status(status).json(apiResponse);
};

export const OK = <T = unknown>(
  res: Response,
  data: T,
  message?: string,
  meta?: Partial<ServerMeta>,
) => {
  return sendResponse(res, StatusCodes.OK, data, message, meta);
};

export const Created = <T = unknown>(
  res: Response,
  data: T,
  message?: string,
  meta?: Partial<ServerMeta>,
) => {
  return sendResponse(res, StatusCodes.CREATED, data, message, meta);
};

export const NoContent = (res: Response) => {
  return sendResponse(res, StatusCodes.NO_CONTENT, undefined);
};
