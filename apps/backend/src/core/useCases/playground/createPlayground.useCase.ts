import { inject, injectable } from 'tsyringe';

import { CreatePlaygroundInput } from '@codergrounds/shared';
import { Playground } from '@codergrounds/shared';

import { PlaygroundRepositoryInterface } from '@/core/interfaces/repositories';
import { ContainerTokens } from '@/shared/utils/container.utils';

@injectable()
export class CreatePlaygroundUseCase {
  constructor(
    @inject(ContainerTokens.playgroundRepository)
    private playgroundRepository: PlaygroundRepositoryInterface,
  ) {}

  async execute(userId: string, input: CreatePlaygroundInput): Promise<Playground> {
    const playground = await this.playgroundRepository.create({
      user_id: userId,
      name: input.name,
      description: input.description,
      visibility: input.visibility,
    });
    return playground;
  }
}
