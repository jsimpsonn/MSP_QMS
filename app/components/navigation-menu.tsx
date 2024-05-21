"use client";

import * as React from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const routes = [
  { href: '/', name: 'Home', description: 'Return to homepage' },
  { href: '/requests', name: 'Action Items', description: 'View your action items' },
  { href: '/documents', name: 'Controlled Documents', description: 'Access controlled documents' },
  { href: '/kpi', name: 'KPIs', description: 'View key performance indicators' },
  { href: '/maintenance', name: 'Maintenance', description: 'Maintenance related tasks' },
  { href: '/claims', name: 'Quality Claims', description: 'Quality claims details' },
  { href: '/safety', name: 'Safety', description: 'Safety information' }
];

const NavigationMenu: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white h-16 px-6 shadow-lg">
      <div className="flex space-x-4">
        {routes.map(route => (
          <Link key={route.href} href={route.href} className="flex items-center transition-colors duration-300 hover:text-gray-300">
            {route.name}
          </Link>
        ))}
      </div>
      <div className="ml-auto flex items-center space-x-6">
        <input
          type="text"
          placeholder="Search..."
          className="ml-auto flex mx-4 my-2 w-250 px-4 py-2 text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link href="/settings" className="flex items-center transition-colors duration-300 hover:text-gray-300">
          Settings
        </Link>
        <Link href="/profile" className="flex items-center transition-colors duration-300 hover:text-gray-300">
          Profile
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === "dark" ? "text-white" : "text-black"}`} />
              <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${theme === "dark" ? "text-white" : "text-black"}`} />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavigationMenu;
