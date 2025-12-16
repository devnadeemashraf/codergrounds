import { z } from 'zod';

// Assuming UserOAuthProviders is an enum or union type.
// Ideally we check if the value is one of the valid providers.
const providerSchema = z.enum(['github', 'google']);

export const oAuthLoginParamsSchema = z.object({
  provider: providerSchema,
});

export const oAuthCallbackParamsSchema = z.object({
  provider: providerSchema,
});

export const oAuthCallbackQuerySchema = z.object({
  code: z.string().min(1, 'OAuth code is required'),
  state: z.string().min(1, 'OAuth state is required'),
});
