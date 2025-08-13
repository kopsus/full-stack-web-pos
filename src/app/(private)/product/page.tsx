import PageHeader from "@/components/page-header";
import prisma from "@/lib/prisma";
import { profile } from "@/lib/actions/user";
import ProductTable from "@/components/tables/product/ProductTable";

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
      <ProductTable
        categories={category}
        products={products}
        role={user.role}
      />
    </>
  );
};

export default page;
