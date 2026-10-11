# Changelog

All notable changes to **ZenithenOpen** are documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.7.0] - 2026-10-11

### ⚡ Real-Time GitHub Webhook Ingestion Engine

- **GitHub Event Webhook (`app/api/github/webhook/route.ts`)**:
  - Implemented `POST /api/github/webhook` with HMAC-SHA256 signature verification (`X-Hub-Signature-256`).
  - Ingests real-time `pull_request` (opened, closed, merged, synchronized), `pull_request_review`, and `push` events directly from GitHub.
  - Automatically correlates webhook payloads with registered campus users, evaluates Quality PR criteria, updates PostgreSQL, and flushes Redis caches for zero-latency leaderboard synchronization.
  - Implemented `GET /api/github/webhook` health probe returning active status and supported event types.
- **Backend Test Suite Expansion (`tests/backend/github-webhook.test.ts`)**:
  - Validated health probe, ping event handling, payload validation, and unhandled event skips across 375 passing assertions.

---

## [1.6.0] - 2026-10-11

### 🚀 Deep GitHub Sync, Upstream Parent Fork Resolution & Multi-Activity Tracking

- **Upstream Parent Repository Resolution (`lib/github/sync.ts`)**:
  - Automatically resolves forked repositories (`data.fork && data.parent`) to their upstream parent repositories so student contributions against forks inherit parent star and fork counts.
  - Removed artificial campus repository star/fork mocks.
- **Deep Pagination for Full Lifetime History (`lib/github/sync.ts`)**:
  - Implemented multi-page iteration up to GitHub's search API maximum of 1,000 items (10 pages $\times$ 100 PRs/page).
- **Multi-Activity Contribution Tracking (`lib/github/sync.ts`)**:
  - Added real-time synchronization for **Code Reviews** (`reviewed-by:{username} type:pr`) saved as `ContributionType.CODE_REVIEW`.
  - Added real-time synchronization for public **Commits** (`author:{username}`) saved as `ContributionType.COMMIT`.
- **Backend Tests & Validation (`tests/backend/github-sync.test.ts`)**:
  - Added unit test assertions verifying review and commit ingestion functions.

---

## [1.5.1] - 2026-10-11

### 🎯 Strict Quality PR Algorithm (100 Stars & 100 Forks Requirement)

- **Pure Merit-Based Quality PR Qualification (`lib/github/sync.ts`)**:
  - Removed campus repository automatic exemption (`IST-ZenithenLab/*`).
  - Strict rule: A pull request qualifies as a Quality PR **strictly if and only if** the target repository has $\ge 100$ stars AND $\ge 100$ forks.
  - Eliminated keyword/label bypasses for sub-threshold repositories.
- **Updated Test Suite (`tests/backend/github-sync.test.ts`)**:
  - Validated strict star/fork thresholds with 100% pass across 368 test assertions.

---

## [1.5.0] - 2026-10-11

### ⚡ Real-Time GitHub Ingestion, Strict PR Tracking & Zero-Mock Architecture

- **End-to-End Real-Time GitHub PR Ingestion (`lib/github/sync.ts`, `app/api/auth/login/route.ts`)**:
  - Automatically fetches and ingests all student Pull Requests from GitHub API (`OPEN`, `CLOSED`, `MERGED`) directly into PostgreSQL upon login.
  - Built high-performance batch upsert engine with bulk lookup and `createMany`, slashing sync roundtrips from 160 queries down to 2.
  - Automatically awards the "First PR Shipped" achievement when a student merges their first pull request.
- **Quality PR Algorithm & Repository Inspection**:
  - Campus rule: Any PR to `IST-ZenithenLab/ZenithenOpen` or any campus repository (`IST-ZenithenLab/*`) automatically qualifies as a Quality PR.
  - Public open-source threshold: Pull requests to public repositories with ≥100 stars and ≥100 forks qualify as Quality PRs.
- **Dedicated Sync & Ingestion API (`app/api/students/sync/route.ts`)**:
  - Implemented `POST /api/students/sync` and `GET /api/students/sync` to trigger instant live PR synchronization for any student or across the entire campus community.
- **Zero-Mock Community Metrics (`app/api/metrics/route.ts`)**:
  - Eliminated all artificial baselines and fake numbers; platform now computes 100% authentic metrics directly from live Supabase PostgreSQL.
- **Real-Time Leaderboard with Zero Mock Data (`app/api/students/leaderboard/route.ts`, `app/page.tsx`, `app/leaderboard/page.tsx`)**:
  - Completely eliminated all mock competitors (`Sneha Rao`, `Rohan`, etc.) from the active leaderboard.
  - Removed arbitrary points from all contributor displays and rankings; ranks are now driven by Merged PRs, Quality PRs, and Open PRs.
  - Displays top 7 authentic student contributors on the homepage with an interactive direct link to `/programs#student-competition`.
  - Added on-demand "Sync Live PRs" button on the dedicated Leaderboard page.

---

## [1.4.0] - 2026-10-11

### 🚀 Production Preflight Diagnostics & Turnkey Deployment

- **Automated Production Preflight CLI (`scripts/preflight.ts`)**:
  - Built comprehensive non-destructive pre-deployment diagnostic CLI (`npm run preflight`).
  - Verifies runtime environment variables against Zod schema, checks PostgreSQL roundtrip latency and schema entity counts, probes Upstash Redis cache and TTL key writes, checks GitHub API authenticated rate-limit quota, and verifies the `/api/health` probe.
  - Added `--strict` mode flag to enforce zero-warning policy on production release pipelines.
- **Dynamic Health Probe Versioning (`app/api/health/route.ts`)**:
  - Dynamically synchronized version reporting from `package.json`, ensuring `/api/health` stays in lockstep with releases.
  - Updated health route test suite (`tests/backend/health-route.test.ts`) to validate against dynamic package version.
- **Comprehensive Production Deployment Architecture Guide (`DEPLOYMENT.md`)**:
  - Created complete deployment guide covering Vercel serverless deployment, Docker Compose on self-hosted VPS, Nginx reverse proxy with Let's Encrypt SSL, Prisma database synchronization (`npm run db:push`), and observability.
  - Added developer convenience scripts in `package.json` (`preflight`, `db:push`, `db:studio`).

---

## [1.3.0] - 2026-10-11

### 💎 Strict Typing & Lint Hygiene

- **TypeScript Type Safety & Elimination of `any`**:
  - Replaced all untyped `any` signatures in `lib/github/sync.ts` with strongly typed `GitHubItemSignal` contracts.
  - Hardened in-memory cache fallbacks in `lib/redis/client.ts` with type-safe `unknown` boundaries.
  - Refactored exception handlers across Opportunities and Projects catalog routes to use `_err: unknown`.
- **Dead Code & Unused Imports Elimination**:
  - Removed unused icon and component imports across `app/page.tsx`, `app/programs/page.tsx`, `app/projects/page.tsx`, `app/resources/page.tsx`, `components/auth/login-modal.tsx`, `components/hero/floating-org-badges.tsx`, and `components/theme/theme-menu.tsx`.
  - Removed unused Prisma enum imports in `lib/db/index.ts`.
  - Achieved clean ESLint audit with zero errors.

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
