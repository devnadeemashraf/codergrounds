import { CacheRepositoryInterface } from '@/core/interfaces/cache/cache.interface';
import { redis } from '@/infrastructure/cache/redis.connection';
import { ErrorTraced } from '@/shared/decorators';

export class RedisRepository implements CacheRepositoryInterface {
  @ErrorTraced('RedisRepository "get" failed')
  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  @ErrorTraced('RedisRepository "set" failed')
  async set(key: string, value: unknown, ttlSeconds: number = 3600): Promise<void> {
    const serialized = JSON.stringify(value);
    // 'EX' sets expiration in seconds
    await redis.set(key, serialized, 'EX', ttlSeconds);
  }

  @ErrorTraced('RedisRepository "del" failed')
  async del(key: string): Promise<void> {
    await redis.del(key);
  }
}
