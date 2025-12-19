import crypto from 'node:crypto';

import { OAuthStateData, UserProvider } from '@codergrounds/shared';

import { RedisRepository } from '@/infrastructure/cache/repositories/redis.repository';
import { withErrorTraced } from '@/shared/hofs';
import { CacheKeys } from '@/shared/utils/cache.utils';

const redisRepo = new RedisRepository();

export const generateOAuthState = withErrorTraced(
  async (provider: UserProvider, redirectAfterLogin: string = '/'): Promise<string> => {
    const bytes = crypto.randomBytes(64);
    const stateEncoded = bytes.toString('base64url');

    const stateData: OAuthStateData = {
      provider,
      redirectAfterLogin,
      createdAt: new Date().toISOString(),
    };

    await redisRepo.set(
      CacheKeys.oauthState(stateEncoded),
      stateData,
      10 * 60, // 10 mins
    );

    return stateEncoded;
  },
  'Failed to generate OAuth state',
);

export const validateOAuthState = withErrorTraced(
  async (stateString: string): Promise<OAuthStateData | null> => {
    const stateInCache = await redisRepo.get<OAuthStateData>(CacheKeys.oauthState(stateString));
    await redisRepo.del(CacheKeys.oauthState(stateString));
    return stateInCache;
  },
  'Failed to validate OAuth state',
);
