"use client";

import * as React from "react";
import {
  ThemeId,
  THEMES,
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
} from "@/lib/themes";

export type MenuAnchor = "navbar" | "floating" | null;

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  isMenuOpen: boolean;
  menuAnchor: MenuAnchor;
  openMenu: (anchor?: MenuAnchor) => void;
  closeMenu: () => void;
  toggleMenu: (anchor?: MenuAnchor) => void;
  mounted: boolean;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<ThemeId>(DEFAULT_THEME);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState<MenuAnchor>("floating");
  const [mounted, setMounted] = React.useState(false);

  // Synchronize with DOM attribute set by pre-hydration script & handle migration
  React.useEffect(() => {
    try {
      // Check URL parameters (?theme=...)
      let initialTheme: ThemeId | null = null;
      try {
        const params = new URLSearchParams(window.location.search);
        const qTheme = params.get("theme");
        if (qTheme === "arctic-forge" || qTheme === "indigo-core") {
          initialTheme = "monochrome";
          localStorage.setItem(THEME_STORAGE_KEY, "monochrome");
        } else if (qTheme && THEMES.some((t) => t.id === qTheme)) {
          initialTheme = qTheme as ThemeId;
          localStorage.setItem(THEME_STORAGE_KEY, qTheme);
        }
      } catch {
        // Ignore URL parsing errors
      }

      if (!initialTheme) {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        // Automatic migration of removed themes to Monochrome
        if (savedTheme === "arctic-forge" || savedTheme === "indigo-core") {
          initialTheme = "monochrome";
          localStorage.setItem(THEME_STORAGE_KEY, "monochrome");
        } else if (savedTheme && THEMES.some((t) => t.id === savedTheme)) {
          initialTheme = savedTheme as ThemeId;
        }
      }

      if (initialTheme) {
        setThemeState(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
      } else {
        const domTheme = document.documentElement.getAttribute("data-theme") as ThemeId | null;
        if (domTheme && THEMES.some((t) => t.id === domTheme)) {
          setThemeState(domTheme);
          localStorage.setItem(THEME_STORAGE_KEY, domTheme);
        } else {
          setThemeState(DEFAULT_THEME);
          document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
          localStorage.setItem(THEME_STORAGE_KEY, DEFAULT_THEME);
        }
      }
    } catch {
      // Fallback if localStorage is inaccessible
      document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
    }
    setMounted(true);
  }, []);

  const setTheme = React.useCallback((themeCandidate: ThemeId | string) => {
    let resolvedTheme: ThemeId = DEFAULT_THEME;
    // Guard against programmatic calls with deleted themes
    if (themeCandidate === "arctic-forge" || themeCandidate === "indigo-core") {
      resolvedTheme = "monochrome";
    } else if (THEMES.some((t) => t.id === themeCandidate)) {
      resolvedTheme = themeCandidate as ThemeId;
    }

    setThemeState(resolvedTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, resolvedTheme);
      document.documentElement.setAttribute("data-theme", resolvedTheme);
    } catch (e) {
      console.warn("Unable to persist theme to localStorage:", e);
    }
  }, []);

  const openMenu = React.useCallback((anchor: MenuAnchor = "floating") => {
    setMenuAnchor(anchor);
    setIsMenuOpen(true);
  }, []);

  const closeMenu = React.useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = React.useCallback(
    (anchor: MenuAnchor = "floating") => {
      setIsMenuOpen((prev) => {
        if (!prev) setMenuAnchor(anchor);
        return !prev;
      });
    },
    []
  );

  // Keyboard shortcut: Close on Escape
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  const contextValue = React.useMemo(
    () => ({
      theme,
      setTheme,
      isMenuOpen,
      menuAnchor,
      openMenu,
      closeMenu,
      toggleMenu,
      mounted,
    }),
    [theme, setTheme, isMenuOpen, menuAnchor, openMenu, closeMenu, toggleMenu, mounted]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
