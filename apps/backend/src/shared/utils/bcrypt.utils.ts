import bcrypt from 'bcrypt';

import { envConfig } from '@/config';
import { withErrorTraced } from '@/shared/hofs';

export const hashPlainText = withErrorTraced(async (plainText: string) => {
  return await bcrypt.hash(plainText, envConfig.BCRYPT_SALT_ROUNDS);
}, 'Failed to hash plain text');

export const compareHashWithPlainText = withErrorTraced(
  async (plainText: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(plainText, hash);
  },
  'Failed to compare hash with plain text',
);
