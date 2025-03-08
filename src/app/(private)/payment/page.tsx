import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/payment/DialogDelete";
import DialogMutation from "@/components/dialog/payment/DialogMutation";
import { ColumnsPayment } from "@/components/tables/payment/Columns";
import { DataTable } from "@/components/tables/payment/DataTable";
import { dataPayment } from "@/data/payment";

import React from "react";

const page = () => {
  return (
    <>
      <PageHeader title="Payment" />
      <DataTable title="Payment" data={dataPayment} columns={ColumnsPayment} />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default page;
