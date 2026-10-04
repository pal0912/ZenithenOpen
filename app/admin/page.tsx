"use client";

import * as React from "react";
import {
  ShieldCheck,
  Users,
  FolderGit2,
  Compass,
  CheckCircle2,
  Lock,
  RefreshCw,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AdminPage() {
  const [activeTab, setActiveTab] = React.useState<"members" | "projects" | "opportunities">("members");
  const [isSyncing, setIsSyncing] = React.useState(false);

  const handleSyncTrigger = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1500);
  };

  return (
    <div className="py-16 bg-background text-foreground min-h-screen transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-border pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-primary font-mono">
              <ShieldCheck className="h-4 w-4" />
              <span>Governance & Administration</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
              Admin Governance Dashboard
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Platform telemetry, repository indexing, mentor assignments, and role access controls.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSyncTrigger}
              disabled={isSyncing}
              className="flex items-center space-x-1.5 bg-card hover:bg-muted px-3 py-1.5 rounded-lg border border-border text-xs text-foreground shadow-xs transition-colors cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin text-primary" : ""}`} />
              <span>{isSyncing ? "Triggering Sync..." : "Trigger GitHub Sync"}</span>
            </button>
            <span className="flex items-center space-x-1.5 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg text-xs text-primary font-mono">
              <Lock className="h-3 w-3 text-primary" />
              <span>ADMIN_MODE</span>
            </span>
          </div>
        </div>

        {/* Quick Governance Stat Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <Card className="p-6 border border-border bg-card shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Registered Members
                </p>
                <p className="text-3xl font-extrabold text-foreground mt-1 font-mono">0</p>
              </div>
              <Users className="h-8 w-8 text-primary p-1.5 rounded-xl bg-primary/10 border border-primary/20" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-3 flex items-center">
              <CheckCircle2 className="h-3 w-3 mr-1 text-accent" />
              <span>Awaiting first user OAuth registration</span>
            </p>
          </Card>

          <Card className="p-6 border border-border bg-card shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Managed Repositories
                </p>
                <p className="text-3xl font-extrabold text-foreground mt-1 font-mono">0</p>
              </div>
              <FolderGit2 className="h-8 w-8 text-secondary p-1.5 rounded-xl bg-secondary/10 border border-secondary/20" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-3">
              Organization sync target: IST-ZenithenLab
            </p>
          </Card>

          <Card className="p-6 border border-border bg-card shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Open Starter Issues
                </p>
                <p className="text-3xl font-extrabold text-foreground mt-1 font-mono">0</p>
              </div>
              <Compass className="h-8 w-8 text-accent p-1.5 rounded-xl bg-accent/10 border border-accent/20" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-3 flex items-center">
              <span>Ready for GitHub issue webhook ingestion</span>
            </p>
          </Card>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
          <div className="flex space-x-2">
            {(["members", "projects", "opportunities"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab} (0)
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Zero State */}
        <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-xs">
          <ShieldCheck className="mx-auto h-8 w-8 text-primary mb-2" />
          <p className="text-sm font-semibold text-foreground">No {activeTab} to moderate yet</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            When users register or repositories are ingested, you can approve member roles, pin spotlight projects, and assign mentors here.
          </p>
        </div>
      </div>
    </div>
  );
}
