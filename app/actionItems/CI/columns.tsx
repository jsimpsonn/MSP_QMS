// app/continuousImprovement/columns.tsx

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/utils/formatDate";

export type ContinuousImprovementItem = {
    ID: string;
    Title: string;
    Progress: string;
    Description: string;
    KeyProcessOwner: string;
    TeamMembers: string[];
    Start_Date: string;
};

export const columns: ColumnDef<ContinuousImprovementItem>[] = [
    {
        accessorKey: "Title",
        header: "Action Item",
    },
    {
        accessorKey: "Progress",
        header: "Progress",
    },
    {
        accessorKey: "Description",
        header: "Description",
    },
    {
        accessorKey: "KeyProcessOwner",
        header: "Key Process Owner",
    },
    {
        accessorKey: "TeamMembers",
        header: "Team Members",
        cell: ({cell}) => formatDate(cell.getValue() as string),
    },
    {
        accessorKey: "Start_Date",
        header: "Start Date",
        cell: ({cell}) => formatDate(cell.getValue() as string),
    },
];
