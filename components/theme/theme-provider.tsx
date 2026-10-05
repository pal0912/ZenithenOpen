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

  // Synchronize with DOM attribute set by pre-hydration script
  React.useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
      if (savedTheme && THEMES.some((t) => t.id === savedTheme)) {
        setThemeState(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else {
        const domTheme = document.documentElement.getAttribute("data-theme") as ThemeId | null;
        if (domTheme && THEMES.some((t) => t.id === domTheme)) {
          setThemeState(domTheme);
        } else {
          document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
        }
      }
    } catch {
      // Fallback if localStorage is inaccessible
      document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
    }
    setMounted(true);
  }, []);

  const setTheme = React.useCallback((newTheme: ThemeId) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
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
