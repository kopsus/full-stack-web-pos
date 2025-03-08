import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/topping/DialogDelete";
import DialogMutation from "@/components/dialog/topping/DialogMutation";
import { ColumnsTopping } from "@/components/tables/topping/Columns";
import { DataTable } from "@/components/tables/topping/DataTable";
import prisma from "@/lib/prisma";

const page = async () => {
  const topping = await prisma.topping.findMany();

  return (
    <>
      <PageHeader title="Topping" />
      <DataTable title="Topping" data={topping} columns={ColumnsTopping} />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default page;
