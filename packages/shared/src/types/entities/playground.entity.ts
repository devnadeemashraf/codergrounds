import { PlaygroundVisibility } from '../enums';

import { BaseEntity } from './base';

export interface Playground extends BaseEntity {
  user_id: string;
  name: string;
  description: string;
  visibility: PlaygroundVisibility;
  access_code: string | null;
}

export type PlaygroundSeed = Omit<Playground, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;
