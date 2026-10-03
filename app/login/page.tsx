"use client";

import * as React from "react";
import { useAuth } from "@/components/auth/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GraduationCap, ShieldCheck, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

export default function LoginPage() {
  const { openLoginModal, user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      openLoginModal();
    }
  }, [user, openLoginModal, router]);

  return (
    <div className="py-24 bg-grid-pattern min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-10 backdrop-blur-2xl shadow-2xl">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-5">
          <GraduationCap className="h-7 w-7" />
        </div>
        <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-400 font-mono mb-2">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Student Authentication</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">S-VYASA Contributor Access</h1>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          Verify your enrollment via university USN, then link your GitHub account to access open-source repos, pull request tracking, and the contributor leaderboard.
        </p>

        {user ? (
          <div className="mt-6 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-center space-x-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Authenticated as @{user.githubUsername} ({user.usn})</span>
          </div>
        ) : (
          <Button
            onClick={openLoginModal}
            className="mt-6 w-full gap-2 bg-blue-600 hover:bg-blue-500 text-xs font-semibold py-2.5 shadow-lg shadow-blue-600/25"
          >
            <span>Open Verification Popup</span>
          </Button>
        )}
      </div>
    </div>
  );
}
