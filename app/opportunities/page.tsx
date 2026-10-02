"use client";

import * as React from "react";
import {
  Compass,
  Search,
  Filter,
  ExternalLink,
  MessageSquare,
  Sparkles,
  BookOpen,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_OPPORTUNITIES } from "@/lib/data/mock-data";

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [difficultyFilter, setDifficultyFilter] = React.useState<string>("all");
  const [languageFilter, setLanguageFilter] = React.useState<string>("all");

  const languages = ["all", "TypeScript", "Python", "Go", "Markdown"];

  const filteredOpportunities = MOCK_OPPORTUNITIES.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.repository.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.labels.some((l) => l.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty =
      difficultyFilter === "all" || opp.difficulty === difficultyFilter;

    const matchesLanguage =
      languageFilter === "all" ||
      opp.language.toLowerCase() === languageFilter.toLowerCase();

    return matchesSearch && matchesDifficulty && matchesLanguage;
  });

  return (
    <div className="py-12 bg-grid-pattern min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-800/80 pb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <Compass className="h-4 w-4" />
            <span>Open Source Issue Finder</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
            Opportunity Board
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
            Curated GitHub issues from ZenithenOpen repositories categorized for first-time contributors and seasoned developers alike.
          </p>

          {/* Issue Counter Bar */}
          <div className="mt-4 inline-flex items-center space-x-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-1.5 text-xs text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>
              <strong>{filteredOpportunities.length}</strong> beginner-friendly issues ready to be claimed
            </span>
          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search issues by title, tag, or repo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-900 border-slate-800"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* Difficulty selector */}
              <div className="flex items-center rounded-lg bg-slate-900 p-1 border border-slate-800 text-xs">
                {(["all", "beginner", "intermediate"] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficultyFilter(diff)}
                    className={`px-3 py-1 rounded-md capitalize font-medium transition-colors ${
                      difficultyFilter === diff
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              {/* Language selector */}
              <div className="flex items-center space-x-1">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguageFilter(lang)}
                    className={`px-2.5 py-1 text-xs rounded-lg capitalize transition-colors font-medium ${
                      languageFilter === lang
                        ? "bg-slate-700 text-white font-semibold"
                        : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Opportunity Cards */}
        <div className="mt-8 space-y-4">
          {filteredOpportunities.map((opp) => (
            <Card
              key={opp.id}
              className="p-6 glass-panel glass-panel-hover flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded border border-blue-900/60">
                    {opp.repoFullName} #{opp.issueNumber}
                  </span>
                  <Badge variant="beginner" className="text-[11px] capitalize font-medium">
                    {opp.difficulty}
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">
                    {opp.language}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white hover:text-blue-400 transition-colors">
                  <a
                    href={opp.issueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1.5"
                  >
                    <span>{opp.title}</span>
                  </a>
                </h3>

                <div className="flex flex-wrap gap-1.5 items-center">
                  {opp.labels.map((l) => (
                    <span
                      key={l.name}
                      className="rounded px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: `${l.color}20`,
                        color: l.color,
                        border: `1px solid ${l.color}50`,
                      }}
                    >
                      {l.name}
                    </span>
                  ))}
                  <span className="text-xs text-slate-400 flex items-center ml-2">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {opp.commentsCount} comments
                  </span>
                </div>
              </div>

              {/* Mentor badge & action */}
              <div className="flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800 shrink-0">
                {opp.mentorAssigned && (
                  <div className="flex items-center space-x-2 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
                    <img
                      src={opp.mentorAssigned.avatarUrl}
                      alt={opp.mentorAssigned.name}
                      className="h-6 w-6 rounded-full object-cover ring-1 ring-emerald-500"
                    />
                    <div className="text-left text-xs">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Assigned Mentor</p>
                      <p className="font-medium text-white">{opp.mentorAssigned.name}</p>
                    </div>
                  </div>
                )}

                <a
                  href={opp.issueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button size="sm" variant="default" className="w-full gap-1.5">
                    <span>Claim on GitHub</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
