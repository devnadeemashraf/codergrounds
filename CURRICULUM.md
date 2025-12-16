# CODERGROUNDS — CURRICULUM TRACKING SHEET

**Status Legend:**

- ⬜ Not Started
- 🔄 In Progress
- ✅ Completed
- ⏸️ Paused

---

**Architectural References & Standards:**

- **Backend Architecture:** Strictly follow [`localDocs/ARCHITECTURE.md`](../localDocs/ARCHITECTURE.md). Implement logic in `core/useCases` and implementation in `infrastructure/`.
- **Dependency Injection:** All services/repositories must be registered in `container.ts`. See [`localDocs/DI_SETUP_GUIDE.md`](../localDocs/DI_SETUP_GUIDE.md).
- **Shared Contracts:** All DTOs and Validation Schemas must reside in `packages/shared` to ensure end-to-end type safety.

---

## PHASE 1: FOUNDATION & MONOREPO SETUP

### Session 1.1: Monorepo Architecture

**Status:** ✅  
**Learning Goals:**

- Understand pnpm workspaces and why they matter
- Set up workspace structure (apps/, packages/)
- Configure root package.json and workspace dependencies
- Learn workspace dependency resolution patterns

**Deliverables:**

- [x] pnpm-workspace.yaml configured
- [x] Root package.json with workspace references
- [x] Basic workspace structure (apps/backend, apps/frontend, packages/shared)
- [x] Understanding of workspace dependency hoisting

---

### Session 1.2: Project Organization & Folder Structure

**Status:** ✅  
**Learning Goals:**

- Simplified Layered Architecture principles (see [`localDocs/ARCHITECTURE.md`](../localDocs/ARCHITECTURE.md))
- Folder structure conventions for backend and frontend
- Shared package organization
- Separation of concerns at the workspace level
- Dependency Injection setup (see [`localDocs/DI_SETUP_GUIDE.md`](../localDocs/DI_SETUP_GUIDE.md))

**Deliverables:**

- [x] Simplified Layered Architecture for backend (core/infrastructure/shared)
- [x] Feature-first folder structure for frontend
- [x] Shared package structure (schemas, types, constants)
- [x] Clear boundaries between apps and packages
- [x] Dependency Injection container setup with tsyringe

---

### Session 1.3: Development Tooling & Configuration

**Status:** ✅  
**Learning Goals:**

- TypeScript configuration across workspaces
- ESLint and Prettier setup
- Git hooks and commit conventions
- Editor configuration

**Deliverables:**

- [x] TypeScript configs (root + per workspace)
- [x] ESLint configuration with workspace awareness
- [x] Prettier configuration
- [x] Husky/lint-staged setup (optional but recommended)
- [x] .gitignore and .editorconfig

---

### Session 1.4: Testing Infrastructure

**Status:** ✅  
**Learning Goals:**

- Testing strategy and philosophy
- Vitest/Jest configuration for monorepo
- Test organization patterns
- Shared test utilities

**Deliverables:**

- [x] Testing framework configured (Vitest recommended)
- [x] Test structure conventions
- [x] Shared test utilities package (if needed)
- [x] Example unit test to validate setup

---

## PHASE 2: BACKEND FOUNDATION

### Session 2.1: Backend Skeleton & Lifecycle

**Status:** ✅  
**Learning Goals:**

- Express application structure
- Environment configuration (Zod + dotenv)
- Graceful shutdown patterns
- Health check endpoints
- Production-ready server setup

**Deliverables:**

- [x] Express app skeleton with TypeScript
- [x] Config validation module (Zod)
- [x] Middleware organization
- [x] Graceful shutdown manager (SIGTERM/SIGINT)
- [x] Health check endpoint
- [x] Development server script

---

### Session 2.2: Core Architecture & Patterns

**Status:** ✅  
**Learning Goals:**

- Standardized API responses (JSend/envelope pattern)
- Async error handling wrappers
- Centralized error handling middleware
- Structured logging implementation

**Deliverables:**

- [x] Standardized Response Helper
- [x] Async Handler Wrapper (Implemented for Type Safety)
- [x] Custom error classes hierarchy
- [x] Global Error handling middleware
- [x] Logger configured (Pino/Winston)

