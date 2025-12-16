import { BaseEntity } from './base';

export type UserOAuthProviders = 'github' | 'google';
export type UserAuthProviders = 'email' | UserOAuthProviders;

export interface User extends BaseEntity {
  email: string;
  username: string;
  password_hash: string | null;
  avatar_url: string | null;
  provider: UserAuthProviders;
  token_version: number;
}

export interface UserOAuthProfile {
  providerUserId: string;
  email: string | null;
  username: string | null;
  avatarUrl: string | null;
  provider: UserOAuthProviders;
}

// Seed Data Type (what you INSEERT, not what you SELECT)
export type UserSeed = Omit<User, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;
