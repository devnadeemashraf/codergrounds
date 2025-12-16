import { User, UserOAuthProvider, UserOAuthProviders } from '@codergrounds/shared';

import { BaseRepositoryInterface } from './base.repository.interface';

import type { PoolClient } from 'pg';

export type UserOAuthProviderData = Omit<
  UserOAuthProvider,
  'id' | 'created_at' | 'updated_at' | 'deleted_at'
>;

export interface UserOAuthProvidersRepositoryInterface<
  T = UserOAuthProvider,
> extends BaseRepositoryInterface<T> {
  findUserByOAuthProvider(
    provider: UserOAuthProviders,
    providerUserId: string,
    client?: PoolClient,
  ): Promise<User | null>;

  addOAuthProvider(data: UserOAuthProviderData, client?: PoolClient): Promise<UserOAuthProvider>;
}
