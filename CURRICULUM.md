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

### Session 2.1: Backend Skeleton & Express Setup

**Status:** 🔄  
**Learning Goals:**

- Express application structure
- Middleware patterns and organization
- Environment configuration
- Health check endpoints
- Production-ready server setup

**Deliverables:**

- [ ] Express app skeleton with TypeScript
- [ ] Environment variable management
- [ ] Middleware organization (error handling, logging, CORS)
- [ ] Health check endpoint
- [ ] Development server script

---

### Session 2.2: Logging & Error Handling

**Status:** ⬜  
**Learning Goals:**

- Structured logging (Pino/Winston)
- Error hierarchy and typed errors
- Centralized error handling middleware
- Logging best practices for production

**Deliverables:**

- [ ] Logger configured and integrated
- [ ] Custom error classes hierarchy
- [ ] Error handling middleware
- [ ] Error response formatting
- [ ] Logging in request lifecycle

---

### Session 2.3: Database Connection & Pooling

**Status:** ⬜  
**Learning Goals:**

- PostgreSQL connection patterns
- Connection pooling strategies
- Database client abstraction
- Migration system setup

**Deliverables:**

- [ ] PostgreSQL connection module
- [ ] Connection pooling configured
- [ ] Migration system (simple SQL files or tool)
- [ ] Database client wrapper/abstraction
- [ ] Connection health checks

---

### Session 2.4: Redis Setup & Patterns

**Status:** ⬜  
**Learning Goals:**

- Redis connection and client patterns
- Caching strategies
- Pub/sub basics
- Rate limiting foundation

**Deliverables:**

- [ ] Redis client configured
- [ ] Redis connection module
- [ ] Basic caching utility
- [ ] Pub/sub setup (for future WebSocket events)
- [ ] Rate limiting middleware foundation

---

## PHASE 3: DATABASE SCHEMA & AUTHENTICATION

### Session 3.1: Database Schema Design

**Status:** ⬜  
**Learning Goals:**

- Schema design principles
- Indexing strategy
- Foreign key relationships
- Migration workflow

**Deliverables:**

- [ ] Users table schema
- [ ] Playgrounds table schema
- [ ] Sessions/roles table schema
- [ ] Messages table schema
- [ ] Appropriate indexes defined
- [ ] Migration files created

---

### Session 3.2: Repository Pattern & Database Access

**Status:** ⬜  
**Learning Goals:**

- Repository pattern implementation
- Parameterized queries and SQL injection prevention
- Transaction handling
- Query organization

**Deliverables:**

- [ ] Base repository pattern
- [ ] User repository
- [ ] Playground repository
- [ ] Transaction helper utilities
- [ ] Type-safe query patterns

---

### Session 3.3: Authentication System (JWT)

**Status:** ⬜  
**Learning Goals:**

- JWT token generation and validation
- Password hashing (bcrypt)
- Token refresh strategy
- Secure cookie handling

**Deliverables:**

- [ ] JWT utility functions
- [ ] Password hashing utilities
- [ ] Auth middleware
- [ ] Login endpoint
- [ ] Register endpoint
- [ ] Token refresh endpoint

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
- Response formatting

**Deliverables:**

- [ ] Route structure (feature-first)
- [ ] Controller pattern implementation
- [ ] Service layer pattern
- [ ] API versioning (v1/)
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

### Session 5.1: Frontend Skeleton & React Setup

**Status:** ⬜  
**Learning Goals:**

- React application structure
- Build tooling (Vite/Webpack)
- Routing setup (React Router)
- Environment configuration

**Deliverables:**

- [ ] React app skeleton
- [ ] Build configuration
- [ ] Routing structure
- [ ] Environment variables setup
- [ ] Development server running

---

### Session 5.2: State Management Setup

**Status:** ⬜  
**Learning Goals:**

- Redux Toolkit (RTK) setup
- React Query (TanStack Query) setup
- State organization patterns
- When to use which tool

**Deliverables:**

- [ ] RTK store configured
- [ ] React Query client configured
- [ ] State organization structure
- [ ] Example slice/query

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
- [ ] Basic editor features (syntax highlighting, etc.)

---

### Session 6.3: Real-time Collaboration (WebSockets)

**Status:** ⬜  
**Learning Goals:**

- Socket.io server setup
- Socket.io client integration
- Real-time editing synchronization
- Conflict resolution basics

**Deliverables:**

- [ ] Socket.io server configured
- [ ] Socket.io client connected
- [ ] Room/namespace management
- [ ] Text synchronization events
- [ ] Cursor position sharing (optional)

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
- API integration patterns
- Language support configuration

**Deliverables:**

- [ ] Judge0 instance running
- [ ] Judge0 client wrapper
- [ ] Language configuration
- [ ] Basic execution test

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
- SSH deployment process
- Process management (PM2/systemd)
- Database migration in production

**Deliverables:**

- [ ] Server configuration
- [ ] Deployment script
- [ ] Process management setup
- [ ] Database migration process
- [ ] Health monitoring

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

**Current Phase:** Phase 1  
**Current Session:** 2.1  
**Overall Progress:** 4/35 sessions completed

---

## NOTES & DECISIONS

_Use this section to track important decisions, tradeoffs, and learnings as we progress._
