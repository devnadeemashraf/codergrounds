import { FileType } from '../enums';

import { BaseEntity } from './base';

export interface File extends BaseEntity {
  playground_id: string;
  name: string;
  content: string;
  type: FileType;
  order: number;
}

export type FileSeed = Omit<File, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;
