import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/product/DialogDelete";
import DialogMutation from "@/components/dialog/product/DialogMutation";
import { ColumnsProduct } from "@/components/tables/product/Columns";
import { DataTable } from "@/components/tables/product/DataTable";
import prisma from "@/lib/prisma";

const page = async () => {
  const products = await prisma.product.findMany();

  return (
    <>
      <PageHeader title="Products" />
      <DataTable title="Product" data={products} columns={ColumnsProduct} />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default page;
