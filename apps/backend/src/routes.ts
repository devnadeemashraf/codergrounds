import type { Express } from 'express';

import { container } from '@/container';
import { AuthController } from '@/infrastructure/http/controllers/auth.controller';
import { UserController } from '@/infrastructure/http/controllers/user.controller';
import { createAuthRoutes } from '@/infrastructure/http/routes/auth.routes';
import { createUserRoutes } from '@/infrastructure/http/routes/user.routes';
import { ContainerTokens } from '@/shared/utils/container.utils';
import { OK } from '@/shared/utils/response.utils';

/**
 * API Version Configuration
 *
 * This allows us to version our API and maintain backward compatibility.
 * When we need to introduce breaking changes, we can create v2 routes.
 */
const API_VERSION = 'v1';
const API_BASE_PATH = `/api/${API_VERSION}`;

export const registerRoutes = (app: Express) => {
  // Resolve controllers from DI container
  const authController = container.resolve<AuthController>(ContainerTokens.authController);
  const userController = container.resolve<UserController>(ContainerTokens.userController);

  // Register feature routes with versioning
  app.use(`${API_BASE_PATH}/auth`, createAuthRoutes(authController));
  app.use(`${API_BASE_PATH}/users`, createUserRoutes(userController));

  // TODO: Add playground routes when implemented
  // const playgroundController = container.resolve<PlaygroundController>(
  //   ContainerTokens.playgroundController,
  // );
  // app.use(`${API_BASE_PATH}/playgrounds`, createPlaygroundRoutes(playgroundController));

  // Health check endpoint (no versioning needed)
  app.get('/healthz', (_req, res) => {
    return OK(
      res,
      {
        timestamp: new Date().toISOString(),
        version: API_VERSION,
      },
      'All services are functional',
    );
  });
};
