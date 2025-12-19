import { z } from 'zod';

import { PlaygroundRole, PlaygroundVisibility } from '../types/enums';

export const createPlaygroundSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name matches the character limit of 100'),
  description: z.string().max(500, 'Description too long').optional(),
  visibility: z.nativeEnum(PlaygroundVisibility).default(PlaygroundVisibility.Public),
  accessCode: z.string(),
});

export type CreatePlaygroundInput = z.infer<typeof createPlaygroundSchema>;

export const updatePlaygroundSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name matches the character limit of 100')
    .optional(),
  description: z.string().max(500, 'Description too long').optional(),
  visibility: z.nativeEnum(PlaygroundVisibility).optional(),
});

export type UpdatePlaygroundInput = z.infer<typeof updatePlaygroundSchema>;

export const addPlaygroundMemberSchema = z.object({
  usernameOrEmail: z.string().min(1),
  role: z.nativeEnum(PlaygroundRole).default(PlaygroundRole.Viewer),
});

export type AddPlaygroundMemberInput = z.infer<typeof addPlaygroundMemberSchema>;

export const updatePlaygroundMemberRoleSchema = z.object({
  role: z.nativeEnum(PlaygroundRole),
});

export type UpdatePlaygroundMemberRoleInput = z.infer<typeof updatePlaygroundMemberRoleSchema>;
