import PageHeader from "@/components/page-header";
import { DataTable } from "@/components/tables/stock/DataTable";
import { dataStock } from "@/data/stock";
import DialogMutation from "@/components/dialog/stock/DialogMutation";
import { ColumnsStock } from "@/components/tables/stock/Columns";

const page = () => {
  return (
    <>
      <PageHeader title="Stock" />
      <DataTable title="Stock" data={dataStock} columns={ColumnsStock} />
      <DialogMutation />
    </>
  );
};

export default page;
