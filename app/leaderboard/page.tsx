"use client";

import * as React from "react";
import Link from "next/link";
import {
  Trophy,
  Info,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_LEADERBOARD } from "@/lib/data/mock-data";

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = React.useState<"monthly" | "allTime">("monthly");
  const [sortBy, setSortBy] = React.useState<"prs" | "reviews" | "commits">("prs");

  const sortedLeaderboard = [...MOCK_LEADERBOARD].sort((a, b) => {
    if (sortBy === "prs") return b.prsMerged - a.prsMerged;
    if (sortBy === "reviews") return b.codeReviews - a.codeReviews;
    return b.commitsCount - a.commitsCount;
  });

  return (
    <div className="py-16 bg-background text-foreground min-h-screen transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-border pb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-secondary font-mono">
            <Trophy className="h-4 w-4" />
            <span>Open Source Recognition</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-2">
            Contributor Leaderboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Celebrating IST student developers who contribute, review, and ship code together.
            We prioritize steady progress and constructive code reviews over raw volume.
          </p>

          {/* Philosophy Banner */}
          <div className="mt-4 flex items-center space-x-2.5 text-xs text-foreground bg-card border border-border p-3 rounded-xl max-w-2xl">
            <Info className="h-4 w-4 text-secondary shrink-0" />
            <span>
              <strong>Psychological Safety First:</strong> Every contribution counts—from fixing documentation typos to shipping distributed systems.
            </span>
          </div>

          {/* Controls Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex rounded-xl bg-card p-1 border border-border text-xs">
              <button
                onClick={() => setTimeframe("monthly")}
                className={`px-4 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  timeframe === "monthly"
                    ? "bg-secondary text-secondary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                October 2026 (Monthly)
              </button>
              <button
                onClick={() => setTimeframe("allTime")}
                className={`px-4 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  timeframe === "allTime"
                    ? "bg-secondary text-secondary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All-Time Hall
              </button>
            </div>

            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>Sort by:</span>
              <button
                onClick={() => setSortBy("prs")}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  sortBy === "prs"
                    ? "border-primary/40 bg-primary/15 text-primary"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                PRs Merged
              </button>
              <button
                onClick={() => setSortBy("reviews")}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  sortBy === "reviews"
                    ? "border-secondary/40 bg-secondary/15 text-secondary"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                Code Reviews
              </button>
            </div>
          </div>
        </div>

        {/* Leaderboard Entries or Zero State */}
        {sortedLeaderboard.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-border bg-card p-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/15 border border-secondary/30 text-secondary mb-4">
              <Trophy className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Leaderboard Awaiting First Pull Request</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              When student pull requests and code reviews are merged in GitHub repositories, rankings are computed automatically.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/programs">
                <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs shadow-xs cursor-pointer">
                  <span>Explore Programs & Competitions</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
