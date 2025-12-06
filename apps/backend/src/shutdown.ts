import { Server } from 'http';

import { disconnectCache } from '@/shared/cache';
import { disconnectDatabase } from '@/shared/db';
import { logger } from '@/shared/logger';

export const gracefulShutdown = async (server: Server, signal: string) => {
  // Start Shutdown
  logger.info(`${signal} received. Starting graceful shutdown...`);

  // Stop Accepting New Requests
  server.close(() => {
    logger.info('HTTP Server Closed');
  });

  // Disconnect from database
  await disconnectDatabase();
  // Disconnect from cache database
  await disconnectCache();

  // End Process
  process.exit(0);
};
