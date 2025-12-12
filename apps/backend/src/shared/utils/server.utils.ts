import { Server } from 'http';

import { startSeeding } from '@srcipts/db/seed';

import { connectCache, disconnectCache } from '@/infrastructure/cache/redis.connection';
import { connectDatabase, disconnectDatabase } from '@/infrastructure/database/postgres.connection';
import { withFatalErrorTraced } from '@/shared/hofs';
import { logger } from '@/shared/logger';

export const bootstrap = withFatalErrorTraced(
  async () => {
    logger.info('Bootstrapping application...');

    // Connect Database
    await connectDatabase();
    // Connect Cache
    await connectCache();
    // Deps Initialized
    logger.info('All dependencies initialized successfully!');

    // Start Background Workers
    // Seed Database (if any)
    await startSeeding();
  },
  'Bootstrap failed!',
  1,
);

export const gracefulShutdown = withFatalErrorTraced(
  async (server: Server, signal: string) => {
    logger.info(`${signal} received. Starting graceful shutdown...`);

    // Stop Accepting New Requests
    server.close(() => {
      logger.info('HTTP Server Closed');
    });

    await disconnectDatabase();
    await disconnectCache();

    process.exit(0);
  },
  'Failed to shutdown server gracefully',
  1,
);
