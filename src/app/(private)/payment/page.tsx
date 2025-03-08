import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/payment/DialogDelete";
import DialogMutation from "@/components/dialog/payment/DialogMutation";
import { ColumnsPayment } from "@/components/tables/payment/Columns";
import { DataTable } from "@/components/tables/payment/DataTable";

import React from "react";
import prisma from "@/lib/prisma";

const page = async () => {
  const payments = await prisma.payment.findMany();

  return (
    <>
      <PageHeader title="Payment" />
      <DataTable title="Payment" data={payments} columns={ColumnsPayment} />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default page;
