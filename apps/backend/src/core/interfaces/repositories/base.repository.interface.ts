import type { Pool, PoolClient } from 'pg';

export interface BaseRepositoryInterface<T> {
  findById(id: string, client?: Pool | PoolClient): Promise<T | null>;
  findOne(where: Partial<T>, client?: Pool | PoolClient): Promise<T | null>;
  findMany(where: Partial<T>, client?: Pool | PoolClient): Promise<T[] | null>;
  create(data: Partial<T>, client?: Pool | PoolClient): Promise<T>;
  update(id: string, data: Partial<T>, client?: Pool | PoolClient): Promise<T | null>;
  delete(id: string, client?: Pool | PoolClient): Promise<boolean>;
}
