import { runner } from 'node-pg-migrate';
import { PoolClient } from 'pg';

import { connectionPool } from '@/shared/db/connection';
import { logger } from '@/shared/logger';

const executeRunner = async (client: PoolClient) => {
  await runner({
    dbClient: client,
    dir: 'src/shared/db/migrations',
    direction: 'up',
    migrationsTable: 'codergrounds_migrations',
    count: Infinity,
  });
};

const main = async () => {
  logger.info('Running migrations...');
  let client: PoolClient | null = null;

  try {
    client = await connectionPool.connect();
    await executeRunner(client);
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

main();
