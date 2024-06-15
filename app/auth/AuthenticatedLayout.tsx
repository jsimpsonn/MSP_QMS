// components/AuthenticatedLayout.tsx
'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Header from '../../components/Header';
import Sidebar from '../../components/sidebar';

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      {status === 'authenticated' && <Header />}
      <div className="flex">
        {status === 'authenticated' && <Sidebar />}
        <div className={status === 'authenticated' ? "flex-1" : "flex-1 mt-0 ml-0"} style={status === 'authenticated' ? { marginTop: '60px', marginLeft: '250px' } : {}}>
          <div className="p-4 overflow-auto bg-white dark:bg-gray-900 dark:text-white max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthenticatedLayout;
