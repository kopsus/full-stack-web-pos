// voucher-table.tsx (CLIENT)
"use client";

import { formatDate, formatIDR } from "@/lib/format";
import { TypeVoucher } from "@/types/voucher";
import { ColumnDef } from "@tanstack/react-table";
import { TableAction } from "./TableActions";
import { DataTable } from "./DataTable";
import DialogMutation from "@/components/dialog/voucher/DialogMutation";
import DialogDelete from "@/components/dialog/voucher/DialogDelete";

interface VoucherTableProps {
  vouchers: TypeVoucher[];
  role: string;
}

export default function VoucherTable({ vouchers, role }: VoucherTableProps) {
  const columns: ColumnDef<TypeVoucher>[] = [
    {
      accessorKey: "discount",
      header: "Discount",
      cell: ({ row }) => <p>{row.getValue("discount")}%</p>,
    },
    {
      accessorKey: "name",
      header: "Nama Voucher",
    },
    {
      accessorKey: "minimum_price",
      header: "Minimum Price",
      cell: ({ row }) => <p>{formatIDR(row.getValue("minimum_price"))}</p>,
    },
    {
      accessorKey: "maximum_price",
      header: "Maximum Price",
      cell: ({ row }) => <p>{formatIDR(row.getValue("maximum_price"))}</p>,
    },
    {
      accessorKey: "max_usage",
      header: "Max Usage",
    },
    {
      accessorKey: "voucher_end",
      header: "Voucher End",
      cell: ({ row }) => <p>{formatDate(row.getValue("voucher_end"))}</p>,
    },
    ...(role === "admin"
      ? [
          {
            accessorKey: "Action",
            header: "Action",
            cell: ({ row }: { row: { original: TypeVoucher } }) => {
              const item = row.original;
              return <TableAction item={item} />;
            },
          },
        ]
      : []),
  ];

  return (
    <>
      <DataTable
        title="Voucher"
        data={vouchers}
        columns={columns}
        user={role}
      />
      <DialogMutation />
      <DialogDelete />
    </>
  );
}
