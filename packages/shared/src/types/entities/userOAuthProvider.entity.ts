import { UserProvider } from '../enums';

import { BaseEntity } from './base';

export interface UserOAuthProvider extends BaseEntity {
  user_id: string;
  provider: UserProvider;
  provider_user_id: string;
  provider_email: string | null;
}
