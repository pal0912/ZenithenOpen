"use client";

import * as React from "react";
import {
  Users,
  GitPullRequest,
  FolderGit2,
  GitCommit,
  Sparkles,
  TrendingUp,
  RefreshCw,
  Clock,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatCompactNumber } from "@/lib/utils";
import { COMMUNITY_METRICS } from "@/lib/data/mock-data";

export function LiveMetricsDashboard() {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [metrics, setMetrics] = React.useState(COMMUNITY_METRICS);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setMetrics({
        ...metrics,
        lastUpdated: new Date().toISOString(),
      });
      setIsRefreshing(false);
    }, 600);
  };

  const metricCards = [
    {
      label: "Active Members",
      value: metrics.totalMembers,
      formatted: `${formatCompactNumber(metrics.totalMembers)}+`,
      subtext: "Across S-VYASA engineering labs",
      icon: Users,
      glowColor: "from-blue-600/20 to-blue-400/5",
      borderColor: "group-hover:border-blue-500/50",
      iconColor: "text-blue-400",
    },
    {
      label: "Pull Requests Merged",
      value: metrics.prsMerged,
      formatted: metrics.prsMerged.toLocaleString(),
      subtext: "Production code accepted into repos",
      icon: GitPullRequest,
      glowColor: "from-purple-600/20 to-purple-400/5",
      borderColor: "group-hover:border-purple-500/50",
      iconColor: "text-purple-400",
    },
    {
      label: "Active Repositories",
      value: metrics.activeRepositories,
      formatted: `${metrics.activeRepositories}`,
      subtext: "Maintained open source codebases",
      icon: FolderGit2,
      glowColor: "from-indigo-600/20 to-indigo-400/5",
      borderColor: "group-hover:border-indigo-500/50",
      iconColor: "text-indigo-400",
    },
    {
      label: "GitHub Contributors",
      value: metrics.totalContributors,
      formatted: `${metrics.totalContributors}`,
      subtext: "Verified code & docs contributors",
      icon: GitCommit,
      glowColor: "from-emerald-600/20 to-emerald-400/5",
      borderColor: "group-hover:border-emerald-500/50",
      iconColor: "text-emerald-400",
    },
    {
      label: "First PRs Shipped",
      value: metrics.firstPrsMerged,
      formatted: `${metrics.firstPrsMerged}+`,
      subtext: "Students who made their 1st OSS commit",
      icon: Sparkles,
      glowColor: "from-amber-600/20 to-amber-400/5",
      borderColor: "group-hover:border-amber-500/50",
      iconColor: "text-amber-400",
    },
    {
      label: "Monthly Activity",
      value: metrics.contributionsThisMonth,
      formatted: `+${metrics.contributionsThisMonth}`,
      subtext: "Commits, reviews & issues this month",
      icon: TrendingUp,
      glowColor: "from-cyan-600/20 to-cyan-400/5",
      borderColor: "group-hover:border-cyan-500/50",
      iconColor: "text-cyan-400",
    },
  ];

  return (
    <section className="relative w-full py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Sync status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800/60 mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Live GitHub Telemetry
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
              Community Impact at Scale
            </h2>
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-400">
            <span className="flex items-center space-x-1.5 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>Cached with Redis</span>
            </span>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Refresh telemetry"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-blue-400" : ""}`}
              />
              <span>{isRefreshing ? "Syncing..." : "Sync Now"}</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {metricCards.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.label}
                className="group relative overflow-hidden p-6 glass-panel glass-panel-hover"
              >
                {/* Background ambient glow */}
                <div
                  className={`absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${item.glowColor} blur-2xl transition-all duration-300 group-hover:scale-150`}
                />

                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                      {item.formatted}
                    </p>
                    <p className="mt-1.5 text-xs text-slate-400">
                      {item.subtext}
                    </p>
                  </div>
                  <div
                    className={`rounded-xl bg-slate-900/90 p-3 border border-slate-800 shadow-inner group-hover:scale-110 transition-transform ${item.iconColor}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
