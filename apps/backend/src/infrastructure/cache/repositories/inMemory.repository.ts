import { CacheRepositoryInterface } from '@/core/interfaces/cache';
import { ErrorTraced } from '@/shared/decorators';

export class InMemoryRepository implements Omit<CacheRepositoryInterface, 'setex'> {
  private hash: InstanceType<MapConstructor>;
  constructor() {
    this.hash = new Map();
  }

  @ErrorTraced('InMemoryRepository "get" failed')
  async get<T>(key: string): Promise<T | null> {
    if (this.hash.has(key)) {
      return this.hash.get(key) as T;
    }
    return null;
  }

  @ErrorTraced('InMemoryRepository "set" failed')
  async set(key: string, value: unknown): Promise<void> {
    const serialized = JSON.stringify(value);
    this.hash.set(key, serialized);
  }

  @ErrorTraced('InMemoryRepository "del" failed')
  async del(key: string): Promise<void> {
    this.hash.delete(key);
  }
}
