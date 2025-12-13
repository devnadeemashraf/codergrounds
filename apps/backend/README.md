# @codergrounds/backend

The backend API and WebSocket server for Codergrounds. Built with Express.js and TypeScript, following a **Simplified Layered Architecture** with Dependency Injection.

## 🏗️ Architecture

This project follows a **Simplified Layered Architecture** that balances structure with pragmatism. Unlike traditional MVC or over-engineered Clean Architecture, this approach provides clear boundaries while remaining maintainable and scalable.

### Architecture Overview

The architecture is organized into three main layers:

1. **`core/`** - Framework-agnostic business logic (use cases, interfaces)
2. **`infrastructure/`** - Framework-specific implementations (Express, database, cache)
3. **`shared/`** - Pure utilities (no business logic, no framework dependencies)

### Folder Structure

```
src/
├── core/                           # Framework-agnostic business logic
│   ├── interfaces/                 # Contracts (interfaces for dependencies)
│   │   ├── repositories/           # Repository interfaces
│   │   ├── services/               # Service interfaces (if needed)
│   │   └── cache/                  # Cache interfaces
│   └── useCases/                   # Business logic (one use case per action)
│       ├── auth/                   # Authentication use cases
│       ├── user/                   # User management use cases
│       └── playground/             # Playground use cases
│
├── infrastructure/                  # Framework-specific implementations
│   ├── database/                   # Database connection & repositories
│   ├── cache/                      # Cache implementations (Redis)
│   ├── http/                       # Express-specific code
│   │   ├── controllers/            # Thin controllers (HTTP handling only)
│   │   ├── routes/                 # Route definitions
│   │   └── middlewares/            # Express middlewares
│   ├── mappers/                    # Data transformation (DB → Domain)
│   └── realtime/                   # WebSocket/Socket.io setup
│
├── shared/                          # Pure utilities
│   ├── types/                     # TypeScript types and interfaces
│   ├── errors/                     # Custom error classes
│   ├── utils/                      # Pure utility functions
│   ├── decorators/                 # TypeScript decorators
│   ├── hof/                        # Higher-order functions
│   └── logger.ts                   # Logger instance
│
├── config/                          # Configuration files
├── container.ts                     # Dependency injection setup
├── app.ts                           # Express app setup
├── routes.ts                        # Route aggregator
└── server.ts                        # Server entry point
```

### Key Principles

1. **Separation of Concerns**: Each layer has a clear responsibility
2. **Dependency Inversion**: Core depends on abstractions (interfaces), not implementations
3. **Framework Independence**: Core layer can be tested without Express or database
4. **Single Responsibility**: One use case = one business action
5. **DRY**: No duplicate implementations

### Dependency Flow

```
server.ts → app.ts → routes.ts
    ↓
infrastructure/http/ (routes → controllers → useCases)
    ↓
core/useCases/ (business logic, uses interfaces)
    ↓
infrastructure/database/repositories/ (implements interfaces)
```

**Dependency Rules:**

- `core/` → Can import `shared/` ✅
- `infrastructure/` → Can import `core/` and `shared/` ✅
- `shared/` → Can only import from `shared/` or external packages ✅
- **NEVER** create circular dependencies

## 🔌 Dependency Injection

This project uses **tsyringe** for Dependency Injection, providing:

- **Testability**: Easy to mock dependencies
- **Flexibility**: Swap implementations without changing code
- **Maintainability**: Clear dependency relationships

### How It Works

1. **Interfaces** define contracts in `core/interfaces/`
2. **Implementations** live in `infrastructure/`
3. **Registration** happens in `container.ts`
4. **Resolution** uses tokens from `shared/utils/container.utils.ts`

### Example

```typescript
// 1. Define interface
interface UserRepositoryInterface {
  findById(id: string): Promise<User>;
}

// 2. Implement interface
class UserRepository implements UserRepositoryInterface { ... }

// 3. Register in container.ts
container.register<UserRepositoryInterface>(
  ContainerTokens.userRepository,
  { useClass: UserRepository }
);

// 4. Use in use case
@injectable()
class LoginUseCase {
  constructor(
    @inject(ContainerTokens.userRepository)
    private userRepo: UserRepositoryInterface
  ) {}
}
```

## ⚡ Key Technologies

