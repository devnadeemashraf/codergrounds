import { RedisRepository } from '@/infrastructure/cache/repositories/redis.repository';
import { withErrorTraced } from '@/shared/hofs';
import { CacheKeys } from '@/shared/utils/cache.utils';

const redisRepo = new RedisRepository();

export const blacklistRefreshToken = withErrorTraced(
  async (token: string, expiresInSeconds: number): Promise<void> => {
    await redisRepo.setex(CacheKeys.blacklistedRefreshToken(token), expiresInSeconds, '1');
  },
  'Failed to "blacklistRefreshToken"',
);

export const isRefreshTokenBlacklisted = withErrorTraced(
  async (token: string): Promise<boolean> => {
    const result = await redisRepo.get(CacheKeys.blacklistedRefreshToken(token));
    return result !== null;
  },
  'Failed to check if "isRefreshTokenBlacklisted"',
);