---

### Session 2.3: Database Connection & Pooling

**Status:** ✅  
**Learning Goals:**

- PostgreSQL connection patterns
- Connection pooling strategies
- Database client abstraction
- Migration runner setup (custom or simple tool)

**Deliverables:**

- [x] PostgreSQL connection module
- [x] Connection pooling configured
- [x] Migration system setup (node-pg-migrate + script)
- [x] Database client wrapper
- [x] Connection health checks

---

### Session 2.4: Redis Setup & Patterns

**Status:** ✅  
**Learning Goals:**

- Redis connection and client patterns
- Caching strategies
- Pub/sub basics (Deferred to Phase 6)
- Rate limiting foundation (Deferred to Phase 8)

**Deliverables:**

- [x] Redis client configured
- [x] Redis connection module
- [x] Basic caching utility
- [→] Pub/sub setup (Moved to Phase 6)
- [→] Rate limiting middleware foundation (Moved to Phase 8)

---

## PHASE 3: DATABASE SCHEMA & AUTHENTICATION

### Session 3.1: Database Schema & Seeding

**Status:** ✅  
**Learning Goals:**

- Schema design principles
- Indexing strategy
- Foreign key relationships
- Data seeding for development

**Deliverables:**

- [x] Users table schema
- [x] Playgrounds table schema
- [x] Playground Users table schema
- [x] Files table schema
- [x] Messages table schema
- [x] Executions table schema
- [x] Migration files created
- [x] Seed script for dev data

---

### Session 3.2: Repository Pattern & Transactions

**Status:** ✅  
**Learning Goals:**

- Repository pattern implementation
- Parameterized queries
- Transaction handling patterns
- Optimistic concurrency control

**Deliverables:**

- [x] Base repository pattern
- [x] User repository
- [x] Playground repository
- [x] Transaction helper utilities
- [→] Version column logic (concurrency) - Deferred (WebSocket real-time editing handles conflicts at application level)

---

### Session 3.3: Authentication System (JWT)

**Status:** ✅  
**Learning Goals:**

- JWT token generation and validation
- Refresh token rotation strategy (Security)
- Password hashing (bcrypt)
- Secure cookie handling

**Deliverables:**

- [x] JWT utility functions
- [x] Password hashing utilities
- [x] Refresh token rotation logic
- [x] Auth middleware
- [x] Login/Register endpoints

---

### Session 3.4: OAuth Integration

**Status:** ✅  
**Learning Goals:**

- OAuth 2.0 flow understanding
- Understanding Flexible OAuth Integration Setup Architecture
- OAuth provider integration (GitHub/Google)
- State management for OAuth
- User account linking

**Deliverables:**

- [x] OAuth provider configuration
- [x] OAuth callback handler
- [x] State validation
- [x] Account linking logic
- [x] OAuth login endpoint

---

## PHASE 4: BACKEND API & VALIDATION

### Session 4.1: Validation with Zod

**Status:** ✅  
**Learning Goals:**

- Zod schema design for runtime validation
- Sharing schemas between frontend and backend (`packages/shared`)
- Creating a generic Validation Middleware
- Type inference from Zod schemas

**Deliverables:**

- [x] Create `packages/shared/src/schemas/` structure
- [x] Implement `ValidateRequest` middleware in `infrastructure/http/middlewares/`
- [x] Create User schemas (`CreateUserSchema`, `LoginSchema`) in Shared package
- [x] Create Playground schemas (`CreatePlaygroundSchema`) in Shared package
- [x] Export inferred Types from schemas in Shared package
- [x] Integrate middleware into `routes.ts` or specific route files
- [x] Verify end-to-end type safety (Frontend imports)

---

### Session 4.2: API Structure & Controllers

**Status:** ✅  
**Learning Goals:**

- Implementing the "Controller → UseCase → Repository" flow
- Registering dependencies in `container.ts` (DI)
- Creating thin Controllers in `infrastructure/http/controllers`
- Structuring Routes in `infrastructure/http/routes`

**Deliverables:**

