"use client";

import * as React from "react";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

/**
 * The signature Next.js circular "N" mark.
 * Preserves the exact geometry, gradient cut, and developer-tool aesthetic.
 */
function NextMarkSvg({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="90" cy="90" r="90" fill="#05070a" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="url(#n_linear_gradient_0)"
      />
      <rect
        x="115"
        y="54"
        width="12.2"
        height="72"
        fill="url(#n_linear_gradient_1)"
      />
      <defs>
        <linearGradient
          id="n_linear_gradient_0"
          x1="109"
          y1="116.5"
          x2="144.5"
          y2="160.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient
          id="n_linear_gradient_1"
          x1="121"
          y1="54"
          x2="120.799"
          y2="106.875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ThemeSwitcher() {
  const { toggleMenu, isMenuOpen, theme } = useTheme();

  return (
    <div className="fixed bottom-5 left-5 z-40 print:hidden">
      <button
        type="button"
        data-theme-trigger="floating"
        onClick={() => toggleMenu("floating")}
        aria-label={`Change theme (current: ${theme})`}
        aria-haspopup="dialog"
        aria-expanded={isMenuOpen}
        title="Switch theme (N)"
        className={cn(
          "group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full",
          "bg-[#07090e] border border-white/15",
          "shadow-lg shadow-black/40",
          "transition-all duration-300 ease-out",
          "hover:scale-105 hover:border-white/30 hover:shadow-[0_0_18px_var(--glow)]",
          "active:scale-95",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isMenuOpen && "ring-2 ring-primary ring-offset-2 ring-offset-background border-primary/50 shadow-[0_0_20px_var(--glow)]"
        )}
      >
        {/* Subtle ambient pulse ring behind the button */}
        <span
          className="absolute inset-0 rounded-full opacity-40 blur-xs transition-opacity group-hover:opacity-100"
          style={{
            background: "radial-gradient(circle, var(--glow) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* The Authentic Next.js "N" Icon */}
        <div className="relative z-10 flex items-center justify-center h-full w-full p-1.5 sm:p-2">
          <NextMarkSvg className="h-full w-full drop-shadow-xs" />
        </div>

        {/* Small active theme indicator dot */}
        <span
          className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary shadow-xs"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
