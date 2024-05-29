"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Employee = {
  name: string
  status: boolean
  position: string
  hireDate: Date
}

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "hireDate",
    header: "Hire Date",
  },
]
