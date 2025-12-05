# @codergrounds/frontend

The client-side application for Codergrounds. Built with React, Vite, and TypeScript.

## 🏗️ Architecture

This app uses a **Feature-First** folder structure. Everything related to a specific domain (components, hooks, state, API) stays together.

```
src/
├── features/
│   ├── auth/           # Login/Register forms, auth hooks
│   ├── editor/         # Monaco Editor wrapper, collaboration logic
│   └── chat/           # Chat UI and socket logic
├── components/         # Shared UI components (Button, Input, etc.)
├── hooks/              # Global hooks
├── pages/              # Route entry points
└── layouts/            # Page layouts
```

## ⚡ Key Technologies

- **Vite**: Fast build tool and dev server.
- **React**: UI library.
- **Monaco Editor**: The code editor engine (same as VS Code).
- **Redux Toolkit (RTK)**: Global client state.
- **TanStack Query (React Query)**: Async server state management.
- **Socket.io-client**: Real-time communication.

## 📜 Scripts

- `pnpm dev`: Start Vite dev server.
- `pnpm build`: Build for production.
- `pnpm preview`: Preview production build.
- `pnpm test`: Run tests via Vitest.
- `pnpm lint`: Lint code with ESLint.
