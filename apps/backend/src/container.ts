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

import 'reflect-metadata'; // Required for tsyringe decorators

import { container } from 'tsyringe';

// Core Interfaces
import { CacheRepositoryInterface } from '@/core/interfaces/cache/cache.interface';
import { UserRepositoryInterface } from '@/core/interfaces/repositories/user.repository.interface';

// Use Cases
import { LoginUseCase } from '@/core/useCases/auth/login.useCase';
import { RegisterUseCase } from '@/core/useCases/auth/register.useCase';

// Infrastructure Implementations
import { RedisRepository } from '@/infrastructure/cache/repositories/redis.repository';
import { UserRepository } from '@/infrastructure/database/repositories/user.repository';

// Controllers
import { AuthController } from '@/infrastructure/http/controllers/auth.controller';
import { UserController } from '@/infrastructure/http/controllers/user.controller';

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
container.register<CacheRepositoryInterface>(ContainerTokens.cacheRepository, {
  useClass: RedisRepository,
});

// ============================================
// USE CASE REGISTRATIONS
// ============================================
// Use cases are registered as singletons (one instance per app lifecycle)
// They depend on repositories which are injected via constructor

container.registerSingleton<LoginUseCase>(ContainerTokens.loginUseCase, LoginUseCase);
container.registerSingleton<RegisterUseCase>(ContainerTokens.registerUseCase, RegisterUseCase);

// ============================================
// CONTROLLER REGISTRATIONS
// ============================================
// Controllers are registered as singletons
// They depend on use cases which are injected via constructor

container.registerSingleton<AuthController>(ContainerTokens.authController, AuthController);
container.registerSingleton<UserController>(ContainerTokens.userController, UserController);

// Export the container for use in routes.ts and other places
export { container };
