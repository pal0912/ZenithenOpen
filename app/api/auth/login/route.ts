import { NextRequest, NextResponse } from "next/server";
import { verifyStudentUSN } from "@/lib/auth/usn-verification";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/redis/client";

export interface LoginRequestBody {
  usn?: string;
  githubUsername?: string;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
    const rateLimit = await checkRateLimit(`login:${ip}`, 30, 60);

    if (!rateLimit.success) {
      return NextResponse.json(
        { success: false, error: "Too many login attempts. Please try again shortly." },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetSeconds),
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": String(rateLimit.remaining),
          },
        }
      );
    }

    const body: LoginRequestBody = await req.json();
    const { usn, githubUsername } = body;

    if (!usn || typeof usn !== "string" || !usn.trim()) {
      return NextResponse.json(
        { success: false, error: "USN is required" },
        { status: 400 }
      );
    }

    if (!githubUsername || typeof githubUsername !== "string" || !githubUsername.trim()) {
      return NextResponse.json(
        { success: false, error: "GitHub username is required" },
        { status: 400 }
      );
    }

    const cleanUsn = usn.trim().toUpperCase();
    const cleanUsername = githubUsername.trim().replace(/^@/, "");

    // GitHub username format validation: 1-39 alphanumeric characters or single hyphens
    const githubPattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
    if (!githubPattern.test(cleanUsername)) {
      return NextResponse.json(
        { success: false, error: "Invalid GitHub username format" },
        { status: 400 }
      );
    }

    // Step 1: Verify student USN enrollment
    const verification = await verifyStudentUSN(cleanUsn);
    if (!verification.valid || !verification.student) {
      return NextResponse.json(
        { success: false, error: verification.error || "Student enrollment verification failed" },
        { status: 404 }
      );
    }

    // Step 2: Database linkage hook
    try {
      await db.students.linkGithub(cleanUsn, cleanUsername);
    } catch {
      // Non-blocking if database is not configured
    }

    // Step 3: Construct authenticated student session
    const authenticatedUser = {
      usn: verification.student.usn,
      name: verification.student.name,
      department: verification.student.department,
      year: verification.student.year,
      college: verification.student.college,
      githubUsername: cleanUsername,
      avatarUrl: `https://github.com/${cleanUsername}.png`,
      role: "MEMBER" as const,
      loggedInAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      user: authenticatedUser,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error during authentication" },
      { status: 500 }
    );
  }
}
