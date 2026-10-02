"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Code2,
  FolderGit2,
  Trophy,
  Compass,
  GraduationCap,
  Users2,
  Sparkles,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Opportunities", href: "/opportunities", icon: Compass, badge: "New" },
  { name: "Learning Paths", href: "/learning", icon: GraduationCap },
  { name: "Mentorship", href: "/mentorship", icon: Users2 },
  { name: "Hall of Fame", href: "/achievements", icon: Sparkles },
  { name: "Members", href: "/members", icon: Users2 },
  { name: "Resume", href: "/resume", icon: FileText },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl shadow-lg shadow-black/40"
          : "border-b border-transparent bg-slate-950/40 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="group flex items-center space-x-2.5">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <Code2 className="h-5 w-5 text-blue-400 group-hover:text-white transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  Zenithen<span className="text-blue-500">Open</span>
                </span>
                <span className="rounded bg-blue-900/60 px-1.5 py-0.2 text-[10px] font-semibold text-blue-300 border border-blue-700/40">
                  S-VYASA
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-400">
                Open Source Community
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150",
                  isActive
                    ? "bg-slate-800/90 text-white shadow-sm border border-slate-700/60"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                )}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <Badge variant="beginner" className="ml-1 px-1.5 py-0 text-[9px]">
                    {link.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <a
            href="https://github.com/IST-ZenithenLab"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-white/[0.15] hover:bg-white/[0.06] transition-colors"
          >
            <GithubIcon className="h-3.5 w-3.5 text-slate-300" />
            <span>GitHub</span>
          </a>

          <Link href="/members">
            <Button size="sm" variant="default" className="shadow-blue-600/30">
              Join Community
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-2 rounded-lg p-2.5 text-xs font-medium transition-colors",
                    isActive
                      ? "bg-blue-950/60 text-blue-400 border border-blue-800/50"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4 text-slate-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col space-y-2 pt-2 border-t border-slate-800">
            <a
              href="https://github.com/IST-ZenithenLab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 rounded-lg border border-white/[0.08] bg-white/[0.03] p-2.5 text-xs font-medium text-slate-200"
            >
              <GithubIcon className="h-4 w-4" />
              <span>GitHub Organization</span>
            </a>
            <Link href="/members" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full" size="sm">
                Join ZenithenOpen
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
