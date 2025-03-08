import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/voucher/DialogDelete";
import DialogMutation from "@/components/dialog/voucher/DialogMutation";
import { ColumnsVoucher } from "@/components/tables/voucher/Columns";
import { DataTable } from "@/components/tables/voucher/DataTable";
import { dataVoucher } from "@/data/voucher";
import React from "react";

const page = () => {
  return (
    <>
      <PageHeader title="Voucher" />
      <DataTable title="Voucher" data={dataVoucher} columns={ColumnsVoucher} />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default page;
