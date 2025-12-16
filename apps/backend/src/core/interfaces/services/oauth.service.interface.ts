import { OAuthTokenResponse, UserOAuthProfile } from '@codergrounds/shared';

export interface OAuthServiceInterface {
  getAuthorizationUrl: (state: string) => Promise<string>;
  exchangeCodeForToken: (code: string) => Promise<OAuthTokenResponse>;
  getUserProfile: (accessToken: string) => Promise<UserOAuthProfile>;
}
