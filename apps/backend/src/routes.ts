import type { Express } from 'express';

import { container } from '@/container';
import { AuthController } from '@/infrastructure/http/controllers/auth.controller';
import { OAuthController } from '@/infrastructure/http/controllers/oauth.controller';
import { UserController } from '@/infrastructure/http/controllers/user.controller';
import { createAuthRoutes } from '@/infrastructure/http/routes/auth.routes';
import { createOAuthRoutes } from '@/infrastructure/http/routes/oauth.routes';
import { createUserRoutes } from '@/infrastructure/http/routes/user.routes';
import { ContainerTokens } from '@/shared/utils/container.utils';
import { OK } from '@/shared/utils/response.utils';

const API_VERSION = 'v1';
const API_BASE_PATH = `/api/${API_VERSION}`;

export const registerRoutes = (app: Express) => {
  // Resolve controllers from DI container
  const authController = container.resolve<AuthController>(ContainerTokens.authController);
  const oauthController = container.resolve<OAuthController>(ContainerTokens.oauthController);
  const userController = container.resolve<UserController>(ContainerTokens.userController);

  // Register feature routes with versioning
  app.use(`${API_BASE_PATH}/auth`, createAuthRoutes(authController));
  app.use(`${API_BASE_PATH}/auth`, createOAuthRoutes(oauthController));
  app.use(`${API_BASE_PATH}/users`, createUserRoutes(userController));

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
