import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/product/DialogDelete";
import DialogMutation from "@/components/dialog/product/DialogMutation";
import { ColumnsProduct } from "@/components/tables/product/Columns";
import { DataTable } from "@/components/tables/product/DataTable";
import { dataProduct } from "@/data/product";

const page = () => {
  return (
    <>
      <PageHeader title="Products" />
      <DataTable title="Product" data={dataProduct} columns={ColumnsProduct} />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default page;
