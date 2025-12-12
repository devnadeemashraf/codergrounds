import type { LoginUserRequestBody, RegisterUserRequestBody } from '@codergrounds/shared';

export interface AuthServiceInterface {
  login: (input: LoginUserRequestBody) => Promise<void>;
  register: (input: RegisterUserRequestBody) => Promise<void>;
}
