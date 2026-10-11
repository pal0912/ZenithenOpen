"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  GitBranch,
  Rocket,
  ArrowDown,
  Calendar,
  Layers,
  Award,
  Terminal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ChapterYear = "2025" | "2026";

interface Milestone {
  index: string;
  category: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface ChapterData {
  year: ChapterYear;
  phaseName: string;
  badge: string;
  headline: string;
  leadParagraph: string;
  milestones: Milestone[];
  statsSnippet: { label: string; value: string }[];
}

const CHAPTERS: Record<ChapterYear, ChapterData> = {
  "2025": {
    year: "2025",
    phaseName: "Genesis Chapter",
    badge: "The Inaugural Batch",
    headline: "Year one — founded with the first batch",
    leadParagraph:
      "The college opened its doors in 2025, and ZenithenLab started with it. One batch, a first set of workshops, and the first wins on the board before the year was out.",
    milestones: [
      {
        index: "01",
        category: "FOUNDATION",
        title: "ZenithenLab founded alongside IST's first-ever batch",
        description:
          "Formed by founding student builders at the Institute of Science & Technology to cultivate a genuine open-source engineering culture.",
        icon: Terminal,
      },
      {
        index: "02",
        category: "FIRST WORKSHOPS",
        title: "Peer-led engineering bootcamps",
        description:
          "Hands-on interactive workshops run by student mentors: Git & GitHub Workflow Mastery, Full-Stack Web Development, and Linux Tooling.",
        icon: Layers,
      },
      {
        index: "03",
        category: "FIRST-PR GATEWAY",
        title: "First-PR onboarding repo & ideathon victories",
        description:
          "Deployed the First-PR practice repository to eliminate first-contribution friction, securing top podium finishes in campus hackathons.",
        icon: GitBranch,
      },
    ],
    statsSnippet: [
      { label: "Founding Batch", value: "2025" },
      { label: "Workshops Held", value: "12+" },
      { label: "Podium Wins", value: "2" },
    ],
  },
  "2026": {
    year: "2026",
    phaseName: "Frontier Chapter",
    badge: "Production Velocity",
    headline: "Year two — scaling campus open-source velocity",
    leadParagraph:
      "From first commits to production ecosystems. 2026 marks the launch of ZenithenOpen, genuine USN student verification, real-time analytics, and competitive campus leaderboards.",
    milestones: [
      {
        index: "01",
        category: "PRODUCTION PLATFORM",
        title: "ZenithenOpen platform deployed to production",
        description:
          "Full-stack campus developer portal powering 80+ student contributors across Computer Science, Information Science, and Electronics departments.",
        icon: Rocket,
      },
      {
        index: "02",
        category: "CAMPUS GATEWAYS",
        title: "First-PR & ZenithenOpen direct repository integration",
        description:
          "Triaged Good First Issues, automated GitHub OAuth synchronization, and dedicated student maintainer pairing channels.",
        icon: Sparkles,
      },
      {
        index: "03",
        category: "COMPETITION ARENA",
        title: "Gamified contributor arena & Hall of Fame",
        description:
          "Automated PR quality scoring, weekly sprint leaderboards, First-PR milestone badges, and transparent student achievement profiles.",
        icon: Award,
      },
    ],
    statsSnippet: [
      { label: "Active Cohort", value: "2026" },
      { label: "Verified Students", value: "80+" },
      { label: "Campus Repos", value: "2" },
    ],
  },
};

export function CampusEvolutionSection() {
  const [activeYear, setActiveYear] = React.useState<ChapterYear>("2025");
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const chapter = CHAPTERS[activeYear];

  // Subtle 3D mouse parallax tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: y * -10 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <section
      id="campus-evolution"
      className="py-16 md:py-24 border-t border-border bg-gradient-to-b from-background via-card/15 to-background relative overflow-hidden"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none transform-gpu" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none transform-gpu" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Pill Kicker */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border/70 mb-10 gap-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                Chronicle & Evolution
              </span>
              <p className="text-sm font-bold text-foreground">
                The Campus Open-Source Journey
              </p>
            </div>
          </div>

          {/* Interactive Year Phase Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl bg-card border border-border shadow-xs">
            {(["2025", "2026"] as ChapterYear[]).map((year) => {
              const isSelected = activeYear === year;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => setActiveYear(year)}
                  className={`relative px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="evolution-year-pill"
                      className="absolute inset-0 rounded-lg bg-primary shadow-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>{year}</span>
                    <span className="text-[10px] opacity-75 font-sans">
                      {year === "2025" ? "Genesis" : "Frontier"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 3D Holographic Chamber Container with Scroll Entrance */}
        <div className="[perspective:1200px]">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{
              opacity: 0,
              y: 60,
              rotateX: 14,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
            }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            animate={
              isHovered
                ? {
                    rotateX: tilt.y,
                    rotateY: tilt.x,
                    transition: { duration: 0.1, ease: "linear" },
                  }
                : {
                    rotateX: 0,
                    rotateY: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  }
            }
            className="group relative rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl hover:border-primary/40 transition-colors transform-gpu will-change-transform overflow-hidden"
          >
            {/* Fine texture & ambient glow inside card */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Huge 3D Stroked Typography Year */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div
                  onClick={() =>
                    setActiveYear((prev) => (prev === "2025" ? "2026" : "2025"))
                  }
                  className="cursor-pointer group/numeral relative"
                  title="Click to toggle chapter"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeYear}
                      initial={{ opacity: 0, scale: 0.85, y: -20, rotateX: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, scale: 1.1, y: 20, rotateX: -20 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="relative font-mono font-black select-none tracking-tighter"
                    >
                      {/* Ambient blur glow behind year */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 text-primary blur-2xl opacity-20 pointer-events-none select-none"
                        style={{
                          fontSize: "clamp(6rem, 16vw, 11rem)",
                          lineHeight: 0.9,
                        }}
                      >
                        {chapter.year}
                      </span>

                      {/* Stroked Outline Numeral */}
                      <span
                        className="block font-black font-mono tracking-tighter transition-all group-hover/numeral:scale-[1.02] transform-gpu"
                        style={{
                          fontSize: "clamp(6rem, 16vw, 11rem)",
                          lineHeight: 0.9,
                          color: "transparent",
                          WebkitTextStroke:
                            "2.5px var(--foreground, rgba(255, 255, 255, 0.75))",
                          textShadow:
                            "0 0 40px rgba(var(--primary-rgb, 59, 130, 246), 0.2)",
                        }}
                      >
                        {chapter.year}
                      </span>
                    </motion.div>
                  </AnimatePresence>

                  {/* Micro hint below year */}
                  <div className="mt-2 flex items-center justify-center lg:justify-start gap-2">
                    <Badge
                      variant="outline"
                      className="text-[11px] font-mono bg-primary/10 text-primary border-primary/25 px-2.5 py-0.5"
                    >
                      {chapter.badge}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      {chapter.phaseName}
                    </span>
                  </div>
                </div>

                {/* Chapter Key Metric Highlights */}
                <div className="mt-8 grid grid-cols-3 gap-3 w-full max-w-sm pt-6 border-t border-border/60">
                  {chapter.statsSnippet.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl bg-background/50 border border-border/50 p-2.5 text-center"
                    >
                      <p className="text-base sm:text-lg font-bold font-mono text-foreground">
                        {s.value}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Narrative Headline, Story & 3D Milestone Cards */}
              <div className="lg:col-span-7 space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeYear}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                      {chapter.headline}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {chapter.leadParagraph}
                    </p>

                    {/* Milestone List (Inspired by the Reference Dash Bullets, Elevated with 3D Micro-Cards) */}
                    <div className="mt-6 space-y-3">
                      {chapter.milestones.map((milestone, idx) => {
                        const Icon = milestone.icon;
                        return (
                          <motion.div
                            key={milestone.title}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: idx * 0.08,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="group/item flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-card/80 border border-border/70 hover:border-primary/40 hover:bg-card hover:shadow-md transition-all duration-200 transform-gpu hover:translate-x-1.5"
                          >
                            {/* Dash & Index Badge */}
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover/item:scale-110 transition-transform">
                                <Icon className="h-4 w-4" />
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono font-semibold text-primary uppercase tracking-wider">
                                  — {milestone.category}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors mt-0.5">
                                {milestone.title}
                              </p>
                              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                                {milestone.description}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Subtext Link to Ecosystem Repositories Below */}
                <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Open-source evolution continues below</span>
                  </span>
                  <a
                    href="#campus-catalog"
                    className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
                  >
                    <span>Browse Ecosystem Repositories</span>
                    <ArrowDown className="h-3 w-3 animate-bounce" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
