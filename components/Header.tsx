"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Settings, User, Menu } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetOverlay,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription
} from './ui/sheet';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from './ui/navigation-menu';
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
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative flex justify-between items-center bg-gradient-to-r from-[#2a4b8e] to-[#1e3a6d] dark:from-gray-800 dark:to-gray-900 text-white h-16 px-6 shadow-lg">
      {/* Hamburger icon for mobile */}
      <div className="flex items-center space-x-4 lg:hidden">
        <Sheet open={menuOpen} onOpenChange={toggleMenu}>
          <SheetTrigger asChild>
            <button onClick={toggleMenu} aria-label="Toggle menu">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetOverlay className="fixed inset-0 z-50 bg-black/80" />
          <SheetContent side="left" className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-white p-4 shadow-lg dark:bg-gray-800">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col space-y-4">
                {routes.map(route => (
                  <NavigationMenuItem key={route.href} className="flex-shrink-0">
                    <NavigationMenuLink>
                      <Link href={route.href} className="px-3 py-2 rounded-md text-black dark:text-gray-300 hover:bg-blue-700 dark:hover:bg-gray-700" onClick={toggleMenu}>
                        {route.name}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </SheetContent>
        </Sheet>
      </div>
      {/* Navigation menu for larger screens */}
      <div className="hidden lg:flex items-center space-x-4">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-row space-x-4">
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
      </div>
      {/* Additional items */}
      <div className="flex items-center space-x-4 ml-auto">
        <input
          type="text"
          placeholder="Search..."
          className="hidden lg:block px-4 py-2 text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300"
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
