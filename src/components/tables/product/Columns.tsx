"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypeProduct } from "@/types/product";
import { TableAction } from "./TableActions";
import { formatIDR } from "@/lib/format";
import Image from "next/image";

export const ColumnsProduct: ColumnDef<TypeProduct>[] = [
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
              src={`/uploads/${imageSrc}`}
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
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }: { row: { original: TypeProduct } }) => {
      const item = row.original;
      return <TableAction item={item} />;
    },
  },
];
