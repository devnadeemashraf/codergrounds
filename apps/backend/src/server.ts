import { createApp } from '@/app';
import { bootstrap } from '@/bootstrap';
import { envConfig } from '@/config';
import { logger } from '@/shared/logger';
import { gracefulShutdown } from '@/shutdown';

const run = async () => {
  try {
    // Server Bootstrap
    await bootstrap();

    // Create App
    const app = createApp();

    // Start Listening
    const server = app.listen(envConfig.PORT, () => {
      logger.info(`Server Listening on PORT - ${envConfig.PORT}`);
    });

    // Utility Function
    const shutdown = (signal: string) => gracefulShutdown(server, signal);

    // Listen for termination signals (e.g., Docker stop, Ctrl+C)
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (err) {
    logger.fatal(err, 'Failed to start Server');
    process.exit(1);
  }
};

// Global Error Traps
process.on('uncaughtException', (err) => {
  logger.fatal(err, 'Uncaught Exception');
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.fatal(err, 'Unhandled Rejection');
  process.exit(1);
});

// Run Server
run();
