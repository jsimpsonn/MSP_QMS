import '../styles/globals.css';
import Header from '../components/Header';
import { ThemeProvider } from '../components/theme-provider';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <html lang="en">
        <head />
        <body className="bg-white dark:bg-gray-900">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <div className="p-4 overflow-auto bg-white dark:bg-gray-900 dark:text-white">
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}

export default Layout;