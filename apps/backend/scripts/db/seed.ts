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

    // TODO: create an aggreator method that
    // - runs all the checks
    // - aggregates everything that is seeded & missing
    // - if one is present, skip it
    // - if one is absent, seed it

    const userSeedData = await createUserSeedData();
    // Check if Seed Data Exists
    const isUserSeeded = await checkIfSeedDataExists(client, userSeedConfig, userSeedData);
    if (isUserSeeded) {
      logger.info(`"${userSeedConfig.tableName}" Seed data already exists. Skipping...`);
      return;
    }

    // Inser Data
    // Seed users
    logger.info('Seeding users...');
    await insertSeedData(client, userSeedConfig, userSeedData);

    logger.info('Seed complete!');
  } catch (error) {
    logger.error(error, 'Seed failed!');
    process.exit(1);
  } finally {
    if (client) client.release();
    await connectionPool.end();
  }
};

// use '--run' flag to run this file directly from console
if (process.argv.includes('--run')) {
  startSeeding();
}
