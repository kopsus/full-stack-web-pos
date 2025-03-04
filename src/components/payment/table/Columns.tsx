"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypePayment } from "@/api/payment/types";
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
      const itemId = row.original.id;
      return <TableAction item={item} itemId={itemId} />;
    },
  },
];
