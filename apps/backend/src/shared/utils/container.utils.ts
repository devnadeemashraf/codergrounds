/**
 * Dependency Injection Container Tokens
 *
 * These tokens are used to register and resolve dependencies in the DI container.
 * Using string tokens allows us to inject interfaces (which can't be used as class constructors).
 */
export const ContainerTokens = {
  // Repositories
  userRepository: 'UserRepository',
  userOAuthProvidersRepository: 'UserOAuthProvidersRepository',
  playgroundRepository: 'PlaygroundRepository',
  cacheRepository: 'CacheRepository',

  // Use Cases - Auth
  loginUseCase: 'LoginUseCase',
  oauthLoginUseCase: 'OAuthLoginUseCase',
  registerUseCase: 'RegisterUseCase',
  refreshTokenUseCase: 'RefreshTokenUseCase',
  changePasswordUseCase: 'ChangePasswordUseCase',

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
  oauthController: 'OAuthController',
  userController: 'UserController',
  playgroundController: 'PlaygroundController',

  // Servies
  googleOAuthService: 'GoogleOAuthService',
  githubOAuthService: 'GithubOAuthService',

  // External Services

  // Factories
  oauthFactory: 'OAuthFactory',
} as const;
