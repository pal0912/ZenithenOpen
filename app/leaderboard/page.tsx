"use client";

import * as React from "react";
import Link from "next/link";
import {
  Trophy,
  Info,
  ArrowRight,
  GitPullRequest,
  CheckCircle2,
  Award,
  Loader2,
  ExternalLink,
  Flame,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/ui/icons";
import { StudentContributor } from "@/lib/data/student-competition";

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = React.useState<"week" | "month" | "overall">("month");
  const [sortBy, setSortBy] = React.useState<"points" | "prs" | "reviews">("points");
  const [competitors, setCompetitors] = React.useState<StudentContributor[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch live student rankings from API
  const fetchLeaderboard = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/students/leaderboard?timeframe=${timeframe}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.competitors)) {
        setCompetitors(data.competitors);
      } else {
        setCompetitors([]);
      }
    } catch (err) {
      console.error("[LeaderboardPage] Failed to fetch leaderboard:", err);
      setCompetitors([]);
    } finally {
      setIsLoading(false);
    }
  }, [timeframe]);

  React.useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // Sort competitors according to user selection
  const sortedCompetitors = React.useMemo(() => {
    return [...competitors].sort((a, b) => {
      const statsA = a[timeframe];
      const statsB = b[timeframe];
      if (sortBy === "points") return statsB.points - statsA.points;
      if (sortBy === "prs") return statsB.prs - statsA.prs;
      return statsB.reviews - statsA.reviews;
    });
  }, [competitors, timeframe, sortBy]);

  const topThree = sortedCompetitors.slice(0, 3);
  const remainingCompetitors = sortedCompetitors.slice(3);

  return (
    <div className="py-16 bg-background text-foreground min-h-screen transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-border pb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-primary font-mono">
            <Trophy className="h-4 w-4" />
            <span>Open Source Recognition</span>
          </div>
          <div className="mt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Contributor Leaderboard
              </h1>
              <p className="mt-1 text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Celebrating IST student developers who contribute, review, and ship code across ZenithenOpen repositories.
              </p>
            </div>
            <Link href="/programs">
              <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md text-xs shrink-0 cursor-pointer">
                <Sparkles className="h-4 w-4" />
                <span>Sprint Arena & Rules</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {/* Philosophy Banner */}
          <div className="mt-6 flex items-center space-x-2.5 text-xs text-foreground bg-card border border-border p-3.5 rounded-xl max-w-3xl">
            <Info className="h-4 w-4 text-primary shrink-0" />
            <span>
              <strong>Fair Play & Quality Recognition:</strong> Merged PRs earn <strong>200 pts</strong>, verified Quality PRs earn an extra <strong>50 pts</strong>, and peer code reviews award <strong>35 pts</strong>.
            </span>
          </div>

          {/* Controls Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Timeframe Selector */}
            <div className="flex rounded-xl bg-card p-1 border border-border text-xs w-full sm:w-auto">
              <button
                onClick={() => setTimeframe("week")}
                className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  timeframe === "week"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Weekly Sprint
              </button>
              <button
                onClick={() => setTimeframe("month")}
                className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  timeframe === "month"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly Hall
              </button>
              <button
                onClick={() => setTimeframe("overall")}
                className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  timeframe === "overall"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All-Time Rank
              </button>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center space-x-2 text-xs text-muted-foreground self-start sm:self-auto">
              <span>Sort by:</span>
              <button
                onClick={() => setSortBy("points")}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  sortBy === "points"
                    ? "border-primary/40 bg-primary/15 text-primary font-semibold"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                Sprint Points
              </button>
              <button
                onClick={() => setSortBy("prs")}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  sortBy === "prs"
                    ? "border-primary/40 bg-primary/15 text-primary font-semibold"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                PRs Merged
              </button>
              <button
                onClick={() => setSortBy("reviews")}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  sortBy === "reviews"
                    ? "border-primary/40 bg-primary/15 text-primary font-semibold"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                Code Reviews
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="mt-20 flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
            <p className="text-sm font-medium">Computing live contributor rankings...</p>
          </div>
        ) : sortedCompetitors.length === 0 ? (
          /* Empty State */
          <div className="mt-12 rounded-2xl border border-border bg-card p-16 text-center shadow-xs">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 border border-primary/30 text-primary mb-4">
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
        ) : (
          <div className="mt-10 space-y-12">
            {/* Top 3 Podium Cards */}
            {topThree.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topThree.map((student, idx) => {
                  const stats = student[timeframe];
                  const rankNum = idx + 1;
                  const medalEmoji = rankNum === 1 ? "🥇" : rankNum === 2 ? "🥈" : "🥉";
                  const borderAccent =
                    rankNum === 1
                      ? "border-amber-500/50 shadow-amber-500/10 shadow-lg"
                      : rankNum === 2
                      ? "border-slate-400/50"
                      : "border-amber-700/50";

                  return (
                    <Card
                      key={student.id}
                      className={`relative p-6 bg-card border ${borderAccent} flex flex-col justify-between overflow-hidden group hover:shadow-xl transition-all`}
                    >
                      {/* Top Rank Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{medalEmoji}</span>
                          <span className="text-xs font-mono font-bold text-muted-foreground uppercase">
                            Rank #{rankNum}
                          </span>
                        </div>
                        <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${student.badgeColor}`}>
                          {student.badge}
                        </Badge>
                      </div>

                      {/* Student Profile Info */}
                      <div className="mt-5 flex items-center space-x-4">
                        <img
                          src={student.avatarUrl}
                          alt={student.name}
                          className="h-14 w-14 rounded-full border-2 border-border object-cover group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                        <div>
                          <h3 className="font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
                            {student.name}
                          </h3>
                          <a
                            href={`https://github.com/${student.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 font-mono"
                          >
                            <span>@{student.username}</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{student.department}</p>
                        </div>
                      </div>

                      {/* Points & Stats */}
                      <div className="mt-6 pt-4 border-t border-border grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-lg bg-muted/40 p-2">
                          <p className="text-lg font-extrabold text-foreground">{stats.points}</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                            Points
                          </p>
                        </div>
                        <div className="rounded-lg bg-muted/40 p-2">
                          <p className="text-lg font-extrabold text-foreground">{stats.prs}</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                            PRs
                          </p>
                        </div>
                        <div className="rounded-lg bg-muted/40 p-2">
                          <p className="text-lg font-extrabold text-foreground">{stats.qualityPrs}</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                            Quality
                          </p>
                        </div>
                      </div>

                      {/* Top Contribution Snippet */}
                      {stats.topContribution && (
                        <div className="mt-4 pt-3 border-t border-border/60 text-xs">
                          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                            Featured Contribution:
                          </p>
                          <a
                            href={stats.topContribution.prUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-primary transition-colors line-clamp-1 font-medium flex items-center gap-1.5"
                          >
                            <GitPullRequest className="h-3 w-3 text-emerald-500 shrink-0" />
                            <span>{stats.topContribution.title}</span>
                          </a>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Complete Rankings Table */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
              <div className="p-5 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-foreground text-base">All Contributor Rankings</h3>
                  <p className="text-xs text-muted-foreground">
                    Real-time aggregated points and verified pull requests for {timeframe === "week" ? "this week" : timeframe === "month" ? "this month" : "all-time"}.
                  </p>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {sortedCompetitors.length} active developers
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/40 text-muted-foreground border-b border-border uppercase font-mono text-[11px]">
                    <tr>
                      <th className="py-3 px-4 w-16">Rank</th>
                      <th className="py-3 px-4">Contributor</th>
                      <th className="py-3 px-4">Department</th>
                      <th className="py-3 px-4 text-center">PRs Merged</th>
                      <th className="py-3 px-4 text-center">Quality PRs</th>
                      <th className="py-3 px-4 text-center">Reviews</th>
                      <th className="py-3 px-4 text-right">Sprint Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {sortedCompetitors.map((student, idx) => {
                      const stats = student[timeframe];
                      return (
                        <tr
                          key={student.id}
                          className="hover:bg-muted/30 transition-colors group"
                        >
                          <td className="py-3.5 px-4 font-mono font-bold text-muted-foreground">
                            #{idx + 1}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={student.avatarUrl}
                                alt={student.name}
                                className="h-8 w-8 rounded-full border border-border object-cover"
                              />
                              <div>
                                <span className="font-bold text-foreground group-hover:text-primary transition-colors block">
                                  {student.name}
                                </span>
                                <a
                                  href={`https://github.com/${student.username}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] text-muted-foreground hover:text-foreground font-mono inline-flex items-center gap-1"
                                >
                                  @{student.username}
                                  <ExternalLink className="h-2.5 w-2.5" />
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-muted-foreground max-w-xs truncate">
                            {student.department}
                          </td>
                          <td className="py-3.5 px-4 text-center font-semibold text-foreground">
                            {stats.prs}
                          </td>
                          <td className="py-3.5 px-4 text-center text-emerald-600 font-semibold">
                            {stats.qualityPrs}
                          </td>
                          <td className="py-3.5 px-4 text-center text-muted-foreground">
                            {stats.reviews}
                          </td>
                          <td className="py-3.5 px-4 text-right font-extrabold text-foreground text-sm font-mono">
                            {stats.points}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
