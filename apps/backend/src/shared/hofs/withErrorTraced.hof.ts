/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@/shared/logger';

/**
 * Higher-order function that wraps an async function with error logging.
 *
 * Automatically catches errors, logs them with function name and arguments,
 * then rethrows the error so it can be handled by global error middleware.
 *
 * **Use this HOF for:**
 * - Standalone functions (not class methods)
 * - Functions where you need dynamic error messages
 * - Functional programming patterns
 * - When you can't use decorators (e.g., arrow functions, function expressions)
 *
 * **When to use HOF vs decorator:**
 * - Use `withErrorTraced` HOF for standalone functions
 * - Use `@ErrorTraced` decorator for class methods
 *
 * @template Args - The argument types of the function
 * @template R - The return type of the function
 * @param fn - The async function to wrap with error handling
 * @param errorMessage - Optional custom error message for logging. If not provided,
 *                       defaults to "Error in function {functionName}"
 * @returns A new async function with error logging wrapped around the original
 *
 * @example
 * ```typescript
 * // Standalone function
 * const fetchUserData = withErrorTraced(
 *   async (userId: string) => {
 *     // Function implementation
 *   },
 *   'Failed to fetch user data'
 * );
 *
 * // Or wrap an existing function
 * const wrappedFunction = withErrorTraced(existingAsyncFunction, 'Custom error message');
 * ```
 */
export const withErrorTraced = <Args extends any[], R>(
  fn: (...args: Args) => Promise<R>,
  errorMessage?: string,
) => {
  return async (...args: Args): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error: unknown) {
      // Handle circular references or non-serializable objects gracefully
      let argsString: string;
      try {
        argsString = JSON.stringify(args);
      } catch {
        argsString = '[Unable to serialize arguments]';
      }

      const fnName = fn.name || 'anonymous';
      logger.error(error, `${errorMessage ?? `Error in function ${fnName}`} | args: ${argsString}`);

      // Rethrow for global middleware to handle
      throw error;
    }
  };
};
