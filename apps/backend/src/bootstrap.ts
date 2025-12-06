import { connectCache } from '@/shared/cache';
import { connectDatabase } from '@/shared/db';
import { logger } from '@/shared/logger';

export const bootstrap = async () => {
  logger.info('Bootstrapping application...');
  try {
    // Connect Database
    await connectDatabase();
    // Connect Cache
    await connectCache();

    logger.info('All dependencies initialized successfully!');

    // Start Background Workers
    // Seed Database (if any)
  } catch (error) {
    logger.fatal(error, 'Bootstrap failed');
    process.exit(1);
  }
};
