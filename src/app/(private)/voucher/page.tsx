import PageHeader from "@/components/page-header";
import DialogDelete from "@/components/dialog/voucher/DialogDelete";
import DialogMutation from "@/components/dialog/voucher/DialogMutation";
import { ColumnsVoucher } from "@/components/tables/voucher/Columns";
import { DataTable } from "@/components/tables/voucher/DataTable";
import React from "react";
import prisma from "@/lib/prisma";
import { profile } from "@/lib/actions/user";

const page = async () => {
  const vouchers = await prisma.voucher.findMany();
  const user = await profile();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PageHeader title="Voucher" />
      <DataTable
        title="Voucher"
        data={vouchers}
        columns={ColumnsVoucher}
        user={user}
      />
      <DialogMutation />
      <DialogDelete />
    </>
  );
};

export default page;
