// app/auth/AuthenticatedLayout.tsx

'use client';  // Indicating that this file contains client-side code

import React from 'react';  // Importing React
import { useSession } from 'next-auth/react';  // Importing useSession hook from next-auth/react
import Header from '../../components/Header';  // Importing Header component
import Sidebar from '../../components/sidebar';  // Importing Sidebar component

// Functional component for authenticated layout
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

export default AuthenticatedLayout;  // Exporting AuthenticatedLayout component as default
