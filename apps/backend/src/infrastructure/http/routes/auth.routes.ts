import { Router } from 'express';

import {
  changePasswordSchema,
  loginSchema,
  refreshTokenCookieSchema,
  registerSchema,
} from '@codergrounds/shared';

import { AuthController } from '@/infrastructure/http/controllers/auth.controller';
import {
  authenticationMiddleware,
  requestValidationMiddleware,
} from '@/infrastructure/http/middlewares';

export const createAuthRoutes = (authController: AuthController): Router => {
  const router = Router();

  router.post(
    '/login',
    requestValidationMiddleware({
      body: loginSchema,
    }),
    authController.login,
  );
  router.post(
    '/register',
    requestValidationMiddleware({
      body: registerSchema,
    }),
    authController.register,
  );

  router.post(
    '/refresh',
    requestValidationMiddleware({
      cookies: refreshTokenCookieSchema,
    }),
    authController.refreshToken,
  );

  // Set New Password (when forgot password or want to set after sigin in with OAuth provider)
  router.post(
    '/change_password',
    requestValidationMiddleware({
      body: changePasswordSchema,
    }),
    authenticationMiddleware,
    authController.refreshToken,
  );

  return router;
};
