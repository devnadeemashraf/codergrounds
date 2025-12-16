import { inject, injectable } from 'tsyringe';

import { CacheRepositoryInterface } from '@/core/interfaces/cache';
import { UserRepositoryInterface } from '@/core/interfaces/repositories';
import { ErrorTraced } from '@/shared/decorators';
import { UnauthorizedError } from '@/shared/errors';
import { CacheKeys } from '@/shared/utils/cache.utils';
import { ContainerTokens } from '@/shared/utils/container.utils';
import { verifyRefreshToken } from '@/shared/utils/jwt.utils';
import { rotateRefreshToken } from '@/shared/utils/tokenRotation.utils';

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject(ContainerTokens.userRepository)
    private readonly userRepository: UserRepositoryInterface,
    @inject(ContainerTokens.cacheRepository)
    private readonly cacheRepository: CacheRepositoryInterface,
  ) {}

  @ErrorTraced('Failed to refresh token')
  async execute(oldRefreshToken: string) {
    const decoded = verifyRefreshToken(oldRefreshToken);

    const isBlacklisted = await this.cacheRepository.get(
      CacheKeys.blacklistedRefreshToken(oldRefreshToken),
    );
    if (isBlacklisted) {
      throw new UnauthorizedError('Refresh token has been revoked');
    }

    const user = await this.userRepository.findById(decoded.userId);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    if (user.token_version !== decoded.tokenVersion) {
      throw new UnauthorizedError('Token has been invalidated. Please login again.');
    }

    const { accessToken, refreshToken } = await rotateRefreshToken(oldRefreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }
}
