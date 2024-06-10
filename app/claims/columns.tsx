// app/claims/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { pdf } from '@react-pdf/renderer'
import ClaimPDF from './claimPDF'

// Ensure Claim type is exported
export type Claim = {
  id: string
  claimNumber: string
  status: "Accepted" | "Denied"
  customer: string
  costCode: string
  claimDate: string
  grossAmount: number
  netToMSP: number
  reasonForAdjustment: string
}

export const columns: ColumnDef<Claim>[] = [
  {
    accessorKey: "claimNumber",
    header: "Claim #",
    cell: info => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Accepted/Denied",
    cell: info => info.getValue(),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: info => info.getValue(),
  },
  {
    accessorKey: "costCode",
    header: "Cost Code",
    cell: info => info.getValue(),
  },
  {
    accessorKey: "claimDate",
    header: "Claim Date",
    cell: info => info.getValue(),
  },
  {
    accessorKey: "grossAmount",
    header: "Gross Amount",
    cell: (info: any) => `$${(info.getValue() as number).toFixed(2)}`,
  },
  {
    accessorKey: "netToMSP",
    header: "Net to MSP",
    cell: (info: any) => `$${(info.getValue() as number).toFixed(2)}`,
  },
  {
    accessorKey: "reasonForAdjustment",
    header: "Reason for Adjustment",
    cell: info => info.getValue(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const claim = row.original

      const handleExportPDF = async () => {
        const blob = await pdf(<ClaimPDF claim={claim} />).toBlob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `claim_${claim.claimNumber}.pdf`
        a.click()
        URL.revokeObjectURL(url)
      }

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
      )
    },
  },
]
