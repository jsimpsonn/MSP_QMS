'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import CommandPaletteComponent from './CommandPalette';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-background border-b border-gray-200/40 z-10 dark:bg-dark-background bg-opacity-80 dark:bg-opacity-80 backdrop-blur-[8px] dark:backdrop-blur-[8px] flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <button className="xl:hidden text-black dark:text-white" onClick={onToggleSidebar} title="Toggle Sidebar">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <div className="hidden xl:block">
          <CommandPaletteComponent />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
          className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-[#f4f4f5] dark:hover:bg-[#27272a] hover:text-accent-foreground px-4 py-2 relative h-8 xl:w-64 rounded-[0.5rem] bg-background dark:bg-[#212121] text-sm font-normal text-muted-foreground dark:text-[#E0E0E0] shadow-none justify-between"
        >
          <span className="hidden xl:flex flex-grow text-left">Search qms...</span>
          <span className="flex xl:hidden">
            <Search className="w-5 h-5" />
          </span>
          <span className="hidden xl:flex items-center justify-center bg-gray-200 text-gray-500 text-xs rounded px-1.5 py-0.5 ml-2">
            <kbd className="font-sans">Ctrl</kbd> + <kbd className="font-sans">K</kbd>
          </span>
        </Button>
        <ModeToggle />
        {session && (
          <div className="flex items-center space-x-2">
            <span className="hidden xl:inline">{session.user?.name}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={session.user?.image ?? '/path-to-your-image.jpg'} alt={session.user?.name ?? 'User Avatar'} />
                  <AvatarFallback>{session.user?.name?.[0] ?? 'U'}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
};

Header.displayName = 'Header';

export default Header;
