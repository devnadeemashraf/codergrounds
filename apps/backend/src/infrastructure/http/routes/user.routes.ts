import { Router } from 'express';

import { UserController } from '@/infrastructure/http/controllers/user.controller';
import { authenticationMiddleware } from '@/infrastructure/http/middlewares';

export const createUserRoutes = (userController: UserController): Router => {
  const router = Router();

  router.use(authenticationMiddleware);

  // GET /api/v1/users/me
  router.get('/me', userController.getMe);

  // TODO: Add more user routes as use cases are implemented
  // router.get('/:id', userController.getUser);
  // router.put('/me', userController.updateUser);
  // router.delete('/me', userController.deleteUser);

  return router;
};