- [x] Create `PaginationUtils` in `shared/utils`
- [x] Refactor `registerRoutes` in `routes.ts` to support versioning (`/api/v1`)
- [x] Create `BaseController` (Optional - utilizing functional response helpers)
- [x] Ensure `infrastructure/http/controllers` only handles HTTP (Request/Response)
- [x] Ensure `core/useCases` contains all business logic

---

### Session 4.3: Playground Management API

**Status:** ⬜  
**Learning Goals:**

- Full CRUD implementation using Simplified Layered Architecture
- Dependency Injection for multiple layers

**Deliverables:**

- [ ] Define `PlaygroundRepositoryInterface` in `core/interfaces/repositories/`
- [ ] Implement `PlaygroundRepository` in `infrastructure/database/repositories/`
- [ ] Register `PlaygroundRepository` in `container.ts`
- [ ] Implement Use Cases in `core/useCases/playground/`:
  - [ ] `CreatePlaygroundUseCase`
  - [ ] `GetPlaygroundUseCase` (with validation)
  - [ ] `UpdatePlaygroundUseCase`
  - [ ] `DeletePlaygroundUseCase`
  - [ ] `ListPlaygroundsUseCase` (Pagination/Filtering)
- [ ] Create `PlaygroundController` in `infrastructure/http/controllers/`
- [ ] Define routes in `infrastructure/http/routes/playground.routes.ts`
- [ ] Add Unit Tests for Use Cases

---

### Session 4.4: Permissions & Authorization

**Status:** ⬜  
**Learning Goals:**

- Role-based access control (RBAC)
- Permission checking middleware
- Owner/editor/viewer roles strategy
- Use Case level authorization

**Deliverables:**

- [ ] Implement `PermissionMiddleware` in `infrastructure/http/middlewares/`
- [ ] Define `PlaygroundRole` enum in `packages/shared`
- [ ] Implement `CheckPermissionUseCase` (Logic for who can do what)
- [ ] Update `GetPlaygroundUseCase` to check permissions
- [ ] Protect Critical Endpoints (Delete/Update)
- [ ] Add integration tests for permission denial

---

### Session 4.5: External Storage Integration

**Status:** ⬜  
**Learning Goals:**

- Storage abstraction patterns (Strategy/Adapter)
- S3-compatible protocol (MinIO/AWS)
- Environment-based provider switching
- DI for Storage Service

**Deliverables:**

- [ ] Add MinIO service to `docker-compose.yml`
- [ ] Define `StorageServiceInterface` in `core/interfaces/services/`
- [ ] Implement `S3StorageService` in `infrastructure/externalServices/`
- [ ] Register Storage Service in `container.ts`
- [ ] Implement `UploadFileUseCase`
- [ ] Create `GeneratePresignedUrlUseCase` (if using presigned URLs)

---

### Session 4.6: Deterministic Avatar Generation

**Status:** ⬜  
**Learning Goals:**

- Deterministic visual identity from hash
- Buffer manipulation with `sharp`
- Integration of `GenerateAvatarUseCase`

**Deliverables:**

- [ ] Create `AvatarService` in `infrastructure/services/`
- [ ] Implement `GenerateAvatarUseCase` (Hash -> Pixel Art -> Buffer)
- [ ] Integrate with `StorageService` to save generated avatar
- [ ] Update `RegisterUseCase` to auto-generate avatar on signup
- [ ] Add `avatar_url` column to `users` table (Migration)
- [ ] Create `UpdateAvatarController` endpoint

---

## PHASE 5: FRONTEND FOUNDATION

### Session 5.1: Frontend Skeleton & Networking

**Status:** ⬜  
**Learning Goals:**

- React application structure
- Axios interceptors (Global error handling)
- Environment configuration
- Routing setup

**Deliverables:**

- [ ] React app skeleton
- [ ] Axios instance with Interceptors
- [ ] Environment variables setup
- [ ] Routing structure (React Router)

---

### Session 5.2: State Management & Layouts

**Status:** ⬜  
**Learning Goals:**

- Redux Toolkit (RTK) setup
- React Query setup
- Layout Pattern (AuthLayout, AppLayout)
- Toast notification system

**Deliverables:**

