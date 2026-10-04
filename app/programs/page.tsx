"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Rocket,
  Code2,
  FolderGit2,
  Globe2,
  Trophy,
  Coins,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProgramCategory = "All" | "Open Source" | "Projects" | "GSoC" | "GSSoC Hall of Fame" | "ESoC & SOB";

interface ProgramItem {
  id: string;
  category: ProgramCategory;
  title: string;
  badge: string;
  badgeColor?: string;
  description: string;
  details: string[];
  actionLabel: string;
  actionHref: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PROGRAMS: ProgramItem[] = [
  {
    id: "open-source",
    category: "Open Source",
    title: "Open Source Foundations",
    badge: "Core Community",
    description:
      "The foundational open-source movement at IST Bengaluru. Designed to empower students with verified code reviews, git hygiene, and production pull requests.",
    details: [
      "Zero-barrier onboarding: No contribution is considered too big or too small",
      "Mentored pull request reviews by senior student engineers",
      "Open-source software licensing, governance, and architectural discussions",
      "Direct integration with the campus contributor leaderboard",
    ],
    actionLabel: "Explore Open Issues",
    actionHref: "/opportunities",
    icon: Code2,
  },
  {
    id: "campus-projects",
    category: "Projects",
    title: "Campus Open-Source Projects",
    badge: "Production Repos",
    description:
      "Production-grade web applications, developer tools, and automation bots created and maintained by IST student developers for real campus impact.",
    details: [
      "ZenithenOpen Platform (Next.js, TypeScript, Tailwind CSS, Theme Engine)",
      "Campus LMS Automation Bot (Python, FastAPI, Telegram API)",
      "Developer Portfolio & Resume Generator (React, GitHub REST API)",
      "Campus Transit & Resource Tracker (Go, PostgreSQL, Docker)",
    ],
    actionLabel: "View All Projects",
    actionHref: "/projects",
    icon: FolderGit2,
  },
  {
    id: "gsoc",
    category: "GSoC",
    title: "Google Summer of Code (GSoC)",
    badge: "Global Fellowship",
    description:
      "A prestigious global fellowship program bringing student developers into open-source software organizations with international mentorship and stipends.",
    details: [
      "Comprehensive proposal drafting workshops and architectural templates",
      "Target organization selection strategy (Apache, Linux Foundation, CNCF, Python)",
      "One-on-one proposal reviews with past accepted IST scholars",
      "Milestone execution support for mid-term and final evaluations",
    ],
    actionLabel: "Learn GSoC Roadmap",
    actionHref: "/learning",
    icon: Globe2,
  },
  {
    id: "gssoc",
    category: "GSSoC Hall of Fame",
    title: "GirlScript Summer of Code (GSSoC) Hall of Fame",
    badge: "Milestones & Awards",
    description:
      "Honoring high-velocity contributors and milestone achievers in India's premier 3-month open-source sprint.",
    details: [
      "Celebration of student contributors who achieved top country-wide ranks",
      "Over 450+ verified pull requests merged across participating organizations",
      "Hall of Fame digital badges and community recognition certificates",
      "Sprint retrospectives and open-source portfolio spotlights",
    ],
    actionLabel: "View Hall of Fame",
    actionHref: "/achievements",
    icon: Trophy,
  },
  {
    id: "esoc-sob",
    category: "ESoC & SOB",
    title: "ESoC & Summer of Bitcoin (SOB)",
    badge: "Protocol & Enterprise",
    description:
      "Specialized open-source fellowship cohorts focused on decentralized networks, Bitcoin Core protocol development, and enterprise distributed systems.",
    details: [
      "Summer of Bitcoin (SOB): Cryptography, Bitcoin Core consensus, and lightning protocols",
      "Enterprise Summer of Code (ESoC): Cloud-native architecture, Kubernetes, and enterprise tooling",
      "Full application bootcamp with coding challenge preparation",
      "Stipend guidance and international mentor networking",
    ],
    actionLabel: "Explore Fellowship Paths",
    actionHref: "/learning",
    icon: Coins,
  },
];

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<ProgramCategory>("All");

  const categories: ProgramCategory[] = [
    "All",
    "Open Source",
    "Projects",
    "GSoC",
    "GSSoC Hall of Fame",
    "ESoC & SOB",
  ];

  const filteredPrograms =
    selectedCategory === "All"
      ? PROGRAMS
      : PROGRAMS.filter((item) => item.category === selectedCategory);

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

        {/* Header Section */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary font-mono">
            <Rocket className="h-3.5 w-3.5" />
            <span>Initiatives & Fellowships</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            ZenithenOpen Programs
          </h1>

          <div className="p-4 rounded-xl border border-border bg-card/60">
            <p className="text-base font-semibold text-primary">
              &ldquo;All programs, nothing is big or small&rdquo;
            </p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Every initiative at ZenithenOpen is treated with equal engineering dedication — whether you are fixing your very first documentation typo or engineering decentralized protocols for global fellowships.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-border/80 pb-4">
          <div className="flex items-center text-xs text-muted-foreground font-mono mr-2">
            <Filter className="h-3.5 w-3.5 mr-1" />
            <span>Filter:</span>
          </div>
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-xs font-semibold"
                    : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Programs Listing */}
        <div className="mt-8 space-y-6">
          {filteredPrograms.map((program) => {
            const Icon = program.icon;
            return (
              <div
                key={program.id}
                className="group rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted border border-border text-primary shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-bold text-foreground">
                          {program.title}
                        </h2>
                        <span className="rounded-md bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary uppercase font-mono">
                          {program.badge}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {program.description}
                      </p>
                    </div>
                  </div>

                  <Link href={program.actionHref} className="sm:self-center shrink-0">
                    <Button
                      size="sm"
                      className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold cursor-pointer"
                    >
                      <span>{program.actionLabel}</span>
                      <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>

                {/* Key Bullet Highlights */}
                <div className="mt-6 pt-5 border-t border-border/70 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {program.details.map((detail, index) => (
                    <div key={index} className="flex items-start space-x-2 text-xs text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="leading-snug text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary mb-3">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-foreground">
            Want to Launch a New Campus Program?
          </h3>
          <p className="mt-1 text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed">
            All programs start with a single motivated student. Submit a proposal or propose a study group in our open repository.
          </p>
          <div className="mt-4">
            <Link href="https://github.com/IST-ZenithenLab/ZenithenOpen" target="_blank" rel="noreferrer">
              <Button size="sm" variant="outline" className="border-border text-xs text-foreground cursor-pointer">
                <span>Submit Program Proposal</span>
                <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
