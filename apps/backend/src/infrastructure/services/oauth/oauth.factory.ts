import { inject, injectable } from 'tsyringe';

import { UserProvider } from '@codergrounds/shared';

import { GithubOAuthService } from './github.service';
import { GoogleOAuthService } from './google.service';

import { OAuthFactoryInterface } from '@/core/interfaces/factories/oauth.factory.interface';
import { OAuthServiceInterface } from '@/core/interfaces/services';
import { ContainerTokens } from '@/shared/utils/container.utils';

@injectable()
export class OAuthFactory implements OAuthFactoryInterface {
  constructor(
    @inject(ContainerTokens.googleOAuthService)
    private readonly googleOAuthService: GoogleOAuthService,
    @inject(ContainerTokens.githubOAuthService)
    private readonly githubOAuthService: GithubOAuthService,
  ) {}

  getService(provider: UserProvider): OAuthServiceInterface {
    switch (provider) {
      case 'google': {
        return this.googleOAuthService;
      }
      case 'github': {
        return this.githubOAuthService;
      }
      default: {
        throw new Error('Invalid Provider');
      }
    }
  }
}
