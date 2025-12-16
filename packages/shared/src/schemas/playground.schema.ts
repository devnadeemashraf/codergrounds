import { z } from 'zod';

export const createPlaygroundSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title matches the character limit of 100'),
  description: z.string().max(500, 'Description too long').optional(),
  visibility: z.enum(['public', 'private']).default('public'),
  // Add more fields as needed, e.g., initial template or language
});

export type CreatePlaygroundInput = z.infer<typeof createPlaygroundSchema>;

export const updatePlaygroundSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title matches the character limit of 100')
    .optional(),
  description: z.string().max(500, 'Description too long').optional(),
  visibility: z.enum(['public', 'private']).optional(),
});

export type UpdatePlaygroundInput = z.infer<typeof updatePlaygroundSchema>;
