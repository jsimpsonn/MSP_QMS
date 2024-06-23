'use client'; // This directive ensures that this component is rendered on the client-side

import React from 'react'; // Importing React library
import Link from 'next/link'; // Importing Link component from Next.js for navigation
import { useSession, signOut } from 'next-auth/react'; // Importing session hooks and signOut function from next-auth
import { ModeToggle } from "./ModeToggle"; // Importing custom ModeToggle component
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Importing Avatar components from custom UI library
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'; // Importing DropdownMenu components from custom UI library
import CommandPaletteComponent from './CommandPalette'; // Importing custom CommandPaletteComponent
import { Button } from '@/components/ui/button'; // Importing Button component from custom UI library

// Defining the Header component using React.memo for performance optimization
const Header: React.FC = React.memo(() => {
  const { data: session } = useSession(); // Using useSession hook to get the current session data

  return (
    // Defining the header with classes for styling
      <header className="fixed top-0 left-[250px] right-0 h-[60px] bg-background border-b border-gray-200/40 z-10 dark:bg-dark-background bg-opacity-80 dark:bg-opacity-80 backdrop-blur-[8px] dark:backdrop-blur-[8px] flex items-center justify-between p-4">
          <div className="flex-grow flex justify-center">
              {/* Including the CommandPaletteComponent in the header */}
              <CommandPaletteComponent />
          </div>
          <div className="flex items-center space-x-4">
        {/* Button to trigger the command palette with Ctrl + K shortcut */}
        <Button
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
          className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-[#f4f4f5] dark:hover:bg-[#27272a] hover:text-accent-foreground px-4 py-2 relative h-8 md:w-40 lg:w-64 rounded-[0.5rem] bg-background dark:bg-[#212121] text-sm font-normal text-muted-foreground dark:text-[#E0E0E0] shadow-none justify-between"
        >
          <span className="flex-grow text-left">Search qms...</span>
          <span className="flex items-center justify-center bg-gray-200 text-gray-500 text-xs rounded px-1.5 py-0.5 ml-2">
            <kbd className="font-sans">Ctrl</kbd> + <kbd className="font-sans">K</kbd>
          </span>
        </Button>
        {/* Including the ModeToggle component for theme switching */}
        <ModeToggle />
        {/* Conditionally rendering user session details if a session exists */}
        {session && (
          <div className="flex items-center space-x-2">
            <span>{session.user?.name}</span> {/* Displaying the user's name */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* Avatar component with user's image or fallback */}
                <Avatar className="cursor-pointer">
                  <AvatarImage src={session.user?.image ?? '/path-to-your-image.jpg'} alt={session.user?.name ?? 'User Avatar'} />
                  <AvatarFallback>{session.user?.name?.[0] ?? 'U'}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  {/* Link to the profile settings page */}
                  <Link href="/profile">Profile Settings</Link>
                </DropdownMenuItem>
                {/* Sign Out option */}
                <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = 'Header'; // Setting a display name for the component for easier debugging

export default Header; // Exporting the Header component as default export
