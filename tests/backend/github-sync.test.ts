/**
 * GitHub API & Contribution Sync Test Suite
 * Location: tests/backend/github-sync.test.ts
 */

import { TestSuite, SuiteResult } from "./test-utils";
import {
  getGitHubHeaders,
  evaluateQualityPr,
  calculateContributionPoints,
  GitHubPullRequestItem,
  fetchGitHubUser,
} from "../../lib/github/sync";
import { ContributionStatus } from "@prisma/client";

export async function runGitHubSyncTests(): Promise<SuiteResult> {
  const suite = new TestSuite("GitHub Sync Service & Quality PR Tracking");
  suite.start();

  // --- 1. Header Authentication Contract ---
  const headers = getGitHubHeaders() as Record<string, string>;
  suite.assertEqual(
    headers["Accept"],
    "application/vnd.github.v3+json",
    "Headers contain required GitHub API Accept format"
  );
  suite.assert(
    typeof headers["User-Agent"] === "string" && headers["User-Agent"].length > 0,
    "Headers contain required User-Agent string"
  );

  if (process.env.GITHUB_TOKEN) {
    suite.assert(
      headers["Authorization"]?.startsWith("Bearer ") ?? false,
      "Headers inject Bearer Authorization when GITHUB_TOKEN is present"
    );
  }

  // --- 2. Quality PR Evaluation Logic ---
  const qualityByLabel = evaluateQualityPr({
    labels: [{ name: "enhancement" }],
    comments: 0,
    body: "short",
  });
  suite.assertEqual(qualityByLabel, true, "PR with 'enhancement' label qualifies as Quality PR");

  const qualityByCoreLabel = evaluateQualityPr({
    labels: [{ name: "core/backend" }],
    comments: 0,
    body: "short",
  });
  suite.assertEqual(qualityByCoreLabel, true, "PR with 'backend' label qualifies as Quality PR");

  const qualityByComments = evaluateQualityPr({
    labels: [],
    comments: 3,
    body: "short",
  });
  suite.assertEqual(qualityByComments, true, "PR with >= 2 code review comments qualifies as Quality PR");

  const qualityByDetailedBody = evaluateQualityPr({
    labels: [],
    comments: 0,
    body: "This PR refactors the student authentication state by establishing persistent relational joins with Supabase PostgreSQL and caching user leaderboards in Redis.",
  });
  suite.assertEqual(
    qualityByDetailedBody,
    true,
    "PR with comprehensive body description (>= 100 chars) qualifies as Quality PR"
  );

  const nonQualityPr = evaluateQualityPr({
    labels: [{ name: "typo" }],
    comments: 0,
    body: "fixed spelling",
  });
  suite.assertEqual(nonQualityPr, false, "Trivial PR without quality signals is not marked as Quality PR");

  // --- 3. Contribution Points Calculation Formula ---
  const mockPrs: GitHubPullRequestItem[] = [
    {
      id: "1",
      title: "Feature A",
      url: "https://github.com/IST-ZenithenLab/ZenithenOpen/pull/1",
      prNumber: 1,
      repoName: "IST-ZenithenLab/ZenithenOpen",
      status: ContributionStatus.MERGED,
      isQualityPr: true, // 80 + 50 = 130
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Bugfix B",
      url: "https://github.com/IST-ZenithenLab/ZenithenOpen/pull/2",
      prNumber: 2,
      repoName: "IST-ZenithenLab/ZenithenOpen",
      status: ContributionStatus.MERGED,
      isQualityPr: false, // 80
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "WIP C",
      url: "https://github.com/IST-ZenithenLab/ZenithenOpen/pull/3",
      prNumber: 3,
      repoName: "IST-ZenithenLab/ZenithenOpen",
      status: ContributionStatus.OPEN,
      isQualityPr: true, // 20 + 20 = 40
      createdAt: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Closed Experiment D",
      url: "https://github.com/IST-ZenithenLab/ZenithenOpen/pull/4",
      prNumber: 4,
      repoName: "IST-ZenithenLab/ZenithenOpen",
      status: ContributionStatus.CLOSED,
      isQualityPr: false, // 5
      createdAt: new Date().toISOString(),
    },
  ];

  // Expected points: 130 + 80 + 40 + 5 = 255
  const points = calculateContributionPoints(mockPrs);
  suite.assertEqual(
    points,
    255,
    "calculateContributionPoints correctly awards 255 pts across Merged, Quality, Open, and Closed PRs"
  );

  // --- 4. Live / Mock Fetch Safe Error Handling ---
  const notFound = await fetchGitHubUser("definitely-non-existent-user-xyz-998877");
  suite.assertEqual(
    notFound,
    null,
    "fetchGitHubUser safely returns null for non-existent user without throwing"
  );

  return suite.summary();
}

if (process.argv[1]?.endsWith("github-sync.test.ts")) {
  runGitHubSyncTests().then((res) => {
    if (res.failed > 0) process.exit(1);
  });
}
