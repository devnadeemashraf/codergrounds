import { BaseEntity } from './base';

export type UserAuthProviders = 'email' | 'github' | 'google';

export interface User extends BaseEntity {
  email: string;
  username: string;
  password_hash: string | null;
  avatar_url: string | null;
  provider: UserAuthProviders;
  provider_id: string | null;
  token_version: number;
}

// Seed Data Type (what you INSEERT, not what you SELECT)
export type UserSeed = Omit<User, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;
