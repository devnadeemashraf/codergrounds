export interface CacheRepositoryInterface {
  get: <T>(key: string) => Promise<T | null>;
  set: (key: string, value: unknown, ttlSeconds: number) => Promise<void>;
  setex: (
    key: string,
    ttlSeconds: number,
    value: string | number | Buffer<ArrayBufferLike>,
  ) => Promise<void>;
  del: (key: string) => Promise<void>;
}
