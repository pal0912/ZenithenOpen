"use client";

import * as React from "react";
import Link from "next/link";
import {
  FolderGit2,
  Search,
  Star,
  GitFork,
  ExternalLink,
  Filter,
  Plus,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { GithubIcon } from "@/components/ui/icons";
import { MOCK_PROJECTS } from "@/lib/data/mock-data";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>("All");

  const languages = ["All", "TypeScript", "Python", "Go", "Rust", "C++"];

  const filteredProjects = MOCK_PROJECTS.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLanguage =
      selectedLanguage === "All" || project.primaryLanguage === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="py-16 bg-grid-pattern min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-white/[0.06] pb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-400 font-mono">
            <FolderGit2 className="h-4 w-4" />
            <span>Campus Repositories</span>
          </div>
          <div className="mt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Open-Source Project Catalog
              </h1>
              <p className="mt-1 text-sm text-slate-400 max-w-2xl leading-relaxed">
                Production codebases engineered by S-VYASA student developers and research labs.
              </p>
            </div>
            <a
              href="https://github.com/IST-ZenithenLab"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="gap-2 bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 text-xs shrink-0">
                <GithubIcon className="h-4 w-4" />
                <span>Visit GitHub Org</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search projects by name, tag, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/[0.03] border-white/[0.08] text-xs focus:border-blue-500/50"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <span className="text-xs text-slate-400 mr-2 flex items-center">
                <Filter className="h-3 w-3 mr-1" /> Language:
              </span>
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors font-medium ${
                    selectedLanguage === lang
                      ? "bg-blue-600 text-white font-semibold shadow-sm"
                      : "bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:text-white"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid or Zero-State */}
        {filteredProjects.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-16 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4">
              <FolderGit2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">No Repositories Synced Yet</h3>
            <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              Once you configure your <code className="text-blue-300 font-mono">GITHUB_TOKEN</code> or trigger the sync endpoint, repositories under <code className="text-blue-300 font-mono">IST-ZenithenLab</code> will appear here automatically.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="default" className="text-xs bg-blue-600 hover:bg-blue-500 gap-1.5">
                  <Plus className="h-4 w-4" />
                  <span>Create Campus Repository</span>
                </Button>
              </a>
              <Link href="/admin">
                <Button variant="outline" className="text-xs border-white/[0.1] text-slate-300">
                  Configure Sync in Admin
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="glass-panel glass-panel-hover flex flex-col justify-between"
              >
                <CardHeader>
                  <CardTitle className="text-base font-bold text-white">
                    {project.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
