import { inject, injectable } from 'tsyringe';

import { PlaygroundRepositoryInterface } from '@/core/interfaces/repositories';
import { ForbiddenError, NotFoundError } from '@/shared/errors';
import { ContainerTokens } from '@/shared/utils/container.utils';

@injectable()
export class DeletePlaygroundUseCase {
  constructor(
    @inject(ContainerTokens.playgroundRepository)
    private playgroundRepository: PlaygroundRepositoryInterface,
  ) {}

  async execute(userId: string, playgroundId: string): Promise<boolean> {
    const playground = await this.playgroundRepository.findById(playgroundId);
    if (!playground) {
      throw new NotFoundError('Playground not found');
    }

    if (playground.user_id !== userId) {
      throw new ForbiddenError('Not authorized to delete this playground');
    }

    return await this.playgroundRepository.delete(playgroundId);
  }
}
