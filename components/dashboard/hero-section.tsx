"use client";

import Link from "next/link";
import {
  ArrowRight,
  Github,
  Sparkles,
  GitPullRequest,
  Terminal,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_MEMBERS } from "@/lib/data/mock-data";

export function HeroSection() {
  const avatarList = MOCK_MEMBERS.slice(0, 5);

  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-grid-pattern">
      {/* Dynamic ambient background gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-24 right-10 w-96 h-96 bg-purple-600/15 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Organization Pill Banner */}
        <div className="inline-flex items-center space-x-2 rounded-full border border-blue-500/30 bg-blue-950/60 px-4 py-1.5 text-xs text-blue-300 backdrop-blur-md shadow-sm mb-6 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="font-semibold text-white">S-VYASA University Open Source Chapter</span>
          <span className="text-slate-400">|</span>
          <span className="flex items-center text-blue-400 font-medium">
            <Sparkles className="h-3 w-3 mr-1 text-amber-400" /> 2,140+ Members
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="mx-auto max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
          We don&apos;t just learn to code. <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            We ship.
          </span>
        </h1>

        {/* Subtitle with real community metric */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
          The premier open-source engineering community at S-VYASA Bengaluru.
          Over{" "}
          <span className="font-semibold text-white underline decoration-blue-500 decoration-2 underline-offset-4">
            285+ first-time pull requests
          </span>{" "}
          and{" "}
          <span className="font-semibold text-white">1,280+ total PRs</span> merged
          into production codebases worldwide.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/projects">
            <Button size="lg" className="group shadow-lg shadow-blue-600/25">
              <span>Explore Projects</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <Link href="/opportunities">
            <Button size="lg" variant="emerald" className="group shadow-emerald-600/25">
              <span>Find Good First Issues</span>
              <Sparkles className="ml-2 h-4 w-4 text-emerald-200" />
            </Button>
          </Link>

          <a
            href="https://github.com/zenithenopen"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="gap-2">
              <Github className="h-5 w-5" />
              <span>GitHub Org</span>
            </Button>
          </a>
        </div>

        {/* Contributor Social Proof Cluster */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-400">
          <div className="flex -space-x-2.5 overflow-hidden">
            {avatarList.map((m) => (
              <img
                key={m.id}
                src={m.avatarUrl}
                alt={m.name}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover"
              />
            ))}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 ring-2 ring-slate-900 text-[10px] font-bold text-white">
              +340
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex text-amber-400">
              {"★".repeat(5)}
            </div>
            <span>
              Contributed to <strong className="text-white">Apache</strong>,{" "}
              <strong className="text-white">PyTorch</strong>,{" "}
              <strong className="text-white">Hugging Face</strong> & campus ecosystems
            </span>
          </div>
        </div>

        {/* Terminal Micro-Widget Feature Preview */}
        <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-left shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-amber-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-xs text-slate-400 flex items-center">
                <Terminal className="h-3.5 w-3.5 mr-1.5 text-blue-400" />
                zenithenopen-cli v1.0
              </span>
            </div>
            <Badge variant="outline" className="text-[10px]">
              Ready to Contribute
            </Badge>
          </div>
          <div className="mt-3 space-y-1.5 font-mono text-xs text-slate-300">
            <p className="text-slate-400">
              # Clone and run your first issue in 3 steps:
            </p>
            <p>
              <span className="text-purple-400">$</span> git clone https://github.com/zenithenopen/zenith-agent-hub.git
            </p>
            <p>
              <span className="text-purple-400">$</span> npm run setup && npm test
            </p>
            <p className="text-emerald-400 flex items-center pt-1">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 inline" />
              Tests passed. Ready to open your first pull request!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
