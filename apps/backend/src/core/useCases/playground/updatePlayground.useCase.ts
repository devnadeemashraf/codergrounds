import { inject, injectable } from 'tsyringe';

import { UpdatePlaygroundInput } from '@codergrounds/shared';
import { Playground } from '@codergrounds/shared';

import { PlaygroundRepositoryInterface } from '@/core/interfaces/repositories';
import { ForbiddenError, NotFoundError } from '@/shared/errors';
import { ContainerTokens } from '@/shared/utils/container.utils';

@injectable()
export class UpdatePlaygroundUseCase {
  constructor(
    @inject(ContainerTokens.playgroundRepository)
    private playgroundRepository: PlaygroundRepositoryInterface,
  ) {}

  async execute(
    userId: string,
    playgroundId: string,
    input: UpdatePlaygroundInput,
  ): Promise<Playground> {
    const playground = await this.playgroundRepository.findById(playgroundId);
    if (!playground) {
      throw new NotFoundError('Playground not found');
    }

    if (playground.user_id !== userId) {
      throw new ForbiddenError('Not authorized to update this playground');
    }

    const updated = await this.playgroundRepository.update(playgroundId, input);
    if (!updated) throw new NotFoundError('Failed to update playground');

    return updated;
  }
}
