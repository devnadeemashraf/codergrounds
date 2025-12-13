import { runner } from 'node-pg-migrate';
import { PoolClient } from 'pg';

import { connectionPool } from '@/infrastructure/database/postgres.connection';
import { logger } from '@/shared/logger';

const executeRunner = async (client: PoolClient, direction: 'up' | 'down' = 'up') => {
  await runner({
    dbClient: client,
    dir: 'src/infrastructure/database/migrations',
    direction,
    migrationsTable: 'codergrounds_migrations',
    count: Infinity,
  });
};

const push = async () => {
  logger.info('Starting Migration...');
  let client: PoolClient | null = null;

  try {
    client = await connectionPool.connect();
    await executeRunner(client, 'up');
    logger.info('Migrations complete!');
  } catch (error) {
    logger.error(error, 'Migration failed');
    process.exit(1);
  } finally {
    // Cleanup is flat and explicit
    if (client) client.release();
    await connectionPool.end();
  }
};

const rollback = async () => {
  logger.info('Starting Rollback...');
  let client: PoolClient | null = null;

  try {
    client = await connectionPool.connect();
    await executeRunner(client, 'down');
    logger.info('Migrations complete!');
  } catch (error) {
    logger.error(error, 'Migration failed');
    process.exit(1);
  } finally {
    // Cleanup is flat and explicit
    if (client) client.release();
    await connectionPool.end();
  }
};

// use '--run' flag to run this file directly from console
if (process.argv.includes('--up') && !process.argv.includes('--down')) {
  push();
}

// use '--run' flag to run this file directly from console
if (process.argv.includes('--down') && !process.argv.includes('--up')) {
  rollback();
}
