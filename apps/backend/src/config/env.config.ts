import { config } from 'dotenv';
config();

import { z } from 'zod';

import { validateOrThrow } from '@codergrounds/shared';

const envSchema = z.object({
  // Node
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),

  // Database (Postgres)
  POSTGRES_HOST: z.string().default('localhost'),
  POSTGRES_PORT: z.coerce.number().default(5432),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DATABASE_URL: z
    .url()
    .default('postgresql://codergroundsadmin:password@localhost:5432/codergrounds'),

  // Redis
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_URL: z.url().default('redis://:password@localhost:6379'),

  // Auth
  JWT_ACCESS_TOKEN_SECRET: z.string().min(1),
  JWT_REFRESH_TOKEN_SECRET: z.string().min(1),
  JWT_ACCESS_TOKEN_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_TOKEN_EXPIRY: z.string().default('7d'),
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(10),

  // GitHub OAuth Credentials
  // Optional
  GITHUB_CLIENT_ID: z.string().min(1).optional(),
  GITHUB_CLIENT_SECRET: z.string().min(1).optional(),
  GITHUB_REDIRECT_URI: z
    .string()
    .min(1)
    .default('http://localhost:3000/api/v1/auth/github/callback'),

  // Google OAuth Credentials
  // Optional
  GOOGLE_CLIENT_ID: z.string().min(1).optional(),
  GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
  GOOGLE_REDIRECT_URI: z
    .string()
    .min(1)
    .default('http://localhost:3000/api/v1/auth/google/callback'),

  // CORS
  CORS_ORIGIN: z.string().default('http://localhost:3000,http://localhost:5173'),
});

export const envConfig = validateOrThrow(envSchema, process.env);
