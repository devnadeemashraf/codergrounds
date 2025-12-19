import { UserProvider } from '@codergrounds/shared';

import { OAuthServiceInterface } from '@/core/interfaces/services';

export interface OAuthFactoryInterface {
  getService: (provider: UserProvider) => OAuthServiceInterface;
}
