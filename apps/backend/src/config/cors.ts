import { envConfig } from './env';

export const corsConfig = {
  origin: envConfig.CORS_ORIGIN.split(','),
  credentials: true,
};
