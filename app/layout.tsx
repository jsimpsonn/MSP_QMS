// app/layout.tsx

import '../styles/globals.css';  // Importing global CSS styles
import { ThemeProvider } from '../components/theme-provider';  // Importing ThemeProvider component
import SessionProviderWrapper from '../components/SessionProviderWrapper';  // Importing SessionProviderWrapper component
import React, { ReactNode } from 'react';  // Importing React and ReactNode type
import AuthenticatedLayout from './auth/AuthenticatedLayout';  // Importing AuthenticatedLayout component

// Defining the props interface for the Layout component
interface LayoutProps {
  children: ReactNode;  // ReactNode type for children prop
}

// Functional component for the main layout of the application
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

export default Layout;  // Exporting the Layout component as default
