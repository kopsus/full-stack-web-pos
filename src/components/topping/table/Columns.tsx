"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypeTopping } from "@/api/topping/types";
import { TableAction } from "./TableActions";
import { formatIDR } from "@/lib/format";

export const ColumnsTopping: ColumnDef<TypeTopping>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <p>{formatIDR(row.getValue("price"))}</p>;
    },
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }: { row: { original: TypeTopping } }) => {
      const item = row.original;
      const itemId = row.original.id;
      return <TableAction item={item} itemId={itemId} />;
    },
  },
];
