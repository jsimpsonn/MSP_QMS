// utils/lib/utils.ts

import { clsx, type ClassValue } from "clsx";  // Importing clsx for conditional class merging and ClassValue type definition
import { twMerge } from "tailwind-merge";     // Importing twMerge to merge Tailwind CSS classes

// Function to merge class names using clsx and twMerge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));  // Merging class names using clsx and then merging Tailwind CSS classes using twMerge
}
