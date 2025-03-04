"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypeStock } from "@/api/stock/types";
import { TableAction } from "./TableActions";

export const ColumnsStock: ColumnDef<TypeStock>[] = [
  {
    accessorKey: "product_name",
    header: "Product",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }: { row: { original: TypeStock } }) => {
      const item = row.original;
      return <TableAction item={item} />;
    },
  },
];
