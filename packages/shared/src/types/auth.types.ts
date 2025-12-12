import { z } from 'zod';

import { loginSchema, registerSchema } from '@/schemas/auth.schema';

export type RegisterUserRequestBody = z.infer<typeof registerSchema>;
export type LoginUserRequestBody = z.infer<typeof loginSchema>;
