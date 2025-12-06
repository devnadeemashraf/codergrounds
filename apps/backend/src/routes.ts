import type { Express } from 'express';

import { OK } from '@/shared/response';

export const registerRoutes = (app: Express) => {
  // Health Route
  app.get('/healthz', (req, res) => {
    const data = {
      tz: new Date().toISOString(),
    };
    return OK(res, data, 'All Services are Functional!');
  });
};
