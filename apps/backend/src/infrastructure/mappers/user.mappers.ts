import { User } from '@codergrounds/shared';

export const UserMapper = {
  toPublic: (user: User) => ({
    id: user.id,
    email: user.email,
    username: user.username,
    avatarUrl: user.avatar_url,
    createdAt: user.created_at,
  }),
};
