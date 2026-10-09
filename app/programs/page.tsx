"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Rocket,
  Code2,
  FolderGit2,
  Globe2,
  Trophy,
  Coins,
  ExternalLink,
  CheckCircle2,
  Compass,
  ChevronDown,
  Flame,
  Medal,
  Award,
  Sparkles,
  GitPullRequest,
  GitCommit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/ui/icons";
import { MOCK_PROJECTS } from "@/lib/data/mock-data";
import {
  STUDENT_COMPETITORS,
  CompetitionTimeframe,
} from "@/lib/data/student-competition";
import { useNavigation } from "@/components/navigation/navigation-context";
import { cn } from "@/lib/utils";

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
    actionLabel: "View Competition Arena",
    actionHref: "#student-competition",
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
    actionLabel: "View Project Directory",
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
  const { activeSection } = useNavigation();
  const [isCompetitionOpen, setIsCompetitionOpen] = React.useState(true);
  const [competitionTimeframe, setCompetitionTimeframe] = React.useState<CompetitionTimeframe>("week");

  // Default to Open Source
  const defaultProgramId = "open-source";
  const currentSelectedId = activeSection || defaultProgramId;
  const currentProgram = PROGRAMS.find((p) => p.id === currentSelectedId) || PROGRAMS[0];

  const CurrentIcon = currentProgram.icon;
  const featuredProjects = MOCK_PROJECTS.slice(0, 2);

  // Sorted students for competition arena based on active timeframe
  const sortedStudents = [...STUDENT_COMPETITORS].sort(
    (a, b) => a[competitionTimeframe].rank - b[competitionTimeframe].rank
  );
  const podiumStudents = sortedStudents.slice(0, 3);
  const remainingStudents = sortedStudents.slice(3);

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
              Every initiative at ZenithenOpen is treated with equal engineering dedication. Switch between programs using the top navbar options.
            </p>
          </div>
        </div>

        {/* ONLY THE SELECTED PROGRAM INFO - NO OTHER THINGS */}
        <div className="mt-10">
          {currentProgram.id === "projects" ? (
            /* Component matching Picture 3: Campus Project Catalog */
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-primary font-mono">
                    <FolderGit2 className="h-4 w-4" />
                    <span>Ecosystem Repositories</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1">
                    Campus Project Catalog
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
                    Open-source software maintained by IST engineers and student contributors.
                  </p>
                </div>
                <Link href="/projects">
                  <Button variant="outline" size="sm" className="group text-xs border-border shrink-0 cursor-pointer">
                    <span>View Project Directory</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>

              {/* Project Cards Grid matching Picture 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="group relative overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-colors duration-150 border-border bg-card"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            <a
                              href={project.repositoryUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {project.name}
                            </a>
                          </CardTitle>
                          <CardDescription className="text-xs text-muted-foreground mt-0.5">
                            {project.tagline}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-xs text-muted-foreground border-border/80 font-normal px-2.5 py-0.5 rounded-md">
                          {project.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 border-t border-border/60 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: project.languageColor }}
                        />
                        <span className="font-semibold text-foreground">{project.primaryLanguage}</span>
                      </div>
                      <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" variant="outline" className="text-xs gap-1.5 shadow-xs cursor-pointer">
                          <GithubIcon className="h-3.5 w-3.5" />
                          <span>GitHub</span>
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Student Contributor Leaderboard */}
              <div className="pt-8 border-t border-border/80">
                <StudentLeaderboardSection
                  timeframe={competitionTimeframe}
                  setTimeframe={setCompetitionTimeframe}
                  podiumStudents={podiumStudents}
                  remainingStudents={remainingStudents}
                />
              </div>
            </motion.div>
          ) : (
            <div className="space-y-8">
              <motion.div
                key={currentProgram.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="rounded-2xl border-2 border-primary/30 bg-card p-6 sm:p-10 shadow-lg shadow-primary/5 transition-colors duration-150"
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
                          Program Information
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

                  <div className="shrink-0 sm:self-start">
                    {currentProgram.id === "open-source" ? (
                      <Button
                        size="sm"
                        onClick={() => {
                          setIsCompetitionOpen((prev) => !prev);
                          if (!isCompetitionOpen) {
                            setTimeout(() => {
                              document.getElementById("student-competition")?.scrollIntoView({ behavior: "smooth" });
                            }, 100);
                          }
                        }}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold cursor-pointer shadow-md shadow-primary/25 gap-1.5"
                      >
                        <Trophy className="h-3.5 w-3.5 text-amber-300" />
                        <span>{isCompetitionOpen ? "Hide Competition Arena" : "View Competition Arena"}</span>
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200",
                            isCompetitionOpen && "rotate-180"
                          )}
                        />
                      </Button>
                    ) : (
                      <Link href={currentProgram.actionHref}>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold cursor-pointer shadow-md shadow-primary/25"
                        >
                          <span>{currentProgram.actionLabel}</span>
                          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    )}
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

              {/* Student Competition Arena - rendered on the same page */}
              {currentProgram.id === "open-source" && isCompetitionOpen && (
                <StudentLeaderboardSection
                  timeframe={competitionTimeframe}
                  setTimeframe={setCompetitionTimeframe}
                  podiumStudents={podiumStudents}
                  remainingStudents={remainingStudents}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface StudentLeaderboardSectionProps {
  timeframe: CompetitionTimeframe;
  setTimeframe: (timeframe: CompetitionTimeframe) => void;
  podiumStudents: typeof STUDENT_COMPETITORS;
  remainingStudents: typeof STUDENT_COMPETITORS;
}

function StudentLeaderboardSection({
  timeframe,
  setTimeframe,
  podiumStudents,
  remainingStudents,
}: StudentLeaderboardSectionProps) {
  return (
    <motion.div
      id="student-competition"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-6 pt-2"
    >
      {/* Competition Header & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-primary font-mono">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span>Student Competition Arena</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1">
            Campus Contributor Leaderboard
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            Tracking top student developers across weekly sprints, monthly rankings, and all-time achievements.
          </p>
        </div>

        {/* Timeframe Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-muted/70 rounded-xl border border-border shrink-0">
          <button
            onClick={() => setTimeframe("week")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
              timeframe === "week"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-card/60"
            )}
          >
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>Top of the Week</span>
          </button>
          <button
            onClick={() => setTimeframe("month")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
              timeframe === "month"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-card/60"
            )}
          >
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            <span>Top of the Month</span>
          </button>
          <button
            onClick={() => setTimeframe("overall")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
              timeframe === "overall"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-card/60"
            )}
          >
            <Award className="h-3.5 w-3.5 text-blue-400" />
            <span>Overall</span>
          </button>
        </div>
      </div>

      {/* Top 3 Podium Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        {podiumStudents.map((student) => {
          const stats = student[timeframe];
          const isFirst = stats.rank === 1;
          const isSecond = stats.rank === 2;

          return (
            <Card
              key={student.id}
              className={cn(
                "relative overflow-hidden flex flex-col justify-between border-2 transition-all duration-200",
                isFirst && "border-amber-500/50 bg-gradient-to-b from-amber-500/10 via-card to-card shadow-md shadow-amber-500/5 md:-translate-y-1.5",
                isSecond && "border-slate-400/50 bg-gradient-to-b from-slate-400/10 via-card to-card",
                stats.rank === 3 && "border-amber-700/40 bg-gradient-to-b from-amber-700/10 via-card to-card"
              )}
            >
              <CardHeader className="pb-3">
                {/* Rank Ribbon */}
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-bold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs",
                      isFirst && "bg-amber-500/20 text-amber-600 border-amber-500/40",
                      isSecond && "bg-slate-400/20 text-slate-600 border-slate-400/40",
                      stats.rank === 3 && "bg-amber-700/20 text-amber-700 border-amber-700/40"
                    )}
                  >
                    {isFirst ? "🥇 1st Place Champion" : isSecond ? "🥈 2nd Place" : "🥉 3rd Place"}
                  </Badge>
                </div>

                {/* Student Profile Info */}
                <div className="flex items-center space-x-3">
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="h-12 w-12 rounded-full border-2 border-primary/30 bg-muted/80 shrink-0 p-0.5"
                  />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base font-bold text-foreground truncate">
                      {student.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground font-mono truncate">
                      @{student.username}
                    </p>
                    <p className="text-[11px] text-muted-foreground font-medium mt-0.5">
                      {student.department} • {student.year}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-3.5">
                {/* Badge */}
                <div className="flex items-center gap-1.5">
                  <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-md border", student.badgeColor)}>
                    {student.badge}
                  </span>
                </div>

                {/* Competition Stats Metrics */}
                <div className="grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-muted/50 border border-border/60 text-center">
                  <div>
                    <div className="text-base font-extrabold text-foreground">
                      {stats.points}
                    </div>
                    <div className="text-[10px] uppercase font-mono text-muted-foreground font-semibold">
                      Points
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-primary">
                      {stats.prs}
                    </div>
                    <div className="text-[10px] uppercase font-mono text-muted-foreground font-semibold">
                      PRs
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-emerald-600">
                      {stats.qualityPrs}
                    </div>
                    <div className="text-[10px] uppercase font-mono text-muted-foreground font-semibold">
                      Quality PR
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-foreground">
                      {stats.reviews}
                    </div>
                    <div className="text-[10px] uppercase font-mono text-muted-foreground font-semibold">
                      Reviews
                    </div>
                  </div>
                </div>

                {/* Top Contribution Highlight */}
                <div className="p-2.5 rounded-xl bg-primary/5 border border-primary/15 space-y-1">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    <span>Top Contribution</span>
                  </div>
                  <p className="text-xs text-foreground font-medium leading-snug line-clamp-2">
                    {stats.topContribution.title}
                  </p>
                  <div className="text-[11px] text-muted-foreground font-mono pt-0.5">
                    {stats.topContribution.repo}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-3 border-t border-border/60 mt-auto">
                <a
                  href={`https://github.com/${student.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button size="sm" variant="outline" className="w-full text-xs gap-1.5 cursor-pointer shadow-xs">
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>View GitHub Profile</span>
                    <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
                  </Button>
                </a>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Rest of Competitors (Ranks 4+) */}
      <div className="mt-8 space-y-3 pt-4 border-t border-border/80">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
            Contender Rankings (Ranks 4 - 6)
          </h3>
          <Link href="/leaderboard">
            <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/90 h-7 px-2">
              <span>See All Student Rankings</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {remainingStudents.map((student) => {
            const stats = student[timeframe];
            return (
              <Card
                key={student.id}
                className="flex flex-col justify-between border-border bg-card p-4 hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                      #{stats.rank}
                    </span>
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md border", student.badgeColor)}>
                      {student.badge}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <img
                      src={student.avatarUrl}
                      alt={student.name}
                      className="h-9 w-9 rounded-full border border-border bg-muted p-0.5"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-foreground truncate">
                        {student.name}
                      </h4>
                      <p className="text-[11px] text-muted-foreground font-mono truncate">
                        @{student.username} • {student.department}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1 p-2 rounded-lg bg-muted/40 text-center text-xs">
                    <div>
                      <div className="font-bold text-foreground">{stats.points}</div>
                      <div className="text-[9px] text-muted-foreground font-mono">PTS</div>
                    </div>
                    <div>
                      <div className="font-bold text-primary">{stats.prs}</div>
                      <div className="text-[9px] text-muted-foreground font-mono">PRS</div>
                    </div>
                    <div>
                      <div className="font-bold text-emerald-600">{stats.qualityPrs}</div>
                      <div className="text-[9px] text-muted-foreground font-mono">Q-PR</div>
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{stats.reviews}</div>
                      <div className="text-[9px] text-muted-foreground font-mono">REVIEWS</div>
                    </div>
                  </div>

                  <p className="text-[11px] text-muted-foreground line-clamp-1 italic">
                    &ldquo;{stats.topContribution.title}&rdquo;
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-border/50">
                  <a
                    href={`https://github.com/${student.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button size="sm" variant="ghost" className="w-full text-xs h-7 gap-1 text-muted-foreground hover:text-foreground">
                      <GithubIcon className="h-3 w-3" />
                      <span>GitHub</span>
                      <ExternalLink className="h-2.5 w-2.5 ml-auto" />
                    </Button>
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
