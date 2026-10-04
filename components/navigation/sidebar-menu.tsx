"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Sparkles,
  FileText,
  FolderGit2,
  Compass,
  BookOpen,
  X,
  Code2,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useNavigation } from "./navigation-context";
import { useAuth } from "@/components/auth/auth-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

const PRIMARY_NAV_ITEMS: NavItem[] = [
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
    description: "Rankings & verified pull requests",
  },
  {
    name: "Hall of Fame",
    href: "/achievements",
    icon: Sparkles,
    description: "First PR celebrations & milestones",
  },
  {
    name: "Resume",
    href: "/resume",
    icon: FileText,
    description: "GitHub-powered developer resume",
  },
];

const SECONDARY_NAV_ITEMS: NavItem[] = [
  {
    name: "Projects",
    href: "/projects",
    icon: FolderGit2,
    description: "Campus open-source repositories",
  },
  {
    name: "Opportunities",
    href: "/opportunities",
    icon: Compass,
    description: "Triaged good first issues",
  },
  {
    name: "Learning Paths",
    href: "/learning",
    icon: BookOpen,
    description: "Curriculums for GSoC & OSS",
  },
];

export function SidebarMenu() {
  const { isSidebarOpen, closeSidebar } = useNavigation();
  const pathname = usePathname();
  const { user, openLoginModal, logout } = useAuth();
  const sidebarRef = React.useRef<HTMLElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  // Focus close button on open for accessibility
  React.useEffect(() => {
    if (isSidebarOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isSidebarOpen]);

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop Overlay for Outside Click Dismissal */}
          <motion.div
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            onClick={closeSidebar}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-colors"
          />

          {/* Left-Side Sliding Navigation Drawer */}
          <motion.aside
            key="sidebar-drawer"
            ref={sidebarRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            id="sidebar-navigation"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              damping: 26,
              stiffness: 280,
              mass: 0.9,
            }}
            className={cn(
              "fixed top-0 bottom-0 left-0 z-50 w-72 sm:w-80 h-full",
              "flex flex-col justify-between overflow-y-auto",
              "bg-card/95 backdrop-blur-2xl border-r border-border shadow-2xl shadow-black/60",
              "text-foreground p-5"
            )}
          >
            {/* Header: Brand & Close X Button */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-border/70">
                <div className="flex items-center space-x-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-base font-bold tracking-tight text-foreground">
                      Zenithen<span className="text-primary">Open</span>
                    </span>
                    <span className="text-[9px] font-medium text-muted-foreground tracking-wider uppercase">
                      Open Source Community
                    </span>
                  </div>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeSidebar}
                  aria-label="Close navigation"
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground",
                    "hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  )}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="mt-6 space-y-6">
                {/* Primary Navigation */}
                <div>
                  <p className="px-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 font-mono">
                    Primary Navigation
                  </p>
                  <nav className="space-y-1">
                    {PRIMARY_NAV_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={closeSidebar}
                          className={cn(
                            "group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all",
                            isActive
                              ? "bg-primary/15 text-primary font-semibold border border-primary/25 shadow-xs"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon
                              className={cn(
                                "h-4 w-4 shrink-0 transition-colors",
                                isActive
                                  ? "text-primary"
                                  : "text-muted-foreground group-hover:text-foreground"
                              )}
                            />
                            <div className="flex flex-col text-left">
                              <span className="leading-tight">{item.name}</span>
                              {item.description && (
                                <span className="text-[10px] text-muted-foreground font-normal line-clamp-1">
                                  {item.description}
                                </span>
                              )}
                            </div>
                          </div>
                          <ChevronRight
                            className={cn(
                              "h-3.5 w-3.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity",
                              isActive && "text-primary opacity-100"
                            )}
                          />
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Campus Hub */}
                <div>
                  <p className="px-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 font-mono">
                    Campus Hub
                  </p>
                  <nav className="space-y-1">
                    {SECONDARY_NAV_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={closeSidebar}
                          className={cn(
                            "group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all",
                            isActive
                              ? "bg-primary/15 text-primary font-semibold border border-primary/25 shadow-xs"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon
                              className={cn(
                                "h-4 w-4 shrink-0 transition-colors",
                                isActive
                                  ? "text-primary"
                                  : "text-muted-foreground group-hover:text-foreground"
                              )}
                            />
                            <span>{item.name}</span>
                          </div>
                          <ChevronRight
                            className={cn(
                              "h-3.5 w-3.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity",
                              isActive && "text-primary opacity-100"
                            )}
                          />
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>

            {/* Bottom Section: User Profile or Login/Sign Up */}
            <div className="pt-4 border-t border-border/70 mt-6">
              {user ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/60 border border-border">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={user.avatarUrl}
                      alt={user.githubUsername}
                      className="h-8 w-8 rounded-full ring-1 ring-primary object-cover"
                    />
                    <div className="text-left">
                      <p className="text-xs font-semibold text-foreground">
                        @{user.githubUsername}
                      </p>
                      <p className="text-[10px] text-accent font-mono">
                        {user.usn}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      closeSidebar();
                    }}
                    title="Sign Out"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      closeSidebar();
                      openLoginModal();
                    }}
                    className="w-full text-xs font-semibold border-border bg-card hover:bg-muted text-foreground cursor-pointer"
                  >
                    Log in
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      closeSidebar();
                      openLoginModal();
                    }}
                    className="w-full text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/25 cursor-pointer"
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
