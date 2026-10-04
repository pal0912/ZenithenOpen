"use client";

import * as React from "react";
import {
  Users,
  GitPullRequest,
  FolderGit2,
  Award,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { COMMUNITY_METRICS } from "@/lib/data/mock-data";

export function LiveMetricsDashboard() {
  const [metrics, setMetrics] = React.useState(COMMUNITY_METRICS);

  React.useEffect(() => {
    fetch("/api/metrics")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json) setMetrics(json.data || json);
      })
      .catch(() => {});
  }, []);

  const metricCards = [
    {
      label: "Registered Contributors",
      value: metrics.totalMembers,
      formatted: `${metrics.totalMembers}`,
      subtext: "Students linked via GitHub OAuth",
      icon: Users,
      glowColor: "from-primary/20 to-primary/5",
      iconColor: "text-primary",
    },
    {
      label: "Quality PRs Merged",
      value: metrics.qualityPrsMerged ?? 0,
      formatted: `${metrics.qualityPrsMerged ?? 0}`,
      subtext: "Merged in top repositories",
      icon: Award,
      glowColor: "from-secondary/20 to-secondary/5",
      iconColor: "text-secondary",
    },
    {
      label: "Campus Repositories",
      value: metrics.activeRepositories,
      formatted: `${metrics.activeRepositories}`,
      subtext: "Tracked from IST-ZenithenLab",
      icon: FolderGit2,
      glowColor: "from-primary/20 to-secondary/5",
      iconColor: "text-primary",
    },
    {
      label: "Pull Requests Merged",
      value: metrics.prsMerged,
      formatted: `${metrics.prsMerged}`,
      subtext: "Merged into campus repositories",
      icon: GitPullRequest,
      glowColor: "from-accent/20 to-accent/5",
      iconColor: "text-accent",
    },
    {
      label: "First PRs Celebrated",
      value: metrics.firstPrsMerged,
      formatted: `${metrics.firstPrsMerged}`,
      subtext: "First-time open source contributors",
      icon: Sparkles,
      glowColor: "from-amber-500/20 to-amber-500/5",
      iconColor: "text-amber-400",
    },
    {
      label: "Monthly Activity",
      value: metrics.contributionsThisMonth,
      formatted: `${metrics.contributionsThisMonth}`,
      subtext: "Commits, reviews & issue triage",
      icon: TrendingUp,
      glowColor: "from-accent/20 to-primary/5",
      iconColor: "text-accent",
    },
  ];

  return (
    <section className="relative w-full py-14 bg-background transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-6 border-b border-border mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Our community
          </h2>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {metricCards.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.label}
                className="group relative overflow-hidden p-6 hover:border-primary/40 hover:shadow-md transition-all border-border bg-card"
              >
                {/* Subtle ambient light */}
                <div
                  className={`absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${item.glowColor} blur-2xl transition-all duration-300 group-hover:scale-150`}
                />

                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-mono">
                      {item.formatted}
                    </p>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {item.subtext}
                    </p>
                  </div>
                  <div
                    className={`rounded-xl bg-muted/50 p-3 border border-border group-hover:border-primary/40 transition-colors ${item.iconColor}`}
                  >
                    <Icon className="h-5 w-5" />
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
