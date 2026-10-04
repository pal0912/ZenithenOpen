"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

interface NavigationContextType {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
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

  // Close sidebar on route change
  React.useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Handle keyboard interaction (Escape key closes sidebar)
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen]);

  // Prevent background scroll when sidebar is open on small mobile devices
  React.useEffect(() => {
    if (isSidebarOpen && typeof window !== "undefined" && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <NavigationContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
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
