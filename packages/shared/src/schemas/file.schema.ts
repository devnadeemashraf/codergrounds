import { z } from 'zod';

import { FileType } from '../types/enums';

export const createFileSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(FileType),
  content: z.string().optional(),
});

export type CreateFileInput = z.infer<typeof createFileSchema>;

export const updateFileSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  content: z.string().optional(),
});

export type UpdateFileInput = z.infer<typeof updateFileSchema>;
