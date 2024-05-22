"use client";

import React from 'react';
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

const Header = () => {
  return (
    <header className="sticky-header flex items-center justify-between p-4">
      {/* Logo and navigation for smaller screens */}
      <div className="flex items-center space-x-4">
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navigate through the site</SheetDescription>
            </SheetHeader>
            <NavigationMenu>
              <NavigationMenuList>
                {routes.map(route => (
                  <NavigationMenuItem key={route.href}>
                    <NavigationMenuLink asChild>
                      <Link href={route.href} className="px-3 py-2 rounded-md text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
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
                <NavigationMenuLink asChild>
                  <Link href={route.href} className="px-3 py-2 rounded-md text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
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
        <Link href="/settings" className="flex items-center transition-colors duration-300 hover:text-gray-500">
          <Settings className="mr-2 h-5 w-5" />
        </Link>
        <Link href="/profile" className="flex items-center transition-colors duration-300 hover:text-gray-500">
          <User className="mr-2 h-5 w-5" />
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
