import type { Express } from 'express';

import { container } from '@/container';
import {
  ExecutionController,
  FileController,
  PlaygroundController,
} from '@/infrastructure/http/controllers';
import { AuthController } from '@/infrastructure/http/controllers/auth.controller';
import { OAuthController } from '@/infrastructure/http/controllers/oauth.controller';
import { UserController } from '@/infrastructure/http/controllers/user.controller';
import { createAuthRoutes } from '@/infrastructure/http/routes/auth.routes';
import { createOAuthRoutes } from '@/infrastructure/http/routes/oauth.routes';
import { createPlaygroundRoutes } from '@/infrastructure/http/routes/playground.routes';
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
  const playgroundController = container.resolve<PlaygroundController>(
    ContainerTokens.playgroundController,
  );
  const fileController = container.resolve<FileController>(ContainerTokens.fileController);
  const executionController = container.resolve<ExecutionController>(
    ContainerTokens.executionController,
  );

  // Register feature routes with versioning
  app.use(`${API_BASE_PATH}/auth`, createAuthRoutes(authController));
  app.use(`${API_BASE_PATH}/auth`, createOAuthRoutes(oauthController));
  app.use(`${API_BASE_PATH}/users`, createUserRoutes(userController));
  app.use(
    `${API_BASE_PATH}/playgrounds`,
    createPlaygroundRoutes(playgroundController, fileController, executionController),
  );

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
