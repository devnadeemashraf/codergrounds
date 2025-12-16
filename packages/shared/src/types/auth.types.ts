import { z } from 'zod';

import { UserOAuthProviders } from './entities';

import { loginSchema, registerSchema } from '@/schemas/auth.schema';

export type RegisterUserInput = z.infer<typeof registerSchema>;
export type LoginUserInput = z.infer<typeof loginSchema>;

export interface OAuthTokenResponse {
  accessToken: string;
  tokenType: string;
  scope: string;
}

export interface OAuthStateData {
  provider: UserOAuthProviders;
  redirectAfterLogin: string;
  createdAt: string;
}
