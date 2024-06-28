// components/CommandPalette.tsx

'use client';

import React from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import Link from 'next/link';
import { Calendar, TriangleAlert, Repeat, FileText, ClipboardCheck, GraduationCap, User, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommandPaletteComponent: React.FC<CommandPaletteProps> = ({ open, onOpenChange }) => {
  const handleSelect = () => {
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Home">
          <Link href="/" passHref>
            <CommandItem onSelect={handleSelect}>
              <Calendar className="mr-2 h-4 w-4" />
              Home
            </CommandItem>
          </Link>
            <Link href="/actionItems/CorrectiveActions" passHref>
              <CommandItem onSelect={handleSelect}>
                <TriangleAlert className="mr-2 h-4 w-4" />
                Corrective Actions
              </CommandItem>
            </Link>
            <Link href="/actionItems/CI" passHref>
              <CommandItem onSelect={handleSelect}>
                <Repeat className="mr-2 h-4 w-4" />
                Continuous Improvement
              </CommandItem>
            </Link>
            <Link href="/documents" passHref>
              <CommandItem onSelect={handleSelect}>
                <FileText className="mr-2 h-4 w-4" />
                Controlled Documents
              </CommandItem>
            </Link>
            <Link href="/audits" passHref>
              <CommandItem onSelect={handleSelect}>
                <ClipboardCheck className="mr-2 h-4 w-4" />
                Internal Audits
              </CommandItem>
            </Link>
            <Link href="/trainingPortal" passHref>
              <CommandItem onSelect={handleSelect}>
                <GraduationCap className="mr-2 h-4 w-4" />
                Training Portal
              </CommandItem>
            </Link>
            </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Other">
          <Link href="/profile" passHref>
            <CommandItem onSelect={handleSelect}>
              <User className="mr-2 h-4 w-4" />
              Profile settings
            </CommandItem>
          </Link>
          <Link href="/" passHref>
            <CommandItem onSelect={() => { handleSelect(); signOut(); }}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </CommandItem>
          </Link>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPaletteComponent;
