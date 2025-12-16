export const CacheKeys = {
  // Blacklisting
  blacklistedRefreshToken: (token: string) => `blacklist:refreshToken:${token}`,
  blacklistedUser: (id: string) => `blacklist:user:${id}`,

  // OAuth State
  oauthState: (stateString: string) => `oauth:state:${stateString}`,
};
