/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@/shared/logger';

/**
 * Higher-order function that wraps an async function with fatal error handling.
 *
 * Automatically catches errors, logs them as fatal with function name and arguments,
 * then immediately terminates the Node.js process with a configurable exit code.
 *
 * **⚠️ WARNING: This will terminate the entire process!**
 *
 * **Use this HOF ONLY for:**
 * - Startup/initialization operations (database connections, server startup)
 * - Teardown/shutdown operations (graceful shutdown handlers)
 * - Critical standalone functions where failure means the application cannot continue
 *
 * **DO NOT use for:**
 * - Regular runtime operations (use `withErrorTraced` instead)
 * - User request handlers
 * - Operations that should be retried or handled gracefully
 *
 * **When to use HOF vs decorator:**
 * - Use `withFatalErrorTraced` HOF for standalone functions
 * - Use `@FatalErrorTraced` decorator for class methods
 *
 * @template Args - The argument types of the function
 * @template R - The return type of the function
 * @param fn - The async function to wrap with fatal error handling
 * @param errorMessage - Optional custom error message for logging. If not provided,
 *                       defaults to "Fatal error in function {functionName}"
 * @param exitCode - Process exit code (default: 1). Use different codes to indicate
 *                   different failure types (e.g., 3 for database failures)
 * @returns A new async function with fatal error handling wrapped around the original
 *
 * @example
 * ```typescript
 * // Startup function
 * const connectDatabase = withFatalErrorTraced(
 *   async () => {
 *     await pool.connect();
 *   },
 *   'Failed to connect to database during startup',
 *   3 // Exit code 3 for database failures
 * );
 *
 * // Or wrap an existing function
 * const wrappedShutdown = withFatalErrorTraced(
 *   gracefulShutdown,
 *   'Failed during graceful shutdown'
 * );
 * ```
 */
export const withFatalErrorTraced = <Args extends any[], R>(
  fn: (...args: Args) => Promise<R>,
  errorMessage?: string,
  exitCode = 1,
) => {
  return async (...args: Args): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error: unknown) {
      // Handle argument serialization safely
      let argsString: string;
      try {
        argsString = JSON.stringify(args);
      } catch {
        argsString = '[Unable to serialize arguments]';
      }

      const fnName = fn.name || 'anonymous';
      logger.fatal(
        error,
        `${errorMessage ?? `Fatal error in function ${fnName}`} | args: ${argsString}`,
      );

      // Terminate the process with the specified exit code
      process.exit(exitCode);
    }
  };
};
