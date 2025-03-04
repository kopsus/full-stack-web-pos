"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypeVoucher } from "@/api/voucher/types";
import { TableAction } from "./TableActions";
import { formatDate, formatIDR } from "@/lib/format";

export const ColumnsVoucher: ColumnDef<TypeVoucher>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
    cell: ({ row }) => {
      return <p>{row.getValue("percentage")}%</p>;
    },
  },
  {
    accessorKey: "minimum_price",
    header: "Minimum Price",
    cell: ({ row }) => {
      return <p>{formatIDR(row.getValue("minimum_price"))}</p>;
    },
  },
  {
    accessorKey: "maximum_price",
    header: "Maximum Price",
    cell: ({ row }) => {
      return <p>{formatIDR(row.getValue("maximum_price"))}</p>;
    },
  },
  {
    accessorKey: "max_usage",
    header: "Max Usage",
  },
  {
    accessorKey: "end_date",
    header: "Voucher End",
    cell: ({ row }) => {
      return <p>{formatDate(row.getValue("end_date"))}</p>;
    },
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }: { row: { original: TypeVoucher } }) => {
      const item = row.original;
      return <TableAction item={item} />;
    },
  },
];
