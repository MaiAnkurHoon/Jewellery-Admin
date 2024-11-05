"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "CreatedAt",
    header: "Date",
  },
  {
    id:"actions",
    cell: ({ row }) => <CellAction data={row.original}/>
  }
  
]
