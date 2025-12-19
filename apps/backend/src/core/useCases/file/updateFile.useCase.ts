import { inject, injectable } from 'tsyringe';

import { UpdateFileInput } from '@codergrounds/shared';
import { File } from '@codergrounds/shared';

import { FileRepositoryInterface } from '@/core/interfaces/repositories';
import { PlaygroundRepositoryInterface } from '@/core/interfaces/repositories';
import { ForbiddenError, NotFoundError } from '@/shared/errors';
import { ContainerTokens } from '@/shared/utils/container.utils';

@injectable()
export class UpdateFileUseCase {
  constructor(
    @inject(ContainerTokens.fileRepository)
    private fileRepository: FileRepositoryInterface,
    @inject(ContainerTokens.playgroundRepository)
    private playgroundRepository: PlaygroundRepositoryInterface,
  ) {}

  async execute(userId: string, fileId: string, input: UpdateFileInput): Promise<File> {
    const file = await this.fileRepository.findById(fileId);
    if (!file) throw new NotFoundError('File not found');

    const playground = await this.playgroundRepository.findById(file.playground_id);
    if (!playground || playground.user_id !== userId) {
      throw new ForbiddenError('Not authorized');
    }

    const updated = await this.fileRepository.update(fileId, input);
    if (!updated) throw new NotFoundError('Failed to update file');
    return updated;
  }
}
