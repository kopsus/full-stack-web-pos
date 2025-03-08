import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/user/DialogDelete";
import DialogMutation from "@/components/dialog/user/DialogMutation";
import { ColumnsUser } from "@/components/tables/user/Columns";
import { DataTable } from "@/components/tables/user/DataTable";
import prisma from "@/lib/prisma";

const page = async () => {
  const users = await prisma.user.findMany();

  return (
    <>
      <PageHeader title="User" />
      <DataTable title="User" data={users} columns={ColumnsUser} />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default page;
