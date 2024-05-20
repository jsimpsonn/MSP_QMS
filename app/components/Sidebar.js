"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ className = '', isSidebarVisible, setIsSidebarVisible }) => {
  const pathname = usePathname();
  const links = [
    { href: '/', name: 'Home' },
    { href: '/requests', name: 'Action Items' },
    { href: '/documents', name: 'Controlled Documents' },
    { href: '/kpi', name: 'KPIs' },
    { href: '/maintenance', name: 'Maintenance' },
    { href: '/claims', name: 'Quality Claims' },
    { href: '/safety', name: 'Safety' },
  ];

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className={`absolute flex flex-col h-screen bg-gray-50 dark:bg-gray-800 shadow-md transition-transform duration-500 ease-in-out ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} ${className}`}>
    <div className={`flex items-center p-2 mb-8 text-gray-700 dark:text-gray-300 cursor-pointer ${isSidebarVisible ? 'justify-end' : 'justify-center'}`} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isSidebarVisible ? faAngleDoubleLeft : faBars} size="lg" />
      </div>
      {isSidebarVisible && (
        <div className="flex items-center justify-center mb-8">
          <Image src="/images/logo-2.svg" alt="MSP App Logo" width={140} height={40} />
        </div>
      )}
<nav className={`flex flex-col space-y-2 ${isSidebarVisible ? 'block' : 'hidden'}`}>
  {links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className={`flex items-center p-2 text-gray-700 dark:text-gray-300 rounded-md ${pathname === link.href && isSidebarVisible ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} ${isSidebarVisible ? '' : 'justify-center'}`}
    >
      {link.name}
    </Link>
  ))}
</nav>
    </div>
  );
}

export default Sidebar;