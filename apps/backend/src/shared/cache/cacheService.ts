import { redis } from './redis';

import { logger } from '@/shared/logger';

export const cacheService = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      if (!data) return null;
      return JSON.parse(data) as T;
    } catch (error) {
      logger.error(error, `Cache GET error for key: ${key}`);
      return null;
    }
  },

  async set(key: string, value: unknown, ttlSeconds: number = 3600): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      // 'EX' sets expiration in seconds
      await redis.set(key, serialized, 'EX', ttlSeconds);
    } catch (error) {
      logger.error(error, `Cache SET error for key: ${key}`);
    }
  },

  async del(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (error) {
      logger.error(error, `Cache DEL error for key: ${key}`);
    }
  },
};
