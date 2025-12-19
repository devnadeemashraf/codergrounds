import { User, UserOAuthProvider, UserProvider } from '@codergrounds/shared';

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
    provider: UserProvider,
    providerUserId: string,
    client?: PoolClient,
  ): Promise<User | null>;

  addOAuthProvider(data: UserOAuthProviderData, client?: PoolClient): Promise<UserOAuthProvider>;
}
