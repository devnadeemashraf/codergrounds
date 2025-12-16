import { Router } from 'express';

import {
  oAuthCallbackParamsSchema,
  oAuthCallbackQuerySchema,
  oAuthLoginParamsSchema,
} from '@codergrounds/shared';

import { OAuthController } from '@/infrastructure/http/controllers/oauth.controller';
import { requestValidationMiddleware } from '@/infrastructure/http/middlewares';

export const createOAuthRoutes = (oauthController: OAuthController): Router => {
  const router = Router();

  router.get(
    '/:provider',
    requestValidationMiddleware({
      params: oAuthLoginParamsSchema,
    }),
    oauthController.login,
  );
  router.get(
    '/:provider/callback',
    requestValidationMiddleware({
      params: oAuthCallbackParamsSchema,
      query: oAuthCallbackQuerySchema,
    }),
    oauthController.callback,
  );

  return router;
};
