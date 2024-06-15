// app/auth/layout.tsx
import '../../styles/globals.css';
import { ThemeProvider } from '../../components/theme-provider';
import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Authentication - Quality Management System</title>
      </head>
      <body className="bg-white dark:bg-gray-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex items-center justify-center min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default AuthLayout;