- **Express.js**: REST API framework
- **Socket.io**: Real-time collaboration and chat
- **Zod**: Runtime validation (schemas shared with frontend)
- **PostgreSQL**: Primary data store
- **Redis**: Session store, caching, and BullMQ job queues
- **tsyringe**: Dependency Injection container
- **TypeScript**: Type-safe development

## 📜 Scripts

- `pnpm dev`: Start development server with watch mode
- `pnpm build`: Compile TypeScript to `dist/`
- `pnpm test`: Run unit and integration tests via Vitest
- `pnpm lint`: Lint code with ESLint
- `pnpm migrate:create <name>`: Create a new migration file (e.g., `pnpm migrate:create add-user-avatar`)
- `pnpm migrate:up`: Run database migrations
- `pnpm migrate:down`: Rollback database migrations
- `pnpm seed`: Seed database with development data

## 🎨 MVP Database Design

Here's the MVP Database Design of the application that is built with the mindset of 'having the essentials right now but making sure flexible enough to build on top of later'.

```sql
-- 1. USERS (With Soft Delete)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    avatar_url VARCHAR(255),

    -- Auth & Security
    provider VARCHAR(20) NOT NULL DEFAULT 'email',
    provider_id VARCHAR(255),
    token_version INTEGER DEFAULT 1,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE -- Soft Delete
);

-- 2. PLAYGROUNDS (With Access Code & Soft Delete)
CREATE TABLE playgrounds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id), -- No Cascade (Soft Delete logic handled in app)

    name VARCHAR(100) NOT NULL,
    description TEXT,
    visibility VARCHAR(20) DEFAULT 'private',

    -- Access Code for private rooms (e.g., '938-212-999')
    access_code VARCHAR(20),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE -- Soft Delete
);

-- 3. FILES (With Order & Soft Delete)
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    playground_id UUID NOT NULL REFERENCES playgrounds(id),

    name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL DEFAULT '',
    type VARCHAR(50) NOT NULL,

    -- Tab ordering (0, 1, 2...)
    "order" INTEGER DEFAULT 0,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,

    UNIQUE(playground_id, name, deleted_at) -- Unique name (unless deleted)
);

-- 4. PLAYGROUND_USERS (Permissions Persistence)
-- Stores "Who is allowed here", not "Who is online"
CREATE TABLE playground_users (
    playground_id UUID REFERENCES playgrounds(id),
    user_id UUID REFERENCES users(id),

    role VARCHAR(20) NOT NULL DEFAULT 'viewer',

    -- Useful for "Resume working" features
    last_viewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (playground_id, user_id)
);
CREATE INDEX idx_playground_users_user_id ON playground_users(user_id);

-- 5. MESSAGES
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    playground_id UUID NOT NULL REFERENCES playgrounds(id),
    user_id UUID NOT NULL REFERENCES users(id),

    content TEXT NOT NULL,
    type VARCHAR(20) DEFAULT 'text',

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE -- "Delete Message" feature
);
CREATE INDEX idx_messages_playground_created ON messages(playground_id, created_at DESC);

-- 6. EXECUTIONS (History)
CREATE TABLE executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    playground_id UUID NOT NULL REFERENCES playgrounds(id),
    user_id UUID REFERENCES users(id), -- Nullable if we allow guest runs? No, strict auth.

    -- Snapshot of what ran
    code_snapshot TEXT,
    language VARCHAR(50) NOT NULL,

    -- Result
    output TEXT,
    status VARCHAR(20), -- 'success', 'error', 'timeout'
    execution_time_ms INTEGER,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Index for "My recent runs in this playground"
CREATE INDEX idx_executions_playground_created ON executions(playground_id, created_at DESC);
```

## 🚀 Getting Started

1. **Install dependencies**: `pnpm install`
2. **Set up environment variables**: Copy `.env.example` to `.env` and configure
3. **Run migrations**: `pnpm migrate:up`
4. **Seed database** (optional): `pnpm seed`
5. **Start development server**: `pnpm dev`

## 📝 API Versioning

All API routes are versioned under `/api/v1/`:

- `/api/v1/auth/*` - Authentication endpoints
- `/api/v1/users/*` - User management endpoints
- `/api/v1/playgrounds/*` - Playground endpoints (when implemented)
- `/healthz` - Health check (no versioning)
