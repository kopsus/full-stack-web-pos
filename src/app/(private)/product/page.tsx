import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/product/DialogDelete";
import DialogMutation from "@/components/dialog/product/DialogMutation";
import { ColumnsProduct } from "@/components/tables/product/Columns";
import { DataTable } from "@/components/tables/product/DataTable";
import prisma from "@/lib/prisma";
import { profile } from "@/lib/actions/user";

const page = async () => {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  const category = await prisma.category.findMany();
  const user = await profile();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PageHeader title="Products" />
      <DataTable
        title="Product"
        data={products}
        columns={ColumnsProduct}
        user={user!}
      />
      <DialogMutation dataCategory={category} user={user!} />
      <DialogDelete />
    </>
  );
};

export default page;
