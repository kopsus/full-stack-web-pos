import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/category/DialogDelete";
import DialogMutation from "@/components/dialog/category/DialogMutation";
import { ColumnsCategory } from "@/components/tables/category/Columns";
import { DataTable } from "@/components/tables/category/DataTable";
import React from "react";
import prisma from "@/lib/prisma";
import { profile } from "@/lib/actions/user";

const page = async () => {
  const categories = await prisma.category.findMany();
  const user = await profile();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PageHeader title="Category" />
      <DataTable
        title="Category"
        data={categories}
        columns={ColumnsCategory}
        user={user}
      />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default page;
