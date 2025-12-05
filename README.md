# Codergrounds

**Codergrounds** is a real-time collaborative coding playground designed for peer programming, study groups, and competitive practice. It features a fully interactive code editor, live collaboration, chat, and a self-hosted code execution pipeline.

## 🚀 Tech Stack

- **Monorepo:** [pnpm workspaces](https://pnpm.io/workspaces)
- **Frontend:** React, TypeScript, Vite, Monaco Editor, Redux Toolkit, React Query
- **Backend:** Express.js, TypeScript, Socket.io (WebSockets)
- **Database:** PostgreSQL (Data), Redis (Cache/PubSub/Queues)
- **Execution:** Self-hosted [Judge0](https://judge0.com/) instance
- **Infrastructure:** Docker, GitHub Actions, Nginx

## 📂 Project Structure

This project follows a **Feature-First** architecture within a Monorepo structure:

```
codergrounds/
├── apps/
│   ├── backend/    # Express API & WebSocket Server
│   ├── frontend/   # React Client Application
│   └── worker/     # Job Queue Worker for Code Execution
├── packages/
│   └── shared/     # Shared Zod Schemas, Types, and Constants
├── pnpm-workspace.yaml
└── package.json
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (v9+)
- Docker & Docker Compose (optional, for DB/Redis/Judge0)

### Installation

```bash
# 1. Install dependencies (recursive)
pnpm install

# 2. Setup Environment Variables
# (Copy .env.example to .env in apps/backend and apps/frontend - coming soon)
```

### Development

```bash
# Run all apps in development mode
pnpm dev

# Run specific workspace
pnpm --filter @codergrounds/backend dev
pnpm --filter @codergrounds/frontend dev
```

### Testing & Quality

```bash
# Run tests across all workspaces
pnpm test

# Run linting
pnpm lint

# Format code
pnpm exec prettier --write .
```

## 🤝 Contributing

1.  Ensure you follow the **Feature-First** folder structure.
2.  All shared types/schemas must reside in `packages/shared`.
3.  Run `pnpm test` and `pnpm lint` before committing.
4.  Commit messages should follow standard conventions.

## 📄 License

MIT
