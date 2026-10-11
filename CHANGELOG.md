# Changelog

All notable changes to **ZenithenOpen** are documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2026-10-11

### ⚡ Database Performance & Rate Limiting Defense

- **Database Relational Index Optimizations (`prisma/schema.prisma`)**:
  - Added `@@index([department])` on `User` model for sub-millisecond filtering on the Members Directory.
  - Added compound indexes `@@index([userId, status])` and `@@index([status, mergedAt])` on `Contribution` model to accelerate real-time Leaderboard rankings and competition scoring.
  - Added `@@index([achievementId])` on `UserAchievement` model eliminating full-table scans during badge unlock aggregations.
- **Sliding-Window Rate Limiting Defense (`lib/redis/client.ts`)**:
  - Implemented `checkRateLimit()` with Upstash Redis and automated in-memory fallback.
  - Integrated HTTP `429 Too Many Requests` defense with `Retry-After` headers on `/api/auth/login` and `/api/auth/verify-usn` endpoints to prevent brute-force attacks and student enumeration.
- **Test Suite Expansion (`tests/backend/redis-cache.test.ts`)**:
  - Added unit test assertions verifying rate limit token consumption, token exhaustion, and window resets.

---

## [1.1.0] - 2026-10-11

### 🛡️ Production Hardening: Environment Validation, Health Tests & Dependabot

- **Runtime Environment Validation (`lib/env.ts`)**:
  - Implemented type-safe Zod schema validation across all production and development variables (`DATABASE_URL`, `AUTH_SECRET`, `UPSTASH_REDIS_REST_URL`, `GITHUB_TOKEN`).
  - Added `validateProductionEnv()` preflight checks for production deployments.
- **Production Health Probe Test Suite (`tests/backend/health-route.test.ts`)**:
  - Added automated test suite verifying `/api/health` response schema, latency reporting, status codes (200/503), diagnostic checks for PostgreSQL & Redis, and cache-control headers.
  - Integrated into master test runner (`tests/backend/run-all.ts`), expanding backend test coverage across 14 suites.
- **Automated Security & Vulnerability Auditing (`.github/dependabot.yml`)**:
  - Added GitHub Dependabot configuration for automated dependency security alerts and PRs across `npm` packages and GitHub Actions.

---

## [1.0.0] - 2026-10-11

### 🚀 Production Release: ZenithenOpen Campus Open-Source Platform

ZenithenOpen is the dedicated open-source contribution and student competition platform for the Institute of Science & Technology (IST) campus community. This initial production release delivers a complete, secure, hardened, and highly scalable system for student developers and open-source maintainers.

---

### ✨ Features & Capabilities

- **USN-Based Authentic Student Verification**:
  - Integration with institutional student registry (`1ST23CS001` through `1ST26CS060`).
  - Automated department identification (Computer Science, Information Science, Electronics).
  - GitHub username mapping with leading `@` normalization.
- **Campus Repository & First-PR Gateway**:
  - Direct integration with IST-ZenithenLab campus repositories.
  - Curated Good First Issues with starter guidance and mentor tags.
  - Dedicated First-PR Hall of Fame and milestone badges.
- **Real-Time Student Leaderboard & Competition Arena**:
  - Multi-tier scoring algorithm awarding points for Merged PRs, Quality PRs, Open PRs, and Issue closures.
  - Granular leaderboards supporting Weekly, Monthly, and Overall timeframes.
  - Resilient caching with Upstash Redis and automatic in-memory fallback.
- **Projects Catalog & Opportunities Board**:
  - Filter by programming language, difficulty tier, and tags.
  - Dynamic cache invalidation and stale-while-revalidate headers.
- **Production Health Check Probe**:
  - Deep system health inspection at `/api/health`.
  - Live PostgreSQL database ping and Redis/memory cache readiness metrics.

---

### 🛡️ Security & Reliability Hardening

- **HTTP Security Headers**:
  - Enforced `Strict-Transport-Security` (`HSTS`) with 2-year max-age and preload.
  - Enabled `X-Frame-Options: SAMEORIGIN` (clickjacking defense).
  - Enabled `X-Content-Type-Options: nosniff` (MIME sniffing defense).
  - Configured `Referrer-Policy: origin-when-cross-origin`.
  - Configured strict `Permissions-Policy` denying camera, microphone, and geolocation access.
- **Database Connection Management**:
  - Configured PrismaClient singleton with global scope caching to prevent connection exhaustion during Next.js SSR/serverless execution.
  - Configured development query logging and production error-only logging.
- **Resilient Fallback Architectures**:
  - Graceful in-memory cache fallbacks when Redis is offline or unconfigured.
  - Structured error responses on all API endpoints with zero unhandled exceptions.

---

### 🧪 Quality Assurance & CI/CD

- **GitHub Actions Automation**:
  - Strict quality gates: `npm run lint` (ESLint 9 flat config), `npm run typecheck` (`tsc --noEmit`), and `npm test` enforced on all PRs and pushes to `main`.
  - Least privilege workflow permissions: `permissions: contents: read`.
  - Automated Prisma client generation via `postinstall` script and workflow step.
- **Comprehensive Backend Test Suite**:
  - 346 automated tests across 13 test suites covering USN verification, auth, API routes, database hooks, data contracts, Redis cache fallback, GitHub sync, leaderboard queries, projects, and opportunities.
  - 100% test pass rate.

---

### 🐳 DevOps & Deployment

- **Multi-Stage Production Dockerfile**:
  - Alpine-based multi-stage container build (`base`, `deps`, `builder`, `runner`).
  - Non-root `nextjs` system user runtime (UID 1001) for defense-in-depth container security.
- **Docker Compose Stack**:
  - Zero-configuration local orchestration with PostgreSQL 16 and Redis 7 services including automated database healthchecks.