- [ ] RTK store configured
- [ ] React Query client configured
- [ ] AuthLayout & AppLayout components
- [ ] Toast notification provider
- [ ] State organization structure

---

### Session 5.3: API Client & Type Safety

**Status:** ⬜  
**Learning Goals:**

- Type-safe API calls using Shared Schemas
- Centralized Axios instance with Interceptors
- Generating/Inferring types for frontend

**Deliverables:**

- [ ] Configure `apiClient` in `src/lib/api.ts`
- [ ] Implement Response Interceptor for global error handling
- [ ] Implement Request Interceptor for auto-injecting JWT
- [ ] Import shared types from `@codergrounds/shared`
- [ ] Create `useApi` or similar hook wrappers
- [ ] Verify types match backend DTOs

---

### Session 5.4: Authentication UI

**Status:** ⬜  
**Learning Goals:**

- Login/register forms
- Form validation
- Auth state management
- Protected routes

**Deliverables:**

- [ ] Login page
- [ ] Register page
- [ ] Auth context/hooks
- [ ] Protected route wrapper
- [ ] OAuth button integration

---

## PHASE 6: CORE FEATURES

### Session 6.1: Playground Management UI

**Status:** ⬜  
**Learning Goals:**

- Building Dashboard with Grid/List views
- Integrating Playground CRUD APIs
- Modal forms and validation

**Deliverables:**

- [ ] `Dashboard` page with layout
- [ ] `CreatePlaygroundModal` with React Hook Form + Zod
- [ ] `PlaygroundCard` component
- [ ] Connect APIs (Create, List, Delete)
- [ ] Implement empty states and loading skeletons

---

### Session 6.2: Monaco Editor Integration

**Status:** ⬜  
**Learning Goals:**

- Monaco Editor setup
- Language support configuration
- Editor state management
- Theme customization

**Deliverables:**

- [ ] Monaco Editor integrated
- [ ] Language support configured
- [ ] Editor component
- [ ] Code state management
- [ ] Basic editor features

---

### Session 6.3: Real-time Collaboration (WebSockets)

**Status:** ⬜  
**Learning Goals:**

- Socket.io Server Architecture (`infrastructure/realtime`)
- Authentication via WS Handshake
- Namespaces & Rooms Strategy
- Redis Adapter for Horizontal Scaling
- Client-side Socket Context

**Deliverables:**

- [ ] Create `infrastructure/realtime/socket.server.ts`
- [ ] Implement `SocketAuthMiddleware` (JWT validation in handshake) in `infrastructure/realtime/middlewares/`
- [ ] Define `CollaborationEvents` enum in `packages/shared`
- [ ] Create `PlaygroundNamespace` in `infrastructure/realtime/namespaces/`
- [ ] Implement Room joining/leaving logic (Room ID = Playground ID)
- [ ] Configure `RedisAdapter` for Socket.io
- [ ] Initialize Socket Server in `server.ts`
- [ ] Frontend: Create `SocketProvider` context
- [ ] Validating connectivity (Connect/Disconnect events)

---

### Session 6.4: Real-time Chat

**Status:** ⬜  
**Learning Goals:**

- Chat message handling
- Message persistence
- Real-time message delivery
- Chat UI components

**Deliverables:**

- [ ] Chat message schema
- [ ] Chat API endpoints
- [ ] Real-time chat events
- [ ] Chat UI component
- [ ] Message history loading

---

## PHASE 7: CODE EXECUTION PIPELINE

### Session 7.1: Judge0 Setup & Integration

**Status:** ⬜  
**Learning Goals:**

- Judge0 architecture
- Self-hosted Judge0 setup
- Result polling vs Webhooks (Architecture decision)
- Language support configuration

**Deliverables:**

- [ ] Judge0 instance running
- [ ] Judge0 client wrapper
- [ ] Language configuration
- [ ] Webhook/Polling strategy decided & implemented

---

### Session 7.2: Job Queue System

**Status:** ⬜  
**Learning Goals:**

- Bull/BullMQ setup
- Job queue patterns
- Worker service architecture
- Job retry and timeout strategies

**Deliverables:**

- [ ] BullMQ configured
- [ ] Job queue setup
- [ ] Worker service structure
- [ ] Job processing logic
- [ ] Retry/timeout handling

