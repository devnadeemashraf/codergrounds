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
} from '@/core/interfaces/repositories';

// Use Cases
import {
  LoginUseCase,
  OAuthLoginUseCase,
  RegisterUseCase,
  RefreshTokenUseCase,
  ChangePasswordUseCase,
} from '@/core/useCases/auth';

// Infrastructure Implementations
import { RedisRepository } from '@/infrastructure/cache/repositories/redis.repository';
import {
  UserRepository,
  UserOAuthProvidersRepository,
} from '@/infrastructure/database/repositories';

// Controllers
import { AuthController, OAuthController, UserController } from '@/infrastructure/http/controllers';

// Services
import { GoogleOAuthService, GithubOAuthService } from '@/infrastructure/services/oauth';

// Factories
import { OAuthFactory } from '@/infrastructure/services/oauth';

// Container Tokens
import { ContainerTokens } from '@/shared/utils/container.utils';

// ============================================
// REPOSITORY REGISTRATIONS
// ============================================
// Register interface → implementation mappings
// This allows us to inject interfaces (abstractions) instead of concrete classes

container.register<UserRepositoryInterface>(ContainerTokens.userRepository, {
  useClass: UserRepository,
});
container.register<UserOAuthProvidersRepositoryInterface>(
  ContainerTokens.userOAuthProvidersRepository,
  {
    useClass: UserOAuthProvidersRepository,
  },
);
container.register<CacheRepositoryInterface>(ContainerTokens.cacheRepository, {
  useClass: RedisRepository,
});

// ============================================
// USE CASE REGISTRATIONS
// ============================================
// Use cases are registered as singletons (one instance per app lifecycle)
// They depend on repositories which are injected via constructor

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

// ============================================
// CONTROLLER REGISTRATIONS
// ============================================
// Controllers are registered as singletons
// They depend on use cases which are injected via constructor

container.registerSingleton<AuthController>(ContainerTokens.authController, AuthController);
container.registerSingleton<OAuthController>(ContainerTokens.oauthController, OAuthController);
container.registerSingleton<UserController>(ContainerTokens.userController, UserController);

// ============================================
// SERVICES REGISTRATIONS
// ============================================
// Services are registered as singletons
// They depend on use cases which are injected via constructor
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
// Factories are registered as singletons
// They depend on use cases which are injected via constructor
container.registerSingleton<OAuthFactory>(ContainerTokens.oauthFactory, OAuthFactory);

// Export the container for use in routes.ts and other places
export { container };
