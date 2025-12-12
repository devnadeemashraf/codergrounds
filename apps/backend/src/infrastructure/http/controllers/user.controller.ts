import { injectable } from 'tsyringe';

import type { NextFunction, Request, Response } from 'express';

import { ErrorTraced } from '@/shared/decorators';
import { OK } from '@/shared/utils/response.utils';

@injectable()
export class UserController {
  @ErrorTraced('Failed to get user profile')
  async getMe(_req: Request, res: Response, _next: NextFunction) {
    // TODO: Implement when GetUserUseCase is created
    return OK(res, { message: 'Not implemented yet' }, 'User profile endpoint');
  }
}
