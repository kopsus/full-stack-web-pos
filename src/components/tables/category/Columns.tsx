"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypeCategory } from "@/api/category/types";
import { TableAction } from "./TableActions";

export const ColumnsCategory: ColumnDef<TypeCategory>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },

  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }: { row: { original: TypeCategory } }) => {
      const item = row.original;
      return <TableAction item={item} />;
    },
  },
];
