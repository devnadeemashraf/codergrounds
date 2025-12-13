import { inject, injectable } from 'tsyringe';

import { loginSchema, registerSchema } from '@codergrounds/shared';

import type { NextFunction, Request, Response } from 'express';

import { LoginUseCase } from '@/core/useCases/auth/login.useCase';
import { RegisterUseCase } from '@/core/useCases/auth/register.useCase';
import { ErrorTraced } from '@/shared/decorators';
import { ContainerTokens } from '@/shared/utils/container.utils';
import { Created, OK } from '@/shared/utils/response.utils';
import { getValidatedBody } from '@/shared/utils/validation.utils';

@injectable()
export class AuthController {
  constructor(
    @inject(ContainerTokens.loginUseCase) private readonly loginUseCase: LoginUseCase,
    @inject(ContainerTokens.registerUseCase) private readonly registerUseCase: RegisterUseCase,
  ) {}

  @ErrorTraced('Failed to login user')
  async login(req: Request, res: Response, _next: NextFunction) {
    const body = getValidatedBody(req, loginSchema);
    const result = await this.loginUseCase.execute(body);
    return OK(res, result, 'Login successful');
  }

  @ErrorTraced('Failed to register user')
  async register(req: Request, res: Response, _next: NextFunction) {
    const body = getValidatedBody(req, registerSchema);
    const result = await this.registerUseCase.execute(body);
    return Created(res, result, 'User registered successfully');
  }
}
