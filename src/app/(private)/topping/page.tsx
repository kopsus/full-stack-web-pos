import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/topping/DialogDelete";
import DialogMutation from "@/components/dialog/topping/DialogMutation";
import { ColumnsTopping } from "@/components/tables/topping/Columns";
import { DataTable } from "@/components/tables/topping/DataTable";
import { dataTopping } from "@/data/topping";

const page = () => {
  return (
    <>
      <PageHeader title="Topping" />
      <DataTable title="Topping" data={dataTopping} columns={ColumnsTopping} />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default page;
