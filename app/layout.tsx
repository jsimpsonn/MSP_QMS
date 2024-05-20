"use client";

import './globals.css';
import './fontawesome';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import React, { useState, useEffect, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const classList = document.documentElement.classList;

    if (isDarkMode) {
      classList.add('dark');
    } else {
      classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

return (
  <html lang="en">
    <body className={`bg-white ${isDarkMode ? 'dark:bg-gray-900 dark:text-gray-200' : ''}`}>
      <div className="relative flex flex-col md:flex-row h-screen">
        <Sidebar className="md:w-64" isSidebarVisible={isSidebarVisible} setIsSidebarVisible={setIsSidebarVisible} />
        <div className={`flex flex-col flex-1 transition-all duration-500 ease-in-out ${isSidebarVisible ? 'ml-64' : 'ml-0'}`}>
          <Header onDarkModeToggle={handleDarkModeToggle} isDarkMode={isDarkMode} isSidebarVisible={isSidebarVisible} setIsSidebarVisible={setIsSidebarVisible} />
          <div className={`flex-1 p-4 overflow-auto ${isDarkMode ? 'bg-white dark:bg-gray-900 dark:text-gray-200' : ''}`}>{children}</div>
        </div>
      </div>
    </body>
  </html>
);
}

export default Layout;