import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email('Invalid Email Format'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username too long'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Invalid User Identifier'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const refreshTokenCookieSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export const changePasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  passwordConfirmation: z.string().min(8, 'Password Confirmation must be at least 8 characters'),
});
