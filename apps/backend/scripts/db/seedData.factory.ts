import { UserSeed } from '@codergrounds/shared';

import { hashPlainText } from '@/shared/utils/bcrypt.utils';

export const createUserSeedData = async (): Promise<UserSeed[]> => {
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
      provider: 'email',
      provider_id: null,
      token_version: 1,
    },
    {
      email: 'bob.martinez@example.com',
      username: 'bob_dev',
      password_hash: passwordHash2,
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob_dev',
      provider: 'email',
      provider_id: null,
      token_version: 1,
    },
    {
      email: 'sarah.johnson@example.com',
      username: 'sarah_j',
      password_hash: passwordHash3,
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah_j',
      provider: 'email',
      provider_id: null,
      token_version: 1,
    },
    // GitHub OAuth users
    {
      email: 'mike.rodriguez@example.com',
      username: 'mike_rodriguez',
      password_hash: null, // OAuth users don't have passwords
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike_rodriguez',
      provider: 'github',
      provider_id: '12345678', // GitHub user ID
      token_version: 1,
    },
    {
      email: 'emma.wilson@example.com',
      username: 'emma_wilson',
      password_hash: null,
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma_wilson',
      provider: 'github',
      provider_id: '87654321',
      token_version: 1,
    },
    // Google OAuth users
    {
      email: 'david.kim@example.com',
      username: 'david_kim',
      password_hash: null,
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david_kim',
      provider: 'google',
      provider_id: '987654321',
      token_version: 1,
    },
    {
      email: 'lisa.anderson@example.com',
      username: 'lisa_a',
      password_hash: null,
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa_a', // Some OAuth users might not set avatars
      provider: 'google',
      provider_id: '112233445',
      token_version: 1,
    },
  ];
};
