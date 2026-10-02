"use client";

import * as React from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  GitPullRequest,
  ExternalLink,
  Award,
  Heart,
  Quote,
  Flame,
  PartyPopper,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_FIRST_PR_STORIES } from "@/lib/data/mock-data";

export default function AchievementsPage() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const badges = [
    { name: "First PR Shipped", desc: "Successfully merged 1st pull request", icon: "🌱", holders: "285 members" },
    { name: "Consistent Contributor", desc: "Contributions across 4 consecutive weeks", icon: "🔥", holders: "68 members" },
    { name: "Top Reviewer", desc: "Reviewed and guided 20+ PRs with empathy", icon: "💎", holders: "24 members" },
    { name: "Project Maintainer", desc: "Core release lead for a ZenithenOpen repo", icon: "🛡️", holders: "18 members" },
    { name: "GSoC Scholar", desc: "Accepted into Google Summer of Code / LFX", icon: "🎓", holders: "12 members" },
    { name: "Docs Champion", desc: "Authored comprehensive architectural guides", icon: "📚", holders: "45 members" },
  ];

  return (
    <div className="py-12 bg-grid-pattern min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-800/80 pb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Sparkles className="h-4 w-4" />
            <span>Celebration & Psychological Safety</span>
          </div>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                First PR Hall of Fame
              </h1>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
                <strong className="text-white font-semibold">Everyone started somewhere.</strong>{" "}
                We celebrate the courage it takes to open your first pull request, whether it&apos;s a one-line typo fix or a brand-new feature.
              </p>
            </div>
            <Button
              onClick={triggerConfetti}
              variant="emerald"
              className="shadow-emerald-600/30 gap-2 shrink-0 self-center sm:self-auto"
            >
              <PartyPopper className="h-4 w-4" />
              <span>Celebrate Contributors!</span>
            </Button>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_FIRST_PR_STORIES.map((story) => (
            <Card
              key={story.id}
              className="p-6 glass-panel glass-panel-hover flex flex-col justify-between border-l-4 border-l-amber-500"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={story.memberAvatar}
                      alt={story.memberName}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-800"
                    />
                    <div>
                      <h3 className="font-bold text-white text-sm">
                        {story.memberName}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        @{story.memberUsername}
                      </p>
                    </div>
                  </div>
                  <Badge variant="beginner" className="text-[10px]">
                    {story.category}
                  </Badge>
                </div>

                <div className="relative pl-6 italic text-xs text-slate-300 leading-relaxed">
                  <Quote className="absolute left-0 top-0 h-4 w-4 text-amber-500/60" />
                  &ldquo;{story.quote}&rdquo;
                </div>

                <div className="rounded-lg bg-slate-900/80 p-3 border border-slate-800 text-xs font-mono space-y-1">
                  <p className="text-blue-400 truncate">
                    {story.repoName} • PR #{story.prNumber}
                  </p>
                  <p className="text-slate-300 text-[11px] truncate">
                    {story.prTitle}
                  </p>
                  <div className="flex items-center space-x-3 text-[10px] text-slate-500 pt-1">
                    <span className="text-emerald-400">+{story.linesAdded}</span>
                    <span className="text-red-400">-{story.linesRemoved}</span>
                    <span>Merged on {story.mergedDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] flex items-center">
                  <Heart className="h-3 w-3 text-red-500 mr-1 fill-red-500" />
                  Celebrating Beginner Milestones
                </span>
                <a
                  href={story.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center space-x-1 font-medium"
                >
                  <span>View PR</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </Card>
          ))}
        </div>

        {/* Achievement Badges Showcase */}
        <div className="mt-16 border-t border-slate-800/80 pt-10">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
            <Award className="h-4 w-4" />
            <span>Community Badges</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
            Unlockable Open-Source Milestones
          </h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((b) => (
              <div
                key={b.name}
                className="flex items-start space-x-3.5 p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 transition-colors"
              >
                <div className="text-3xl p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                  {b.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{b.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{b.desc}</p>
                  <span className="inline-block mt-2 text-[10px] text-purple-400 font-semibold bg-purple-950/60 px-2 py-0.5 rounded border border-purple-900/60">
                    {b.holders}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
