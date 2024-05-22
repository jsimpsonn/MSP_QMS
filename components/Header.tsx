'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Settings, User, Menu } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetOverlay,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from './ui/navigation-menu';
import { ModeToggle } from "./ModeToggle";

const routes = [
  { href: '/', name: 'Home' },
  { href: '/requests', name: 'Action Items' },
  { href: '/documents', name: 'Controlled Documents' },
  { href: '/kpi', name: 'KPIs' },
  { href: '/maintenance', name: 'Maintenance' },
  { href: '/claims', name: 'Quality Claims' },
  { href: '/safety', name: 'Safety' }
];

const Header: React.FC = React.memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  }, []);

  return (
    <header className="sticky-header flex items-center justify-between p-4">
      {/* Logo and navigation for smaller screens */}
      <div className="flex items-center space-x-4">
        <Sheet open={menuOpen} onOpenChange={toggleMenu}>
          <SheetTrigger asChild>
            <button onClick={toggleMenu} aria-label="Toggle menu" className="lg:hidden">
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
                    <NavigationMenuLink asChild>
                      <Link href={route.href} className="px-3 py-2 rounded-md text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={toggleMenu}>
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
});

Header.displayName = 'Header';

export default Header;
