import { Pool, PoolClient } from 'pg';

import { File } from '@codergrounds/shared';

import { BaseRepositoryInterface } from './base.repository.interface';

export interface FileRepositoryInterface extends BaseRepositoryInterface<File> {
  findByPlaygroundId(playgroundId: string, client?: Pool | PoolClient): Promise<File[]>;
  deleteByPlaygroundId(playgroundId: string, client?: Pool | PoolClient): Promise<boolean>;
}
