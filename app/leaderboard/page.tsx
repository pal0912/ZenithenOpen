"use client";

import * as React from "react";
import Link from "next/link";
import {
  Trophy,
  GitPullRequest,
  CheckSquare,
  Flame,
  Award,
  Sparkles,
  Info,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <div className="py-16 bg-grid-pattern min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-white/[0.06] pb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-purple-400 font-mono">
            <Trophy className="h-4 w-4" />
            <span>Open Source Recognition</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
            Contributor Leaderboard
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl leading-relaxed">
            Celebrating S-VYASA student developers who contribute, review, and ship code together.
            We prioritize steady progress and constructive code reviews over raw volume.
          </p>

          {/* Philosophy Banner */}
          <div className="mt-4 flex items-center space-x-2.5 text-xs text-slate-300 bg-white/[0.02] border border-white/[0.08] p-3 rounded-xl max-w-2xl">
            <Info className="h-4 w-4 text-purple-400 shrink-0" />
            <span>
              <strong>Psychological Safety First:</strong> Every contribution counts—from fixing documentation typos to shipping distributed systems.
            </span>
          </div>

          {/* Controls Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex rounded-xl bg-white/[0.03] p-1 border border-white/[0.08] text-xs">
              <button
                onClick={() => setTimeframe("monthly")}
                className={`px-4 py-1.5 rounded-lg font-semibold transition-colors ${
                  timeframe === "monthly"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                October 2026 (Monthly)
              </button>
              <button
                onClick={() => setTimeframe("allTime")}
                className={`px-4 py-1.5 rounded-lg font-semibold transition-colors ${
                  timeframe === "allTime"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                All-Time Hall
              </button>
            </div>

            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span>Sort by:</span>
              <button
                onClick={() => setSortBy("prs")}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                  sortBy === "prs"
                    ? "border-blue-500 bg-blue-950/40 text-blue-300"
                    : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white"
                }`}
              >
                PRs Merged
              </button>
              <button
                onClick={() => setSortBy("reviews")}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                  sortBy === "reviews"
                    ? "border-purple-500 bg-purple-950/40 text-purple-300"
                    : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white"
                }`}
              >
                Code Reviews
              </button>
            </div>
          </div>
        </div>

        {/* Leaderboard Entries or Zero State */}
        {sortedLeaderboard.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-16 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-4">
              <Trophy className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Leaderboard Awaiting First Pull Request</h3>
            <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              When student pull requests and code reviews are merged in GitHub repositories, rankings are computed automatically.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/learning">
                <Button className="gap-2 bg-purple-600 hover:bg-purple-500 text-xs">
                  <span>Start a Learning Roadmap</span>
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
