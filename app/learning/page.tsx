"use client";

import * as React from "react";
import {
  GraduationCap,
  BookOpen,
  Code2,
  CheckCircle2,
  Clock,
  Users,
  Award,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Target,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_LEARNING_PATHS } from "@/lib/data/mock-data";

export default function LearningPathsPage() {
  const [selectedPathId, setSelectedPathId] = React.useState<string>(
    MOCK_LEARNING_PATHS[0].id
  );
  const [expandedWeeks, setExpandedWeeks] = React.useState<Record<number, boolean>>({
    1: true,
    2: false,
  });

  const activePath =
    MOCK_LEARNING_PATHS.find((p) => p.id === selectedPathId) ||
    MOCK_LEARNING_PATHS[0];

  const toggleWeek = (weekNum: number) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [weekNum]: !prev[weekNum],
    }));
  };

  return (
    <div className="py-12 bg-grid-pattern min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-800/80 pb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
            <GraduationCap className="h-4 w-4" />
            <span>Structured Roadmaps & GSoC Playbook</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
            Open-Source Learning Paths
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
            Zero-to-contributor engineering curriculums. Complete weekly milestones, fork reference repositories, and prepare for Google Summer of Code (GSoC) and LFX Mentorships.
          </p>
        </div>

        {/* Path Selector Tabs */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_LEARNING_PATHS.map((path) => {
            const isSelected = path.id === activePath.id;
            return (
              <button
                key={path.id}
                onClick={() => setSelectedPathId(path.id)}
                className={`text-left p-5 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-slate-900 border-blue-500 ring-2 ring-blue-500/20 shadow-lg"
                    : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Badge variant={isSelected ? "default" : "outline"} className="text-[10px]">
                    {path.level}
                  </Badge>
                  <span className="text-[11px] text-slate-400 flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {path.enrolledCount}
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm mt-3 line-clamp-1">
                  {path.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {path.estimatedWeeks} Weeks • Guided Project
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Curriculum Section */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Syllabus */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {activePath.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {activePath.description}
                </p>
              </div>
              <Button size="sm" variant="default" className="shrink-0">
                Enroll in Track
              </Button>
            </div>

            <div className="space-y-4">
              {activePath.curriculum.map((week) => {
                const isExpanded = expandedWeeks[week.weekNumber] ?? false;

                return (
                  <Card key={week.weekNumber} className="border-slate-800 bg-slate-900/60 overflow-hidden">
                    <div
                      onClick={() => toggleWeek(week.weekNumber)}
                      className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/30 transition-colors"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-950/80 border border-blue-800/60 font-mono text-xs font-bold text-blue-400">
                          W{week.weekNumber}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            {week.title}
                          </h4>
                          <p className="text-xs text-slate-400">
                            {week.summary}
                          </p>
                        </div>
                      </div>

                      <div className="text-slate-400">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-slate-800/60 space-y-4 bg-slate-950/40 text-xs">
                        {/* Milestone project */}
                        <div className="flex items-start space-x-2 bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-slate-200">
                          <Target className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-white">Milestone Deliverable: </span>
                            <span>{week.milestoneProject}</span>
                          </div>
                        </div>

                        {/* Topics */}
                        <div className="space-y-2.5">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Topics & Deep Dives
                          </p>
                          {week.topics.map((topic, i) => (
                            <div key={i} className="rounded-lg border border-slate-800/80 bg-slate-900/40 p-3">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-slate-200">
                                  {topic.title}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {topic.duration}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 mt-1">
                                {topic.description}
                              </p>

                              {topic.resources.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {topic.resources.map((res, ri) => (
                                    <a
                                      key={ri}
                                      href={res.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center space-x-1 text-[10px] text-blue-400 hover:text-blue-300 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-900/40"
                                    >
                                      <span>{res.title}</span>
                                      <ExternalLink className="h-2.5 w-2.5" />
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar: GSoC Blueprint & Skills */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 glass-panel border-l-4 border-l-amber-500 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <Award className="h-4 w-4" />
                <span>GSoC Preparation</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Open Source Fellowship Tracker
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                ZenithenOpen provides free 1-on-1 mentorship for S-VYASA students applying to Google Summer of Code, LFX, and Linux Foundation programs.
              </p>
              <ul className="text-xs space-y-2 text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Proposal drafting template & peer reviews</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Direct introductions to Apache & CNCF mentors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Mock technical reviews for qualification PRs</span>
                </li>
              </ul>
              <Button variant="emerald" className="w-full text-xs">
                Download GSoC 2027 Handbook
              </Button>
            </Card>

            <Card className="p-6 glass-panel space-y-3">
              <h4 className="text-sm font-semibold text-white">Skills You Will Master</h4>
              <div className="flex flex-wrap gap-1.5">
                {activePath.targetSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
