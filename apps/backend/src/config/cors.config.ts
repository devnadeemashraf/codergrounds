import { envConfig } from './env.config';

export const corsConfig = {
  origin: envConfig.CORS_ORIGIN.split(','),
  credentials: true,
};
