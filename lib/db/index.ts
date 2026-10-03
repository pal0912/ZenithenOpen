/**
 * Database Layer Abstraction for ZenithenOpen
 * 
 * ZenithenOpen is built as an open-source platform.
 * In frontend-only / open-source standalone mode, the app functions cleanly without
 * requiring a database connection or exposing sensitive university student records.
 * 
 * When you are ready to connect a database (PostgreSQL, Supabase, Prisma, or Drizzle):
 * 1. Ensure `DATABASE_URL` is set in your `.env.local`
 * 2. Run your ORM migrations (e.g., `npx prisma db push` or `npx drizzle-kit push`)
 * 3. The providers below can be connected to your DB client.
 */

export interface StudentRecord {
  usn: string;
  name?: string;
  department?: string;
  year?: string;
  email?: string;
  githubUsername?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface ContributionRecord {
  id: string;
  usn: string;
  githubUsername: string;
  repoName: string;
  prNumber: number;
  prTitle: string;
  prUrl: string;
  mergedAt: string;
}

export interface ProjectRecord {
  id: string;
  slug: string;
  name: string;
  description: string;
  repoUrl: string;
  starsCount: number;
  language: string;
  tags: string[];
}

/**
 * Check if a live database connection string is configured
 */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== "");
}

/**
 * Database client placeholder
 * When you initialize Prisma or Drizzle, export your client from here.
 * 
 * Example with Prisma:
 * import { PrismaClient } from "@prisma/client";
 * export const db = globalThis.prisma || new PrismaClient();
 * if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
 */
export const db = {
  isConfigured: isDatabaseConfigured,
  // Extensible hooks for database queries
  students: {
    async findByUsn(usn: string): Promise<StudentRecord | null> {
      // Connect to your database table here:
      // return await prisma.student.findUnique({ where: { usn } });
      return null;
    },
    async linkGithub(usn: string, githubUsername: string): Promise<boolean> {
      // return await prisma.student.update({ where: { usn }, data: { githubUsername } });
      return true;
    }
  }
};
