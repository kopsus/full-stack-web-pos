"use client";

import { storeDialogVoucher } from "@/api/voucher/store";
import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/voucher/DialogDelete";
import DialogMutation from "@/components/dialog/voucher/DialogMutation";
import { ColumnsVoucher } from "@/components/tables/voucher/Columns";
import { DataTable } from "@/components/tables/voucher/DataTable";
import { dataVoucher } from "@/data/voucher";
import { useSetAtom } from "jotai";
import React from "react";

const Voucher = () => {
  const setDialog = useSetAtom(storeDialogVoucher);

  return (
    <>
      <PageHeader title="Voucher" />
      <DataTable
        onClick={() => {
          setDialog({
            type: "CREATE",
            show: true,
            data: null,
          });
        }}
        title="Voucher"
        data={dataVoucher}
        columns={ColumnsVoucher}
      />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default Voucher;