---

### Session 7.3: Execution API & Worker

**Status:** ⬜  
**Learning Goals:**

- Integrating Job Queue with API
- Worker processing logic
- Updating execution status via WebSockets/Polling

**Deliverables:**

- [ ] Implement `ExecuteCodeUseCase` (Producer: adds job to queue)
- [ ] Implement `infrastructure/queue/worker.ts` (Consumer: processes jobs)
- [ ] Create `ExecutionController` to trigger execution
- [ ] Implement `SaveExecutionResultUseCase` (called by worker)
- [ ] Dispatch "ExecutionFinished" Socket event (optional) or update DB status
- [ ] Error handling for timeouts and Judge0 failures

---

### Session 7.4: Execution UI Integration

**Status:** ⬜  
**Learning Goals:**

- Execution button/UI
- Real-time execution status
- Result display
- Output formatting

**Deliverables:**

- [ ] Execute button component
- [ ] Execution status UI
- [ ] Result display component
- [ ] Real-time status updates
- [ ] Output/error formatting

---

## PHASE 8: DEPLOYMENT & INFRASTRUCTURE

### Session 8.1: Docker Setup

**Status:** ⬜  
**Learning Goals:**

- Dockerfile creation
- Docker Compose orchestration
- Multi-stage builds
- Environment configuration

**Deliverables:**

- [ ] Backend Dockerfile
- [ ] Frontend Dockerfile
- [ ] Worker Dockerfile
- [ ] Docker Compose file
- [ ] Environment variable management

---

### Session 8.2: CI/CD Pipeline

**Status:** ⬜  
**Learning Goals:**

- GitHub Actions workflow
- Testing in CI
- Build and deployment steps
- Monorepo-aware CI

**Deliverables:**

- [ ] GitHub Actions workflow
- [ ] Test job
- [ ] Build job
- [ ] Deployment job (SSH)
- [ ] Workflow for each workspace

---

### Session 8.3: Production Deployment

**Status:** ⬜  
**Learning Goals:**

- Server setup (Debian)
- Nginx Reverse Proxy configuration
- SSH deployment process
- Process management (PM2/systemd)

**Deliverables:**

- [ ] Server configuration
- [ ] Nginx configuration
- [ ] Deployment script
- [ ] Process management setup
- [ ] Database migration process

---

### Session 8.4: Security & Performance

**Status:** ⬜  
**Learning Goals:**

- Security best practices
- Rate limiting implementation
- CORS configuration
- Performance optimization

**Deliverables:**

- [ ] Rate limiting configured
- [ ] Redis-based Rate Limiter Middleware
- [ ] CORS properly configured
- [ ] Security headers
- [ ] Input sanitization review
- [ ] Performance optimizations

---

## PHASE 9: POLISH & OPEN SOURCE

### Session 9.1: Documentation

**Status:** ⬜  
**Learning Goals:**

- README structure
- API documentation
- Setup instructions
- Contributing guidelines

**Deliverables:**

- [ ] Comprehensive README
- [ ] API documentation
- [ ] Setup guide
- [ ] CONTRIBUTING.md
- [ ] Architecture overview

---

### Session 9.2: Open Source Setup

**Status:** ⬜  
**Learning Goals:**

- License selection
- Issue/PR templates
- Changelog management
- Semantic versioning

**Deliverables:**

- [ ] LICENSE file
- [ ] Issue templates
- [ ] PR template
- [ ] CHANGELOG.md
- [ ] Versioning strategy

---

### Session 9.3: Testing & Quality

**Status:** ⬜  
**Learning Goals:**

- Test coverage goals
- Integration testing
- E2E testing basics
- Code quality metrics

**Deliverables:**

- [ ] Unit test coverage
- [ ] Integration tests
- [ ] E2E test suite (optional)
- [ ] Code quality checks
- [ ] Test documentation

---

## PROGRESS SUMMARY

**Current Phase:** Phase 3  
**Current Session:** 3.3  
**Overall Progress:** 11/37 sessions completed

---

## NOTES & DECISIONS

_Use this section to track important decisions, tradeoffs, and learnings as we progress._
