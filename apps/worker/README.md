# @codergrounds/worker

The background worker service for Codergrounds. This service is responsible for processing heavy, asynchronous jobs offloaded from the main API, primarily code execution tasks.

## 🚀 Purpose

- **Code Execution**: Consumes jobs from Redis (BullMQ), sends code to the Judge0 instance, and processes the results.
- **Scalability**: Can be scaled independently of the main backend API.
- **Reliability**: Handles retries, timeouts, and failure reporting for user code submissions.

## ⚡ Key Technologies

- **TypeScript**: Strict typing.
- **BullMQ**: Redis-based job queue system.
- **Axios**: For communicating with the Judge0 API.
- **Redis**: Job persistence.

## 📜 Scripts

- `pnpm dev`: Start worker in watch mode.
- `pnpm build`: Compile to JS.
- `pnpm test`: Run tests.
