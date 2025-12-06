import bcrypt from 'bcrypt';

import { envConfig } from '@/config';

export const hashPlainText = async (plainText: string) => {
  return await bcrypt.hash(plainText, envConfig.BCRYPT_SALT_ROUNDS);
};
