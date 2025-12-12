import { BaseEntity } from './base';

export interface Playground extends BaseEntity {
  name: string;
}

// Seed Data Type (what you INSEERT, not what you SELECT)
export type PlaygroundSeed = Omit<Playground, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;
