import { inject, injectable } from 'tsyringe';

import type { RegisterUserInput } from '@codergrounds/shared';

import { UserRepositoryInterface } from '@/core/interfaces/repositories';
import { UserMapper } from '@/infrastructure/mappers';
import { ErrorTraced } from '@/shared/decorators';
import { ConflictError } from '@/shared/errors';
import { hashPlainText } from '@/shared/utils/bcrypt.utils';
import { getDefaultImageUrl } from '@/shared/utils/common.utils';
import { ContainerTokens } from '@/shared/utils/container.utils';
import { generateTokenPairs } from '@/shared/utils/jwt.utils';

@injectable()
export class RegisterUseCase {
  constructor(
    @inject(ContainerTokens.userRepository)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  @ErrorTraced('Failed to register user')
  async execute(input: RegisterUserInput) {
    const { email, username, password } = input;

    const existingUser = await this.userRepository.findUserByEmailOrUsername(email, username);
    if (existingUser) {
      throw new ConflictError('A User with this username or email already exists');
    }

    const passwordHash = await hashPlainText(password);

    const user = await this.userRepository.create({
      email,
      username,
      password_hash: passwordHash,
      provider: 'email',
      token_version: 1,
      avatar_url: getDefaultImageUrl(username),
    });

    const { accessToken, refreshToken } = generateTokenPairs({
      userId: user.id,
      username: user.username,
      userEmail: user.email,
      tokenVersion: user.token_version,
    });

    return {
      user: UserMapper.toPublic(user),
      accessToken,
      refreshToken,
    };
  }
}
