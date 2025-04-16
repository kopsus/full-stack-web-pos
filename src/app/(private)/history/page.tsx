import { DataTable } from "@/components/tables/history/DataTable";
import { ColumnsHistory } from "@/components/tables/history/Columns";
import PageHeader from "@/components/page-header";
import React from "react";
import prisma from "@/lib/prisma";

const page = async () => {
  const transactions = await prisma.transaksi.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      shift: {
        include: {
          user: true,
        },
      },
      payment: true,
      voucher: true,
      transaksi_product: {
        include: {
          product: true,
        },
      },
      transaksi_topping: {
        include: {
          topping: true,
        },
      },
    },
  });

  return (
    <>
      <PageHeader title="History" />
      <DataTable title="History" data={transactions} columns={ColumnsHistory} />
    </>
  );
};

export default page;
