import { UserOAuthProviders } from '@codergrounds/shared';

import { OAuthServiceInterface } from '@/core/interfaces/services';

export interface OAuthFactoryInterface {
  getService: (provider: UserOAuthProviders) => OAuthServiceInterface;
}
