# @codergrounds/shared

The common library for Codergrounds. This package contains code that is shared between the Backend, Frontend, and Worker to ensure **End-to-End Type Safety**.

## 📦 Contents

- **Zod Schemas**: Validation schemas used for both API request validation (Backend) and Form validation (Frontend).
- **TypeScript Interfaces**: Shared types for API responses, WebSocket events, and database entities.
- **Constants**: Global configuration values, error codes, and defaults.

## 🚀 Usage

This package is linked via **pnpm workspaces**.

```typescript
// Import in Backend or Frontend
import { LoginSchema } from '@codergrounds/shared';
import type { User } from '@codergrounds/shared';
```

## 📜 Scripts

- `pnpm build`: Compile TypeScript.
- `pnpm test`: Run tests.
- `pnpm lint`: Lint code.
