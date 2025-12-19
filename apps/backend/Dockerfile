# STAGE 1: Prune
FROM node:20-alpine AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install turbo --global
COPY . .
# Generates a sparse subset of the monorepo
RUN turbo prune --scope=@codergrounds/backend --docker

# STAGE 2: Builder
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.23.0 --activate

# 1. Copy pruned lockfile and package.jsons
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# 2. Install dependencies
RUN pnpm install --frozen-lockfile

# 3. Copy the rest of the source (This includes the pruned files)
COPY --from=pruner /app/out/full/ .

# 4. MANUALLY COPY the root tsconfig if Turbo missed it
# This acts as a safety net for the "Cannot read file '/app/tsconfig.json'" error
COPY --from=pruner /app/tsconfig.json ./tsconfig.json

# 5. Build
# Ensure we use the full filter to build dependencies like @codergrounds/shared
RUN pnpm turbo run build --filter=@codergrounds/backend...

# STAGE 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

ENV NODE_ENV=production

# 1. Copy the production node_modules
COPY --from=builder /app/node_modules ./node_modules

# 2. Copy the backend DIST and package.json
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json

# 3. CRITICAL: Copy the shared package DIST and package.json
# Node needs these because the symlink in node_modules points here
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/package.json

USER expressjs
EXPOSE 4000

# Start from the backend dist
# Note: TypeScript outputs to dist/src/ because rootDir is "." and source is in src/
CMD ["node", "apps/backend/dist/src/server.js"]