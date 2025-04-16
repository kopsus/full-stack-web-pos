import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/topping/DialogDelete";
import DialogMutation from "@/components/dialog/topping/DialogMutation";
import { ColumnsTopping } from "@/components/tables/topping/Columns";
import { DataTable } from "@/components/tables/topping/DataTable";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/actions/session";

const page = async () => {
  const topping = await prisma.topping.findMany();
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  const user = await prisma.user.findUnique({
    where: {
      id: session?.id as string,
    },
  });

  return (
    <>
      <PageHeader title="Topping" />
      <DataTable
        title="Topping"
        data={topping}
        columns={ColumnsTopping}
        user={user!}
      />
      <DialogMutation user={user!} />
      <DialogDelete />
    </>
  );
};

export default page;
