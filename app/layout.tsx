// app/layout.tsx
import '../styles/globals.css';
import { ThemeProvider } from '../components/theme-provider';
import SessionProviderWrapper from '../components/SessionProviderWrapper';
import React, { ReactNode } from 'react';
import AuthenticatedLayout from './auth/AuthenticatedLayout';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Quality Management System</title>
      </head>
      <body className="bg-white dark:bg-gray-900">
        <SessionProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthenticatedLayout>{children}</AuthenticatedLayout>
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
};

export default Layout;
