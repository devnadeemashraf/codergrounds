import { inject, injectable } from 'tsyringe';

import { loginSchema, registerSchema } from '@codergrounds/shared';

import type { NextFunction, Request, Response } from 'express';

import {
  ChangePasswordUseCase,
  LoginUseCase,
  RefreshTokenUseCase,
  RegisterUseCase,
} from '@/core/useCases/auth';
import { ErrorTraced } from '@/shared/decorators';
import { ContainerTokens } from '@/shared/utils/container.utils';
import { setRefreshTokenCookie } from '@/shared/utils/cookie.utils';
import { Created, OK } from '@/shared/utils/response.utils';
import { getValidatedBody } from '@/shared/utils/validation.utils';

@injectable()
export class AuthController {
  constructor(
    @inject(ContainerTokens.loginUseCase) private readonly loginUseCase: LoginUseCase,
    @inject(ContainerTokens.registerUseCase) private readonly registerUseCase: RegisterUseCase,
    @inject(ContainerTokens.refreshTokenUseCase)
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    @inject(ContainerTokens.changePasswordUseCase)
    private readonly changePasswordUseCase: ChangePasswordUseCase,
  ) {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }

  @ErrorTraced('Failed to login user')
  async login(req: Request, res: Response, _next: NextFunction) {
    const body = getValidatedBody(req, loginSchema);
    const result = await this.loginUseCase.execute(body);

    // Set refresh token as HTTP-Only cookie
    setRefreshTokenCookie(res, result.refreshToken);

    return OK(
      res,
      {
        user: result.user,
        accessToken: result.accessToken,
      },
      'Login successful',
    );
  }

  @ErrorTraced('Failed to register user')
  async register(req: Request, res: Response, _next: NextFunction) {
    const body = getValidatedBody(req, registerSchema);
    const result = await this.registerUseCase.execute(body);

    // Set refresh token as HTTP-Only cookie
    setRefreshTokenCookie(res, result.refreshToken);

    return Created(
      res,
      {
        user: result.user,
        accessToken: result.accessToken,
      },
      'Registration successful',
    );
  }

  @ErrorTraced('Failed to refresh token')
  async refreshToken(req: Request, res: Response, _next: NextFunction) {
    const result = await this.refreshTokenUseCase.execute(req.cookies['refreshToken'] as string);

    // Set refresh token as HTTP-Only cookie
    setRefreshTokenCookie(res, result.refreshToken);

    return OK(res, { accessToken: result.accessToken }, 'Token Refresh successful');
  }

  // TODO: Currently doesn't check 'old password', needs update
  @ErrorTraced('Failed to change password')
  async changePassword(req: Request, res: Response, _next: NextFunction) {
    const { password, passwordConfirmation } = req.body;

    const result = await this.changePasswordUseCase.execute(
      req.user?.userId as string,
      password,
      passwordConfirmation,
    );

    return OK(res, result, 'Password Changed Successfully!');
  }
}
