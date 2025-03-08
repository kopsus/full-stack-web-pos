"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypeUser } from "@/types/user";
import { TableAction } from "./TableActions";

export const ColumnsUser: ColumnDef<TypeUser>[] = [
  {
    accessorKey: "username",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;

      return <p>{role}</p>;
    },
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }: { row: { original: TypeUser } }) => {
      const item = row.original;
      return <TableAction item={item} />;
    },
  },
];
