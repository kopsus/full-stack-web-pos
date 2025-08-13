import PageHeader from "@/components/page-header";
import React, { use } from "react";
import prisma from "@/lib/prisma";
import { profile } from "@/lib/actions/user";
import VoucherTable from "@/components/tables/voucher/VoucherTable";

const page = async () => {
  const vouchers = await prisma.voucher.findMany();
  const user = await profile();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PageHeader title="Voucher" />
      <VoucherTable role={user.role} vouchers={vouchers} />
    </>
  );
};

export default page;
