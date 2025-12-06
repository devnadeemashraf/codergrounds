import { z } from 'zod';

export const validateOrThrow = <T>(schema: z.ZodType<T>, data: unknown): T => {
  const validationResult = schema.safeParse(data);

  if (!validationResult.success) {
    // Format this errot to be clean
    const formattedError = z.treeifyError(validationResult.error);
    throw new Error(`Validation Error: ${JSON.stringify(formattedError)}`);
  }

  return validationResult.data;
};

export const validateSafe = <T>(schema: z.ZodType<T>, data: unknown): z.ZodSafeParseResult<T> => {
  return schema.safeParse(data);
};
