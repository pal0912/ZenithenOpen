"use client";

import * as React from "react";
import Link from "next/link";
import {
  Compass,
  Search,
  Filter,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GithubIcon } from "@/components/ui/icons";
import { MOCK_OPPORTUNITIES } from "@/lib/data/mock-data";

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [difficultyFilter, setDifficultyFilter] = React.useState<string>("all");

  const filteredOpportunities = MOCK_OPPORTUNITIES.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.repository.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.labels.some((l) => l.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty =
      difficultyFilter === "all" || opp.difficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="py-16 bg-background text-foreground min-h-screen transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-border pb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-accent font-mono">
            <Compass className="h-4 w-4" />
            <span>Open Source Issue Finder</span>
          </div>
          <div className="mt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Opportunity Board
              </h1>
              <p className="mt-1 text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Curated, triaged GitHub issues from ZenithenOpen repositories categorized for student developers.
              </p>
            </div>
            <a
              href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+label%3Agood-first-issue"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md text-xs shrink-0 cursor-pointer">
                <GithubIcon className="h-4 w-4" />
                <span>Global Starter Issues</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
          </div>

          {/* Filters Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues by title, label, or repository..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border text-foreground text-xs focus:border-primary"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground flex items-center">
                <Filter className="h-3 w-3 mr-1" /> Difficulty:
              </span>
              {(["all", "beginner", "intermediate"] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs capitalize font-medium transition-colors cursor-pointer ${
                    difficultyFilter === diff
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "bg-muted border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Issues Grid or Zero State */}
        {filteredOpportunities.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-border bg-card p-16 text-center shadow-xs">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15 border border-accent/30 text-accent mb-4">
              <Compass className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No Issues Ingested Yet</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              Once organization repositories are connected and labeled with <code className="text-accent bg-accent/15 px-1 py-0.5 rounded border border-accent/30 font-mono">good-first-issue</code>, they will stream automatically into this board.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/learning">
                <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs shadow-xs cursor-pointer">
                  <BookOpen className="h-4 w-4" />
                  <span>Prepare with Roadmaps</span>
                </Button>
              </Link>
              <Link href="/mentorship">
                <Button variant="outline" className="text-xs border-border">
                  Request a Mentor
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp) => (
              <Card key={opp.id} className="p-6 border-border bg-card hover:border-primary/40 hover:shadow-md transition-all">
                <p className="text-foreground font-bold">{opp.title}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
