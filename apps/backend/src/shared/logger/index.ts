import pino from 'pino';

import { envConfig } from '@/config';

export const logger = pino({
  level: envConfig.LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
  ...(envConfig.NODE_ENV === 'development' && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
      },
    },
  }),
});
