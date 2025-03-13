import { Input } from "@/components/ui/input";
import React from "react";
import { Table } from "@tanstack/react-table";

interface ITableToolbar<TData> {
  table: Table<TData>;
}

export function TableToolbar<TData>({ table }: ITableToolbar<TData>) {
  return (
    <div className="flex items-center justify-end">
      <Input
        type="text"
        placeholder="Cari Berdasarkan Nama"
        className="w-[200px] md:w-[250px] border outline-none"
        value={
          (table.getColumn("customer_name")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("customer_name")?.setFilterValue(event.target.value)
        }
      />
    </div>
  );
}
