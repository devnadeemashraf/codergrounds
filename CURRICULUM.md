# CODERGROUNDS — CURRICULUM TRACKING SHEET

**Status Legend:**

- ⬜ Not Started
- 🔄 In Progress
- ✅ Completed
- ⏸️ Paused

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

- Feature-first architecture principles
- Folder structure conventions for backend and frontend
- Shared package organization
- Separation of concerns at the workspace level

**Deliverables:**

- [x] Feature-first folder structure for backend
- [x] Feature-first folder structure for frontend
- [x] Shared package structure (schemas, types, constants)
- [x] Clear boundaries between apps and packages

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

**Status:** ⬜  
**Learning Goals:**

- Repository pattern implementation
- Parameterized queries
- Transaction handling patterns
- Optimistic concurrency control

**Deliverables:**

- [ ] Base repository pattern
- [ ] User repository
- [ ] Playground repository
- [ ] Transaction helper utilities
- [ ] Version column logic (concurrency)

---

### Session 3.3: Authentication System (JWT)

**Status:** ⬜  
**Learning Goals:**

- JWT token generation and validation
- Refresh token rotation strategy (Security)
- Password hashing (bcrypt)
- Secure cookie handling

**Deliverables:**

- [ ] JWT utility functions
- [ ] Password hashing utilities
- [ ] Refresh token rotation logic
- [ ] Auth middleware
- [ ] Login/Register endpoints

---

### Session 3.4: OAuth Integration

**Status:** ⬜  
**Learning Goals:**

- OAuth 2.0 flow understanding
- OAuth provider integration (GitHub/Google)
- State management for OAuth
- User account linking

**Deliverables:**

- [ ] OAuth provider configuration
- [ ] OAuth callback handler
- [ ] State validation
- [ ] Account linking logic
- [ ] OAuth login endpoint

---

## PHASE 4: BACKEND API & VALIDATION

### Session 4.1: Validation with Zod

**Status:** ⬜  
**Learning Goals:**

- Zod schema design
- Shared validation schemas
- Request validation middleware
- Type inference from schemas

**Deliverables:**

- [ ] Shared Zod schemas package
- [ ] Validation middleware
- [ ] User input schemas
- [ ] Playground schemas
- [ ] End-to-end type safety

---

### Session 4.2: API Structure & Controllers

**Status:** ⬜  
**Learning Goals:**

- Controller → Service → Repository pattern
- Route organization
- API versioning
- Pagination helpers
- Filtering/Sorting logic

**Deliverables:**

- [ ] Route structure (feature-first)
- [ ] Controller pattern implementation
- [ ] Service layer pattern
- [ ] Pagination helper utilities
- [ ] Consistent response format

---

### Session 4.3: Playground Management API

**Status:** ⬜  
**Learning Goals:**

- CRUD operations for playgrounds
- Access control logic
- Public/private playground handling
- Access code generation

**Deliverables:**

- [ ] Create playground endpoint
- [ ] Get playground endpoint
- [ ] Update playground endpoint
- [ ] Delete playground endpoint
- [ ] List playgrounds endpoint
- [ ] Access code validation

---

### Session 4.4: Permissions & Authorization

**Status:** ⬜  
**Learning Goals:**

- Role-based access control (RBAC)
- Permission checking middleware
- Owner/editor/viewer roles
- Authorization logic

**Deliverables:**

- [ ] Permission middleware
- [ ] Role checking utilities
- [ ] Playground access validation
- [ ] Role assignment logic
- [ ] Protected endpoints secured

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

- API client abstraction
- Type-safe API calls
- Error handling in frontend
- Shared types from backend

**Deliverables:**

- [ ] API client utility
- [ ] Type-safe fetch wrapper
- [ ] Error handling utilities
- [ ] Shared types integration
- [ ] Authentication token handling

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

- Dashboard page
- Playground creation form
- Playground list/explore
- Access control UI

**Deliverables:**

- [ ] Dashboard page
- [ ] Create playground form
- [ ] Playground list component
- [ ] Explore/public playgrounds page
- [ ] Access code input UI

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

- Socket.io server setup
- Real-time editing synchronization
- Connection state recovery (Reconnection logic)
- Cursor broadcasting optimization (Throttling)
- Pub/Sub setup (Redis)

**Deliverables:**

- [ ] Socket.io server configured
- [ ] Pub/Sub module implementation
- [ ] Socket.io client connected
- [ ] Reconnection logic
- [ ] Text synchronization events
- [ ] Throttled cursor sharing

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

- Execution request handling
- Worker job processing
- Result storage
- Error handling in execution

**Deliverables:**

- [ ] Execution API endpoint
- [ ] Worker job handler
- [ ] Result storage (Redis/DB)
- [ ] Execution status tracking
- [ ] Error handling

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
**Current Session:** 3.1  
**Overall Progress:** 9/35 sessions completed

---

## NOTES & DECISIONS

_Use this section to track important decisions, tradeoffs, and learnings as we progress._
