import { inject, injectable } from 'tsyringe';

import { Playground } from '@codergrounds/shared';

import { PlaygroundRepositoryInterface } from '@/core/interfaces/repositories';
import { ContainerTokens } from '@/shared/utils/container.utils';

@injectable()
export class ListPlaygroundsUseCase {
  constructor(
    @inject(ContainerTokens.playgroundRepository)
    private playgroundRepository: PlaygroundRepositoryInterface,
  ) {}

  async execute(
    userId: string,
    page: number = 1,
    limit: number = 20,
  ): Promise<{ playgrounds: Playground[]; total: number }> {
    const offset = (page - 1) * limit;
    const [playgrounds, total] = await Promise.all([
      this.playgroundRepository.findByUserId(userId, { limit, offset }),
      this.playgroundRepository.countByUserId(userId),
    ]);

    return { playgrounds, total };
  }
}
