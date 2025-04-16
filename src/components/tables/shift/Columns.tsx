"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TableAction } from "./TableActions";
import { TypeShift } from "@/types/shift";

export const ColumnsShift: ColumnDef<TypeShift>[] = [
  {
    header: "User",
    cell: ({ row }) => {
      const user = row.original.user.username;
      return <p>{user}</p>;
    },
  },
  {
    accessorKey: "start_time",
    header: () => <p className="text-nowrap">Start Shift</p>,
    cell: ({ row }) => {
      return (
        <p className="text-nowrap">
          {new Date(row.getValue("start_time")).toLocaleString()}
        </p>
      );
    },
  },
  {
    accessorKey: "end_time",
    header: "End Shift",
    cell: ({ row }) => {
      const endTime = row.original.end_time;
      return (
        <p className="text-nowrap">
          {endTime && new Date(row.getValue("end_time")).toLocaleString()}
        </p>
      );
    },
  },
  {
    accessorKey: "Action",
    header: "Action",
    //   cell: ({ row }: { row: { original: TypeShift } }) => {
    //     const item = row.original;
    //     return <TableAction item={item} />;
    //   },
  },
];
