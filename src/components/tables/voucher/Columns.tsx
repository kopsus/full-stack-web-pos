"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypeVoucher } from "@/types/voucher";
import { TableAction } from "./TableActions";
import { formatDate, formatIDR } from "@/lib/format";

export const ColumnsVoucher: ColumnDef<TypeVoucher>[] = [
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => {
      return <p>{row.getValue("discount")}%</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Nama Vouvher",
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
    accessorKey: "voucher_end",
    header: "Voucher End",
    cell: ({ row }) => {
      return <p>{formatDate(row.getValue("voucher_end"))}</p>;
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
