"use client";

import * as React from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Award,
  PartyPopper,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_FIRST_PR_STORIES } from "@/lib/data/mock-data";

export default function AchievementsPage() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const badges = [
    { name: "First PR Shipped", desc: "Successfully merged 1st pull request into a campus repo", icon: "🌱", criteria: "1 PR merged" },
    { name: "Consistent Contributor", desc: "Contributions across 4 consecutive calendar weeks", icon: "🔥", criteria: "4-week streak" },
    { name: "Top Reviewer", desc: "Reviewed and guided 15+ student pull requests with empathy", icon: "💎", criteria: "15 code reviews" },
    { name: "Project Maintainer", desc: "Core release lead for a verified ZenithenOpen repo", icon: "🛡️", criteria: "Maintainer role" },
    { name: "GSoC Scholar", desc: "Accepted into Google Summer of Code or LFX Mentorship", icon: "🎓", criteria: "Fellowship accepted" },
    { name: "Docs Champion", desc: "Authored comprehensive architectural specs and tutorials", icon: "📚", criteria: "3+ docs contributions" },
  ];

  return (
    <div className="py-16 bg-grid-pattern min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-white/[0.06] pb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-amber-400 font-mono">
            <Sparkles className="h-4 w-4" />
            <span>Community Milestones</span>
          </div>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                First PR Hall of Fame
              </h1>
              <p className="mt-1 text-sm text-slate-400 max-w-2xl leading-relaxed">
                Celebrating the courage it takes to open your first pull request. Every contributor started with a single commit.
              </p>
            </div>
            <Button
              onClick={triggerConfetti}
              className="gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg shadow-amber-500/20 text-xs shrink-0 self-start sm:self-auto"
            >
              <PartyPopper className="h-4 w-4" />
              <span>Celebrate!</span>
            </Button>
          </div>
        </div>

        {/* Stories Grid or Zero State */}
        {MOCK_FIRST_PR_STORIES.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-16 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Awaiting First Pull Request Story</h3>
            <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              When your first pull request is merged, you will be invited to submit your quote and take your place in the Hall of Fame.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/learning">
                <Button className="gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs">
                  <span>Start Learning Roadmap</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ) : null}

        {/* Community Badges Showcase */}
        <div className="mt-16">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-4">
            <Award className="h-4 w-4 text-blue-400" />
            <span>Available Achievement Badges</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {badges.map((b) => (
              <Card
                key={b.name}
                className="p-6 glass-panel glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{b.icon}</span>
                    <Badge variant="outline" className="text-[10px] font-mono border-white/[0.1]">
                      {b.criteria}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-white text-base mt-4">{b.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{b.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
