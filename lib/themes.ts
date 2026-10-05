/**
 * ZenithenOpen Design System — Centralized Theme Registry
 * 
 * Defines the contract, metadata, swatches, and color tokens for all 6 themes.
 * Components must consume semantic CSS variables rather than hardcoded hex values.
 */

export type ThemeId =
  | "monochrome"
  | "arctic-forge"
  | "indigo-core"
  | "aqua-circuit"
  | "violet-nexus"
  | "sage-collective";

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
    id: "arctic-forge",
    name: "Arctic Forge",
    tagline: "Clean technical interface with crisp blue accents.",
    swatches: ["#F8FAFC", "#1976D2", "#90CAF9"],
    colors: {
      background: "#F8FAFC",
      foreground: "#0F172A",
      card: "#FFFFFF",
      cardForeground: "#0F172A",
      border: "#E2E8F0",
      primary: "#1976D2",
      primaryForeground: "#FFFFFF",
      secondary: "#1565C0",
      secondaryForeground: "#FFFFFF",
      accent: "#16A34A",
      accentForeground: "#FFFFFF",
      muted: "#F1F5F9",
      mutedForeground: "#64748B",
      glow: "rgba(25, 118, 210, 0.2)",
    },
  },
  {
    id: "indigo-core",
    name: "Indigo Core",
    tagline: "Intelligent indigo interface with a modern developer feel.",
    swatches: ["#F8FAFF", "#3F51B5", "#C5CAE9"],
    colors: {
      background: "#F8FAFF",
      foreground: "#111827",
      card: "#FFFFFF",
      cardForeground: "#111827",
      border: "#E4E7EC",
      primary: "#3F51B5",
      primaryForeground: "#FFFFFF",
      secondary: "#303F9F",
      secondaryForeground: "#FFFFFF",
      accent: "#16A34A",
      accentForeground: "#FFFFFF",
      muted: "#E8EAF6",
      mutedForeground: "#667085",
      glow: "rgba(63, 81, 181, 0.2)",
    },
  },
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
];
