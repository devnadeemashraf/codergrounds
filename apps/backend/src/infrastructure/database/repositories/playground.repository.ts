import { PoolClient } from 'pg';

import { Playground } from '@codergrounds/shared';

import { PlaygroundRepositoryInterface } from '@/core/interfaces/repositories';
import { BaseRepository } from '@/infrastructure/database/repositories/base.repository';
import { ErrorTraced } from '@/shared/decorators';

export class PlaygroundRepository
  extends BaseRepository<Playground>
  implements PlaygroundRepositoryInterface
{
  constructor() {
    super('playgrounds');
  }

  @ErrorTraced('Failed to find playgrounds by user id')
  async findByUserId(
    userId: string,
    options: { limit?: number; offset?: number } = {},
    client?: PoolClient,
  ): Promise<Playground[]> {
    const { limit = 20, offset = 0 } = options;
    const sqlQuery = `
      SELECT * 
      FROM ${this.tableName} 
      WHERE user_id = $1 AND deleted_at IS NULL
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;
    const result = await this.runQueryAndReturnAllResults<Playground>(
      sqlQuery,
      [userId, limit, offset],
      client,
    );
    return result || [];
  }

  @ErrorTraced('Failed to count playgrounds by user id')
  async countByUserId(userId: string, client?: PoolClient): Promise<number> {
    const sqlQuery = `
      SELECT count(*) as count
      FROM ${this.tableName} 
      WHERE user_id = $1 AND deleted_at IS NULL
    `;
    const result = await this.runQueryAndReturnFirstResult<{ count: string }>(
      sqlQuery,
      [userId],
      client,
    );
    return result ? parseInt(result.count, 10) : 0;
  }
}
