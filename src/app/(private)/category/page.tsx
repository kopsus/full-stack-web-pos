import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/category/DialogDelete";
import DialogMutation from "@/components/dialog/category/DialogMutation";
import { ColumnsCategory } from "@/components/tables/category/Columns";
import { DataTable } from "@/components/tables/category/DataTable";
import React from "react";
import prisma from "@/lib/prisma";

const page = async () => {
  const categories = await prisma.category.findMany();

  return (
    <>
      <PageHeader title="Category" />
      <DataTable title="Category" data={categories} columns={ColumnsCategory} />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default page;
