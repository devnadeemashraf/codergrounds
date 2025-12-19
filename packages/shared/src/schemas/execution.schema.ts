import { z } from 'zod';

import { CodeLanguage } from '../types/enums';

export const executeCodeSchema = z.object({
  language: z.enum(CodeLanguage),
  code: z.string(),
});

export type ExecuteCodeInput = z.infer<typeof executeCodeSchema>;
