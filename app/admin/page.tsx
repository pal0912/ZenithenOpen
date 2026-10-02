"use client";

import * as React from "react";
import {
  ShieldCheck,
  Users,
  FolderGit2,
  Compass,
  AlertCircle,
  CheckCircle2,
  Lock,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_MEMBERS, MOCK_PROJECTS, MOCK_OPPORTUNITIES } from "@/lib/data/mock-data";

export default function AdminPage() {
  const [activeTab, setActiveTab] = React.useState<"members" | "projects" | "opportunities">("members");
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className="py-12 bg-grid-pattern min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-800/80 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Community Governance & Administration</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
              Admin Governance Dashboard
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Audit-friendly moderation, project catalog management, mentor assignments, and role controls.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="flex items-center space-x-1.5 bg-blue-950/60 border border-blue-800/60 px-3 py-1.5 rounded-lg text-xs text-blue-300">
              <Lock className="h-3.5 w-3.5 text-blue-400" />
              <span>Role: Administrator</span>
            </span>
          </div>
        </div>

        {/* Quick Governance Stat Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="p-5 glass-panel">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Total Registered Members</p>
                <p className="text-2xl font-bold text-white mt-1">2,140</p>
              </div>
              <Users className="h-8 w-8 text-blue-400 p-1.5 rounded-lg bg-blue-950/60 border border-blue-900" />
            </div>
            <p className="text-[11px] text-emerald-400 mt-3 flex items-center">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              <span>12 new members joined this week</span>
            </p>
          </Card>

          <Card className="p-5 glass-panel">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Managed Repositories</p>
                <p className="text-2xl font-bold text-white mt-1">48</p>
              </div>
              <FolderGit2 className="h-8 w-8 text-purple-400 p-1.5 rounded-lg bg-purple-950/60 border border-purple-900" />
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              All CI/CD workflows green
            </p>
          </Card>

          <Card className="p-5 glass-panel">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Open Beginner Issues</p>
                <p className="text-2xl font-bold text-white mt-1">45</p>
              </div>
              <Compass className="h-8 w-8 text-emerald-400 p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-900" />
            </div>
            <p className="text-[11px] text-amber-400 mt-3 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              <span>3 issues awaiting mentor assignment</span>
            </p>
          </Card>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("members")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === "members"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              Member Management
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === "projects"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              Project Approvals
            </button>
            <button
              onClick={() => setActiveTab("opportunities")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === "opportunities"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              Issue Board Moderation
            </button>
          </div>

          <Button size="sm" variant="default" className="text-xs gap-1">
            <Plus className="h-3.5 w-3.5" />
            <span>Add New Resource</span>
          </Button>
        </div>

        {/* Tab 1: Member Management */}
        {activeTab === "members" && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/90 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Member</th>
                  <th className="px-6 py-3.5">Department</th>
                  <th className="px-6 py-3.5">Role</th>
                  <th className="px-6 py-3.5">Merged PRs</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {MOCK_MEMBERS.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-800/30">
                    <td className="px-6 py-3.5 flex items-center space-x-3">
                      <img
                        src={m.avatarUrl}
                        alt={m.name}
                        className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-700"
                      />
                      <div>
                        <p className="font-semibold text-white">{m.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">@{m.username}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-slate-400">{m.department}</td>
                    <td className="px-6 py-3.5">
                      <Badge variant="outline" className="text-[10px]">
                        {m.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-3.5 font-bold text-blue-400">{m.mergedPrCount}</td>
                    <td className="px-6 py-3.5 text-right space-x-2">
                      <Button size="sm" variant="ghost" className="h-7 text-xs text-slate-300">
                        Edit Role
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Project Approvals */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_PROJECTS.map((p) => (
              <Card key={p.id} className="p-5 glass-panel flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-sm">{p.name}</h3>
                    <Badge variant="outline" className="text-[10px]">{p.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{p.tagline}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">{p.primaryLanguage}</span>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs">Settings</Button>
                    <Button size="sm" variant="default" className="h-7 text-xs">Approve Sync</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Tab 3: Issue Board Moderation */}
        {activeTab === "opportunities" && (
          <div className="space-y-3">
            {MOCK_OPPORTUNITIES.map((opp) => (
              <Card key={opp.id} className="p-4 glass-panel flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-blue-400">{opp.repoFullName} #{opp.issueNumber}</span>
                  <p className="text-xs font-semibold text-white mt-0.5">{opp.title}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="beginner" className="text-[10px] capitalize">{opp.difficulty}</Badge>
                  <Button size="sm" variant="outline" className="h-7 text-xs">Assign Mentor</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
