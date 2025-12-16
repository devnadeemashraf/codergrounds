import { PoolClient } from 'pg';
import { inject, injectable } from 'tsyringe';

import { User, UserOAuthProfile, UserOAuthProviders } from '@codergrounds/shared';

import { OAuthFactoryInterface } from '@/core/interfaces/factories';
import { UserRepositoryInterface } from '@/core/interfaces/repositories';
import { UserOAuthProvidersRepositoryInterface } from '@/core/interfaces/repositories/userOAuthProviders.repository.interface';
import { UserMapper } from '@/infrastructure/mappers';
import { ErrorTraced } from '@/shared/decorators';
import { UnauthorizedError } from '@/shared/errors';
import { withTransaction } from '@/shared/hofs';
import { getDefaultImageUrl, replaceSpaceWithChar } from '@/shared/utils/common.utils';
import { ContainerTokens } from '@/shared/utils/container.utils';
import { generateTokenPairs } from '@/shared/utils/jwt.utils';
import { validateOAuthState } from '@/shared/utils/oauth.utils';

@injectable()
export class OAuthLoginUseCase {
  constructor(
    @inject(ContainerTokens.oauthFactory)
    private readonly oauthFactory: OAuthFactoryInterface,
    @inject(ContainerTokens.userRepository)
    private readonly userRepository: UserRepositoryInterface,
    @inject(ContainerTokens.userOAuthProvidersRepository)
    private readonly userOAuthProvidersRepository: UserOAuthProvidersRepositoryInterface,
  ) {}

  @ErrorTraced('Failed to login user via oauth')
  async execute(provider: UserOAuthProviders, code: string, state: string) {
    return withTransaction(async (client: PoolClient) => {
      const isValidState = await validateOAuthState(state);
      if (!isValidState) {
        throw new UnauthorizedError('Invalid or Expired OAuth State');
      }

      const service = this.oauthFactory.getService(provider);
      const tokens = await service.exchangeCodeForToken(code);
      const profile = await service.getUserProfile(tokens.accessToken);

      const user = await this.userOAuthProvidersRepository.findUserByOAuthProvider(
        profile.provider,
        profile.providerUserId,
        client,
      );

      // User Found via Provider -> Login
      if (user) {
        return await this.loginSuccess(user);
      }

      // User Found via Email -> Link Account
      if (profile.email) {
        const userByEmail = await this.userRepository.findOne(
          {
            email: profile.email,
          },
          client,
        );
        if (userByEmail) {
          return await this.linkAccountWithProvider(userByEmail, profile, client);
        }
      }

      // User Not Found -> Create New Account
      return await this.createUserWithProvider(profile, client);
    });
  }

  @ErrorTraced('Failed to complete user login via oauth')
  private async loginSuccess(user: User) {
    const { accessToken, refreshToken } = generateTokenPairs({
      userId: user.id,
      username: user.username,
      userEmail: user.email,
      tokenVersion: user.token_version,
    });

    return {
      user: UserMapper.toPublic(user),
      accessToken,
      refreshToken,
    };
  }

  @ErrorTraced('Failed to link user with provider')
  private async linkAccountWithProvider(
    user: User,
    profile: UserOAuthProfile,
    client?: PoolClient,
  ) {
    await this.userOAuthProvidersRepository.addOAuthProvider(
      {
        user_id: user.id,
        provider: profile.provider,
        provider_user_id: profile.providerUserId,
        provider_email: profile.email || '',
      },
      client,
    );

    return this.loginSuccess(user);
  }

  @ErrorTraced('Failed to create new user with provider')
  private async createUserWithProvider(profile: UserOAuthProfile, client?: PoolClient) {
    // Create User
    const username = profile.username
      ? replaceSpaceWithChar(profile.username, '-', true)
      : `user_${profile.providerUserId}`;
    const newUser = await this.userRepository.create(
      {
        email: profile.email || undefined,
        username,
        avatar_url: profile.avatarUrl || getDefaultImageUrl(username),
        password_hash: null,
        provider: profile.provider, // This is the 'primary' provider
        token_version: 1,
      },
      client,
    );

    // Create Provider Link
    await this.userOAuthProvidersRepository.addOAuthProvider(
      {
        user_id: newUser.id,
        provider: profile.provider,
        provider_user_id: profile.providerUserId,
        provider_email: profile.email || '',
      },
      client,
    );

    return this.loginSuccess(newUser);
  }
}
