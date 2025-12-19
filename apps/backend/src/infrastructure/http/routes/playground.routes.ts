import { Router } from 'express';

import { createPlaygroundSchema } from '@codergrounds/shared';
import { createFileSchema } from '@codergrounds/shared';
import { executeCodeSchema } from '@codergrounds/shared';

import {
  ExecutionController,
  FileController,
  PlaygroundController,
} from '@/infrastructure/http/controllers';
import { authenticationMiddleware } from '@/infrastructure/http/middlewares/authentication.middleware';
import { requestValidationMiddleware } from '@/infrastructure/http/middlewares/requestValidation.middleware';

export const createPlaygroundRoutes = (
  playgroundController: PlaygroundController,
  fileController: FileController,
  executionController: ExecutionController,
): Router => {
  const router = Router();

  // Playgrounds
  router.post(
    '/',
    authenticationMiddleware,
    requestValidationMiddleware({
      body: createPlaygroundSchema,
    }),
    playgroundController.create,
  );

  router.get('/', authenticationMiddleware, playgroundController.list.bind(playgroundController));

  // Files (Nested)
  router.post(
    '/:playgroundId/files',
    authenticationMiddleware,
    requestValidationMiddleware({
      body: createFileSchema,
    }),
    fileController.create,
  );

  // Executions (Nested)
  router.post(
    '/:playgroundId/execute',
    // authenticationMiddleware, // Optional if we allow anonymous execution? For now require auth
    authenticationMiddleware,
    requestValidationMiddleware({
      body: executeCodeSchema,
    }),
    executionController.execute,
  );

  return router;
};
