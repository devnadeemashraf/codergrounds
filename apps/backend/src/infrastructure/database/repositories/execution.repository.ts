import { PoolClient } from 'pg';

import { Execution } from '@codergrounds/shared';

import { ExecutionRepositoryInterface } from '@/core/interfaces/repositories';
import { BaseRepository } from '@/infrastructure/database/repositories/base.repository';
import { ErrorTraced } from '@/shared/decorators';

export class ExecutionRepository
  extends BaseRepository<Execution>
  implements ExecutionRepositoryInterface
{
  constructor() {
    super('executions');
  }

  @ErrorTraced('Failed to find executions by playground id')
  async findByPlaygroundId(
    playgroundId: string,
    limit: number = 10,
    client?: PoolClient,
  ): Promise<Execution[]> {
    const sqlQuery = `
      SELECT * 
      FROM ${this.tableName} 
      WHERE playground_id = $1
      ORDER BY created_at DESC
      LIMIT $2
    `;
    const result = await this.runQueryAndReturnAllResults<Execution>(
      sqlQuery,
      [playgroundId, limit],
      client,
    );
    return result || [];
  }
}
