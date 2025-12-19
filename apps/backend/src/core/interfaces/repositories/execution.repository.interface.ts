import { Pool, PoolClient } from 'pg';

import { Execution } from '@codergrounds/shared';

import { BaseRepositoryInterface } from './base.repository.interface';

export interface ExecutionRepositoryInterface extends BaseRepositoryInterface<Execution> {
  findByPlaygroundId(
    playgroundId: string,
    limit?: number,
    client?: Pool | PoolClient,
  ): Promise<Execution[]>;
}
