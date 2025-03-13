"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypeTransaksi } from "@/types/transaction";
import { formatDate, formatIDR } from "@/lib/format";

export const ColumnsHistory: ColumnDef<TypeTransaksi>[] = [
  {
    accessorKey: "customer_name",
    header: "Nama",
  },
  {
    header: "Cashier",
    cell: ({ row }) => {
      const cashier = row.original.user.username;
      return <p>{cashier}</p>;
    },
  },
  {
    header: "Pembayaran",
    cell: ({ row }) => {
      const payment = row.original.payment.name;
      return <p>{payment}</p>;
    },
  },
  {
    header: "Discount",
    cell: ({ row }) => {
      const discount = row.original.voucher?.discount;
      return discount ? <p>{discount}%</p> : <p>Tidak Ada</p>;
    },
  },
  {
    accessorKey: "total_amount",
    header: "Total",
    cell: ({ row }) => {
      return <p>{formatIDR(row.getValue("total_amount"))}</p>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Tanggal",
    cell: ({ row }) => {
      return <p>{formatDate(row.getValue("updatedAt"))}</p>;
    },
  },
];
