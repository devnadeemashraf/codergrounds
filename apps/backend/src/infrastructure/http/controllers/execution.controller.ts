/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import { ExecuteCodeInput } from '@codergrounds/shared';

import { ExecuteCodeUseCase } from '@/core/useCases/execution';
import { ContainerTokens } from '@/shared/utils/container.utils';
import { Created } from '@/shared/utils/response.utils';

@injectable()
export class ExecutionController {
  constructor(
    @inject(ContainerTokens.executeCodeUseCase)
    private executeCodeUseCase: ExecuteCodeUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const userId = (req.user as any)?.id || null; // Optional if public run
    const { playgroundId } = req.params;
    const input: ExecuteCodeInput = req.body;

    const execution = await this.executeCodeUseCase.execute(userId, playgroundId, input);
    return Created(res, { execution }, 'Execution started');
  }
}
