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

  const user = await prisma.user.findUnique({
    where: {
      id: session?.id as string,
    },
  });

  return (
    <>
      <PageHeader title="Dashboard" />
      {user?.role === "admin" ? (
        <DashboardAdmin dataTransaction={transactions} dataProduct={products} />
      ) : (
        <DashboardCashier
          dataProduct={products}
          dataPayment={payments}
          dataTransaction={transactions}
          dataUser={user!}
        />
      )}
    </>
  );
};

export default page;
