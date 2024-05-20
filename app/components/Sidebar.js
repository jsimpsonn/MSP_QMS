// app/components/Sidebar.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/kpi', label: 'KPIs' }
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`flex flex-col h-screen bg-gray-50 shadow-md ${isExpanded ? 'w-64' : 'w-16'} transition-width duration-300`}>
      <div className={`flex items-center p-2 mb-8 text-gray-700 cursor-pointer ${isExpanded ? 'justify-end' : 'justify-center'}`} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isExpanded ? faAngleDoubleLeft : faBars} size="lg" />
      </div>
      {isExpanded && (
        <div className="flex items-center justify-center mb-8">
          <Image src="/images/logo-2.svg" alt="MSP App Logo" width={140} height={40} />
        </div>
      )}
      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center p-2 text-gray-700 rounded-md ${pathname === link.href && isExpanded ? 'bg-gray-200' : 'hover:bg-gray-100'} ${isExpanded ? '' : 'justify-center'}`}
          >
            <span className="text-lg">{link.icon}</span>
            {isExpanded && <span className="ml-3">{link.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
