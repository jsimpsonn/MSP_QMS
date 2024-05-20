"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faBars } from '@fortawesome/free-solid-svg-icons';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';

interface HeaderProps {
  onDarkModeToggle: () => void;
  isDarkMode: boolean;
  isSidebarVisible: boolean;
  setIsSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ onDarkModeToggle, isDarkMode, isSidebarVisible, setIsSidebarVisible }) => {
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white h-16 px-6 shadow-lg dark:bg-gray-900 dark:text-gray-200">
      {!isSidebarVisible && (
        <div className="menu-icon cursor-pointer" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </div>
      )}
      <div className="ml-4 flex-grow">
        <input
          type="text"
          placeholder="Search..."
          className="ml-auto flex mx-4 my-2 flex w-250 px-4 py-2 text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
      </div>
      <div className="ml-auto flex items-center space-x-6">
        <Link href="/settings" className="flex items-center transition-colors duration-300 hover:text-gray-300">
          <FontAwesomeIcon icon={faCog} className="mr-2" />
          Settings
        </Link>
        <Link href="/profile" className="flex items-center transition-colors duration-300 hover:text-gray-300">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Profile
        </Link>
        <button
          onClick={onDarkModeToggle}
          className="focus:outline-none transition-transform duration-300 transform hover:scale-110"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <IoMdSunny color="orange" size="1.5em" /> : <IoMdMoon color="white" size="1.5em" />}
        </button>
      </div>
    </div>
  );
};

export default Header;
