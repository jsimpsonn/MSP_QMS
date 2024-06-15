'use client';

import React from 'react';
import Link from 'next/link';
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import CommandPaletteComponent from './CommandPalette';
import { Button } from '@/components/ui/button';

const Header: React.FC = React.memo(() => {
  return (
    <header className="sticky-header flex items-center justify-between p-4">
      <div className="flex-grow"></div>
      <div className="flex items-center justify-center flex-grow-0 mr-4">
        <Button
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
          className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-gray-100 hover:text-accent-foreground px-4 py-2 relative h-8 md:w-40 lg:w-64 rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none justify-between"
        >
          <span className="flex-grow text-left">Search qms...</span>
          <span className="flex items-center justify-center bg-gray-200 text-gray-500 text-xs rounded px-1.5 py-0.5 ml-2">
            <kbd className="font-sans">Ctrl</kbd> + <kbd className="font-sans">K</kbd>
          </span>
        </Button>
      </div>
      <div className="flex items-center space-x-4 ml-auto">
        <CommandPaletteComponent />
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile Settings</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="/path-to-your-image.jpg" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
        </DropdownMenu>
        <ModeToggle />
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
