// app/layout.tsx

'use client';  // Indicating that this file contains client-side code

import '../styles/globals.css';  // Importing global CSS styles
import { ThemeProvider } from '../components/theme-provider';  // Importing ThemeProvider component
import SessionProviderWrapper from '../components/SessionProviderWrapper';  // Importing SessionProviderWrapper component
import React, { ReactNode } from 'react';  // Importing React and ReactNode type
import { useSession } from 'next-auth/react';  // Importing useSession hook from next-auth/react
import Header from '../components/Header';  // Importing Header component
import Sidebar from '../components/sidebar';  // Importing Sidebar component

// Defining the props interface for the Layout component
interface LayoutProps {
  children: ReactNode;  // ReactNode type for children prop
}

// Functional component for the main layout of the application
const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();  // Using useSession hook to get session data and status

  if (status === 'loading') {  // If the session status is loading, show a loading message
    return <div>Loading...</div>;
  }

  return (
    <>
      {status === 'authenticated' && <Header />} {/* Show Header if the user is authenticated */}
      <div className="flex">
        {status === 'authenticated' && <Sidebar />} {/* Show Sidebar if the user is authenticated */}
        <div 
          className={status === 'authenticated' ? "flex-1" : "flex-1 mt-0 ml-0"} 
          style={status === 'authenticated' ? { marginTop: '60px', marginLeft: '250px' } : {}}
        >
          <div className="p-4 overflow-auto bg-white dark:bg-gray-900 dark:text-white max-w-7xl mx-auto">
            {children}  {/* Render children components */}
          </div>
        </div>
      </div>
    </>
  );
};

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
