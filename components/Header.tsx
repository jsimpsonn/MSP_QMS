'use client';

import React from 'react';
import Link from 'next/link';
import { GearIcon } from '@radix-ui/react-icons';
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Header: React.FC = React.memo(() => {
  return (
    <header className="sticky-header flex items-center justify-between p-4">
      {/* Additional items */}
      <div className="flex items-center space-x-4 ml-auto">
        <Link href="/settings" className="flex items-center transition-colors duration-300 hover:text-gray-500">
          <GearIcon className="mr-2 h-5 w-5" />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="/path-to-your-image.jpg" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile Settings</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;

