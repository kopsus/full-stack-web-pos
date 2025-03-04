"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypeHistory } from "@/api/history/types";
import { formatIDR } from "@/lib/format";

export const ColumnsHistory: ColumnDef<TypeHistory>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "produk",
    header: "Produk",
  },
  {
    accessorKey: "payment",
    header: "Pembayaran",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      return <p>{formatIDR(row.getValue("total"))}</p>;
    },
  },
  {
    accessorKey: "date",
    header: "Tanggal",
  },
];
