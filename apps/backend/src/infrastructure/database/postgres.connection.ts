import { Pool } from 'pg';

import { getPoolConfig } from '@/config';
import { withFatalErrorTraced } from '@/shared/hofs';
import { logger } from '@/shared/logger';

export const connectionPool = new Pool(getPoolConfig());

export const connectDatabase = withFatalErrorTraced(
  async () => {
    await connectionPool.query('SELECT 1');
    logger.info('Database Connected Successfully!');
  },
  'Failed to connect to database during startup!',
  3, // Exit code 3 indicates DB failure
);

export const disconnectDatabase = withFatalErrorTraced(
  async () => {
    await connectionPool.end();
    logger.info('Database Disconnected Successfully!');
  },
  'Failed to disconnect from the database during shutdown!',
  3, // Exit code 3 indicates DB failure
);
