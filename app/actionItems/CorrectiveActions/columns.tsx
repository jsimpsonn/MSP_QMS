// app/correctiveActions/columns.tsx
import { ColumnDef } from "@tanstack/react-table";

export type CorrectiveActionItem = {
    Title: string;
    CAR_x002f_PAR: string;
    Observed_x0020_Problem: string;
    Status: string;
    Initiator: string;
    Respondent: string;
    RequestDate: string;
    ClosedDate: string;
    Retention_x0020_Date: string;
};

export const columns: ColumnDef<CorrectiveActionItem>[] = [
    {
        accessorKey: "Title",
        header: "Title",
    },
    {
        accessorKey: "CAR_x002f_PAR",
        header: "CAR/PAR/SCAR",
    },
    {
        accessorKey: "Observed_x0020_Problem",
        header: "Observed Problem",
    },
    {
        accessorKey: "Status",
        header: "Status/Stage",
    },
    {
        accessorKey: "Initiator",
        header: "Initiator",
    },
    {
        accessorKey: "Respondent",
        header: "Respondent",
    },
    {
        accessorKey: "RequestDate",
        header: "Request Date",
        cell: ({ cell }) => new Date(cell.getValue() as string).toLocaleDateString(),
    },
    {
        accessorKey: "ClosedDate",
        header: "Closed Date",
        cell: ({ cell }) => new Date(cell.getValue() as string).toLocaleDateString(),
    },
    {
        accessorKey: "Retention_x0020_Date",
        header: "Retention Date",
        cell: ({ cell }) => new Date(cell.getValue() as string).toLocaleDateString(),
    },
];
