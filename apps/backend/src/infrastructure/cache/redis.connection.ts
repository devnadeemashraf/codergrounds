import { Redis } from 'ioredis';

import { envConfig } from '@/config';
import { withFatalErrorTraced } from '@/shared/hofs';
import { logger } from '@/shared/logger';

export const redis = new Redis({
  host: envConfig.REDIS_HOST,
  port: envConfig.REDIS_PORT,
  password: envConfig.REDIS_PASSWORD,
});

export const connectCache = withFatalErrorTraced(
  async () => {
    await redis.ping();
    logger.info('Cache Connected Successfully!');
  },
  'Failed to connect to Cache during startup!',
  3, // Exit code 3 indicates cache failure
);

export const disconnectCache = withFatalErrorTraced(
  async () => {
    // quit() waits for pending commands to finish before closing
    await redis.quit();
    logger.info('Cache Disconnected Successfully!');
  },
  'Failed to disconnect from the Cache during shutdown!',
  3, // Exit code 3 indicates cache failure
);
