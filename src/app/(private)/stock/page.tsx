"use client";

import { storeDialogStock } from "@/api/stock/store";
import PageHeader from "@/components/page-header";
import { DataTable } from "@/components/tables/stock/DataTable";
import { dataStock } from "@/data/stock";
import { useSetAtom } from "jotai";
import React from "react";
import DialogMutation from "@/components/dialog/stock/DialogMutation";
import { ColumnsStock } from "@/components/tables/stock/Columns";

const Stock = () => {
  const setDialog = useSetAtom(storeDialogStock);
  return (
    <>
      <PageHeader title="Stock" />
      <DataTable
        onClick={() => {
          setDialog({
            type: "CREATE",
            show: true,
            data: null,
          });
        }}
        title="Stock"
        data={dataStock}
        columns={ColumnsStock}
      />
      <DialogMutation />
    </>
  );
};

export default Stock;
