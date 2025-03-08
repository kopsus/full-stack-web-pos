import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/user/DialogDelete";
import DialogMutation from "@/components/dialog/user/DialogMutation";
import { ColumnsUser } from "@/components/tables/user/Columns";
import { DataTable } from "@/components/tables/user/DataTable";
import { dataUser } from "@/data/user";

const page = () => {
  return (
    <>
      <PageHeader title="User" />
      <DataTable title="User" data={dataUser} columns={ColumnsUser} />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default page;
