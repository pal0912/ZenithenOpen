"use client";

import * as React from "react";
import {
  Users2,
  Search,
  Globe,
  GitPullRequest,
  Star,
  CheckCircle2,
  Filter,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_MEMBERS } from "@/lib/data/mock-data";
import { Member } from "@/types";

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<string>("All");
  const [selectedMember, setSelectedMember] = React.useState<Member | null>(null);

  const roles = ["All", "ADMIN", "MENTOR", "MEMBER"];

  const filteredMembers = MOCK_MEMBERS.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.skills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      m.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "All" || m.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="py-12 bg-grid-pattern min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-800/80 pb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
            <Users2 className="h-4 w-4" />
            <span>Community Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
            ZenithenOpen Members & Contributors
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
            Meet the 2,140+ student developers, open-source maintainers, and mentors building across S-VYASA Deemed to be University, Bengaluru.
          </p>

          {/* Search & Role Filters */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search by name, skill (e.g. Rust, PyTorch), or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-900 border-slate-800"
              />
            </div>

            <div className="flex items-center space-x-1.5 w-full sm:w-auto">
              <span className="text-xs text-slate-400 mr-1 flex items-center">
                <Filter className="h-3 w-3 mr-1" /> Role:
              </span>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    roleFilter === r
                      ? "bg-blue-600 text-white font-semibold shadow-sm"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Member Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card
              key={member.id}
              className="p-6 glass-panel glass-panel-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-800"
                    />
                    <div>
                      <h3 className="font-bold text-white text-base hover:text-blue-400 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        @{member.username}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      member.role === "ADMIN"
                        ? "default"
                        : member.role === "MENTOR"
                        ? "secondary"
                        : "outline"
                    }
                    className="text-[10px]"
                  >
                    {member.role}
                  </Badge>
                </div>

                <div className="mt-3 text-xs text-slate-400 flex items-center space-x-2">
                  <span>{member.department}</span>
                  <span>•</span>
                  <span>{member.year}</span>
                </div>

                <p className="mt-3 text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {member.bio}
                </p>

                {/* Skills tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {member.skills.slice(0, 4).map((s) => (
                    <span
                      key={s.name}
                      className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300 font-medium border border-slate-700/50"
                    >
                      {s.name}
                    </span>
                  ))}
                  {member.skills.length > 4 && (
                    <span className="rounded bg-slate-800/40 px-1.5 py-0.5 text-[10px] text-slate-500">
                      +{member.skills.length - 4}
                    </span>
                  )}
                </div>

                {/* GitHub stats bar */}
                <div className="mt-4 pt-3 border-t border-slate-800/60 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <p className="font-bold text-blue-400">{member.mergedPrCount}</p>
                    <p className="text-[10px] text-slate-400">PRs Merged</p>
                  </div>
                  <div>
                    <p className="font-bold text-amber-400">{member.github.totalStars}</p>
                    <p className="text-[10px] text-slate-400">Stars Earned</p>
                  </div>
                  <div>
                    <p className="font-bold text-emerald-400">{member.totalContributions}</p>
                    <p className="text-[10px] text-slate-400">Contributions</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <a
                  href={`https://github.com/${member.github.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedMember(member)}
                  className="text-xs"
                >
                  View Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Member Profile Modal */}
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
            <div className="relative w-full max-w-xl rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedMember.avatarUrl}
                    alt={selectedMember.name}
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-blue-500"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {selectedMember.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      @{selectedMember.username} • {selectedMember.department}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="default" className="text-[10px]">
                        {selectedMember.role}
                      </Badge>
                      {selectedMember.badge && (
                        <Badge variant="beginner" className="text-[10px]">
                          {selectedMember.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-slate-400 hover:text-white text-lg font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <div className="mt-5 space-y-4 text-xs">
                <div>
                  <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[10px]">
                    About & Bio
                  </h4>
                  <p className="mt-1 text-slate-300 leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>

                {selectedMember.spotlightQuote && (
                  <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-900/40 text-blue-200 italic">
                    &ldquo;{selectedMember.spotlightQuote}&rdquo;
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] mb-2">
                    Verified Skills
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMember.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="rounded bg-slate-900 border border-slate-800 px-2 py-1 text-slate-300 font-medium"
                      >
                        {skill.name} ({skill.level})
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] mb-2">
                    Top Programming Languages
                  </h4>
                  <div className="space-y-1.5">
                    {selectedMember.github.topLanguages.map((lang) => (
                      <div key={lang.name} className="flex items-center justify-between text-[11px]">
                        <span className="flex items-center space-x-1.5">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: lang.color }}
                          />
                          <span className="text-slate-300">{lang.name}</span>
                        </span>
                        <span className="font-mono text-slate-400">{lang.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end space-x-2">
                  <a
                    href={`https://github.com/${selectedMember.github.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <GithubIcon className="h-4 w-4" />
                      <span>View GitHub</span>
                    </Button>
                  </a>
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => setSelectedMember(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
