"use client";

import { storeDialogTopping } from "@/api/topping/store";
import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/topping/DialogDelete";
import DialogMutation from "@/components/dialog/topping/DialogMutation";
import { ColumnsTopping } from "@/components/tables/topping/Columns";
import { DataTable } from "@/components/tables/topping/DataTable";
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
