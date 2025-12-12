import { inject, injectable } from 'tsyringe';

import { LoginUserRequestBody } from '@codergrounds/shared';

import { UserRepositoryInterface } from '@/core/interfaces/repositories';
import { UserMapper } from '@/infrastructure/mappers';
import { ErrorTraced } from '@/shared/decorators';
import { ConflictError, UnauthorizedError } from '@/shared/errors';
import { compareHashWithPlainText } from '@/shared/utils/bcrypt.utils';
import { ContainerTokens } from '@/shared/utils/container.utils';
import { generateTokenPair } from '@/shared/utils/jwt.utils';

@injectable()
export class LoginUseCase {
  constructor(
    @inject(ContainerTokens.userRepository)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  @ErrorTraced('Failed to login user')
  async execute(input: LoginUserRequestBody) {
    const { identifier, password } = input;

    const existingUser = await this.userRepository.findUserByEmailOrUsername(
      identifier,
      identifier,
    );
    if (!existingUser) {
      throw new ConflictError('No User with provided email or username found');
    }

    const isPasswordValid = await compareHashWithPlainText(
      password,
      existingUser.password_hash as string,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid Credentials');
    }

    const { accessToken, refreshToken } = generateTokenPair({
      userId: existingUser.id,
      username: existingUser.username,
      userEmail: existingUser.email,
    });

    return {
      user: UserMapper.toPublic(existingUser),
      accessToken,
      refreshToken,
    };
  }
}
