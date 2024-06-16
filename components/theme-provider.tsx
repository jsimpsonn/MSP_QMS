// components/theme-provider.tsx

"use client";

import * as React from "react";  // Importing React
import { ThemeProvider as NextThemesProvider } from "next-themes";  // Importing ThemeProvider component from next-themes
import { type ThemeProviderProps } from "next-themes/dist/types";  // Importing the ThemeProviderProps type from next-themes

// Functional component for theme provider
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);  // State to track if the component is mounted

  // Effect to set the mounted state to true after the component mounts
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted, render nothing
  if (!mounted) {
    return null;
  }

  // Render the NextThemesProvider with the provided props and children
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
