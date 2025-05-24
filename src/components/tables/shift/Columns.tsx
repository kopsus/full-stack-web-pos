"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Printer } from "lucide-react";

export const ColumnsShift: ColumnDef<any>[] = [
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
  // {
  //   accessorKey: "Action",
  //   header: "Action",
  //   cell: ({ row }) => {
  //     const item = row.original;

  //     return (
  //       <div className="flex justify-end w-full">
  //         <Printer
  //           onClick={() => printShift(item)}
  //           className="cursor-pointer"
  //         />
  //       </div>
  //     );
  //   },
  // },
];

// const printShift = async (item: any) => {
//   await fetch("http://localhost:1818/print/history-shift", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(item),
//   });
// };
