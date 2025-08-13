import PageHeader from "@/components/page-header";
import React from "react";
import prisma from "@/lib/prisma";
import { profile } from "@/lib/actions/user";
import CategoryTable from "@/components/tables/category/CategoryTable";

const page = async () => {
  const categories = await prisma.category.findMany();
  const user = await profile();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PageHeader title="Category" />
      <CategoryTable role={user.role} categories={categories} />
    </>
  );
};

export default page;
