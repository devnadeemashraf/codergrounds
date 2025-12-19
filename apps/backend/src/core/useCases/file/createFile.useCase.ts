import { inject, injectable } from 'tsyringe';

import { CreateFileInput } from '@codergrounds/shared';
import { File } from '@codergrounds/shared';

import { FileRepositoryInterface } from '@/core/interfaces/repositories';
import { PlaygroundRepositoryInterface } from '@/core/interfaces/repositories';
import { ForbiddenError, NotFoundError } from '@/shared/errors';
import { ContainerTokens } from '@/shared/utils/container.utils';

@injectable()
export class CreateFileUseCase {
  constructor(
    @inject(ContainerTokens.fileRepository)
    private fileRepository: FileRepositoryInterface,
    @inject(ContainerTokens.playgroundRepository)
    private playgroundRepository: PlaygroundRepositoryInterface,
  ) {}

  async execute(userId: string, playgroundId: string, input: CreateFileInput): Promise<File> {
    // Check playground exists
    const playground = await this.playgroundRepository.findById(playgroundId);
    if (!playground) {
      throw new NotFoundError('Playground not found');
    }

    // Check permission (simple owner check for now, can extend to RBAC later)
    if (playground.user_id !== userId) {
      // TODO: Check for collaborator permissions
      throw new ForbiddenError('You do not have permission to add files to this playground');
    }

    // Create file
    // Ideally we should handle ordering logic (max order + 1)
    const file = await this.fileRepository.create({
      playground_id: playgroundId,
      name: input.name,
      type: input.type,
      content: input.content || '',
      order: 0, // Placeholder
    });
    return file;
  }
}
