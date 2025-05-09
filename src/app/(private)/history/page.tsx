import { DataTable } from "@/components/tables/history/DataTable";
import { ColumnsHistory } from "@/components/tables/history/Columns";
import PageHeader from "@/components/page-header";
import React from "react";
import prisma from "@/lib/prisma";
import { filterTransactionsByShift } from "@/utils/filterTransactionByShift";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/actions/session";
import { getActiveShift } from "@/utils/getActiveShift";

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

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  const user = await prisma.user.findUnique({
    where: {
      id: session?.id as string,
    },
  });

  const activeShift = await getActiveShift(user?.id || "");

  const filteredTransaction = activeShift
    ? filterTransactionsByShift(transactions, activeShift as any)
    : [];

  return (
    <>
      <PageHeader title="History" />
      <DataTable
        title="History"
        data={user?.role === "admin" ? transactions : filteredTransaction}
        columns={ColumnsHistory}
      />
    </>
  );
};

export default page;
