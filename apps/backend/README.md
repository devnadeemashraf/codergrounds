# @codergrounds/backend

The backend API and WebSocket server for Codergrounds. Built with Express.js and TypeScript, following a modular **Feature-First** architecture.

## 🏗️ Architecture

Unlike traditional MVC (Controllers/Models/Services), this project groups code by **Feature Modules**:

```
src/
├── modules/
│   ├── auth/           # Auth Controller, Service, Routes, Schemas
│   ├── playgrounds/    # Playground logic
│   └── users/          # User logic
├── shared/             # Shared middleware, utils, database connections
├── app.ts              # App setup
└── server.ts           # Server entry point
```

## ⚡ Key Technologies

- **Express.js**: REST API framework.
- **Socket.io**: Real-time collaboration and chat.
- **Zod**: Runtime validation (schemas shared with frontend).
- **PostgreSQL**: Primary data store.
- **Redis**: Session store, caching, and BullMQ job queues.

## 📜 Scripts

- `pnpm dev`: Start development server with watch mode.
- `pnpm build`: Compile TypeScript to `dist/`.
- `pnpm test`: Run unit and integration tests via Vitest.
- `pnpm lint`: Lint code with ESLint.

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
-- New addition!
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
