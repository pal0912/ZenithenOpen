# Open-Source Architecture & Database Integration Guide

## 1. Open-Source Readiness Overview

ZenithenOpen is built to be hosted on public open-source repositories (such as GitHub) safely and securely:
- **Zero Sensitive Data in Version Control:** No hardcoded student rosters, names, phone numbers, or private emails are embedded in the source code or git history.
- **Privacy-First Zero States:** All metrics, contributor leaderboards, and member directories start from authentic zero-states or pull directly from public GitHub Organization APIs.
- **Safe Authentication:** Student USN validation operates algorithmically without needing private student lists in the repository.

---

## 2. University USN Verification Architecture

The login system uses a 2-step verification workflow:
1. **Step 1 — S-VYASA USN Verification:** Validates that the student is an enrolled student at S-VYASA University.
2. **Step 2 — GitHub Profile Linking:** Authorizes and links their GitHub account to their student record.

### How Verification Works Today (Standalone Open-Source Mode)
- Located in [`lib/auth/usn-verification.ts`](file:///d:/ZenithenOpen/lib/auth/usn-verification.ts).
- Verifies the standard S-VYASA University USN format:
  ```regex
  ^(1SV|SV)[0-9]{2}[A-Z]{2,4}[0-9]{3}$
  ```
  - Examples: `1SV23CS042`, `1SV22AI015`, `SV24DS001`
- Dynamically infers:
  - **Department:** Automatically mapped from the branch code (`CS`, `AI`, `DS`, `EC`, etc.).
  - **Year of Study:** Computed dynamically from the admission year digits (e.g., `23` -> 2nd Year).
- Requires zero database setup to run and demo out of the box.

---

## 3. Database Layer (`lib/db/index.ts`)

A clean database abstraction is provided in [`lib/db/index.ts`](file:///d:/ZenithenOpen/lib/db/index.ts).

### Environment Detection
```typescript
import { isDatabaseConfigured } from "@/lib/db";

if (isDatabaseConfigured()) {
  // Uses live database queries
} else {
  // Gracefully falls back to algorithmic verification
}
```

### When You Are Ready to Add a Database:
1. **Choose Your ORM / Client:**
   - **Prisma:** `npm install @prisma/client && npx prisma init`
   - **Drizzle:** `npm install drizzle-orm pg && npm install -D drizzle-kit`
   - **Supabase / Direct PG:** `npm install pg @types/pg`

2. **Configure Connection:**
   In `.env.local` (or Docker environment):
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5433/zenithen_open?schema=public"
   ```
   *(Note: Container PostgreSQL is mapped to port 5433 on host).*

3. **Plug into `lib/db/index.ts`:**
   Uncomment or insert your query inside `db.students.findByUsn(usn)`:
   ```typescript
   export const db = {
     isConfigured: isDatabaseConfigured,
     students: {
       async findByUsn(usn: string) {
         return await prisma.student.findUnique({ where: { usn } });
       },
       async linkGithub(usn: string, githubUsername: string) {
         return await prisma.student.update({
           where: { usn },
           data: { githubUsername, isVerified: true },
         });
       },
     },
   };
   ```

4. **Automatic Fallback:**
   The API route handler [`app/api/auth/verify-usn/route.ts`](file:///d:/ZenithenOpen/app/api/auth/verify-usn/route.ts) already awaits `verifyStudentUSN(usn)`. Once your database is active, it queries your student records automatically with zero changes needed in any frontend UI components.

---

## 4. Suggested Database Schema

When creating your relational schema in PostgreSQL:

```sql
CREATE TABLE students (
  usn VARCHAR(32) PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  department VARCHAR(128) NOT NULL,
  admission_year INT NOT NULL,
  email VARCHAR(255) UNIQUE,
  github_username VARCHAR(128) UNIQUE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usn VARCHAR(32) REFERENCES students(usn),
  github_username VARCHAR(128) NOT NULL,
  repo_name VARCHAR(128) NOT NULL,
  pr_number INT NOT NULL,
  pr_title TEXT NOT NULL,
  pr_url TEXT NOT NULL,
  merged_at TIMESTAMP WITH TIME ZONE
);
```
