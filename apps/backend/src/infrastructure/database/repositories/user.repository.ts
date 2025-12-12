import { PoolClient } from 'pg';

import { User } from '@codergrounds/shared';

import { UserRepositoryInterface } from '@/core/interfaces/repositories/user.repository.interface';
import { BaseRepository } from '@/infrastructure/database/repositories';
import { ErrorTraced } from '@/shared/decorators';

export class UserRepository extends BaseRepository<User> implements UserRepositoryInterface<User> {
  constructor() {
    super('users');
  }

  @ErrorTraced('Failed to "findUserByEmailOrUsername"')
  async findUserByEmailOrUsername(
    email: string,
    username: string,
    client?: PoolClient,
  ): Promise<User | null> {
    const sqlQuery = `SELECT * FROM ${this.tableName} WHERE email = $1 OR username = $2 AND deleted_at IS NULL LIMIT 1;`;
    return this.runQueryAndReturnFirstResult(sqlQuery, [email, username], client);
  }
}
