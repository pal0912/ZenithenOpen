"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  GitPullRequest,
  CheckCircle2,
  Terminal,
  Newspaper,
  Calendar,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Copy,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/components/navigation/navigation-context";

export default function ResourcesPage() {
  const { popupSection, closePopup, openPopup, activeSection } = useNavigation();
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const learnConcepts = [
    {
      title: "Understanding the Pull Request Lifecycle",
      category: "Git Architecture",
      description:
        "A pull request (PR) is a formal proposal to merge changes from your independent branch or fork into an upstream codebase. It provides a collaborative forum for peer code reviews, automated CI checks, and architectural validation before code hits production.",
      keyTakeaways: [
        "Origin vs. Upstream: Maintain a synchronized link with the main campus repository",
        "Feature Branches: Always isolate your work onto dedicated branch names",
        "Atomic Commits: Keep each commit focused on one cohesive logical change",
      ],
    },
    {
      title: "Conventional Commit Standards",
      category: "Engineering Etiquette",
      description:
        "ZenithenOpen projects enforce the Conventional Commits specification to generate automated release changelogs and maintain clean git histories.",
      keyTakeaways: [
        "feat: Introduces a new user-facing feature (e.g., feat: add dark theme switcher)",
        "fix: Patches an existing software defect (e.g., fix: resolve sidebar overflow on mobile)",
        "docs: Updates documentation, markdown files, or guides",
        "refactor: Restructures existing code without altering external behavior",
      ],
    },
    {
      title: "Resolving Git Merge Conflicts",
      category: "Advanced Workflow",
      description:
        "Merge conflicts happen when two branches modify the same lines of code. Resolving them cleanly is a critical skill for any professional open-source software engineer.",
      keyTakeaways: [
        "Pull latest changes from upstream main before opening or updating a PR",
        "Use git rebase upstream/main to replay your commits cleanly on top",
        "Resolve conflicts in your IDE, verify builds, and push with confidence",
      ],
    },
  ];

  const firstPrSteps = [
    {
      step: 1,
      title: "Find a Good First Issue",
      description:
        "Visit our curated campus opportunities board or any ZenithenOpen repository and filter issues by the 'good first issue' label.",
      command: "https://github.com/IST-ZenithenLab/ZenithenOpen/issues?q=label%3A%22good+first+issue%22",
      isUrl: true,
    },
    {
      step: 2,
      title: "Fork the Repository to Your GitHub",
      description:
        "Click the 'Fork' button at the top-right of the repository on GitHub to create your personal copy.",
      command: "Click 'Fork' on GitHub -> Select your personal account",
      isUrl: false,
    },
    {
      step: 3,
      title: "Clone Your Fork Locally",
      description:
        "Download your repository onto your local development machine using git in your terminal.",
      command: "git clone https://github.com/<your-username>/ZenithenOpen.git",
      isUrl: false,
    },
    {
      step: 4,
      title: "Create a Dedicated Feature Branch",
      description:
        "Never work directly on main. Create and switch to a descriptive branch for your change.",
      command: "git checkout -b feature/my-first-contribution",
      isUrl: false,
    },
    {
      step: 5,
      title: "Make Your Edits & Verify Quality",
      description:
        "Implement your code or documentation changes, then run local validation scripts to ensure linting passes.",
      command: "npm run lint; npm test",
      isUrl: false,
    },
    {
      step: 6,
      title: "Commit and Push to Origin",
      description:
        "Stage your files, commit with a descriptive conventional message, and push to your remote fork.",
      command: 'git add -A && git commit -m "docs: add contributor profile" && git push -u origin feature/my-first-contribution',
      isUrl: false,
    },
    {
      step: 7,
      title: "Open Your Pull Request",
      description:
        "Navigate to GitHub and click 'Compare & pull request'. Fill out the PR template describing your changes and link the relevant issue.",
      command: "https://github.com/IST-ZenithenLab/ZenithenOpen/pulls",
      isUrl: true,
    },
  ];

  const blogPosts = [
    {
      title: "How I Cracked My First GSoC as a Sophomore Developer",
      author: "IST Alumni Scholar",
      date: "October 2026",
      readTime: "6 min read",
      category: "Career & Fellowships",
      excerpt:
        "A tactical breakdown of proposal writing, communicating with maintainers, and turning small documentation pull requests into an accepted Google Summer of Code project.",
      slug: "#",
    },
    {
      title: "Understanding Git Under the Hood: Blobs, Trees, and Commits",
      author: "ZenithenOpen Core Team",
      date: "September 2026",
      readTime: "8 min read",
      category: "Engineering Deep Dive",
      excerpt:
        "Demystifying the internal object database of Git. Learn how directed acyclic graphs (DAGs) and SHA hashes power modern distributed version control.",
      slug: "#",
    },
    {
      title: "Building Real-Time Multi-Theme Engines with CSS Variables",
      author: "Lead Frontend Maintainer",
      date: "August 2026",
      readTime: "5 min read",
      category: "Web Architecture",
      excerpt:
        "A case study on architecting ZenithenOpen's 7-preset instant theme system using HSL color variables, localStorage persistence, and zero page reloads.",
      slug: "#",
    },
    {
      title: "Why Campus Open-Source Matters for Your Engineering Career",
      author: "Community Mentors",
      date: "July 2026",
      readTime: "4 min read",
      category: "Community Insights",
      excerpt:
        "How shipping verified pull requests into production repositories accelerates technical interviews and outshines generic classroom resume projects.",
      slug: "#",
    },
  ];

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
            <BookOpen className="h-3.5 w-3.5" />
            <span>Developer Enablement & Knowledge</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Developer Resources
          </h1>

          <div className="p-4 rounded-xl border border-border bg-card/60">
            <p className="text-base font-semibold text-primary">
              &ldquo;Learn to make first PR&rdquo;
            </p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Step-by-step guidance, git fundamentals, interactive pull request checklists, and in-depth technical blogs. Click any resource option in the top navbar to view details.
            </p>
          </div>
        </div>

        {/* Section Contents - Clean cards without in-page filter bar */}
        <div className="mt-10 space-y-12">
          {/* Section: Learn to PR */}
          <section id="learn-to-pr" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GitPullRequest className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Learn Pull Requests (Learn to PR)
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openPopup("learn-to-pr")}
                className="border-border text-xs text-foreground cursor-pointer"
              >
                <span>Learn to PR Details</span>
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="space-y-4">
              {learnConcepts.map((concept, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-primary px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20">
                      {concept.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground">
                    {concept.title}
                  </h3>

                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {concept.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border/80 space-y-2">
                    {concept.keyTakeaways.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start space-x-2 text-xs text-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="leading-snug text-muted-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Make First PR */}
          <section id="make-first-pr" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Make Your First PR (Make First PR)
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openPopup("make-first-pr")}
                className="border-border text-xs text-foreground cursor-pointer"
              >
                <span>First PR Checklist</span>
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {firstPrSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold font-mono">
                        {step.step}
                      </span>
                      <h3 className="text-sm font-bold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground ml-8 leading-relaxed mb-3">
                    {step.description}
                  </p>

                  <div className="ml-8 flex items-center justify-between rounded-xl bg-muted/60 border border-border/80 px-3.5 py-2.5 font-mono text-xs text-foreground overflow-x-auto">
                    <code className="text-[11px] truncate mr-2">{step.command}</code>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(step.command, idx)}
                      className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0"
                      title="Copy command"
                    >
                      {copiedIndex === idx ? (
                        <Check className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Blog */}
          <section id="blog" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Newspaper className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Technical Blog & Engineering Stories
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openPopup("blog")}
                className="border-border text-xs text-foreground cursor-pointer"
              >
                <span>Blog Articles</span>
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {blogPosts.map((post, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-primary px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20">
                        {post.category}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border/80 flex items-center justify-between text-xs">
                    <div className="flex items-center text-muted-foreground font-mono text-[11px]">
                      <Calendar className="h-3 w-3 mr-1 text-primary" />
                      <span>{post.date} &bull; {post.author}</span>
                    </div>
                    <Link href="https://github.com/IST-ZenithenLab/ZenithenOpen" target="_blank" rel="noreferrer">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs text-primary hover:text-primary hover:bg-primary/10 cursor-pointer"
                      >
                        <span>Read Article</span>
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 rounded-2xl border border-border bg-card/60 p-6 sm:p-8 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary mb-3">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-foreground">
            Ready to Write a Blog Post for the Community?
          </h3>
          <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            Share your technical learnings, open-source milestones, or tutorial guides with the campus developer community.
          </p>
          <div className="mt-4">
            <Link href="https://github.com/IST-ZenithenLab/ZenithenOpen" target="_blank" rel="noreferrer">
              <Button size="sm" variant="outline" className="border-border text-xs text-foreground cursor-pointer">
                <span>Submit a Technical Article</span>
                <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Resources Popup Dialog Modal */}
      <AnimatePresence>
        {popupSection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              aria-hidden="true"
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-2xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl text-foreground select-none"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-primary px-2 py-0.5 rounded-md bg-muted border border-border">
                    Developer Guides
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-foreground mt-1 capitalize">
                    {popupSection.replace("-", " ")}
                  </h2>
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

              <div className="mt-4 p-4 rounded-xl border border-border/80 bg-muted/40">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {popupSection === "learn-to-pr" && "Master pull request etiquette, Git DAG architecture, atomic commits, conventional commit syntax, and resolving merge conflicts."}
                  {popupSection === "make-first-pr" && "Follow our 7-step guided checklist: find a beginner issue, fork the repository, clone locally, write code, run verification, and submit your PR."}
                  {popupSection === "blog" && "Explore student technical blogs covering GSoC scholar retrospectives, Git internals, CSS theme variable architectures, and career acceleration."}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/80 flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closePopup}
                  className="border-border text-xs text-foreground cursor-pointer"
                >
                  Close
                </Button>
                <Link href={`#${popupSection}`} onClick={closePopup}>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold cursor-pointer"
                  >
                    <span>Jump to Section</span>
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
