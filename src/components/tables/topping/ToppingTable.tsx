"use client";

import { TypeTopping } from "@/types/topping";
import { ColumnDef } from "@tanstack/react-table";
import { TableAction } from "./TableActions";
import DialogMutation from "@/components/dialog/topping/DialogMutation";
import DialogDelete from "@/components/dialog/topping/DialogDelete";
import { formatIDR } from "@/lib/format";
import { DataTable } from "./DataTable";

interface ToppingTableProps {
  topping: TypeTopping[];
  role: string;
}

export default function ToppingTable({ topping, role }: ToppingTableProps) {
  const columns: ColumnDef<TypeTopping>[] = [
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
      accessorKey: "quantity",
      header: "Stock",
    },

    ...(role === "admin"
      ? [
          {
            accessorKey: "Action",
            header: "Action",
            cell: ({ row }: { row: { original: TypeTopping } }) => {
              const item = row.original;
              return <TableAction item={item} itemId={item.id} />;
            },
          },
        ]
      : []),
  ];

  return (
    <>
      <DataTable title="Topping" data={topping} columns={columns} user={role} />
      <DialogMutation user={role} />
      <DialogDelete />
    </>
  );
}
