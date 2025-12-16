import { PoolClient } from 'pg';

import { userSeedConfig } from './seed.config';
import { checkIfSeedDataExists, insertSeedData } from './seed.utils';
import { createUserSeedData } from './seedData.factory';

import { connectionPool } from '@/infrastructure/database/postgres.connection';
import { logger } from '@/shared/logger';

export const startSeeding = async () => {
  logger.info('Starting seed..');
  let client: PoolClient | null = null;

  try {
    client = await connectionPool.connect();

    const userSeedData = await createUserSeedData();
    const isUserSeeded = await checkIfSeedDataExists(client, userSeedConfig, userSeedData);

    if (isUserSeeded) {
      logger.info(`"${userSeedConfig.tableName}" Seed data already exists. Skipping...`);
      return;
    }

    logger.info('Seeding users...');
    await insertSeedData(client, userSeedConfig, userSeedData);
    logger.info('Seed complete!');
  } catch (error) {
    logger.error(error, 'Seed failed!');
    throw error; // Re-throw so caller can decide what to do
  } finally {
    // Always release the client back to the pool
    // (This is different from ending the pool!)
    if (client) client.release();
  }
};

if (process.argv.includes('--run')) {
  (async () => {
    try {
      await startSeeding();
    } catch {
      process.exit(1); // Error already logged in startSeeding
    } finally {
      await connectionPool.end(); // Standalone owns the pool lifecycle
      process.exit(0);
    }
  })();
}
