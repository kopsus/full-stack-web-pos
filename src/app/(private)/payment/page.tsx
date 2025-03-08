"use client";

import { storeDialogPayment } from "@/api/payment/store";
import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/payment/DialogDelete";
import DialogMutation from "@/components/dialog/payment/DialogMutation";
import { ColumnsPayment } from "@/components/tables/payment/Columns";
import { DataTable } from "@/components/tables/payment/DataTable";
import { dataPayment } from "@/data/payment";
import { useSetAtom } from "jotai";
import React from "react";

const Payment = () => {
  const setDialog = useSetAtom(storeDialogPayment);

  return (
    <>
      <PageHeader title="Payment" />
      <DataTable
        onClick={() => {
          setDialog({
            type: "CREATE",
            show: true,
            data: null,
          });
        }}
        title="Payment"
        data={dataPayment}
        columns={ColumnsPayment}
      />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default Payment;
