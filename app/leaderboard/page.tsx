"use client";

import * as React from "react";
import {
  Trophy,
  GitPullRequest,
  CheckSquare,
  GitCommit,
  Flame,
  Award,
  Medal,
  Sparkles,
  Info,
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
    <div className="py-12 bg-grid-pattern min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-800/80 pb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
            <Trophy className="h-4 w-4" />
            <span>Open Source Recognition</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
            Contributor Leaderboard
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
            Celebrating the dedication of S-VYASA students who build, review, and ship code together.
            We honor steady progress, constructive code reviews, and community support over pure lines of code.
          </p>

          {/* Philosophy Banner */}
          <div className="mt-4 flex items-center space-x-2 text-xs text-slate-300 bg-slate-900/60 border border-slate-800 p-3 rounded-lg max-w-2xl">
            <Info className="h-4 w-4 text-blue-400 shrink-0" />
            <span>
              <strong>Psychological Safety First:</strong> Every contribution counts—from fixing a typo in documentation to shipping distributed systems.
            </span>
          </div>

          {/* Controls Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Timeframe switch */}
            <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-800 text-xs">
              <button
                onClick={() => setTimeframe("monthly")}
                className={`px-4 py-1.5 rounded-md font-semibold transition-colors ${
                  timeframe === "monthly"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                October 2026 (Monthly)
              </button>
              <button
                onClick={() => setTimeframe("allTime")}
                className={`px-4 py-1.5 rounded-md font-semibold transition-colors ${
                  timeframe === "allTime"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                All-Time Hall
              </button>
            </div>

            {/* Sort filter */}
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span>Sort by:</span>
              <button
                onClick={() => setSortBy("prs")}
                className={`px-2.5 py-1 rounded border text-xs font-medium transition-colors ${
                  sortBy === "prs"
                    ? "border-blue-500 bg-blue-950/60 text-blue-300"
                    : "border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                PRs Merged
              </button>
              <button
                onClick={() => setSortBy("reviews")}
                className={`px-2.5 py-1 rounded border text-xs font-medium transition-colors ${
                  sortBy === "reviews"
                    ? "border-purple-500 bg-purple-950/60 text-purple-300"
                    : "border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                Code Reviews
              </button>
              <button
                onClick={() => setSortBy("commits")}
                className={`px-2.5 py-1 rounded border text-xs font-medium transition-colors ${
                  sortBy === "commits"
                    ? "border-emerald-500 bg-emerald-950/60 text-emerald-300"
                    : "border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                Commits
              </button>
            </div>
          </div>
        </div>

        {/* Podium Top 3 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {sortedLeaderboard.slice(0, 3).map((entry, idx) => {
            const medals = [
              { color: "text-amber-400", bg: "border-amber-500/30 bg-amber-950/20", label: "1st Place" },
              { color: "text-slate-300", bg: "border-slate-400/30 bg-slate-900/60", label: "2nd Place" },
              { color: "text-amber-600", bg: "border-amber-700/30 bg-amber-950/20", label: "3rd Place" },
            ];
            const medal = medals[idx];

            return (
              <Card
                key={entry.member.id}
                className={`p-6 glass-panel relative overflow-hidden text-center border ${medal.bg}`}
              >
                <div className="flex justify-center mb-3">
                  <div className="relative">
                    <img
                      src={entry.member.avatarUrl}
                      alt={entry.member.name}
                      className="h-20 w-20 rounded-full object-cover ring-4 ring-slate-800 shadow-xl"
                    />
                    <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 border border-slate-700 font-bold text-xs text-white">
                      #{idx + 1}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white">
                  {entry.member.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  @{entry.member.username}
                </p>

                <div className="mt-3 flex justify-center">
                  <Badge variant="outline" className="text-[11px]">
                    {entry.badge}
                  </Badge>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-800/80 pt-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-blue-400">{entry.prsMerged}</p>
                    <p className="text-[10px] text-slate-400">PRs Merged</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-purple-400">{entry.codeReviews}</p>
                    <p className="text-[10px] text-slate-400">Reviews</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-emerald-400">{entry.commitsCount}</p>
                    <p className="text-[10px] text-slate-400">Commits</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Full Table List */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 uppercase tracking-wider text-[11px] text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Rank & Contributor</th>
                  <th className="px-6 py-4">Status Badge</th>
                  <th className="px-6 py-4 text-right">Merged PRs</th>
                  <th className="px-6 py-4 text-right">Code Reviews</th>
                  <th className="px-6 py-4 text-right">Commits</th>
                  <th className="px-6 py-4 text-right">Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sortedLeaderboard.map((entry, idx) => (
                  <tr key={entry.member.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-slate-500 w-6">#{idx + 1}</span>
                        <img
                          src={entry.member.avatarUrl}
                          alt={entry.member.name}
                          className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-700"
                        />
                        <div>
                          <p className="font-semibold text-white">{entry.member.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">@{entry.member.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="text-[10px]">
                        {entry.badge}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-blue-400">
                      {entry.prsMerged}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-purple-400">
                      {entry.codeReviews}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-400">
                      {entry.commitsCount}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center text-orange-400 font-semibold">
                        <Flame className="h-3.5 w-3.5 mr-1" />
                        {entry.streakDays}d
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
