# ZenithenOpen Architecture Specification

**Version:** 1.0.0 (October 2026)  
**Organization:** IST-ZenithenLab / S-VYASA University  
**Target Scale:** 2,000+ active students, contributors, and alumni

---

## 1. Architectural Philosophy: The Modular Monolith

ZenithenOpen is built as a **Modular Monolith** using **Next.js App Router**. We explicitly avoid premature microservices decomposition. A single deployable codebase provides:
* Unified TypeScript type safety across frontend and backend.
* Zero network serialization overhead between internal modules.
* Atomic database transactions via Prisma ORM.
* Clear internal domain boundaries (`modules/*`) enabling extraction into isolated services only when real scale or team topology demands it.

```
Browser / Client (React 19 Server & Client Components)
       │
       ▼
Next.js 16 App Router (SSR, Streaming, Server Actions, Route Handlers)
       │
       ▼
Business Domain Modules (/modules/*)
 ├── Members & Profiles
 ├── Contributions & Metrics
 ├── Opportunities & Good-First-Issues
 ├── Learning Paths & Roadmaps
 ├── Mentorship Matching
 └── Achievements & Hall of Fame
       │
 ┌─────┴──────────────────┐
 ▼                        ▼
PostgreSQL (Prisma ORM)  Redis / Upstash Cache
 Relational Data          API Cache & Hot Metrics
 │
 └─────────► GitHub API / Octokit (REST + GraphQL)
```

---

## 2. Directory Structure & Domain Isolation

```
ZenithenOpen/
├── app/                  # Next.js App Router (Pages, Layouts, API Routes)
│   ├── (public)/         # Public discovery pages
│   ├── achievements/     # Hall of Fame and badges
│   ├── admin/            # Administrative management dashboard
│   ├── api/metrics/      # Metrics and analytics endpoints
│   ├── leaderboard/      # Monthly and all-time contributor rankings
│   ├── learning/         # Structured curriculum and roadmaps
│   ├── members/          # Member directory and profiles
│   ├── mentorship/       # Student-to-mentor matchmaking
│   ├── opportunities/    # Filterable good-first-issue board
│   ├── projects/         # Featured open-source project showcases
│   └── resume/           # GitHub-powered resume builder
├── components/           # Reusable UI & Layout Components
│   ├── dashboard/        # Hero section, live counters, metric cards
│   ├── navigation/       # Navbar and footer
│   └── ui/               # Design primitives (button, badge, card, input, icons)
├── docs/                 # Engineering Documentation & Logs
│   ├── architecture.md   # Architectural blueprint
│   └── development-log.md # Living milestone log
├── lib/                  # Shared Utilities, Database & Clients
│   ├── data/mock-data.ts # Seed and mock datasets
│   ├── db/               # Prisma client singleton
│   ├── github/           # Octokit client and sync helpers
│   └── utils.ts          # Styling and formatting helpers
├── modules/              # Domain Logic & Business Rules
│   ├── achievements/     # Badge awards and milestones
│   ├── contributions/    # PR tracking and leaderboard calculation
│   ├── learning/         # Curriculum progression
│   ├── members/          # Profile enrichment and role management
│   ├── mentorship/       # Request routing and acceptance
│   ├── opportunities/    # Issue ingestion and curation
│   └── projects/         # Repository indexing
├── prisma/               # Database Schema and Migrations
│   └── schema.prisma     # 12 relational models
└── types/                # Strict TypeScript Contracts
    └── index.ts          # Core domain models
```

---

## 3. Technology Stack Breakdown

| Layer | Technology | Justification |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Native React 19 support, Turbopack, Server Components for fast initial loads, SEO optimization. |
| **Language** | TypeScript 5 | End-to-end type safety, strict compile checks, automated refactoring. |
| **Styling** | Tailwind CSS v4 | High performance utility classes with zero runtime overhead via PostCSS. |
| **UI Primitives** | shadcn/ui inspired | Accessible, customizable headless components with full code ownership. |
| **Icons & Media** | Lucide React + Custom SVGs | Consistent iconography with custom brand SVGs for GitHub and LinkedIn. |
| **Database** | PostgreSQL 16 | Relational reliability, foreign keys, JSONB support for flexible curriculum structures. |
| **ORM** | Prisma | Type-safe migrations, auto-generated TypeScript query client. |
| **Caching** | Redis (Upstash) | Protects against GitHub API rate-limits (5,000 req/hr) and caches hot leaderboard metrics. |
| **Containerization** | Docker & Compose | Reproducible environments across development and production deployments. |

---

## 4. Frontend Data Flow & Isolation Pattern

To enable rapid frontend development without blocking on database provisioning:
1. **Mock Data Layer (`lib/data/mock-data.ts`)**: Represents the exact Prisma schema contracts.
2. **Interactive Client State**: Filtering, search, pagination, and tabs execute client-side with zero latency.
3. **Pluggable API Handoff**: Each page can seamlessly transition from local state to Server Actions or Route Handlers (`/api/*`) without rewriting page components.

---

## 5. Security & Secret Management

* **No Hardcoded Secrets**: Secrets are injected strictly through environment variables.
* **Least Privilege Roles**: RBAC defined across `ADMIN`, `MENTOR`, `MEMBER`, and `GUEST`.
* **Zero Client Leakage**: Sensitive API tokens (`GITHUB_TOKEN`, `AUTH_SECRET`, `DATABASE_URL`) are isolated to server runtimes.
