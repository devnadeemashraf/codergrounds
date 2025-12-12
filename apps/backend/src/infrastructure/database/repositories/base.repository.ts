/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool, PoolClient, QueryResult } from 'pg';

import { BaseRepositoryInterface } from '@/core/interfaces/repositories/base.repository.interface';
import { connectionPool } from '@/infrastructure/database/postgres.connection';
import { ErrorTraced } from '@/shared/decorators';

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

  @ErrorTraced("Failed to 'runQuery'")
  async runQuery(sqlQuery: string, values: any[], client?: PoolClient): Promise<QueryResult<T>> {
    const pgClient = this.getClient(client);
    return await pgClient.query(sqlQuery, values);
  }

  @ErrorTraced("Failed to 'runQueryAndReturnFirstResult'")
  async runQueryAndReturnFirstResult(
    sqlQuery: string,
    values: any[],
    client?: PoolClient,
  ): Promise<T | null> {
    const result = await this.runQuery(sqlQuery, values, client);
    return result.rows[0] || null;
  }

  @ErrorTraced("Failed to 'runQueryAndReturnFirstResultRequired'")
  async runQueryAndReturnFirstResultRequired(
    sqlQuery: string,
    values: any[],
    client?: PoolClient,
  ): Promise<T> {
    const result = await this.runQuery(sqlQuery, values, client);
    if (!result.rows[0]) {
      throw new Error('Expected query result but none was returned');
    }
    return result.rows[0];
  }

  @ErrorTraced("Failed to 'runQueryAndReturnAllResults'")
  async runQueryAndReturnAllResults(
    sqlQuery: string,
    values: any[],
    client?: PoolClient,
  ): Promise<T[] | null> {
    const result = await this.runQuery(sqlQuery, values, client);
    return result.rows || null;
  }

  @ErrorTraced("Failed to 'findById'")
  async findById(id: string, client?: PoolClient): Promise<T | null> {
    const sqlQuery = `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = $1`;
    return this.runQueryAndReturnFirstResult(sqlQuery, [id], client);
  }

  @ErrorTraced("Failed to 'findOne'")
  async findOne(where: Partial<T>, client?: PoolClient): Promise<T | null> {
    const keys = Object.keys(where);
    const values = Object.values(where);

    if (!keys.length) {
      throw Error('No key found to fetch from database');
    }

    const conditions = keys.map((k, i) => `${k} = $${i + 1}`).join(' AND ');
    const sqlQuery = `SELECT * FROM ${this.tableName} WHERE ${conditions} LIMIT 1`;

    return this.runQueryAndReturnFirstResult(sqlQuery, values, client);
  }

  @ErrorTraced("Failed to 'findMany'")
  async findMany(where: Partial<T>, client?: PoolClient): Promise<T[] | null> {
    const keys = Object.keys(where);
    const values = Object.values(where);

    if (!keys.length) {
      throw Error('No key found to fetch from database');
    }

    const conditions = keys.map((k, i) => `${k} = $${i + 1}`).join(' AND ');
    const sqlQuery = `SELECT * FROM ${this.tableName} WHERE ${conditions}`;

    return this.runQueryAndReturnAllResults(sqlQuery, values, client);
  }

  @ErrorTraced("Failed to 'create'")
  async create(data: Partial<T>, client?: PoolClient): Promise<T> {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (!keys.length) {
      throw Error('No key found to fetch from database');
    }
    if (!values.length) {
      throw Error('No values found to update to the database');
    }

    const columns = keys.join(', ');
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

    const sqlQuery = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;

    return this.runQueryAndReturnFirstResultRequired(sqlQuery, values, client);
  }

  @ErrorTraced("Failed to 'update'")
  async update(id: string, data: Partial<T>, client?: PoolClient): Promise<T | null> {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (!keys.length) {
      throw Error('No key found to fetch from database');
    }
    if (!values.length) {
      throw Error('No values found to update to the database');
    }

    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');

    const sqlQuery = `UPDATE ${this.tableName} SET ${setClause} WHERE ${this.primaryKey} = $${keys.length + 1} RETURNING *`;

    return this.runQueryAndReturnFirstResult(sqlQuery, [...values, id], client);
  }

  @ErrorTraced("Failed to 'delete'")
  async delete(id: string, client?: PoolClient): Promise<boolean> {
    const sqlQuery = `DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = $1`;

    const result = await this.runQuery(sqlQuery, [id], client);

    if (!result || !result.rowCount) return false;
    return true;
  }
}
