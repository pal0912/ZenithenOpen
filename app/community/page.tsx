"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users2,
  Heart,
  Milestone,
  Gift,
  Award,
  Sparkles,
  GitPullRequest,
  CheckCircle2,
  Star,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/components/navigation/navigation-context";

export default function CommunityPage() {
  const { activeSection } = useNavigation();

  const milestones = [
    {
      year: "2024",
      title: "Community Genesis",
      description:
        "Founded at IST Bengaluru by a dedicated group of student software developers to bridge the gap between classroom theory and real-world open-source software engineering.",
    },
    {
      year: "2024",
      title: "First 100 Verified Pull Requests",
      description:
        "Celebrated the first century of peer-reviewed pull requests merged into campus repositories with automated CI pipelines.",
    },
    {
      year: "2025",
      title: "Hackathon Triumphs & GSSoC Cohort",
      description:
        "Represented IST in national hackathons and achieved top contributor podium finishes in GirlScript Summer of Code.",
    },
    {
      year: "2025",
      title: "Platform Launch & Multi-Theme Engine",
      description:
        "Engineered the modern ZenithenOpen web portal featuring live GitHub synchronization and a 7-preset developer theme system.",
    },
    {
      year: "2026",
      title: "Global Fellowships & GSoC Tracks",
      description:
        "Expanded into dedicated tracks for Google Summer of Code, Summer of Bitcoin, and enterprise open-source fellowships.",
    },
  ];

  const members = [
    {
      name: "Campus Core Leads",
      role: "Architects & Maintainers",
      count: "8 Leads",
      description: "Steering project architectures, code reviews, and community workshops.",
      badge: "Core Team",
    },
    {
      name: "Student Contributors",
      role: "Code, Docs & Testing",
      count: "150+ Students",
      description: "Active IST student developers writing features, fixing issues, and shipping code.",
      badge: "Contributors",
    },
    {
      name: "Alumni Mentors",
      role: "Industry Advisors",
      count: "12 Mentors",
      description: "Senior engineers and past fellowship scholars providing 1-on-1 code reviews.",
      badge: "Mentors",
    },
    {
      name: "First-Time PR Authors",
      role: "Beginner Cohort",
      count: "80+ Learners",
      description: "First-year and sophomore students learning git, forks, and pull request etiquette.",
      badge: "Rising Stars",
    },
  ];

  const rewardTiers = [
    {
      tier: "First PR Merged",
      badge: "Tier 1",
      requirement: "1 Verified Pull Request",
      rewards: [
        "ZenithenOpen First PR Digital Badge",
        "Community Contributor Directory profile listing",
        "Invitation to private developer Discord channels",
      ],
      icon: GitPullRequest,
    },
    {
      tier: "Bronze Contributor",
      badge: "Tier 2",
      requirement: "5+ Merged Pull Requests",
      rewards: [
        "Official ZenithenOpen holographic laptop stickers pack",
        "Campus open-source achievement certificate",
        "Eligible for code review apprentice role",
      ],
      icon: Award,
    },
    {
      tier: "Silver Contributor",
      badge: "Tier 3",
      requirement: "15+ Merged Pull Requests",
      rewards: [
        "Exclusive ZenithenOpen Developer T-Shirt",
        "Priority pull request reviews by core maintainers",
        "Direct recommendation letters for internship applications",
      ],
      icon: Star,
    },
    {
      tier: "Gold Contributor",
      badge: "Tier 4",
      requirement: "30+ Merged Pull Requests",
      rewards: [
        "ZenithenOpen Community Embroidered Hoodie",
        "Sponsored hackathon registration & travel grants",
        "Nomination for campus open-source leadership positions",
      ],
      icon: Sparkles,
    },
  ];

  const featuredItems = [
    {
      title: "Top Merged Pull Request of the Month",
      author: "IST Student Contributor",
      project: "ZenithenOpen Platform",
      detail:
        "Architected an instantaneous multi-theme switching engine with persistent storage and seamless accessibility tokens.",
      metric: "+1,240 LOC Merged",
    },
    {
      title: "National Hackathon Finalist Team",
      author: "ZenithenOpen Hackers",
      project: "Smart Campus System",
      detail:
        "Engineered an automated campus resource management platform built completely on open-source frameworks.",
      metric: "Top 10 Finalist",
    },
    {
      title: "First PR Milestone Achiever",
      author: "First-Year Sophomore",
      project: "Campus Repositories",
      detail:
        "Diagnosed and resolved a cross-browser rendering bug within 48 hours of onboarding into the community.",
      metric: "Merged in 48h",
    },
  ];

  // Scroll to section when activeSection changes
  React.useEffect(() => {
    if (activeSection) {
      const el = document.getElementById(activeSection);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto max-w-5xl">
        {/* Top Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary font-mono">
            <Users2 className="h-3.5 w-3.5" />
            <span>Student Developers & Mentors</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            ZenithenOpen Community
          </h1>

          <div className="p-4 rounded-xl border border-border bg-card/60">
            <p className="text-base font-semibold text-primary">
              &ldquo;our community :))&rdquo;
            </p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              We are an authentic, student-led open-source community at IST Bengaluru. Click any community option in the top navbar to jump directly to that section.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mt-10 space-y-12">
          {/* Section: About */}
          <section
            id="about"
            className={cn(
              "space-y-4 rounded-2xl transition-all p-1",
              activeSection === "about" && "ring-2 ring-primary/40 rounded-2xl"
            )}
          >
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">About ZenithenOpen</h2>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-xs">
              <p className="text-sm text-foreground/90 leading-relaxed">
                ZenithenOpen was established to democratize open-source software engineering across our campus. We believe practical development skills are forged through real git collaboration, transparent code reviews, and contributing to public repositories that solve authentic campus challenges.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-muted/50 border border-border/80">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary font-mono">
                    Radical Inclusivity
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Zero barrier to entry. We guide every student from installing Git to merging their first pull request.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border/80">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary font-mono">
                    Production Standards
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Learn modern toolchains: automated testing, TypeScript strict typing, and conventional commits.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border/80">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary font-mono">
                    Merit Recognition
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Automatic pull request verification and leaderboard tracking based strictly on code contributions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Journey */}
          <section
            id="journey"
            className={cn(
              "space-y-4 rounded-2xl transition-all p-1",
              activeSection === "journey" && "ring-2 ring-primary/40 rounded-2xl"
            )}
          >
            <div className="flex items-center space-x-2">
              <Milestone className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Our Community Journey</h2>
            </div>
            <div className="relative border-l-2 border-border ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
              {milestones.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-bold text-primary font-mono uppercase tracking-wider">
                    {item.year}
                  </span>
                  <h3 className="text-base font-bold text-foreground mt-0.5">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Members */}
          <section
            id="members"
            className={cn(
              "space-y-4 rounded-2xl transition-all p-1",
              activeSection === "members" && "ring-2 ring-primary/40 rounded-2xl"
            )}
          >
            <div className="flex items-center space-x-2">
              <Users2 className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Community Members</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {members.map((group, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary font-mono">
                      {group.badge}
                    </span>
                    <span className="text-xs font-bold text-foreground font-mono">
                      {group.count}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mt-3">
                    {group.name}
                  </h3>
                  <p className="text-xs font-medium text-primary mt-0.5">
                    {group.role}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {group.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Rewards */}
          <section
            id="rewards"
            className={cn(
              "space-y-4 rounded-2xl transition-all p-1",
              activeSection === "rewards" && "ring-2 ring-primary/40 rounded-2xl"
            )}
          >
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Contributor Rewards & Swag</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rewardTiers.map((tier, idx) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-primary px-2 py-0.5 rounded-md bg-muted border border-border">
                          {tier.badge}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        {tier.tier}
                      </h3>
                      <p className="text-xs font-semibold text-primary font-mono mt-0.5">
                        {tier.requirement}
                      </p>
                      <div className="mt-4 space-y-2">
                        {tier.rewards.map((reward, rIdx) => (
                          <div key={rIdx} className="flex items-start space-x-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                            <span className="leading-snug">{reward}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Featured */}
          <section
            id="featured"
            className={cn(
              "space-y-4 rounded-2xl transition-all p-1",
              activeSection === "featured" && "ring-2 ring-primary/40 rounded-2xl"
            )}
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Featured Highlights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-muted-foreground font-semibold">
                        {item.project}
                      </span>
                      <span className="text-[10px] font-bold font-mono text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                        {item.metric}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-muted-foreground font-mono">
                      By {item.author}
                    </span>
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Banner */}
        <div className="mt-12 rounded-2xl border border-border bg-card/60 p-6 sm:p-8 text-center">
          <h3 className="text-base font-bold text-foreground">
            Ready to Join Our Community?
          </h3>
          <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            Star our repositories, join our Discord workspace, and submit your first pull request today.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link href="https://github.com/IST-ZenithenLab/ZenithenOpen" target="_blank" rel="noreferrer">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold cursor-pointer">
                <GithubIcon className="mr-1.5 h-3.5 w-3.5" />
                <span>Visit GitHub Organization</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
