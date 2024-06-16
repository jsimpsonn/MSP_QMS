// components/CommandPalette.tsx

'use client';

import React, { useState, useEffect } from 'react';  // Importing React and hooks
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";  // Importing Command components
import Link from 'next/link';  // Importing Link component from next/link for client-side navigation
import { Calendar, TriangleAlert, Repeat, FileText, ClipboardCheck, GraduationCap, User, LogOut } from 'lucide-react';  // Importing icons from lucide-react

// Functional component for the Command Palette
const CommandPaletteComponent = () => {
  const [open, setOpen] = useState<boolean>(false);  // State to manage the open state of the command dialog
  const [search, setSearch] = useState("");  // State to manage the search input

  // Effect to handle the keyboard shortcut for opening the command palette
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((navigator?.platform?.toLowerCase().includes("mac") ? e.metaKey : e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((current) => !current);  // Toggle the open state
      }
    }

    document.addEventListener("keydown", handleKeyDown);  // Adding event listener for keydown
    return () => {
      document.removeEventListener("keydown", handleKeyDown);  // Removing event listener on cleanup
    };
  }, []);

  const handleSelect = () => {
    setOpen(false);  // Close the command dialog on item select
  };

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
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
              <CommandItem onSelect={handleSelect}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </CommandItem>
            </Link>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandPaletteComponent;  // Exporting the CommandPaletteComponent as default
