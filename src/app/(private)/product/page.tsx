"use client";

import { storeDialogProduct } from "@/api/product/store";
import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/product/DialogDelete";
import DialogMutation from "@/components/dialog/product/DialogMutation";
import { ColumnsProduct } from "@/components/product/table/Columns";
import { DataTable } from "@/components/product/table/DataTable";
import { dataProduct } from "@/data/product";
import { useSetAtom } from "jotai";
import React from "react";

const Product = () => {
  const setDialog = useSetAtom(storeDialogProduct);

  return (
    <>
      <PageHeader title="Products" />
      <DataTable
        onClick={() => {
          setDialog({
            type: "CREATE",
            show: true,
            data: null,
          });
        }}
        title="Product"
        data={dataProduct}
        columns={ColumnsProduct}
      />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default Product;
