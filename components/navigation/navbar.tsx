"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Code2,
  Trophy,
  Sparkles,
  FileText,
  Menu,
  X,
  LogOut,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/auth-context";
import { useTheme } from "@/components/theme/theme-provider";

const NAV_LINKS = [
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Hall of Fame", href: "/achievements", icon: Sparkles },
  { name: "Resume", href: "/resume", icon: FileText },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, openLoginModal, logout } = useAuth();
  const { toggleMenu, isMenuOpen, menuAnchor, theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isThemeActiveOnNavbar = isMenuOpen && menuAnchor === "navbar";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-background/90 backdrop-blur-xl shadow-xs"
          : "border-b border-transparent bg-background/70 backdrop-blur-md"
      )}
    >
      <div className="w-full flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo - Clicking it opens the theme options menu */}
        <div className="flex items-center flex-1 justify-start">
          <button
            type="button"
            data-theme-trigger="navbar"
            onClick={() => toggleMenu("navbar")}
            aria-label={`ZenithenOpen — Click to change theme (current: ${theme})`}
            aria-haspopup="dialog"
            aria-expanded={isThemeActiveOnNavbar}
            title="Click ZenithenOpen logo to change theme"
            className={cn(
              "group flex items-center space-x-2.5 text-left rounded-xl p-1 -ml-1 transition-all cursor-pointer",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isThemeActiveOnNavbar && "ring-2 ring-primary/40 bg-muted/40"
            )}
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-secondary to-accent p-0.5 shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-card">
                <Code2 className="h-5 w-5 text-primary group-hover:text-secondary transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  Zenithen<span className="text-primary">Open</span>
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  <Palette className="h-2.5 w-2.5" />
                  theme
                </span>
              </div>
              <span className="text-[10px] font-medium text-muted-foreground tracking-wider uppercase">
                Open Source Community
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Nav Links - Centered in middle */}
        <nav className="hidden lg:flex items-center justify-center space-x-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative flex items-center space-x-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-150",
                  isActive
                    ? "bg-primary/15 text-primary font-semibold shadow-xs border border-primary/25"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden sm:flex items-center flex-1 justify-end space-x-3">
          {user ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 rounded-xl border border-border bg-card px-2.5 py-1 text-xs">
                <img
                  src={user.avatarUrl}
                  alt={user.githubUsername}
                  className="h-6 w-6 rounded-full object-cover ring-1 ring-primary"
                />
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-foreground leading-tight">@{user.githubUsername}</span>
                  <span className="text-[10px] text-accent font-mono leading-tight">{user.usn}</span>
                </div>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Log in Button */}
              <button
                type="button"
                onClick={openLoginModal}
                className="flex items-center space-x-1.5 rounded-lg border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted shadow-xs transition-colors cursor-pointer"
              >
                Log in
              </button>

              {/* Sign up Button */}
              <Button
                size="sm"
                onClick={openLoginModal}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-md shadow-primary/25 cursor-pointer"
              >
                Sign up
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-card/95 px-4 pt-3 pb-6 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col space-y-1 mb-4">
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
                      ? "bg-primary/15 text-primary font-semibold border border-primary/25"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col space-y-2 pt-2 border-t border-border">
            {user ? (
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/60 border border-border">
                <div className="flex items-center space-x-2.5">
                  <img src={user.avatarUrl} alt="" className="h-7 w-7 rounded-full ring-1 ring-primary" />
                  <div className="text-left">
                    <p className="text-xs font-semibold text-foreground">@{user.githubUsername}</p>
                    <p className="text-[10px] text-accent font-mono">{user.usn}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openLoginModal();
                  }}
                  className="w-1/2 border-border text-xs py-2 text-foreground"
                  size="sm"
                >
                  Log in
                </Button>
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openLoginModal();
                  }}
                  className="w-1/2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs py-2"
                  size="sm"
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
