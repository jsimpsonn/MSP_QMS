import '../styles/globals.css';
import Header from '../components/Header';
import { ThemeProvider } from '../components/theme-provider';
import React, { ReactNode } from 'react';
import Sidebar from '../components/sidebar';

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex">
            <Sidebar />
            <div className="flex-1" style={{ marginTop: '60px', marginLeft: '250px' }}>
              <div className="p-4 overflow-auto bg-white dark:bg-gray-900 dark:text-white max-w-7xl mx-auto">
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
