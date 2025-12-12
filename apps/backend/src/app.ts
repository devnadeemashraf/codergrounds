// Import container first to ensure all DI registrations execute
import '@/container';

import cors from 'cors';
import express from 'express';

import type { Express } from 'express';

import { corsConfig } from '@/config';
import { errorHandlerMiddleware, notFoundMiddleware } from '@/infrastructure/http/middlewares';
import { registerRoutes } from '@/routes';

export const createApp = (): Express => {
  const app = express();

  app.use(express.json());
  app.use(cors(corsConfig));

  registerRoutes(app);

  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  return app;
};
