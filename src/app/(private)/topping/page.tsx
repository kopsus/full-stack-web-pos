"use client";

import { storeDialogTopping } from "@/api/topping/store";
import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/topping/dialog/DialogDelete";
import DialogMutation from "@/components/topping/dialog/DialogMutation";
import { ColumnsTopping } from "@/components/topping/table/Columns";
import { DataTable } from "@/components/topping/table/DataTable";
import { dataTopping } from "@/data/topping";
import { useSetAtom } from "jotai";
import React from "react";

const Topping = () => {
  const setDialog = useSetAtom(storeDialogTopping);

  return (
    <>
      <PageHeader title="Topping" />
      <DataTable
        onClick={() => {
          setDialog({
            type: "CREATE",
            show: true,
            data: null,
          });
        }}
        title="Topping"
        data={dataTopping}
        columns={ColumnsTopping}
      />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default Topping;
