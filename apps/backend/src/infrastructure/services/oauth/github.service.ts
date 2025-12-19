import { URL } from 'node:url';

import axios from 'axios';
import { injectable } from 'tsyringe';

import { OAuthTokenResponse, UserOAuthProfile, UserProvider } from '@codergrounds/shared';

import { envConfig } from '@/config';
import { OAuthServiceInterface } from '@/core/interfaces/services';
import { ErrorTraced } from '@/shared/decorators';

@injectable()
export class GithubOAuthService implements OAuthServiceInterface {
  @ErrorTraced('Failed to get authorization url for github oauth')
  async getAuthorizationUrl(state: string): Promise<string> {
    const url = new URL('https://github.com/login/oauth/authorize');

    url.searchParams.set('client_id', envConfig.GITHUB_CLIENT_ID as string);
    url.searchParams.set('redirect_uri', envConfig.GITHUB_REDIRECT_URI as string);
    url.searchParams.set('scope', 'user:email read:user');
    url.searchParams.set('state', state);

    return url.toString();
  }

  @ErrorTraced('Failed to get exchange code for token for github oauth')
  async exchangeCodeForToken(code: string): Promise<OAuthTokenResponse> {
    const url = new URL('https://github.com/login/oauth/access_token');

    const response = await axios.post(
      url.toString(),
      {
        code,
        client_id: envConfig.GITHUB_CLIENT_ID as string,
        client_secret: envConfig.GITHUB_CLIENT_SECRET as string,
        redirect_uri: envConfig.GITHUB_REDIRECT_URI as string,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    return {
      accessToken: response.data.access_token,
      tokenType: response.data.token_type,
      scope: response.data.scope,
    };
  }

  @ErrorTraced('Failed to get user profile for github oauth')
  async getUserProfile(accessToken: string): Promise<UserOAuthProfile> {
    const url = new URL('https://api.github.com/user');

    const response = await axios.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let email = response.data.email;

    // If Email Hidden, make another call to get the actual email
    if (!email) {
      const fetchEmailUrl = new URL('https://api.github.com/user/emails');
      const emailResponse = await axios.get(fetchEmailUrl.toString(), {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const primaryEmail = emailResponse.data.find(
        (e: { primary: boolean; verified: boolean; email: string }) => e.primary && e.verified,
      );
      email = primaryEmail?.email;
    }

    return {
      providerUserId: String(response.data.id),
      email,
      username: response.data.login,
      avatarUrl: response.data.avatar_url,
      provider: UserProvider.GitHub,
    };
  }
}
