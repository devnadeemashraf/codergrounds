/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import { CreatePlaygroundInput } from '@codergrounds/shared';

import { CreatePlaygroundUseCase, ListPlaygroundsUseCase } from '@/core/useCases/playground';
import { ContainerTokens } from '@/shared/utils/container.utils';
import { Created, OK } from '@/shared/utils/response.utils';

@injectable()
export class PlaygroundController {
  constructor(
    @inject(ContainerTokens.createPlaygroundUseCase)
    private createPlaygroundUseCase: CreatePlaygroundUseCase,
    @inject(ContainerTokens.listPlaygroundsUseCase)
    private listPlaygroundsUseCase: ListPlaygroundsUseCase,
  ) {}

  async create(req: Request, res: Response) {
    // User ID attached by auth middleware
    const userId = (req.user as any).id;
    const input: CreatePlaygroundInput = req.body;

    const playground = await this.createPlaygroundUseCase.execute(userId, input);
    return Created(res, { playground }, 'Playground created successfully');
  }

  async list(req: Request, res: Response) {
    const userId = (req.user as any).id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await this.listPlaygroundsUseCase.execute(userId, page, limit);
    return OK(res, result);
  }
}
