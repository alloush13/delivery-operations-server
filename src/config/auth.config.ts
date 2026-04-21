export const authConfig = {
  jwtSecret: process.env.JWT_SECRET as string,
  accessTokenTTL: "15m",
  refreshTokenTTL: "7d",
  authHeader: "authorization",
  bearerPrefix: "Bearer",
};