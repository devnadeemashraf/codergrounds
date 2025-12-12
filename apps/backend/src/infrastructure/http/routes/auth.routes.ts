import { Router } from 'express';

import { AuthController } from '@/infrastructure/http/controllers/auth.controller';

export const createAuthRoutes = (authController: AuthController): Router => {
  const router = Router();

  // POST /api/v1/auth/login
  router.post('/login', authController.login);

  // POST /api/v1/auth/register
  router.post('/register', authController.register);

  // TODO: Add refresh token route when RefreshTokenUseCase is implemented
  // router.post('/refresh', authController.refreshToken);

  return router;
};
