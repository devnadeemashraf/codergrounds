export const CacheKeys = {
  blacklistedRefreshToken: (token: string) => `blacklist:refreshToken:${token}`,
  blacklistedUser: (id: string) => `blacklist:user:${id}`,
};
