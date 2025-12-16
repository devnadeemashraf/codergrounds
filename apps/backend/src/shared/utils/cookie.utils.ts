import ms, { StringValue } from 'ms';

import type { CookieOptions, Response } from 'express';

import { envConfig } from '@/config';

export const setRefreshTokenCookie = (res: Response, refreshToken: string): void => {
  const isProduction = envConfig.NODE_ENV === 'production';

  // Convert JWT_REFRESH_TOKEN_EXPIRY string to milliseconds
  const maxAgeMs = ms(envConfig.JWT_REFRESH_TOKEN_EXPIRY as StringValue);

  const options: CookieOptions = {
    httpOnly: true, // Prevents JavaScript access (XSS protection)
    secure: isProduction, // Only send over HTTPS in production
    sameSite: 'strict', // CSRF protection
    maxAge: maxAgeMs,
    path: '/api/v1/auth', // Only send cookie for auth routes
  };

  res.cookie('refreshToken', refreshToken, options);
};

export const clearRefreshTokenCookie = (res: Response): void => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: envConfig.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api/v1/auth',
  });
};
