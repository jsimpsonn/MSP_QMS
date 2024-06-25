// components/theme-provider.tsx

"use client";

import * as React from "react";  // Importing React
import { ThemeProvider as NextThemesProvider } from "next-themes";  // Importing ThemeProvider component from next-themes
import { type ThemeProviderProps } from "next-themes/dist/types";  // Importing the ThemeProviderProps type from next-themes
import Header from "@/components/Header";
import Sidebar from "@/components/sidebar";

// Functional component for theme provider
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);  // State to track if the component is mounted
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  React.useEffect(() => {
    setMounted(true);

    if (sidebarOpen) {
      // Prevent body scroll and compensate for scrollbar width
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    } else {
      // Restore body scroll and padding
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [sidebarOpen]);

  // If not mounted, render nothing
  if (!mounted) {
    return null;
  }

  // Render the NextThemesProvider with the provided props and children
  return (
    <NextThemesProvider {...props}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20" onClick={toggleSidebar}></div>}
      <div className="relative">
        <div className="transition-all duration-300">
          {children}
        </div>
      </div>
    </NextThemesProvider>
  );
}