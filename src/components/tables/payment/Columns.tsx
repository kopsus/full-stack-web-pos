"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypePayment } from "@/types/payment";
import { TableAction } from "./TableActions";

export const ColumnsPayment: ColumnDef<TypePayment>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }: { row: { original: TypePayment } }) => {
      const item = row.original;
      return <TableAction item={item} />;
    },
  },
];
