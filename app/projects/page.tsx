"use client";

import * as React from "react";
import Link from "next/link";
import {
  FolderGit2,
  Search,
  Star,
  GitFork,
  ExternalLink,
  Code,
  Tag,
  Filter,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
    <div className="py-12 bg-grid-pattern min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-800/80 pb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
            <FolderGit2 className="h-4 w-4" />
            <span>Campus Repositories</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
            Open-Source Project Catalog
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
            Production codebases engineered by S-VYASA student developers.
            Fork, build locally, pick up an issue, and submit a pull request.
          </p>

          {/* Search & Filter Bar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search projects by name, tag, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-900/90 border-slate-800"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <span className="text-xs text-slate-400 mr-1 flex items-center">
                <Filter className="h-3 w-3 mr-1" /> Lang:
              </span>
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-colors font-medium ${
                    selectedLanguage === lang
                      ? "bg-blue-600 text-white font-semibold shadow-sm"
                      : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="glass-panel glass-panel-hover flex flex-col justify-between"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg font-bold text-white hover:text-blue-400 transition-colors">
                      {project.name}
                    </CardTitle>
                    <span className="mt-0.5 inline-block text-[11px] font-mono text-slate-500">
                      zenithenopen/{project.slug}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {project.status}
                  </Badge>
                </div>
                <CardDescription className="mt-2 text-xs text-slate-300 line-clamp-2">
                  {project.tagline}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 text-xs">
                <p className="text-slate-400 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="flex items-center space-x-1 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: project.languageColor }}
                    />
                    <span className="font-semibold text-slate-200">
                      {project.primaryLanguage}
                    </span>
                  </span>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/50 text-slate-400">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                      <span>{project.stars}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <GitFork className="h-3.5 w-3.5 text-slate-400" />
                      <span>{project.forks}</span>
                    </span>
                  </div>

                  {project.goodFirstIssuesCount > 0 && (
                    <Badge variant="beginner" className="text-[10px]">
                      {project.goodFirstIssuesCount} Good First Issues
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] text-slate-400">Maintainers:</span>
                  <div className="flex -space-x-1">
                    {project.maintainers.map((m) => (
                      <img
                        key={m.username}
                        src={m.avatarUrl}
                        alt={m.name}
                        title={m.name}
                        className="h-5 w-5 rounded-full object-cover ring-1 ring-slate-800"
                      />
                    ))}
                  </div>
                </div>

                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-blue-400 hover:text-blue-300"
                >
                  <span>GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
