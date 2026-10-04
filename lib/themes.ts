/**
 * ZenithenOpen Design System — Centralized Theme Registry
 * 
 * Defines the contract, metadata, swatches, and color tokens for all 7 themes.
 * Components must consume semantic CSS variables rather than hardcoded hex values.
 */

export type ThemeId =
  | "obsidian"
  | "git-graph"
  | "aurora"
  | "deep-ocean"
  | "cyberpunk"
  | "monochrome"
  | "solar";

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  border: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  glow: string;
}

export interface Theme {
  id: ThemeId;
  name: string;
  tagline: string;
  swatches: [string, string, string]; // [background, primary/accent, secondary/glow]
  colors: ThemeColors;
}

export const DEFAULT_THEME: ThemeId = "obsidian";
export const THEME_STORAGE_KEY = "zenithen-theme";

export const THEMES: Theme[] = [
  {
    id: "obsidian",
    name: "Obsidian",
    tagline: "Deep obsidian black with subtle violet luminescence",
    swatches: ["#07090e", "#3b82f6", "#8b5cf6"],
    colors: {
      background: "#07090e",
      foreground: "#f8fafc",
      card: "#0d111a",
      cardForeground: "#f8fafc",
      border: "rgba(255, 255, 255, 0.08)",
      primary: "#3b82f6",
      primaryForeground: "#ffffff",
      secondary: "#8b5cf6",
      secondaryForeground: "#ffffff",
      accent: "#10b981",
      accentForeground: "#ffffff",
      muted: "#131926",
      mutedForeground: "#94a3b8",
      glow: "rgba(59, 130, 246, 0.25)",
    },
  },
  {
    id: "git-graph",
    name: "Git Graph",
    tagline: "Terminal obsidian with GitHub commit emerald & cyan",
    swatches: ["#0a0f14", "#2ea043", "#38bdf8"],
    colors: {
      background: "#0a0f14",
      foreground: "#e6edf3",
      card: "#111822",
      cardForeground: "#e6edf3",
      border: "rgba(56, 189, 248, 0.14)",
      primary: "#2ea043",
      primaryForeground: "#ffffff",
      secondary: "#38bdf8",
      secondaryForeground: "#0a0f14",
      accent: "#3fb950",
      accentForeground: "#ffffff",
      muted: "#16202e",
      mutedForeground: "#7d8590",
      glow: "rgba(46, 160, 67, 0.25)",
    },
  },
  {
    id: "aurora",
    name: "Aurora",
    tagline: "Midnight polar sky with northern lights cyan & violet",
    swatches: ["#0b0d1e", "#06b6d4", "#a855f7"],
    colors: {
      background: "#0b0d1e",
      foreground: "#f3f4f6",
      card: "#12162e",
      cardForeground: "#f3f4f6",
      border: "rgba(6, 182, 212, 0.16)",
      primary: "#06b6d4",
      primaryForeground: "#0b0d1e",
      secondary: "#a855f7",
      secondaryForeground: "#ffffff",
      accent: "#22c55e",
      accentForeground: "#0b0d1e",
      muted: "#181d3d",
      mutedForeground: "#9ca3af",
      glow: "rgba(6, 182, 212, 0.25)",
    },
  },
  {
    id: "deep-ocean",
    name: "Deep Ocean",
    tagline: "Abyssal marine depth with seafoam teal & sky highlights",
    swatches: ["#05111d", "#14b8a6", "#38bdf8"],
    colors: {
      background: "#05111d",
      foreground: "#f0f9ff",
      card: "#0a1d30",
      cardForeground: "#f0f9ff",
      border: "rgba(20, 184, 166, 0.16)",
      primary: "#14b8a6",
      primaryForeground: "#05111d",
      secondary: "#38bdf8",
      secondaryForeground: "#05111d",
      accent: "#06b6d4",
      accentForeground: "#05111d",
      muted: "#0f2842",
      mutedForeground: "#7dd3fc",
      glow: "rgba(20, 184, 166, 0.25)",
    },
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    tagline: "High-voltage neon noir with electric yellow & magenta",
    swatches: ["#090514", "#fcee0a", "#ff007f"],
    colors: {
      background: "#090514",
      foreground: "#ffffff",
      card: "#130b29",
      cardForeground: "#ffffff",
      border: "rgba(255, 0, 127, 0.25)",
      primary: "#fcee0a",
      primaryForeground: "#000000",
      secondary: "#ff007f",
      secondaryForeground: "#ffffff",
      accent: "#00f0ff",
      accentForeground: "#000000",
      muted: "#1d123d",
      mutedForeground: "#d8b4fe",
      glow: "rgba(255, 0, 127, 0.35)",
    },
  },
  {
    id: "monochrome",
    name: "Monochrome",
    tagline: "Pure stark obsidian minimalism with silver boundaries",
    swatches: ["#000000", "#ffffff", "#71717a"],
    colors: {
      background: "#000000",
      foreground: "#ffffff",
      card: "#09090b",
      cardForeground: "#ffffff",
      border: "rgba(255, 255, 255, 0.12)",
      primary: "#ffffff",
      primaryForeground: "#000000",
      secondary: "#27272a",
      secondaryForeground: "#ffffff",
      accent: "#a1a1aa",
      accentForeground: "#000000",
      muted: "#18181b",
      mutedForeground: "#a1a1aa",
      glow: "rgba(255, 255, 255, 0.15)",
    },
  },
  {
    id: "solar",
    name: "Solar",
    tagline: "Warm dark graphite with radiant amber & flare gold",
    swatches: ["#0f0d0b", "#f59e0b", "#f97316"],
    colors: {
      background: "#0f0d0b",
      foreground: "#fffbeb",
      card: "#1a1612",
      cardForeground: "#fffbeb",
      border: "rgba(245, 158, 11, 0.18)",
      primary: "#f59e0b",
      primaryForeground: "#0f0d0b",
      secondary: "#f97316",
      secondaryForeground: "#ffffff",
      accent: "#fbbf24",
      accentForeground: "#0f0d0b",
      muted: "#26201a",
      mutedForeground: "#d97706",
      glow: "rgba(245, 158, 11, 0.28)",
    },
  },
];
