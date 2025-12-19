import { UserProvider } from './enums';

export interface OAuthTokenResponse {
  accessToken: string;
  tokenType: string;
  scope: string;
}

export interface OAuthStateData {
  provider: UserProvider;
  redirectAfterLogin: string;
  createdAt: string;
}
