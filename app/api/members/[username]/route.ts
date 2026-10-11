/**
 * Member Profile & Settings Controller
 * Location: app/api/members/[username]/route.ts
 * 
 * Public member profile querying (GET) and authenticated member profile updates (PATCH).
 * Follows Next.js 15 async params conventions and Prisma relational models.
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCached, setCached, deleteCached } from "@/lib/redis/client";
import { z } from "zod";
import { ContributionStatus, ContributionType } from "@prisma/client";

const UpdateProfileSchema = z.object({
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  department: z.string().max(100).optional(),
  yearOfStudy: z.string().max(20).optional(),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  portfolioUrl: z.string().url("Invalid Portfolio URL").optional().or(z.literal("")),
  isMentor: z.boolean().optional(),
  mentorshipTopics: z.array(z.string().max(50)).max(10).optional(),
  skills: z.array(z.string().max(50)).max(20).optional(),
});

interface RouteContext {
  params: Promise<{ username: string }>;
}

/**
 * GET /api/members/[username]
 * Public profile, verified contributions summary, badges, and skills
 */
export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { username } = await params;
    const cleanUsername = decodeURIComponent(username || "").trim().toLowerCase();

    if (!cleanUsername) {
      return NextResponse.json({ error: "Username parameter is required" }, { status: 400 });
    }

    const cacheKey = `member:profile:${cleanUsername}`;
    const cached = await getCached<Record<string, any>>(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: { "X-Cache": "HIT" },
      });
    }

    // Lookup user by GitHub username, email prefix, or user ID
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { githubAccount: { username: { equals: cleanUsername, mode: "insensitive" } } },
          { id: cleanUsername },
          { email: { startsWith: cleanUsername, mode: "insensitive" } },
        ],
      },
      include: {
        githubAccount: true,
        skills: {
          select: { name: true, category: true, level: true },
        },
        achievements: {
          include: { achievement: true },
          orderBy: { unlockedAt: "desc" },
        },
        contributions: {
          orderBy: { createdAt: "desc" },
          take: 50,
          select: {
            id: true,
            title: true,
            url: true,
            prNumber: true,
            type: true,
            status: true,
            isQualityPr: true,
            mergedAt: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: `Member with handle '${cleanUsername}' was not found` },
        { status: 404 }
      );
    }

    // Compute contribution metrics
    const prs = user.contributions.filter((c) => c.type === ContributionType.PULL_REQUEST);
    const mergedPrs = prs.filter((c) => c.status === ContributionStatus.MERGED).length;
    const openPrs = prs.filter((c) => c.status === ContributionStatus.OPEN).length;
    const qualityPrs = prs.filter((c) => c.isQualityPr).length;
    const codeReviews = user.contributions.filter((c) => c.type === ContributionType.CODE_REVIEW).length;
    const commits = user.contributions.filter((c) => c.type === ContributionType.COMMIT).length;

    const publicProfile = {
      id: user.id,
      name: user.name,
      username: user.githubAccount?.username || user.email.split("@")[0],
      avatarUrl: user.githubAccount?.avatarUrl || user.image || `https://github.com/${cleanUsername}.png`,
      bio: user.bio || "",
      department: user.department || "Computer Science & Engineering",
      yearOfStudy: user.yearOfStudy || "3rd Year",
      role: user.role,
      isMentor: user.isMentor,
      mentorshipTopics: user.mentorshipTopics || [],
      linkedinUrl: user.linkedinUrl || "",
      portfolioUrl: user.portfolioUrl || "",
      joinedAt: user.createdAt,
      stats: {
        totalContributions: user.contributions.length,
        totalPrs: prs.length,
        mergedPrs,
        openPrs,
        qualityPrs,
        codeReviews,
        commits,
        followers: user.githubAccount?.followers || 0,
        publicRepos: user.githubAccount?.publicRepos || 0,
      },
      skills: user.skills.map((s) => s.name),
      achievements: user.achievements.map((ua) => ({
        id: ua.achievement.id,
        code: ua.achievement.code,
        title: ua.achievement.title,
        description: ua.achievement.description,
        badgeIcon: ua.achievement.badgeIcon,
        category: ua.achievement.category,
        unlockedAt: ua.unlockedAt,
      })),
      recentContributions: user.contributions,
    };

    // Cache in Redis for 5 minutes
    await setCached(cacheKey, publicProfile, 300);

    return NextResponse.json(publicProfile, {
      headers: { "X-Cache": "MISS" },
    });
  } catch (error) {
    console.error("[Member Profile] Unexpected GET error:", error);
    return NextResponse.json({ error: "Failed to fetch member profile" }, { status: 500 });
  }
}

/**
 * PATCH /api/members/[username]
 * Update authenticated member profile fields
 */
export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const { username } = await params;
    const cleanUsername = decodeURIComponent(username || "").trim().toLowerCase();

    if (!cleanUsername) {
      return NextResponse.json({ error: "Username parameter is required" }, { status: 400 });
    }

    const body = await request.json();
    const validation = UpdateProfileSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Locate the user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { githubAccount: { username: { equals: cleanUsername, mode: "insensitive" } } },
          { id: cleanUsername },
          { email: { startsWith: cleanUsername, mode: "insensitive" } },
        ],
      },
      select: { id: true, githubAccount: { select: { username: true } } },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: `Member with handle '${cleanUsername}' was not found` },
        { status: 404 }
      );
    }

    // Update user scalar fields
    const updatedUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        bio: data.bio !== undefined ? data.bio : undefined,
        department: data.department !== undefined ? data.department : undefined,
        yearOfStudy: data.yearOfStudy !== undefined ? data.yearOfStudy : undefined,
        linkedinUrl: data.linkedinUrl !== undefined ? data.linkedinUrl : undefined,
        portfolioUrl: data.portfolioUrl !== undefined ? data.portfolioUrl : undefined,
        isMentor: data.isMentor !== undefined ? data.isMentor : undefined,
        mentorshipTopics: data.mentorshipTopics !== undefined ? data.mentorshipTopics : undefined,
      },
    });

    // Update skills if provided
    if (data.skills && Array.isArray(data.skills)) {
      await prisma.memberSkill.deleteMany({
        where: { userId: existingUser.id },
      });

      if (data.skills.length > 0) {
        await prisma.memberSkill.createMany({
          data: data.skills.map((skill) => ({
            userId: existingUser.id,
            name: skill,
            category: "Engineering",
            level: "Intermediate",
          })),
        });
      }
    }

    // Purge cached member profiles and directories
    const userHandle = existingUser.githubAccount?.username || cleanUsername;
    await Promise.all([
      deleteCached(`member:profile:${cleanUsername}`),
      deleteCached(`member:profile:${userHandle.toLowerCase()}`),
      deleteCached("members:all"),
    ]);

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        bio: updatedUser.bio,
        department: updatedUser.department,
        yearOfStudy: updatedUser.yearOfStudy,
        linkedinUrl: updatedUser.linkedinUrl,
        portfolioUrl: updatedUser.portfolioUrl,
        isMentor: updatedUser.isMentor,
        mentorshipTopics: updatedUser.mentorshipTopics,
      },
    });
  } catch (error) {
    console.error("[Member Profile] Unexpected PATCH error:", error);
    return NextResponse.json({ error: "Failed to update member profile" }, { status: 500 });
  }
}
