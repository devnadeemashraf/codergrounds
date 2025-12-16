import { BaseEntity } from './base';
import { UserOAuthProviders } from './user.entity';

export interface UserOAuthProvider extends BaseEntity {
  user_id: string;
  provider: UserOAuthProviders;
  provider_user_id: string;
  provider_email: string | null;
}
