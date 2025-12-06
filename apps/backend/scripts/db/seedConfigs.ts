import { PoolClient } from 'pg';

import { UserSeed } from '@codergrounds/shared';

import { SeedConfig } from './seedTypes';

export const userSeedConfig: SeedConfig<UserSeed> = {
  tableName: 'users',

  checkIfSeedDataExists: async (client: PoolClient, user: UserSeed): Promise<boolean> => {
    const result = await client.query(
      'SELECT COUNT(*) as count FROM users WHERE email = $1 AND deleted_at IS NULL',
      [user.email],
    );
    return parseInt(result.rows[0].count) > 0;
  },

  insertSeedData: async (client: PoolClient, user: UserSeed): Promise<void> => {
    await client.query(
      `INSERT INTO users (email, username, password_hash, avatar_url, provider, provider_id, token_version)
		 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        user.email,
        user.username,
        user.password_hash,
        user.avatar_url,
        user.provider,
        user.provider_id,
        user.token_version,
      ],
    );
  },
};
