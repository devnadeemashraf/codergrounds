import cors from 'cors';
import express from 'express';

import type { Express } from 'express';

import { corsConfig, expressJsonConfig } from '@/config';
import { registerRoutes } from '@/routes';
import { globalErrorHandler, notFoundHandler } from '@/shared/middlewares';

export const createApp = (): Express => {
  const app = express();

  // Middlewares
  app.use(express.json(expressJsonConfig));
  app.use(cors(corsConfig));

  // Register Routes
  registerRoutes(app);

  // Not Found Handler
  app.use(notFoundHandler);
  // Global Error Handler
  app.use(globalErrorHandler);

  return app;
};
