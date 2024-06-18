"use client"

import { ColumnDef } from "@tanstack/react-table"

export type AuditItem = {
  Title: string;
  Internal_x0020_Audit_x0020_Type: string;
  Status: string;
  InternalAuditors: string;
  AuditDate: string;
  Shift: string;
  _x0023_Findings: number;
  ProcessOwner: string;
};

export const columns: ColumnDef<AuditItem>[] = [
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
];
