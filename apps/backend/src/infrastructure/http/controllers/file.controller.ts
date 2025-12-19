/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import { CreateFileInput } from '@codergrounds/shared';

import { CreateFileUseCase } from '@/core/useCases/file';
import { ContainerTokens } from '@/shared/utils/container.utils';
import { Created } from '@/shared/utils/response.utils';

@injectable()
export class FileController {
  constructor(
    @inject(ContainerTokens.createFileUseCase)
    private createFileUseCase: CreateFileUseCase,
  ) {}

  async create(req: Request, res: Response) {
    const userId = (req.user as any).id;
    const { playgroundId } = req.params;
    const input: CreateFileInput = req.body;

    const file = await this.createFileUseCase.execute(userId, playgroundId, input);
    return Created(res, { file }, 'File created successfully');
  }
}
