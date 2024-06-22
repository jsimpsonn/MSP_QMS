"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { pdf } from '@react-pdf/renderer';
import ClaimPDF from './claimPDF';
import { formatDate } from "@/utils/formatDate";

export type ClaimItem = {
    id: string;
    claimNumber: string;
    status: "Accepted" | "Denied";
    customer: string;
    costCode: string;
    claimDate: string;
    grossAmount: number;
    netToMSP: number;
    reasonForAdjustment: string;
};

export const columns: ColumnDef<ClaimItem>[] = [
    {
        accessorKey: "Title",
        header: "Claim #",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "Accepted_x002f_Denied",
        header: "Accepted/Denied",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "Customer",
        header: "Customer",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "CostCode",
        header: "Cost Code",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "ClaimDated",
        header: "Claim Date",
        cell: ({cell}) => formatDate(cell.getValue() as string),
    },
    {
        accessorKey: "GrossAmount",
        header: "Gross Amount",
        cell: (info: any) => {
            const value = info.getValue();
            return typeof value === 'number' ? `$${value.toFixed(2)}` : value;
        },
    },
    {
        accessorKey: "Net_x0020_to_x0020_MSP",
        header: "Net to MSP",
        cell: (info: any) => {
            const value = info.getValue();
            return typeof value === 'number' ? `$${value.toFixed(2)}` : value;
        },
    },
    {
        accessorKey: "ReasonforAdjustment",
        header: "Reason for Adjustment",
        cell: info => info.getValue(),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const claim = row.original;

            const handleExportPDF = async () => {
                const blob = await pdf(<ClaimPDF claim={claim} />).toBlob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `claim_${claim.id}.pdf`;
                a.click();
                URL.revokeObjectURL(url);
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(claim.id)}>
                            Copy Claim ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleExportPDF}>Export as PDF</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
