"use client";

import * as React from "react";
import { cn } from "@/utils/lib/utils"
;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={cn(
                "mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500",
                className
            )}
            {...props}
        />
    );
});

export { Input };
