# ============================================
# Build artifacts are created OUTSIDE Docker, then copied in
# This avoids TypeScript + workspace resolution issues in Docker
# ============================================

FROM node:20-alpine AS runner
WORKDIR /app

# Install pnpm for running the app
RUN corepack enable && corepack prepare pnpm@10.23.0 --activate

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

ENV NODE_ENV=production

# Copy package files for production dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared/package.json ./packages/shared/

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy pre-built dist folders (built locally or in CI before Docker build)
COPY apps/backend/dist ./apps/backend/dist
COPY packages/shared/dist ./packages/shared/dist

USER expressjs
EXPOSE 4000

# Start the server
CMD ["node", "apps/backend/dist/src/server.js"]