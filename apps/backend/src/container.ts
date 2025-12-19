/**
 * Dependency Injection Container Setup
 *
 * This file registers all dependencies with tsyringe.
 * The container resolves dependencies automatically when classes are instantiated.
 *
 * Registration Order Matters:
 * 1. Register repositories (lowest level dependencies)
 * 2. Register use cases (depend on repositories)
 * 3. Register controllers (depend on use cases)
 */

// Required for tsyringe decorators
import 'reflect-metadata';

import { container } from 'tsyringe';

// Core Interfaces
import { CacheRepositoryInterface } from '@/core/interfaces/cache/cache.interface';
import {
  UserRepositoryInterface,
  UserOAuthProvidersRepositoryInterface,
  PlaygroundRepositoryInterface,
  FileRepositoryInterface,
  ExecutionRepositoryInterface,
} from '@/core/interfaces/repositories';

// Use Cases
import {
  LoginUseCase,
  OAuthLoginUseCase,
  RegisterUseCase,
  RefreshTokenUseCase,
  ChangePasswordUseCase,
} from '@/core/useCases/auth';

import {
  CreatePlaygroundUseCase,
  GetPlaygroundUseCase,
  ListPlaygroundsUseCase,
  UpdatePlaygroundUseCase,
  DeletePlaygroundUseCase,
} from '@/core/useCases/playground';

import { CreateFileUseCase, UpdateFileUseCase, DeleteFileUseCase } from '@/core/useCases/file';

import { ExecuteCodeUseCase } from '@/core/useCases/execution';

// Infrastructure Implementations
import { RedisRepository } from '@/infrastructure/cache/repositories/redis.repository';
import {
  UserRepository,
  UserOAuthProvidersRepository,
  PlaygroundRepository,
  FileRepository,
  ExecutionRepository,
} from '@/infrastructure/database/repositories';

// Controllers
import {
  AuthController,
  OAuthController,
  UserController,
  PlaygroundController,
  FileController,
  ExecutionController,
} from '@/infrastructure/http/controllers';

// Services
import { GoogleOAuthService, GithubOAuthService } from '@/infrastructure/services/oauth';

// Factories
import { OAuthFactory } from '@/infrastructure/services/oauth';

// Container Tokens
import { ContainerTokens } from '@/shared/utils/container.utils';

// ============================================
// REPOSITORY REGISTRATIONS
// ============================================

container.register<UserRepositoryInterface>(ContainerTokens.userRepository, {
  useClass: UserRepository,
});
container.register<UserOAuthProvidersRepositoryInterface>(
  ContainerTokens.userOAuthProvidersRepository,
  {
    useClass: UserOAuthProvidersRepository,
  },
);
container.register<PlaygroundRepositoryInterface>(ContainerTokens.playgroundRepository, {
  useClass: PlaygroundRepository,
});
container.register<FileRepositoryInterface>(ContainerTokens.fileRepository, {
  useClass: FileRepository,
});
container.register<ExecutionRepositoryInterface>(ContainerTokens.executionRepository, {
  useClass: ExecutionRepository,
});

container.register<CacheRepositoryInterface>(ContainerTokens.cacheRepository, {
  useClass: RedisRepository,
});

// ============================================
// USE CASE REGISTRATIONS
// ============================================

// Auth
container.registerSingleton<LoginUseCase>(ContainerTokens.loginUseCase, LoginUseCase);
container.registerSingleton<OAuthLoginUseCase>(
  ContainerTokens.oauthLoginUseCase,
  OAuthLoginUseCase,
);
container.registerSingleton<RegisterUseCase>(ContainerTokens.registerUseCase, RegisterUseCase);
container.registerSingleton<RefreshTokenUseCase>(
  ContainerTokens.refreshTokenUseCase,
  RefreshTokenUseCase,
);
container.registerSingleton<ChangePasswordUseCase>(
  ContainerTokens.changePasswordUseCase,
  ChangePasswordUseCase,
);

// Playground
container.registerSingleton<CreatePlaygroundUseCase>(
  ContainerTokens.createPlaygroundUseCase,
  CreatePlaygroundUseCase,
);
container.registerSingleton<GetPlaygroundUseCase>(
  ContainerTokens.getPlaygroundUseCase,
  GetPlaygroundUseCase,
);
container.registerSingleton<ListPlaygroundsUseCase>(
  ContainerTokens.listPlaygroundsUseCase,
  ListPlaygroundsUseCase,
);
container.registerSingleton<UpdatePlaygroundUseCase>(
  ContainerTokens.updatePlaygroundUseCase,
  UpdatePlaygroundUseCase,
);
container.registerSingleton<DeletePlaygroundUseCase>(
  ContainerTokens.deletePlaygroundUseCase,
  DeletePlaygroundUseCase,
);

// File
container.registerSingleton<CreateFileUseCase>(
  ContainerTokens.createFileUseCase,
  CreateFileUseCase,
);
container.registerSingleton<UpdateFileUseCase>(
  ContainerTokens.updateFileUseCase,
  UpdateFileUseCase,
);
container.registerSingleton<DeleteFileUseCase>(
  ContainerTokens.deleteFileUseCase,
  DeleteFileUseCase,
);

// Execution
container.registerSingleton<ExecuteCodeUseCase>(
  ContainerTokens.executeCodeUseCase,
  ExecuteCodeUseCase,
);

// ============================================
// CONTROLLER REGISTRATIONS
// ============================================

container.registerSingleton<AuthController>(ContainerTokens.authController, AuthController);
container.registerSingleton<OAuthController>(ContainerTokens.oauthController, OAuthController);
container.registerSingleton<UserController>(ContainerTokens.userController, UserController);
container.registerSingleton<PlaygroundController>(
  ContainerTokens.playgroundController,
  PlaygroundController,
);
container.registerSingleton<FileController>(ContainerTokens.fileController, FileController);
container.registerSingleton<ExecutionController>(
  ContainerTokens.executionController,
  ExecutionController,
);

// ============================================
// SERVICES REGISTRATIONS
// ============================================
container.registerSingleton<GoogleOAuthService>(
  ContainerTokens.googleOAuthService,
  GoogleOAuthService,
);
container.registerSingleton<GithubOAuthService>(
  ContainerTokens.githubOAuthService,
  GithubOAuthService,
);

// ============================================
// FACTORY REGISTRATIONS
// ============================================
container.registerSingleton<OAuthFactory>(ContainerTokens.oauthFactory, OAuthFactory);

// Export the container for use in routes.ts and other places
export { container };
