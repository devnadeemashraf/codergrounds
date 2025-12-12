import { StatusCodes } from 'http-status-codes';

import { BaseError } from './base.error';

/**
 * 500 Internal Server Error - Generic server error
 */
export class InternalServerError extends BaseError {
  constructor(message: string = 'Internal Server Error') {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

/**
 * 502 Bad Gateway - Invalid response from upstream server
 */
export class BadGatewayError extends BaseError {
  constructor(message: string = 'Bad Gateway') {
    super(message, StatusCodes.BAD_GATEWAY);
  }
}

/**
 * 503 Service Unavailable - Service temporarily unavailable
 */
export class ServiceUnavailableError extends BaseError {
  constructor(message: string = 'Service Unavailable') {
    super(message, StatusCodes.SERVICE_UNAVAILABLE);
  }
}

/**
 * 504 Gateway Timeout - Upstream server timeout
 */
export class GatewayTimeoutError extends BaseError {
  constructor(message: string = 'Gateway Timeout') {
    super(message, StatusCodes.GATEWAY_TIMEOUT);
  }
}
