import { inject, injectable } from 'tsyringe';

import { Playground } from '@codergrounds/shared';

import { PlaygroundRepositoryInterface } from '@/core/interfaces/repositories';
import { NotFoundError } from '@/shared/errors';
import { ContainerTokens } from '@/shared/utils/container.utils';

@injectable()
export class GetPlaygroundUseCase {
  constructor(
    @inject(ContainerTokens.playgroundRepository)
    private playgroundRepository: PlaygroundRepositoryInterface,
  ) {}

  async execute(playgroundId: string): Promise<Playground> {
    const playground = await this.playgroundRepository.findById(playgroundId);
    if (!playground) {
      throw new NotFoundError('Playground not found');
    }
    return playground;
  }
}
