"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

interface NavigationContextType {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;
  popupSection: string | null;
  openPopup: (section: string) => void;
  closePopup: () => void;
}

const NavigationContext = React.createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  const [popupSection, setPopupSection] = React.useState<string | null>(null);
  const pathname = usePathname();

  const openSidebar = React.useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const closeSidebar = React.useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const toggleSidebar = React.useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const openPopup = React.useCallback((section: string) => {
    setActiveSection(section);
    setPopupSection(section);
  }, []);

  const closePopup = React.useCallback(() => {
    setPopupSection(null);
  }, []);

  // Reset active section & popup on route change
  React.useEffect(() => {
    setIsSidebarOpen(false);
    setActiveSection(null);
    setPopupSection(null);
  }, [pathname]);

  // Handle keyboard interaction (Escape key closes sidebar or popup)
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (popupSection) {
          setPopupSection(null);
        } else if (isSidebarOpen) {
          setIsSidebarOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen, popupSection]);

  // Prevent background scroll when sidebar or popup is open
  React.useEffect(() => {
    if ((isSidebarOpen && typeof window !== "undefined" && window.innerWidth < 768) || popupSection) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen, popupSection]);

  return (
    <NavigationContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
        activeSection,
        setActiveSection,
        popupSection,
        openPopup,
        closePopup,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextType {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
