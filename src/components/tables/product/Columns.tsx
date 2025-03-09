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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div className="w-20 h-20 rounded overflow-hidden">
          <Image
            src={row.getValue("image")}
            alt="image"
            width={0}
            height={0}
            sizes="100vw"
          />
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
