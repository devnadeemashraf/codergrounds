import { UserProvider, UserSeed } from '@codergrounds/shared';

import { hashPlainText } from '@/shared/utils/bcrypt.utils';

export interface SeedUserWithOAuth extends UserSeed {
  oauth?: {
    provider_user_id: string;
    provider_email: string; // usually same as email but good to be explicit
  };
}

export const createUserSeedData = async (): Promise<SeedUserWithOAuth[]> => {
  // Hash passwords for email users in parallel for better performance
  const [passwordHash1, passwordHash2, passwordHash3] = await Promise.all([
    hashPlainText('password123'),
    hashPlainText('dev2024!'),
    hashPlainText('securePass'),
  ]);

  return [
    // Email-based users
    {
      email: 'alice.chen@example.com',
      username: 'alice_chen',
      password_hash: passwordHash1,
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice_chen',
      provider: UserProvider.Email,
      token_version: 1,
    },
    {
      email: 'bob.martinez@example.com',
      username: 'bob_dev',
      password_hash: passwordHash2,
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob_dev',
      provider: UserProvider.Email,
      token_version: 1,
    },
    {
      email: 'sarah.johnson@example.com',
      username: 'sarah_j',
      password_hash: passwordHash3,
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah_j',
      provider: UserProvider.Email,
      token_version: 1,
    },
    // GitHub OAuth users
    {
      email: 'mike.rodriguez@example.com',
      username: 'mike_rodriguez',
      password_hash: null, // OAuth users don't have passwords
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike_rodriguez',
      provider: UserProvider.GitHub,
      token_version: 1,
      oauth: {
        provider_user_id: 'gh_12345678',
        provider_email: 'mike.rodriguez@example.com',
      },
    },
    {
      email: 'emma.wilson@example.com',
      username: 'emma_wilson',
      password_hash: null,
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma_wilson',
      provider: UserProvider.GitHub,
      token_version: 1,
      oauth: {
        provider_user_id: 'gh_87654321',
        provider_email: 'emma.wilson@example.com',
      },
    },
    // Google OAuth users
    {
      email: 'david.kim@example.com',
      username: 'david_kim',
      password_hash: null,
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david_kim',
      provider: UserProvider.Google,
      token_version: 1,
      oauth: {
        provider_user_id: 'google_11223344',
        provider_email: 'david.kim@example.com',
      },
    },
    {
      email: 'lisa.anderson@example.com',
      username: 'lisa_a',
      password_hash: null,
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa_a', // Some OAuth users might not set avatars
      provider: UserProvider.Google,
      token_version: 1,
      oauth: {
        provider_user_id: 'google_44332211',
        provider_email: 'lisa.anderson@example.com',
      },
    },
  ];
};
