/**
 * Dependency Injection Container Tokens
 *
 * These tokens are used to register and resolve dependencies in the DI container.
 * Using string tokens allows us to inject interfaces (which can't be used as class constructors).
 */
export const ContainerTokens = {
  // Repositories
  userRepository: 'UserRepository',
  playgroundRepository: 'PlaygroundRepository',
  cacheRepository: 'CacheRepository',

  // Use Cases - Auth
  loginUseCase: 'LoginUseCase',
  registerUseCase: 'RegisterUseCase',
  refreshTokenUseCase: 'RefreshTokenUseCase',

  // Use Cases - User
  getUserUseCase: 'GetUserUseCase',
  updateUserUseCase: 'UpdateUserUseCase',
  deleteUserUseCase: 'DeleteUserUseCase',

  // Use Cases - Playground
  createPlaygroundUseCase: 'CreatePlaygroundUseCase',
  getPlaygroundUseCase: 'GetPlaygroundUseCase',
  updatePlaygroundUseCase: 'UpdatePlaygroundUseCase',
  deletePlaygroundUseCase: 'DeletePlaygroundUseCase',

  // Controllers
  authController: 'AuthController',
  userController: 'UserController',
  playgroundController: 'PlaygroundController',
} as const;
