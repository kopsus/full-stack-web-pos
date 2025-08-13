"use client";

import { TypeCategory } from "@/types/category";
import { DataTable } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { TableAction } from "./TableActions";
import DialogMutation from "@/components/dialog/category/DialogMutation";
import DialogDelete from "@/components/dialog/category/DialogDelete";

interface CategoryTableProps {
  categories: TypeCategory[];
  role: string;
}

export default function CategoryTable({
  categories,
  role,
}: CategoryTableProps) {
  const columns: ColumnDef<TypeCategory>[] = [
    {
      accessorKey: "name",
      header: "Nama",
    },
    ...(role === "admin"
      ? [
          {
            accessorKey: "Action",
            header: "Action",
            cell: ({ row }: { row: { original: TypeCategory } }) => {
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
        title="Categori"
        data={categories}
        columns={columns}
        user={role}
      />
      <DialogMutation />
      <DialogDelete />
    </>
  );
}
