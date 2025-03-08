import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/category/DialogDelete";
import DialogMutation from "@/components/dialog/category/DialogMutation";
import { ColumnsCategory } from "@/components/tables/category/Columns";
import { DataTable } from "@/components/tables/category/DataTable";
import { dataCategory } from "@/data/category";
import React from "react";

const page = () => {
  return (
    <>
      <PageHeader title="Category" />
      <DataTable
        title="Category"
        data={dataCategory}
        columns={ColumnsCategory}
      />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default page;
