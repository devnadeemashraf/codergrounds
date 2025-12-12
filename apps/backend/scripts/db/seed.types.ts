import { PoolClient } from 'pg';

export interface SeedConfig<T> {
  tableName: string;
  checkIfSeedDataExists: (client: PoolClient, item: T) => Promise<boolean>;
  insertSeedData: (client: PoolClient, item: T) => Promise<void>;
}
