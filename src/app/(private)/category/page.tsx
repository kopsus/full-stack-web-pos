"use client";

import { storeDialogCategory } from "@/api/category/store";
import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/category/DialogDelete";
import DialogMutation from "@/components/dialog/category/DialogMutation";
import { ColumnsCategory } from "@/components/tables/category/Columns";
import { DataTable } from "@/components/tables/category/DataTable";
import { dataCategory } from "@/data/category";
import { useSetAtom } from "jotai";
import React from "react";

const Category = () => {
  const setDialog = useSetAtom(storeDialogCategory);

  return (
    <>
      <PageHeader title="Category" />
      <DataTable
        onClick={() => {
          setDialog({
            type: "CREATE",
            show: true,
            data: null,
          });
        }}
        title="Category"
        data={dataCategory}
        columns={ColumnsCategory}
      />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default Category;
