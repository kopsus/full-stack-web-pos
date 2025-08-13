"use client";

import { TypeProduct } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { TableAction } from "./TableActions";
import { DataTable } from "./DataTable";
import DialogMutation from "@/components/dialog/product/DialogMutation";
import DialogDelete from "@/components/dialog/product/DialogDelete";
import { TypeCategory } from "@/types/category";
import { formatIDR } from "@/lib/format";
import Image from "next/image";
import { baseIMAGEURL } from "@/lib/utils";

interface ProductTableProps {
  products: TypeProduct[];
  categories: TypeCategory[];
  role: string;
}

export default function ProductTable({
  products,
  categories,
  role,
}: ProductTableProps) {
  const columns: ColumnDef<TypeProduct>[] = [
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      header: "Category",
      cell: ({ row }) => {
        const category = row.original.category?.name;
        return <p>{category}</p>;
      },
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const imageSrc = row.getValue("image");

        return (
          <div className="w-20 h-20 rounded overflow-hidden bg-white">
            {imageSrc ? (
              <Image
                src={`${baseIMAGEURL}/${imageSrc}`}
                alt="image"
                width={80}
                height={80}
                className="object-cover"
              />
            ) : null}
          </div>
        );
      },
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
      cell: ({ row }) => {
        const stock = row.getValue("quantity") as number;
        return <p className={`${stock <= 20 && "text-red-600"}`}>{stock}</p>;
      },
    },
    ...(role === "admin"
      ? [
          {
            accessorKey: "Action",
            header: "Action",
            cell: ({ row }: { row: { original: TypeProduct } }) => {
              const item = row.original;
              return <TableAction item={item} />;
            },
          },
        ]
      : []),
  ];

  return (
    <>
      <DataTable title="Produk" data={products} columns={columns} user={role} />
      <DialogMutation dataCategory={categories} user={role} />
      <DialogDelete />
    </>
  );
}
