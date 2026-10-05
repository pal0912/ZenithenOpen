/**
 * ZenithenOpen Design System — Centralized Theme Registry
 * 
 * Defines the contract, metadata, swatches, and color tokens for all 6 themes.
 * Components must consume semantic CSS variables rather than hardcoded hex values.
 */

export type ThemeId =
  | "aqua-circuit"
  | "violet-nexus"
  | "sage-collective"
  | "monochrome"
  | "obsidian-pulse"
  | "midnight-aurora"
  | "carbon-ember";

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

export const DEFAULT_THEME: ThemeId = "sage-collective";
export const THEME_STORAGE_KEY = "zenithen-theme";

export const THEMES: Theme[] = [
  // LIGHT THEMES — 3
  {
    id: "aqua-circuit",
    name: "Aqua Circuit",
    tagline: "Fresh aqua tones designed for open-source collaboration.",
    swatches: ["#F7FCFC", "#0097A7", "#80DEEA"],
    colors: {
      background: "#F7FCFC",
      foreground: "#102A2E",
      card: "#FFFFFF",
      cardForeground: "#102A2E",
      border: "#D9EDEE",
      primary: "#0097A7",
      primaryForeground: "#FFFFFF",
      secondary: "#007C89",
      secondaryForeground: "#FFFFFF",
      accent: "#16A34A",
      accentForeground: "#FFFFFF",
      muted: "#E0F7FA",
      mutedForeground: "#607D80",
      glow: "rgba(0, 151, 167, 0.2)",
    },
  },
  {
    id: "violet-nexus",
    name: "Violet Nexus",
    tagline: "Creative violet interface for a futuristic open-source experience.",
    swatches: ["#FBF9FC", "#8E24AA", "#E1BEE7"],
    colors: {
      background: "#FBF9FC",
      foreground: "#211A24",
      card: "#FFFFFF",
      cardForeground: "#211A24",
      border: "#E9E1EB",
      primary: "#8E24AA",
      primaryForeground: "#FFFFFF",
      secondary: "#7B1FA2",
      secondaryForeground: "#FFFFFF",
      accent: "#16A34A",
      accentForeground: "#FFFFFF",
      muted: "#F3E5F5",
      mutedForeground: "#756A78",
      glow: "rgba(142, 36, 170, 0.2)",
    },
  },
  {
    id: "sage-collective",
    name: "Sage Collective",
    tagline: "Calm natural tones built around community and collaboration.",
    swatches: ["#FAFCF8", "#6B8E23", "#DCEDC8"],
    colors: {
      background: "#FAFCF8",
      foreground: "#1F2933",
      card: "#FFFFFF",
      cardForeground: "#1F2933",
      border: "#E1E8DC",
      primary: "#6B8E23",
      primaryForeground: "#FFFFFF",
      secondary: "#557317",
      secondaryForeground: "#FFFFFF",
      accent: "#16A34A",
      accentForeground: "#FFFFFF",
      muted: "#F1F5EC",
      mutedForeground: "#68756A",
      glow: "rgba(107, 142, 35, 0.2)",
    },
  },

  // DARK THEMES — 4
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
    id: "obsidian-pulse",
    name: "Obsidian Pulse",
    tagline: "Deep obsidian with crisp electric-blue accents.",
    swatches: ["#080B12", "#3B82F6", "#151B27"],
    colors: {
      background: "#080B12",
      foreground: "#F8FAFC",
      card: "#0F131C",
      cardForeground: "#F8FAFC",
      border: "#202938",
      primary: "#3B82F6",
      primaryForeground: "#FFFFFF",
      secondary: "#151B27",
      secondaryForeground: "#F8FAFC",
      accent: "#22C55E",
      accentForeground: "#FFFFFF",
      muted: "#151B27",
      mutedForeground: "#94A3B8",
      glow: "rgba(59, 130, 246, 0.22)",
    },
  },
  {
    id: "midnight-aurora",
    name: "Midnight Aurora",
    tagline: "Deep midnight blue with atmospheric violet accents.",
    swatches: ["#080A16", "#8B5CF6", "#171A32"],
    colors: {
      background: "#080A16",
      foreground: "#F5F3FF",
      card: "#101225",
      cardForeground: "#F5F3FF",
      border: "#252947",
      primary: "#8B5CF6",
      primaryForeground: "#FFFFFF",
      secondary: "#171A32",
      secondaryForeground: "#F5F3FF",
      accent: "#22C55E",
      accentForeground: "#FFFFFF",
      muted: "#171A32",
      mutedForeground: "#9CA3C8",
      glow: "rgba(139, 92, 246, 0.22)",
    },
  },
  {
    id: "carbon-ember",
    name: "Carbon Ember",
    tagline: "Refined graphite with warm amber-orange highlights.",
    swatches: ["#0D0D0F", "#F97316", "#29292E"],
    colors: {
      background: "#0D0D0F",
      foreground: "#FAFAFA",
      card: "#151518",
      cardForeground: "#FAFAFA",
      border: "#29292E",
      primary: "#F97316",
      primaryForeground: "#FFFFFF",
      secondary: "#1D1D21",
      secondaryForeground: "#FAFAFA",
      accent: "#22C55E",
      accentForeground: "#FFFFFF",
      muted: "#1D1D21",
      mutedForeground: "#A1A1AA",
      glow: "rgba(249, 115, 22, 0.22)",
    },
  },
];
