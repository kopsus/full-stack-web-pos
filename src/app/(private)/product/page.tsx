import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/product/DialogDelete";
import DialogMutation from "@/components/dialog/product/DialogMutation";
import { ColumnsProduct } from "@/components/tables/product/Columns";
import { DataTable } from "@/components/tables/product/DataTable";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/actions/session";

const page = async () => {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  const category = await prisma.category.findMany();
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  const user = await prisma.user.findUnique({
    where: {
      id: session?.id as string,
    },
  });

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
