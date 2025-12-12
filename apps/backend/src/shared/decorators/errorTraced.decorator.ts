/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@/shared/logger';

/**
 * Method decorator that wraps async class methods with error logging.
 *
 * Automatically catches errors, logs them with method name and arguments,
 * then rethrows the error so it can be handled by global error middleware.
 *
 * **Use this decorator for:**
 * - Class methods (repository methods, service methods, etc.)
 * - Runtime operations that should not terminate the process
 * - Operations where errors should be handled by middleware
 *
 * **When to use decorator vs HOF:**
 * - Use `@ErrorTraced` decorator for class methods
 * - Use `withErrorTraced` HOF for standalone functions or when you need
 *   dynamic error messages per call
 *
 * @param errorMessage - Optional custom error message for logging. If not provided,
 *                       defaults to "Error in method {methodName}"
 *
 * @example
 * ```typescript
 * class UserRepository {
 *   @ErrorTraced('Failed to find user by email')
 *   async findUserByEmail(email: string): Promise<User | null> {
 *     // Method implementation
 *   }
 * }
 * ```
 */
export const ErrorTraced = (errorMessage?: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const originalMethod = descriptor.value;

    if (typeof originalMethod !== 'function') {
      throw new Error(`@ErrorTraced can only be applied to methods, got ${typeof originalMethod}`);
    }

    descriptor.value = async function (...args: any[]): Promise<any> {
      try {
        // Call the original method with proper 'this'
        return await originalMethod.apply(this, args);
      } catch (error: unknown) {
        let argsString: string;

        // Handle circular references or non-serializable arguments gracefully
        try {
          argsString = JSON.stringify(args);
        } catch {
          argsString = '[Unable to serialize arguments]';
        }

        const fnName = propertyKey || 'anonymous';
        logger.error(error, `${errorMessage ?? `Error in method ${fnName}`} | args: ${argsString}`);

        // Rethrow for global error handling
        throw error;
      }
    };

    return descriptor;
  };
};
