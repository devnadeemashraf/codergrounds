import { PoolClient } from 'pg';

import { User, UserOAuthProvider, UserProvider } from '@codergrounds/shared';

import {
  UserOAuthProviderData,
  UserOAuthProvidersRepositoryInterface,
} from '@/core/interfaces/repositories/userOAuthProviders.repository.interface';
import { BaseRepository } from '@/infrastructure/database/repositories';
import { ErrorTraced } from '@/shared/decorators';
import { DatabaseQueryError } from '@/shared/errors';

export class UserOAuthProvidersRepository
  extends BaseRepository<UserOAuthProvider>
  implements UserOAuthProvidersRepositoryInterface<UserOAuthProvider>
{
  constructor() {
    super('user_oauth_providers');
  }

  @ErrorTraced('Failed to find add provider to user')
  async addOAuthProvider(
    data: UserOAuthProviderData,
    client?: PoolClient,
  ): Promise<UserOAuthProvider> {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (!keys.length) {
      throw new DatabaseQueryError('No key found to fetch from database');
    }
    if (!values.length) {
      throw new DatabaseQueryError('No values found to update to the database');
    }

    const columns = keys.join(', ');
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

    const sqlQuery = `
		INSERT INTO ${this.tableName} 
		(${columns}) 
		VALUES (${placeholders})
		RETURNING *
	`;
    return this.runQueryAndReturnFirstResultRequired(sqlQuery, values, client);
  }

  @ErrorTraced('Failed to find user by provider')
  async findUserByOAuthProvider(
    provider: UserProvider,
    providerUserId: string,
    client?: PoolClient,
  ) {
    // log (n) + log (m)
    // log (n), indexed lookup => uop.provider = $1
    // log (m), indexed lookup => uop.provider_user_id = $2
    const sqlQuery = `
      SELECT u.*
      FROM ${this.tableName} uop
      JOIN users u
        ON u.id = uop.user_id
      WHERE uop.provider = $1
        AND uop.provider_user_id = $2
        AND uop.deleted_at IS NULL
        AND u.deleted_at IS NULL
      LIMIT 1
    `;
    return this.runQueryAndReturnFirstResult<User>(sqlQuery, [provider, providerUserId], client);
  }
}
