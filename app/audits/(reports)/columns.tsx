// app/audits/(reports)/columns.tsx

import {ColumnDef} from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import { formatDate } from "@/utils/formatDate";

export type AuditItem = {
    id: string;
    Title: string;
    Internal_x0020_Audit_x0020_Type: string;
    Status: string;
    InternalAuditors: { results: { LookupId: number }[] };  // Updated type
    AuditDate: string;
    Shift: string;
    _x0023_Findings: number;
    ProcessOwner: string;
};

interface ColumnsProps {
    setCurrentItem: (item: AuditItem | null) => void;
    setIsDialogOpen: (open: boolean) => void;
    setIsAlertOpen: (open: boolean) => void;
}

export const columns = ({setCurrentItem, setIsDialogOpen, setIsAlertOpen}: ColumnsProps): ColumnDef<AuditItem>[] => [
    {
        accessorKey: "Title",
        header: "Process/Audit Area",
    },
    {
        accessorKey: "Internal_x0020_Audit_x0020_Type",
        header: "Internal Audit Type",
    },
    {
        accessorKey: "Status",
        header: "Status",
    },
    {
        accessorKey: "InternalAuditors",
        header: "Internal Auditors",
    },
    {
        accessorKey: "AuditDate",
        header: "Audit Date",
        cell: ({cell}) => formatDate(cell.getValue() as string),
    },
    {
        accessorKey: "Shift",
        header: "Shift",
    },
    {
        accessorKey: "_x0023_Findings",
        header: "# Findings",
    },
    {
        accessorKey: "ProcessOwner",
        header: "Process Owner",
    },
    {
        id: "actions",
        cell: ({row}) => {
            const audit = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(audit.Title)}>
                            Copy audit ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={() => {
                            setCurrentItem(audit);
                            setIsDialogOpen(true);
                        }}>
                            Edit audit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            setCurrentItem(audit);
                            setIsAlertOpen(true);
                        }}>
                            Delete audit
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
