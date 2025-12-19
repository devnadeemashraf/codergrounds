import { Pool, PoolClient } from 'pg';

import { Playground } from '@codergrounds/shared';

import { BaseRepositoryInterface } from './base.repository.interface';

export interface PlaygroundRepositoryInterface extends BaseRepositoryInterface<Playground> {
  findByUserId(
    userId: string,
    options?: { limit?: number; offset?: number },
    client?: Pool | PoolClient,
  ): Promise<Playground[]>;
  countByUserId(userId: string, client?: Pool | PoolClient): Promise<number>;
}
