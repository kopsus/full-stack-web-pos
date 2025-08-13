import PageHeader from "@/components/page-header";
import prisma from "@/lib/prisma";
import { profile } from "@/lib/actions/user";
import ToppingTable from "@/components/tables/topping/ToppingTable";

const page = async () => {
  const topping = await prisma.topping.findMany();
  const user = await profile();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PageHeader title="Topping" />
      <ToppingTable topping={topping} role={user.role} />
    </>
  );
};

export default page;
