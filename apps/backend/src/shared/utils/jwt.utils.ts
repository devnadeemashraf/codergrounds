import jwt from 'jsonwebtoken';
import { StringValue } from 'ms';

import type { SignOptions } from 'jsonwebtoken';

import { envConfig } from '@/config';
import { TokenPayload } from '@/shared/types/jwt.types';

type UserPayloadInTokenPayload = Pick<TokenPayload, 'userId' | 'username' | 'userEmail'>;

export const generateAccessToken = (payload: UserPayloadInTokenPayload): string => {
  const options: SignOptions = {
    expiresIn: envConfig.JWT_ACCESS_TOKEN_EXPIRY as StringValue,
  };
  return jwt.sign(payload, envConfig.JWT_ACCESS_TOKEN_SECRET, options);
};

export const generateRefreshToken = (payload: UserPayloadInTokenPayload): string => {
  const options: SignOptions = {
    expiresIn: envConfig.JWT_REFRESH_TOKEN_EXPIRY as StringValue,
  };
  return jwt.sign(payload, envConfig.JWT_REFRESH_TOKEN_SECRET, options);
};

export const generateTokenPair = (
  payload: UserPayloadInTokenPayload,
): {
  accessToken: string;
  refreshToken: string;
} => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, envConfig.JWT_ACCESS_TOKEN_SECRET);

    // jwt.verify can return string | JwtPayload, but we know it's an object
    if (typeof decoded === 'string') {
      throw new Error('Invalid token format: expected object payload');
    }

    // Type assertion: We trust our tokens have the correct shape
    return decoded as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error(`Invalid access token: ${error.message}`);
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Access token has expired');
    }
    throw error;
  }
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, envConfig.JWT_REFRESH_TOKEN_SECRET);

    // jwt.verify can return string | JwtPayload, but we know it's an object
    if (typeof decoded === 'string') {
      throw new Error('Invalid token format: expected object payload');
    }

    // Type assertion: We trust our tokens have the correct shape
    return decoded as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error(`Invalid refresh token: ${error.message}`);
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Refresh token has expired');
    }
    throw error;
  }
};
