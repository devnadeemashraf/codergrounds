import { PoolClient } from 'pg';

import { File } from '@codergrounds/shared';

import { FileRepositoryInterface } from '@/core/interfaces/repositories';
import { BaseRepository } from '@/infrastructure/database/repositories/base.repository';
import { ErrorTraced } from '@/shared/decorators';

export class FileRepository extends BaseRepository<File> implements FileRepositoryInterface {
  constructor() {
    super('files');
  }

  @ErrorTraced('Failed to find files by playground id')
  async findByPlaygroundId(playgroundId: string, client?: PoolClient): Promise<File[]> {
    const sqlQuery = `
      SELECT * 
      FROM ${this.tableName} 
      WHERE playground_id = $1 AND deleted_at IS NULL
      ORDER BY "order" ASC, created_at ASC
    `;
    const result = await this.runQueryAndReturnAllResults<File>(sqlQuery, [playgroundId], client);
    return result || [];
  }

  @ErrorTraced('Failed to delete files by playground id')
  async deleteByPlaygroundId(playgroundId: string, client?: PoolClient): Promise<boolean> {
    const sqlQuery = `
      UPDATE ${this.tableName} 
      SET deleted_at = NOW()
      WHERE playground_id = $1 AND deleted_at IS NULL
    `;
    const result = await this.runQuery(sqlQuery, [playgroundId], client);
    return (result && result.rowCount !== null && result.rowCount > 0) || false;
  }
}
