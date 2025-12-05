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
