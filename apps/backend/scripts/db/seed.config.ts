import { PoolClient } from 'pg';

import { SeedConfig } from './seed.types';
import { SeedUserWithOAuth } from './seedData.factory';

import { container } from '@/container';
import { UserRepositoryInterface } from '@/core/interfaces/repositories/user.repository.interface';
import { UserOAuthProvidersRepositoryInterface } from '@/core/interfaces/repositories/userOAuthProviders.repository.interface';
import { ContainerTokens } from '@/shared/utils/container.utils';

// Resolve UserRepository from DI container to maintain architecture consistency
const getUserRepository = (): UserRepositoryInterface => {
  return container.resolve<UserRepositoryInterface>(ContainerTokens.userRepository);
};

const getUserOAuthProvidersRepository = (): UserOAuthProvidersRepositoryInterface => {
  return container.resolve<UserOAuthProvidersRepositoryInterface>(
    ContainerTokens.userOAuthProvidersRepository,
  );
};

export const userSeedConfig: SeedConfig<SeedUserWithOAuth> = {
  tableName: 'users',

  checkIfSeedDataExists: async (client: PoolClient, user: SeedUserWithOAuth): Promise<boolean> => {
    const userRepository = getUserRepository();
    return (await userRepository.findOne({ email: user.email }, client)) !== null;
  },

  insertSeedData: async (client: PoolClient, user: SeedUserWithOAuth): Promise<void> => {
    const userRepository = getUserRepository();
    const newUser = await userRepository.create(
      {
        email: user.email,
        username: user.username,
        password_hash: user.password_hash,
        avatar_url: user.avatar_url,
        provider: user.provider,
        token_version: user.token_version,
      },
      client,
    );

    if (user.oauth) {
      const userOAuthRepository = getUserOAuthProvidersRepository();
      await userOAuthRepository.addOAuthProvider(
        {
          user_id: newUser.id,
          provider: user.provider, // Use the provider from the user record (e.g. google/github)
          provider_user_id: user.oauth.provider_user_id,
          provider_email: user.oauth.provider_email,
        },
        client,
      );
    }
  },
};
