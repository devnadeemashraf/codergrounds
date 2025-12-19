import { CodeLanguage, ExecutionStatus } from '../enums';

import { BaseEntity } from './base';

export interface Execution extends BaseEntity {
  playground_id: string;
  user_id: string | null;
  code_snapshot: string | null;
  language: CodeLanguage;
  output: string | null;
  status: ExecutionStatus;
  execution_time_ms: number | null;
}

export type ExecutionSeed = Omit<Execution, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;
