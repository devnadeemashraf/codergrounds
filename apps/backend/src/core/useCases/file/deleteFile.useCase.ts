import { inject, injectable } from 'tsyringe';

import { FileRepositoryInterface } from '@/core/interfaces/repositories';
import { PlaygroundRepositoryInterface } from '@/core/interfaces/repositories';
import { ForbiddenError, NotFoundError } from '@/shared/errors';
import { ContainerTokens } from '@/shared/utils/container.utils';

@injectable()
export class DeleteFileUseCase {
  constructor(
    @inject(ContainerTokens.fileRepository)
    private fileRepository: FileRepositoryInterface,
    @inject(ContainerTokens.playgroundRepository)
    private playgroundRepository: PlaygroundRepositoryInterface,
  ) {}

  async execute(userId: string, fileId: string): Promise<boolean> {
    const file = await this.fileRepository.findById(fileId);
    if (!file) throw new NotFoundError('File not found');

    const playground = await this.playgroundRepository.findById(file.playground_id);
    if (!playground || playground.user_id !== userId) {
      throw new ForbiddenError('Not authorized');
    }

    return await this.fileRepository.delete(fileId);
  }
}
