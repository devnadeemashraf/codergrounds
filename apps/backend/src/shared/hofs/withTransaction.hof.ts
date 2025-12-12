import { PoolClient } from 'pg';

import { connectionPool } from '@/infrastructure/database/postgres.connection';

/**
 * Executes a callback function within a database transaction.
 *
 * This higher-order function manages the complete transaction lifecycle:
 * - Checks out a client from the connection pool
 * - Begins a transaction
 * - Executes the provided callback with the transaction client
 * - Commits the transaction on success
 * - Rolls back the transaction on any error
 * - Always releases the client back to the pool
 *
 * The transaction client can be passed to multiple repository methods to ensure
 * all database operations execute within the same transaction boundary.
 *
 * @template T - The return type of the callback function
 * @param {function(client: PoolClient): Promise<T>} cb - Async callback function that receives a PoolClient for database operations
 * @returns {Promise<T>} - Returns the result of the callback function
 *
 * @example
 * // Single repository operation in transaction
 * const user = await withTransaction(async (client) => {
 *   return await userRepository.create(userData, client);
 * });
 *
 * @example
 * // Multiple repository operations in a single transaction
 * const result = await withTransaction(async (client) => {
 *   const user = await userRepository.create(userData, client);
 *   const playground = await playgroundRepository.create(
 *     { ...playgroundData, owner_id: user.id },
 *     client
 *   );
 *   await playgroundUserRepository.create(
 *     { user_id: user.id, playground_id: playground.id },
 *     client
 *   );
 *   return { user, playground };
 * });
 */
export const withTransaction = async <T>(cb: (client: PoolClient) => Promise<T>): Promise<T> => {
  const client = await connectionPool.connect();
  try {
    await client.query('BEGIN');
    const result = await cb(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
