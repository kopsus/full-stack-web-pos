import PageHeader from "@/components/page-header";
import React from "react";
import DashboardCashier from "@/components/dashboard/DashboardCashier";
import prisma from "@/lib/prisma";
import { DashboardAdmin } from "@/components/dashboard/DashboardAdmin";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/actions/session";

const page = async () => {
  const products = await prisma.product.findMany();
  const payments = await prisma.payment.findMany();
  const transactions = await prisma.transaksi.findMany();
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  const userId = session?.id as string;

  return (
    <>
      <PageHeader title="Dashboard" />
      <DashboardCashier
        dataProduct={products}
        dataPayment={payments}
        dataTransaction={transactions}
        userId={userId}
      />
      {/* <DashboardAdmin dataTransaction={transactions} /> */}
    </>
  );
};

export default page;
