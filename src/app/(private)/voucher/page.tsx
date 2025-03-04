"use client";

import { storeDialogVoucher } from "@/api/voucher/store";
import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/voucher/dialog/DialogDelete";
import DialogMutation from "@/components/voucher/dialog/DialogMutation";
import { ColumnsVoucher } from "@/components/voucher/table/Columns";
import { DataTable } from "@/components/voucher/table/DataTable";
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
