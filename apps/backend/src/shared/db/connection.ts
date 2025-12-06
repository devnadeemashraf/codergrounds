import { Pool } from 'pg';

import { getPoolConfig } from '@/config';
import { logger } from '@/shared/logger';

export const initializeConnectionPool = (): Pool => {
  return new Pool(getPoolConfig());
};

export const connectionPool = initializeConnectionPool();

export const connectDatabase = async () => {
  try {
    await connectionPool.query('SELECT 1');
    logger.info('Database Connected Successfully!');
  } catch (error) {
    logger.fatal(error, 'Failed to connect to Database during startup!');
    // If we can't connect to the DB on startup, the app is useless.
    // Exit with error code 1 so the process manager (Docker/PM2) knows to restart it.
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  try {
    await connectionPool.end();
    logger.info('Database Disconnected Successfully!');
  } catch (error) {
    logger.fatal(error, 'Failed to disconnect from the database!');
    // If we can't connect to the DB on startup, the app is useless.
    // Exit with error code 1 so the process manager (Docker/PM2) knows to restart it.
    process.exit(1);
  }
};
