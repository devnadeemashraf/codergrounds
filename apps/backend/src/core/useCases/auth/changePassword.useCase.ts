import { inject, injectable } from 'tsyringe';

import { UserRepositoryInterface } from '@/core/interfaces/repositories';
import { UserMapper } from '@/infrastructure/mappers';
import { ErrorTraced } from '@/shared/decorators';
import { BadRequestError, UnauthorizedError } from '@/shared/errors';
import { hashPlainText } from '@/shared/utils/bcrypt.utils';
import { ContainerTokens } from '@/shared/utils/container.utils';

@injectable()
export class ChangePasswordUseCase {
  constructor(
    @inject(ContainerTokens.userRepository)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  @ErrorTraced('Failed to change password')
  async execute(id: string, password: string, passwordConfirmation: string) {
    if (password !== passwordConfirmation) {
      throw new BadRequestError('Passwords do not match');
    }

    const passwordHash = await hashPlainText(password);

    const user = await this.userRepository.update(id, {
      password_hash: passwordHash,
    });
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    return {
      user: UserMapper.toPublic(user),
    };
  }
}
