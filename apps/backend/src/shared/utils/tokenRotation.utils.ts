import { generateTokenPairs, verifyRefreshToken } from './jwt.utils';
import { blacklistRefreshToken, isRefreshTokenBlacklisted } from './tokenBlacklist.utils';

import { withErrorTraced } from '@/shared/hofs';

export const rotateRefreshToken = withErrorTraced(
  async (
    oldRefreshToken: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> => {
    // Verify old refresh token
    const decoded = verifyRefreshToken(oldRefreshToken);

    // Check if it's already blacklisted
    const isBlacklisted = await isRefreshTokenBlacklisted(oldRefreshToken);
    if (isBlacklisted) {
      throw new Error('Refresh token has been revoked');
    }

    // Get Expiry
    if (!decoded.exp) {
      throw new Error('Token missing expiration claim');
    }

    const currentTimeSeconds = Math.floor(Date.now() / 1000);
    const expiresInSeconds = decoded.exp - currentTimeSeconds;

    // Safety check: if token is already expired, don't blacklist (it's useless anyway)
    if (expiresInSeconds <= 0) {
      throw new Error('Refresh token has already expired');
    }

    // Blacklist the old token
    await blacklistRefreshToken(oldRefreshToken, expiresInSeconds);

    // Generate new tokens
    const tokenPairs = generateTokenPairs({
      userId: decoded.userId,
      username: decoded.username,
      userEmail: decoded.userEmail,
      tokenVersion: decoded.tokenVersion,
    });

    return {
      accessToken: tokenPairs.accessToken,
      refreshToken: tokenPairs.refreshToken,
    };
  },
  'Failed to rotate refresh token',
);
