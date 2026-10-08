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
import { MOCK_PROJECTS, MOCK_OPPORTUNITIES } from "@/lib/data/mock-data";
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
  const [isExploreOpen, setIsExploreOpen] = React.useState(true);

  // Default to Open Source
  const defaultProgramId = "open-source";
  const currentSelectedId = activeSection || defaultProgramId;
  const currentProgram = PROGRAMS.find((p) => p.id === currentSelectedId) || PROGRAMS[0];

  const CurrentIcon = currentProgram.icon;
  const featuredProjects = MOCK_PROJECTS.slice(0, 2);
  const featuredOpportunities = MOCK_OPPORTUNITIES.slice(0, 4);

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
                          setIsExploreOpen((prev) => !prev);
                          if (!isExploreOpen) {
                            setTimeout(() => {
                              document.getElementById("explore-open-source")?.scrollIntoView({ behavior: "smooth" });
                            }, 100);
                          }
                        }}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold cursor-pointer shadow-md shadow-primary/25 gap-1.5"
                      >
                        <Compass className="h-3.5 w-3.5" />
                        <span>{isExploreOpen ? "Hide Open Issues" : "Explore Open Issues"}</span>
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200",
                            isExploreOpen && "rotate-180"
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

              {/* Explore Open Source Section - rendered on the same page */}
              {currentProgram.id === "open-source" && isExploreOpen && (
                <motion.div
                  id="explore-open-source"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="space-y-6 pt-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-primary font-mono">
                        <Compass className="h-4 w-4" />
                        <span>Gateway to Contribution</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1">
                        Explore Open Source Issues
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
                        Triaged starter issues and good-first-issues across official IST-ZenithenLab repositories.
                      </p>
                    </div>
                    <Link href="/opportunities">
                      <Button variant="outline" size="sm" className="group text-xs border-border shrink-0 cursor-pointer">
                        <span>View Full Opportunity Board</span>
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>

                  {/* Issues Cards Grid matching programs/projects */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredOpportunities.map((opp) => (
                      <Card
                        key={opp.id}
                        className="group relative overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-colors duration-150 border-border bg-card"
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-mono font-semibold text-primary">
                                  {opp.repoFullName}#{opp.issueNumber}
                                </span>
                              </div>
                              <CardTitle className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                                <a
                                  href={opp.issueUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline"
                                >
                                  {opp.title}
                                </a>
                              </CardTitle>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-xs text-emerald-700 bg-emerald-500/10 border-emerald-500/30 font-semibold px-2.5 py-0.5 rounded-md capitalize shrink-0"
                            >
                              {opp.difficulty}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {opp.labels.map((label) => (
                              <span
                                key={label.name}
                                className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/50"
                              >
                                {label.name}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-3 border-t border-border/60 flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{
                                backgroundColor:
                                  opp.language === "TypeScript"
                                    ? "#3178c6"
                                    : opp.language === "C++"
                                    ? "#f34b7d"
                                    : "#10b981",
                              }}
                            />
                            <span className="font-semibold text-foreground">{opp.language}</span>
                          </div>
                          <a
                            href={opp.issueUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button size="sm" variant="outline" className="text-xs gap-1.5 shadow-xs cursor-pointer">
                              <GithubIcon className="h-3.5 w-3.5" />
                              <span>View on GitHub</span>
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </a>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
