import { createApp } from '@/app';
import { envConfig } from '@/config';
import { withFatalErrorTraced } from '@/shared/hofs';
import { logger } from '@/shared/logger';
import { bootstrap, gracefulShutdown } from '@/shared/utils/server.utils';

const run = withFatalErrorTraced(
  async () => {
    const app = createApp();

    await bootstrap();

    const server = app.listen(envConfig.PORT, () => {
      logger.info(`Server Listening on PORT - ${envConfig.PORT}`);
    });
    const shutdown = (signal: string) => gracefulShutdown(server, signal);

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  },
  'Failed to start the Server!',
  1,
);

// Global Error Traps
process.on('uncaughtException', (err) => {
  logger.fatal(err, 'Uncaught Exception');
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.fatal(err, 'Unhandled Rejection');
  process.exit(1);
});

run();
