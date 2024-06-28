'use client';

import '../styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import Sidebar from '@/components/sidebar';
import Header from '@/components/Header';
import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <html lang="en">
      <head>
        <title>Quality Management System</title>
      </head>
      <body>
        <SessionProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-screen overflow-hidden">
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <div className="flex flex-col flex-1 w-full">
                <Header onToggleSidebar={toggleSidebar} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 lg:ml-[250px] mt-[60px]">
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}