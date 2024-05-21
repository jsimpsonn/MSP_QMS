"use client";

import React from 'react';
import Link from 'next/link';
import { Settings, User } from 'lucide-react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "./ui/navigation-menu";
import { ModeToggle } from "./ui/ModeToggle";  

const routes = [
  { href: '/', name: 'Home' },
  { href: '/requests', name: 'Action Items' },
  { href: '/documents', name: 'Controlled Documents' },
  { href: '/kpi', name: 'KPIs' },
  { href: '/maintenance', name: 'Maintenance' },
  { href: '/claims', name: 'Quality Claims' },
  { href: '/safety', name: 'Safety' }
];

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-[#2a4b8e] to-[#1e3a6d] dark:from-gray-800 dark:to-gray-900 text-white h-16 px-6 shadow-lg">
      <NavigationMenu className="flex-grow">
        <NavigationMenuList className="flex space-x-4">
          {routes.map(route => (
            <NavigationMenuItem key={route.href} className="flex-shrink-0">
              <NavigationMenuLink>
                <Link href={route.href} className="px-3 py-2 rounded-md text-white dark:text-gray-300 hover:bg-blue-700 dark:hover:bg-gray-700">
                  {route.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center space-x-4 ml-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300"
        />
        <Link href="/settings" className="flex items-center transition-colors duration-300 hover:text-gray-300">
          <Settings className="mr-2 h-5 w-5" />
        </Link>
        <Link href="/profile" className="flex items-center transition-colors duration-300 hover:text-gray-300">
          <User className="mr-2 h-5 w-5" />
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
