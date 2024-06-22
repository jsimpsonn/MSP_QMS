// app/training-portal/columns.tsx

import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { formatDate } from "@/utils/formatDate";

export type TrainingPortalItem = {
    Title: string;
    HireDate: string;
    RehireDate: string;
    JobTitleDescription: string;
    Obsolete: boolean;
};

export const columns: ColumnDef<TrainingPortalItem>[] = [
    {
        accessorKey: "Title",
        header: "Title",
    },
    {
        accessorKey: "HireDate",
        header: "Hire Date",
        cell: ({cell}) => formatDate(cell.getValue() as string),
    },
    {
        accessorKey: "RehireDate",
        header: "Rehire Date",
        cell: ({cell}) => formatDate(cell.getValue() as string),
    },
    {
        accessorKey: "JobTitleDescription",
        header: "Job Title Description",
    },
    {
        accessorKey: "Obsolete",
        header: "Obsolete?",
        cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    },
];
