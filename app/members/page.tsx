"use client";

import * as React from "react";
import {
  Users2,
  Search,
  Globe,
  Filter,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_MEMBERS } from "@/lib/data/mock-data";
import { Member } from "@/types";

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<string>("All");
  const [selectedMember, setSelectedMember] = React.useState<Member | null>(null);
  const [connectModalOpen, setConnectModalOpen] = React.useState(false);
  const [inputHandle, setInputHandle] = React.useState("");
  const [registered, setRegistered] = React.useState(false);

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

  const handleSimulateJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputHandle.trim()) return;
    setRegistered(true);
    setTimeout(() => {
      setConnectModalOpen(false);
      setRegistered(false);
      setInputHandle("");
    }, 1500);
  };

  return (
    <div className="py-16 bg-grid-pattern min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-white/[0.06] pb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-400 font-mono">
            <Users2 className="h-4 w-4" />
            <span>Community Directory</span>
          </div>
          <div className="mt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Members & Contributors
              </h1>
              <p className="mt-1 text-sm text-slate-400 max-w-2xl leading-relaxed">
                Student developers, open-source maintainers, and mentors building across S-VYASA Deemed to be University, Bengaluru.
              </p>
            </div>
            <Button
              onClick={() => setConnectModalOpen(true)}
              className="gap-2 bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 text-xs shrink-0 self-start md:self-auto"
            >
              <GithubIcon className="h-4 w-4" />
              <span>Link GitHub Account</span>
            </Button>
          </div>

          {/* Search & Role Filters */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search by username, skill (e.g. Rust, PyTorch)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/[0.03] border-white/[0.08] text-xs focus:border-blue-500/50"
              />
            </div>

            <div className="flex items-center space-x-1.5 w-full sm:w-auto">
              <span className="text-xs text-slate-400 mr-2 flex items-center">
                <Filter className="h-3 w-3 mr-1" /> Filter:
              </span>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    roleFilter === r
                      ? "bg-blue-600 text-white font-semibold shadow-sm"
                      : "bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:text-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Member Grid or Clean Empty State */}
        {filteredMembers.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-16 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4">
              <Users2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">No Members Connected Yet</h3>
            <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              Be the founding student contributor to link your GitHub profile to the S-VYASA directory.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => setConnectModalOpen(true)}
                className="gap-2 bg-blue-600 hover:bg-blue-500 text-xs"
              >
                <GithubIcon className="h-4 w-4" />
                <span>Join Community Directory</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card
                key={member.id}
                className="p-6 glass-panel glass-panel-hover flex flex-col justify-between"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{member.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">@{member.username}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Link GitHub Modal */}
        {connectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="relative w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#0c101a] p-6 shadow-2xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <GithubIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Connect GitHub Profile</h3>
                    <p className="text-xs text-slate-400">Link your account to ZenithenOpen</p>
                  </div>
                </div>
                <button
                  onClick={() => setConnectModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 text-sm"
                >
                  ✕
                </button>
              </div>

              {registered ? (
                <div className="mt-6 py-6 text-center space-y-2">
                  <Sparkles className="h-8 w-8 text-emerald-400 mx-auto animate-bounce" />
                  <p className="text-sm font-semibold text-white">OAuth Redirecting to GitHub...</p>
                  <p className="text-xs text-slate-400">Syncing public repositories and contributions</p>
                </div>
              ) : (
                <form onSubmit={handleSimulateJoin} className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Your GitHub Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-mono">
                        @
                      </span>
                      <Input
                        required
                        placeholder="your-github-username"
                        value={inputHandle}
                        onChange={(e) => setInputHandle(e.target.value)}
                        className="pl-8 bg-white/[0.04] border-white/[0.1] text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="rounded-lg bg-blue-950/30 border border-blue-900/40 p-3 text-[11px] text-blue-300 leading-relaxed">
                    Connecting your GitHub account automatically verifies pull requests, assigns student role badges, and tracks leaderboard points.
                  </div>

                  <div className="pt-2 flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setConnectModalOpen(false)}
                      className="text-xs text-slate-400"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="text-xs bg-blue-600 hover:bg-blue-500 font-semibold"
                    >
                      Verify with GitHub OAuth
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
