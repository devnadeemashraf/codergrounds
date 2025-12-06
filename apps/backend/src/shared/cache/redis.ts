import { Redis } from 'ioredis';

import { envConfig } from '@/config';
import { logger } from '@/shared/logger';

export const redis = new Redis({
  host: envConfig.REDIS_HOST,
  port: envConfig.REDIS_PORT,
  password: envConfig.REDIS_PASSWORD,
});

export const connectCache = async () => {
  try {
    await redis.ping();
    logger.info('Cache Connected Successfully!');
  } catch (error) {
    logger.fatal(error, 'Failed to connect to Cache during startup!');
    // If we can't connect to the DB on startup, the app is useless.
    // Exit with error code 1 so the process manager (Docker/PM2) knows to restart it.
    process.exit(1);
  }
};

export const disconnectCache = async () => {
  try {
    // quit() waits for pending commands to finish before closing
    await redis.quit();
    logger.info('Cache Disconnected Successfully!');
  } catch (error) {
    logger.error(error, 'Failed to disconnect from the Cache!');
    // Force disconnect if graceful quit fails
    redis.disconnect();
  }
};
