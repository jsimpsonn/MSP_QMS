import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Loading() {
    return (
        <div>
            <div className="flex items-center py-4">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-10 w-20 ml-auto" />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <TableHead key={index}>
                                    <Skeleton className="h-6 w-full" />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 10 }).map((_, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {Array.from({ length: 5 }).map((_, cellIndex) => (
                                    <TableCell key={cellIndex}>
                                        <Skeleton className="h-6 w-full" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between px-2 py-4">
                <Skeleton className="h-6 w-32" />
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-6 w-20" />
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                    </div>
                </div>
            </div>
        </div>
    );
};