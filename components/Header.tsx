// components/Header.tsx

'use client';

import React from 'react';  // Importing React
import Link from 'next/link';  // Importing Link component from next/link for client-side navigation
import { useSession, signOut } from 'next-auth/react';  // Importing useSession and signOut from next-auth/react
import { ModeToggle } from "./ModeToggle";  // Importing ModeToggle component
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';  // Importing Avatar components
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';  // Importing DropdownMenu components
import CommandPaletteComponent from './CommandPalette';  // Importing CommandPaletteComponent
import { Button } from '@/components/ui/button';  // Importing Button component

// Functional component for the Header
const Header: React.FC = React.memo(() => {
  const { data: session } = useSession();  // Using useSession hook to get session data

  return (
    <header className="sticky-header flex items-center justify-between p-4">
      <h1 className="text-xl font-bold">Quality Management System</h1>
      <div className="flex-grow flex justify-center">
        <CommandPaletteComponent />  {/* Render the CommandPaletteComponent */}
      </div>
      <div className="flex items-center space-x-4">
        <Button
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
          className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-gray-100 hover:text-accent-foreground px-4 py-2 relative h-8 md:w-40 lg:w-64 rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none justify-between"
        >
          <span className="flex-grow text-left">Search qms...</span>
          <span className="flex items-center justify-center bg-gray-200 text-gray-500 text-xs rounded px-1.5 py-0.5 ml-2">
            <kbd className="font-sans">Ctrl</kbd> + <kbd className="font-sans">K</kbd>
          </span>
        </Button>
        <ModeToggle />  {/* Render the ModeToggle component */}
        {session && (
          <div className="flex items-center space-x-2">
            <span>{session.user?.name}</span>
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
});

Header.displayName = 'Header';

export default Header;  // Exporting the Header component as default
