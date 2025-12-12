import { PoolConfig } from 'pg';

import { envConfig } from './env.config';

export const getPoolConfig = (): PoolConfig => {
  const base = {
    host: envConfig.POSTGRES_HOST,
    port: envConfig.POSTGRES_PORT,
    user: envConfig.POSTGRES_USER,
    password: envConfig.POSTGRES_PASSWORD,
    min: 2,
    max: 10,
  };

  if (envConfig.NODE_ENV === 'test') {
    return { ...base, database: envConfig.POSTGRES_DB + '_test' };
  }

  return { ...base, database: envConfig.POSTGRES_DB };
};
