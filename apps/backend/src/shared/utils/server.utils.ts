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
      logger.info('HTTP Server Closed - No longer accepting new requests');
    });

    // Give in-flight requests up to 10 seconds to complete
    const shutdownTimeout = 10000; // 10 seconds
    const startTime = Date.now();

    // Check if there are active connections
    // Note: Express doesn't expose active request count directly
    // So we use a timeout approach
    await new Promise<void>((resolve) => {
      const checkInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;

        // If timeout reached, force shutdown
        if (elapsed >= shutdownTimeout) {
          clearInterval(checkInterval);
          logger.warn('Shutdown timeout reached, forcing database disconnect');
          resolve();
          return;
        }

        // In a production app, you'd track active requests here
        // For now, we'll use a short delay to let requests finish
        // This is a simplified approach
      }, 100);

      // Give a grace period for requests to finish
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve();
      }, 5000); // 5 second grace period
    });

    await disconnectDatabase();
    await disconnectCache();

    process.exit(0);
  },
  'Failed to shutdown server gracefully',
  1,
);
