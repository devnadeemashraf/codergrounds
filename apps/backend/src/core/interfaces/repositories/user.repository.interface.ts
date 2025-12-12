import { User } from '@codergrounds/shared';

import { BaseRepositoryInterface } from './base.repository.interface';

import type { Pool, PoolClient } from 'pg';

export interface UserRepositoryInterface<T = User> extends BaseRepositoryInterface<T> {
  findUserByEmailOrUsername(
    email: string,
    username: string,
    client?: Pool | PoolClient,
  ): Promise<T | null>;
}
