"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/components/navigation/navigation-context";

interface ProgramItem {
  id: string;
  category: string;
  title: string;
  badge: string;
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
    id: "projects",
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
  const { popupSection, closePopup, openPopup, activeSection, setActiveSection } = useNavigation();

  // "make sure that open souce option is default and user see that as a default thing"
  const defaultProgramId = "open-source";
  const currentSelectedId = activeSection || defaultProgramId;
  const currentProgram = PROGRAMS.find((p) => p.id === currentSelectedId) || PROGRAMS[0];

  // Active modal program if popup requested
  const activeModalProgram = PROGRAMS.find((p) => p.id === popupSection);

  const CurrentIcon = currentProgram.icon;

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
              Every initiative at ZenithenOpen is treated with equal engineering dedication. Select any program from the top navbar to explore details and view its popup.
            </p>
          </div>
        </div>

        {/* DEFAULT VIEW: Active Program Featured Showcase */}
        <div className="mt-10">
          <motion.div
            key={currentProgram.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="rounded-2xl border-2 border-primary/30 bg-card p-6 sm:p-10 shadow-lg shadow-primary/5 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
              <div className="flex items-start space-x-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/25 text-primary shrink-0 shadow-xs">
                  <CurrentIcon className="h-7 w-7" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary uppercase font-mono">
                      {currentProgram.badge}
                    </span>
                    <span className="rounded-md bg-muted border border-border px-2 py-0.5 text-[10px] font-semibold text-muted-foreground font-mono">
                      Active Program
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-2">
                    {currentProgram.title}
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                    {currentProgram.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 sm:self-start">
                <Button
                  size="sm"
                  onClick={() => openPopup(currentProgram.id)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold cursor-pointer shadow-md shadow-primary/25"
                >
                  <span>Open Popup</span>
                  <ChevronRight className="ml-1 h-3.5 w-3.5" />
                </Button>
                <Link href={currentProgram.actionHref}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-border text-xs text-foreground hover:bg-muted cursor-pointer"
                  >
                    <span>{currentProgram.actionLabel}</span>
                    <ExternalLink className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Key Bullet Highlights */}
            <div className="mt-8 pt-6 border-t border-border/70 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary font-mono">
                Key Initiatives & Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentProgram.details.map((detail, index) => (
                  <div key={index} className="flex items-start space-x-2.5 text-xs sm:text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="leading-snug text-muted-foreground">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* All Programs Directory Cards */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center space-x-2">
            <Layers className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground font-mono">
              All Campus Programs
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROGRAMS.map((prog) => {
              const Icon = prog.icon;
              const isSelected = prog.id === currentSelectedId;
              return (
                <div
                  key={prog.id}
                  onClick={() => {
                    setActiveSection(prog.id);
                    openPopup(prog.id);
                  }}
                  className={cn(
                    "rounded-xl border p-4.5 cursor-pointer transition-all flex flex-col justify-between select-none group",
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                      : "border-border bg-card hover:border-primary/40 hover:bg-muted/40"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        {prog.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {prog.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                      {prog.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-medium text-primary font-mono">
                      {isSelected ? "Currently Viewing" : "Click to View"}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
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

      {/* Program Details Popup Modal */}
      <AnimatePresence>
        {activeModalProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              aria-hidden="true"
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeModalProgram.title}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-2xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl text-foreground select-none"
            >
              {/* Header with Close X */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary shrink-0">
                    <activeModalProgram.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-primary px-2 py-0.5 rounded-md bg-muted border border-border">
                      {activeModalProgram.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-foreground mt-1">
                      {activeModalProgram.title}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closePopup}
                  aria-label="Close popup"
                  className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {activeModalProgram.description}
              </p>

              {/* Key Program Highlights */}
              <div className="mt-6 space-y-2.5 rounded-xl border border-border/80 bg-muted/40 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-primary font-mono">
                  Program Highlights & Curriculum
                </p>
                {activeModalProgram.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="leading-snug text-muted-foreground">{detail}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-border/80 flex flex-wrap items-center justify-end gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closePopup}
                  className="border-border text-xs text-foreground cursor-pointer"
                >
                  Close
                </Button>
                <Link href={activeModalProgram.actionHref} onClick={closePopup}>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold cursor-pointer shadow-md shadow-primary/25"
                  >
                    <span>{activeModalProgram.actionLabel}</span>
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
