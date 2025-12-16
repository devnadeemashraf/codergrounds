/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';

import { BaseRepositoryInterface } from '@/core/interfaces/repositories/base.repository.interface';
import { connectionPool } from '@/infrastructure/database/postgres.connection';
import { ErrorTraced } from '@/shared/decorators';
import { DatabaseQueryError } from '@/shared/errors';

export abstract class BaseRepository<
  T extends Record<string, any>,
> implements BaseRepositoryInterface<T> {
  readonly tableName: string;
  readonly primaryKey: string;

  constructor(tableName: string, primaryKey: string = 'id') {
    this.tableName = tableName;
    this.primaryKey = primaryKey;

    // fix prototypal chain
    Object.setPrototypeOf(this, new.target.prototype);
  }

  getClient(client?: PoolClient): Pool | PoolClient {
    if (client) return client;
    return connectionPool;
  }

  @ErrorTraced('Failed to run query')
  async runQuery<R extends QueryResultRow = T>(
    sqlQuery: string,
    values: any[],
    client?: PoolClient,
  ): Promise<QueryResult<R>> {
    const pgClient = this.getClient(client);
    return await pgClient.query<R>(sqlQuery, values);
  }

  @ErrorTraced('Failed to run query and return first result or null')
  async runQueryAndReturnFirstResult<R extends QueryResultRow = T>(
    sqlQuery: string,
    values: any[],
    client?: PoolClient,
  ): Promise<R | null> {
    const result = await this.runQuery<R>(sqlQuery, values, client);
    return result.rows[0] || null;
  }

  @ErrorTraced('Failed to run query and return first result')
  async runQueryAndReturnFirstResultRequired<R extends QueryResultRow = T>(
    sqlQuery: string,
    values: any[],
    client?: PoolClient,
  ): Promise<R> {
    const result = await this.runQuery<R>(sqlQuery, values, client);
    if (!result.rows[0]) {
      throw new Error('Expected query result but none was returned');
    }
    return result.rows[0];
  }

  @ErrorTraced('Failed to run query and return all results or null')
  async runQueryAndReturnAllResults<R extends QueryResultRow = T>(
    sqlQuery: string,
    values: any[],
    client?: PoolClient,
  ): Promise<R[] | null> {
    const result = await this.runQuery<R>(sqlQuery, values, client);
    return result.rows || null;
  }

  @ErrorTraced('Failed to find by id')
  async findById<R extends QueryResultRow = T>(id: string, client?: PoolClient): Promise<R | null> {
    const sqlQuery = `
      SELECT * 
      FROM ${this.tableName} 
      WHERE ${this.primaryKey} = $1
    `;
    return this.runQueryAndReturnFirstResult<R>(sqlQuery, [id], client);
  }

  @ErrorTraced('Failed to find one')
  async findOne<R extends QueryResultRow = T>(
    where: Partial<R>,
    client?: PoolClient,
  ): Promise<R | null> {
    const keys = Object.keys(where);
    const values = Object.values(where);

    if (!keys.length) {
      throw new DatabaseQueryError('No key found to fetch from database');
    }

    const conditions = keys.map((k, i) => `${k} = $${i + 1}`).join(' AND ');
    const sqlQuery = `
      SELECT * 
      FROM ${this.tableName} 
      WHERE ${conditions} 
      LIMIT 1
    `;

    return this.runQueryAndReturnFirstResult<R>(sqlQuery, values, client);
  }

  @ErrorTraced('Failed to find many')
  async findMany<R extends QueryResultRow = T>(
    where: Partial<R>,
    client?: PoolClient,
  ): Promise<R[] | null> {
    const keys = Object.keys(where);
    const values = Object.values(where);

    if (!keys.length) {
      throw new DatabaseQueryError('No key found to fetch from database');
    }

    const conditions = keys.map((k, i) => `${k} = $${i + 1}`).join(' AND ');
    const sqlQuery = `
      SELECT * 
      FROM ${this.tableName} 
      WHERE ${conditions}
    `;

    return this.runQueryAndReturnAllResults<R>(sqlQuery, values, client);
  }

  @ErrorTraced('Failed to create record')
  async create<R extends QueryResultRow = T>(data: Partial<R>, client?: PoolClient): Promise<R> {
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
      INSERT INTO ${this.tableName} (${columns}) 
      VALUES (${placeholders}) 
      RETURNING *
    `;

    return this.runQueryAndReturnFirstResultRequired<R>(sqlQuery, values, client);
  }

  @ErrorTraced('Failed to update record')
  async update<R extends QueryResultRow = T>(
    id: string,
    data: Partial<R>,
    client?: PoolClient,
  ): Promise<R | null> {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (!keys.length) {
      throw new DatabaseQueryError('No key found to fetch from database');
    }
    if (!values.length) {
      throw new DatabaseQueryError('No values found to update to the database');
    }

    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');

    const sqlQuery = `
      UPDATE ${this.tableName} 
      SET ${setClause} 
      WHERE ${this.primaryKey} = $${keys.length + 1} 
      RETURNING *
    `;

    return this.runQueryAndReturnFirstResult<R>(sqlQuery, [...values, id], client);
  }

  @ErrorTraced('Failed to delete record')
  async delete<R extends QueryResultRow = T>(id: string, client?: PoolClient): Promise<boolean> {
    const sqlQuery = `
      DELETE FROM ${this.tableName} 
      WHERE ${this.primaryKey} = $1
    `;

    const result = await this.runQuery<R>(sqlQuery, [id], client);

    if (!result || !result.rowCount) return false;
    return true;
  }
}
