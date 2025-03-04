"use client";

import { storeDialogUser } from "@/api/user/store";
import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/user/dialog/DialogDelete";
import DialogMutation from "@/components/user/dialog/DialogMutation";
import { ColumnsUser } from "@/components/user/table/Columns";
import { DataTable } from "@/components/user/table/DataTable";
import { dataUser } from "@/data/user";
import { useSetAtom } from "jotai";
import React from "react";

const User = () => {
  const setDialog = useSetAtom(storeDialogUser);

  return (
    <>
      <PageHeader title="User" />
      <DataTable
        onClick={() => {
          setDialog({
            type: "CREATE",
            show: true,
            data: null,
          });
        }}
        title="User"
        data={dataUser}
        columns={ColumnsUser}
      />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default User;
