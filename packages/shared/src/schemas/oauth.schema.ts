import { z } from 'zod';

// Assuming UserOAuthProviders is an enum or union type.
// Ideally we check if the value is one of the valid providers.
const providerSchema = z.enum(['github', 'google']);

export const oAuthLoginParamsSchema = z.object({
  provider: providerSchema,
});

export type OAuthLoginParams = z.infer<typeof oAuthLoginParamsSchema>;

export const oAuthCallbackParamsSchema = z.object({
  provider: providerSchema,
});

export type OAuthCallbackParams = z.infer<typeof oAuthCallbackParamsSchema>;

export const oAuthCallbackQuerySchema = z.object({
  code: z.string().min(1, 'OAuth code is required'),
  state: z.string().min(1, 'OAuth state is required'),
});

export type OAuthCallbackQuery = z.infer<typeof oAuthCallbackQuerySchema>;
