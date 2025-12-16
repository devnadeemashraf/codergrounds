import { inject, injectable } from 'tsyringe';

import { UserOAuthProviders } from '@codergrounds/shared';

import type { NextFunction, Request, Response } from 'express';

import { OAuthFactoryInterface } from '@/core/interfaces/factories';
import { OAuthLoginUseCase } from '@/core/useCases/auth/oauthLogin.useCase';
import { ErrorTraced } from '@/shared/decorators';
import { ContainerTokens } from '@/shared/utils/container.utils';
import { setRefreshTokenCookie } from '@/shared/utils/cookie.utils';
import { generateOAuthState } from '@/shared/utils/oauth.utils';
import { OK } from '@/shared/utils/response.utils';

@injectable()
export class OAuthController {
  constructor(
    @inject(ContainerTokens.oauthFactory) private readonly oauthFactory: OAuthFactoryInterface,
    @inject(ContainerTokens.oauthLoginUseCase)
    private readonly oauthLoginUseCase: OAuthLoginUseCase,
  ) {
    this.login = this.login.bind(this);
    this.callback = this.callback.bind(this);
  }

  @ErrorTraced('Failed to initiate oauth flow')
  async login(req: Request, res: Response, _next: NextFunction) {
    const { provider } = req.params;
    const state = await generateOAuthState(provider as UserOAuthProviders);

    const service = this.oauthFactory.getService(provider as UserOAuthProviders);
    const url = await service.getAuthorizationUrl(state);

    return OK(res, { url }, 'OAuth URL generated');
  }

  @ErrorTraced('Failed to verify oauth callback')
  async callback(req: Request, res: Response, _next: NextFunction) {
    const { provider } = req.params;
    const { state, code, scope, prompt } = req.query;

    const result = await this.oauthLoginUseCase.execute(
      provider as UserOAuthProviders,
      String(code),
      String(state),
    );

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
}
