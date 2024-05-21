import '../styles/globals.css';
import Header from './components/Header';
import { ThemeProvider } from './components/theme-provider';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-white dark:bg-gray-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex flex-col md:flex-row h-screen">
            <div className="flex flex-col flex-1 transition-all duration-500 ease-in-out">
              <Header />
              <div className="flex-1 p-4 overflow-auto bg-white dark:bg-gray-900 dark:text-white">
                {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default Layout;
