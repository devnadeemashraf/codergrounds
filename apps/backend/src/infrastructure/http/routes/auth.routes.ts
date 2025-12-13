import { Router } from 'express';

import { loginSchema, registerSchema } from '@codergrounds/shared';

import { AuthController } from '@/infrastructure/http/controllers/auth.controller';
import { requestValidationMiddleware } from '@/infrastructure/http/middlewares';

export const createAuthRoutes = (authController: AuthController): Router => {
  const router = Router();

  router.post(
    '/login',
    requestValidationMiddleware({
      bodySchema: loginSchema,
    }),
    authController.login,
  );
  router.post(
    '/register',
    requestValidationMiddleware({
      bodySchema: registerSchema,
    }),
    authController.register,
  );

  // TODO: Add refresh token route when RefreshTokenUseCase is implemented
  // router.post('/refresh', authController.refreshToken);

  return router;
};
