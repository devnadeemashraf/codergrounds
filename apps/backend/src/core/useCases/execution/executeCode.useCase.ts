import { inject, injectable } from 'tsyringe';

import { ExecuteCodeInput } from '@codergrounds/shared';
import { Execution } from '@codergrounds/shared';
import { ExecutionStatus } from '@codergrounds/shared';

import { ExecutionRepositoryInterface } from '@/core/interfaces/repositories';
import { ContainerTokens } from '@/shared/utils/container.utils';

@injectable()
export class ExecuteCodeUseCase {
  constructor(
    @inject(ContainerTokens.executionRepository)
    private executionRepository: ExecutionRepositoryInterface,
  ) {}

  async execute(
    userId: string | null,
    playgroundId: string,
    input: ExecuteCodeInput,
  ): Promise<Execution> {
    // 1. Create execution record
    const execution = await this.executionRepository.create({
      playground_id: playgroundId,
      user_id: userId, // Can be null if public/anonymous execution invited
      language: input.language,
      code_snapshot: input.code,
      status: ExecutionStatus.Queued,
    });

    // 2. Add to Job Queue (TODO)
    // QueueService.addJob(...)

    return execution;
  }
}
