import { PoolClient } from 'pg';

import { SeedConfig } from './seed.types';

import type { UserSeed } from '@codergrounds/shared';

import { container } from '@/container';
import { UserRepositoryInterface } from '@/core/interfaces/repositories/user.repository.interface';
import { ContainerTokens } from '@/shared/utils/container.utils';

// Resolve UserRepository from DI container to maintain architecture consistency
const getUserRepository = (): UserRepositoryInterface => {
  return container.resolve<UserRepositoryInterface>(ContainerTokens.userRepository);
};

export const userSeedConfig: SeedConfig<UserSeed> = {
  tableName: 'users',

  checkIfSeedDataExists: async (client: PoolClient, user: UserSeed): Promise<boolean> => {
    const userRepository = getUserRepository();
    return (await userRepository.findOne({ email: user.email }, client)) !== null;
  },

  insertSeedData: async (client: PoolClient, user: UserSeed): Promise<void> => {
    const userRepository = getUserRepository();
    await userRepository.create(
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
  },
};
