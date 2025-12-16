import { URL } from 'node:url';

import axios from 'axios';
import { injectable } from 'tsyringe';

import { OAuthTokenResponse, UserOAuthProfile } from '@codergrounds/shared';

import { envConfig } from '@/config';
import { OAuthServiceInterface } from '@/core/interfaces/services';
import { ErrorTraced } from '@/shared/decorators';

@injectable()
export class GoogleOAuthService implements OAuthServiceInterface {
  @ErrorTraced('Failed to get authorization url for google oauth')
  async getAuthorizationUrl(state: string): Promise<string> {
    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');

    url.searchParams.set('client_id', envConfig.GOOGLE_CLIENT_ID as string);
    url.searchParams.set('redirect_uri', envConfig.GOOGLE_REDIRECT_URI as string);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', 'openid email profile');
    url.searchParams.set('access_type', 'offline');
    url.searchParams.set('state', state);

    return url.toString();
  }

  @ErrorTraced('Failed to get exchange code for token for google oauth')
  async exchangeCodeForToken(code: string): Promise<OAuthTokenResponse> {
    const url = new URL('https://oauth2.googleapis.com/token');

    const response = await axios.post(url.toString(), {
      code,
      client_id: envConfig.GOOGLE_CLIENT_ID as string,
      client_secret: envConfig.GOOGLE_CLIENT_SECRET as string,
      redirect_uri: envConfig.GOOGLE_REDIRECT_URI as string,
      grant_type: 'authorization_code',
    });

    return {
      accessToken: response.data.access_token,
      tokenType: response.data.token_type,
      scope: response.data.scope,
    };
  }

  @ErrorTraced('Failed to get user profile for google oauth')
  async getUserProfile(accessToken: string): Promise<UserOAuthProfile> {
    const url = new URL('https://www.googleapis.com/oauth2/v3/userinfo');

    const response = await axios.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      providerUserId: response.data.sub,
      email: response.data.email,
      username: response.data.name,
      avatarUrl: response.data.picture,
      provider: 'google',
    };
  }
}
