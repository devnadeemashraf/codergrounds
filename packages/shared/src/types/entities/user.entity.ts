import { UserProvider } from '../enums';

import { BaseEntity } from './base';

export interface User extends BaseEntity {
  email: string;
  username: string;
  password_hash: string | null;
  avatar_url: string | null;
  provider: UserProvider;
  token_version: number;
}

export interface UserOAuthProfile {
  providerUserId: string;
  email: string | null;
  username: string | null;
  avatarUrl: string | null;
  provider: UserProvider;
}

// Seed Data Type (what you INSEERT, not what you SELECT)
export type UserSeed = Omit<User, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;
