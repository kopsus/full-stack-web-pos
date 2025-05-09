"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypeTransaksi } from "@/types/transaction";
import { formatDate, formatIDR } from "@/lib/format";
import { Printer } from "lucide-react";

export const ColumnsHistory: ColumnDef<TypeTransaksi>[] = [
  {
    accessorKey: "customer_name",
    header: "Nama Customer",
  },
  {
    header: "Cashier",
    cell: ({ row }) => {
      const cashier = row.original.shift.user?.username;
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
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }: { row: { original: TypeTransaksi } }) => {
      const item = row.original;
      return (
        <div className="flex justify-end w-full">
          <Printer
            onClick={() => printHistory(item)}
            className="cursor-pointer"
          />
        </div>
      );
    },
  },
];

const printHistory = async (item: TypeTransaksi) => {
  await fetch("http://localhost:1818/print/history", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
};
