import { PoolClient } from 'pg';

import { SeedConfig } from './seedTypes';

export const checkIfSeedDataExists = async <T>(
  client: PoolClient,
  config: SeedConfig<T>,
  seedData: T[],
): Promise<boolean> => {
  // Check if ANY item in seedData already exists
  for (const item of seedData) {
    const exists = await config.checkIfSeedDataExists(client, item);
    if (exists) {
      return true; // Found at least one, so seeded
    }
  }
  return false; // None found, not seeded
};

export const insertSeedData = async <T>(
  client: PoolClient,
  config: SeedConfig<T>,
  items: T[],
): Promise<void> => {
  for (const item of items) {
    const exists = await config.checkIfSeedDataExists(client, item);
    if (!exists) {
      await config.insertSeedData(client, item);
    }
  }
};
