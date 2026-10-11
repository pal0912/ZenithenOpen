# ZenithenOpen 🚀
### Production-Grade Open-Source Community Platform for IST & IST-ZenithenLab.

[![ZenithenOpen CI](https://github.com/IST-ZenithenLab/ZenithenOpen/actions/workflows/ci.yml/badge.svg)](https://github.com/IST-ZenithenLab/ZenithenOpen/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)

---

## 📖 Overview

**ZenithenOpen** is the official open-source engineering and community platform designed for **IST** and **IST-ZenithenLab**, empowering 2,000+ student developers, contributors, and alumni to:
- 📊 Track live community impact metrics, merged pull requests, and repository health.
- 🏆 Compete on contributor leaderboards with monthly and all-time rankings.
- 🎯 Discover beginner-friendly, triaged **Good First Issues** across campus open-source projects.
- 🌟 Celebrate the **First PR Hall of Fame**, inspiring newcomers to make their first commit.
- 📚 Master open-source skills through structured **Curriculum Roadmaps** (Full-Stack, AI/ML, Cloud DevOps, GSoC Prep).
- 🤝 Connect via peer **Mentorship Matching** for GSoC and open-source guidance.
- 📄 Generate verified **GitHub-Powered Resumes** with one-click PDF and Markdown export.
- 🛡️ Manage members, projects, and announcements via a centralized **Admin Dashboard**.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Server Components, Route Handlers, Turbopack |
| **Language** | TypeScript 5 | Strict end-to-end typing |
| **Styling** | Tailwind CSS v4 | Cutting-edge utility design with PostCSS |
| **Animations** | Framer Motion 14 | Fluid micro-interactions and page transitions |
| **Icons** | Lucide React + Custom SVGs | Modern iconography & brand logos |
| **Database** | PostgreSQL 16 | Relational persistence with 12 Prisma models |
| **ORM** | Prisma | Schema migrations & type-safe data access |
| **Caching** | Redis (Upstash) | GitHub API rate-limit caching & fast lookups |
| **Container** | Docker & Docker Compose | Isolated multi-container environments |
| **CI/CD** | GitHub Actions | Automated lint, type-check, and build pipeline |

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
- **Docker** (optional, for running PostgreSQL and Redis)

### 2. Clone and Setup
```bash
git clone https://github.com/IST-ZenithenLab/ZenithenOpen.git
cd ZenithenOpen

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Running with Docker Compose
To run the full stack with PostgreSQL and Redis in isolated containers:
```bash
docker compose up --build
```

---

## 📁 Project Architecture & Structure

```
ZenithenOpen/
├── app/                  # Next.js App Router (Pages, Layouts, API Routes)
│   ├── page.tsx          # Homepage with Hero, Metrics & Highlights
│   ├── members/          # Member directory and spotlights
│   ├── projects/         # Open-source project showcases
│   ├── leaderboard/      # Contributor leaderboard & rankings
│   ├── opportunities/    # Curated good-first-issues
│   ├── achievements/     # Hall of fame & badges
│   ├── learning/         # Curriculum roadmaps & modules
│   ├── mentorship/       # Student-mentor matchmaking
│   ├── resume/           # GitHub-powered resume builder
│   └── admin/            # Administrative management console
├── components/           # Reusable UI & Layout components
├── docs/                 # Engineering documentation & dev logs
├── lib/                  # Utilities, mock datasets, and database clients
├── modules/              # Modular monolith domain logic
└── prisma/               # Database schema definition
```

---

## 🧪 Testing & Validation

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Production build test
npm run build
```

---

## 📜 Documentation

- [Architecture Specification](docs/architecture.md)
- [Development Log](docs/development-log.md)

---

## 🤝 Contributing

We welcome contributions from students, mentors, and open-source enthusiasts!
1. Check out the [Opportunities Board](/opportunities) for beginner-friendly tasks.
2. Fork the repository and create your feature branch: `git checkout -b feature/amazing-feature`.
3. Verify your changes pass `npm run build` and `npm run lint`.
4. Submit a Pull Request targeting the `development` branch.

---

## 📄 License

Distributed under the MIT License. Built with ❤️ by [IST-ZenithenLab](https://github.com/IST-ZenithenLab) and the IST Open Source Community.
