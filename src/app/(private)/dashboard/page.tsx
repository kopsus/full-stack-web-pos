import PageHeader from "@/components/page-header";
import React from "react";
import DashboardCashier from "@/components/dashboard/DashboardCashier";
import prisma from "@/lib/prisma";
import { DashboardAdmin } from "@/components/dashboard/DashboardAdmin";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/actions/session";
import { getActiveShift } from "@/utils/getActiveShift";

const page = async () => {
  const products = await prisma.product.findMany();
  const payments = await prisma.payment.findMany();
  const transactions = await prisma.transaksi.findMany({
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
  const voucher = await prisma.voucher.findMany();
  const topping = await prisma.topping.findMany();
  const category = await prisma.category.findMany();

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  const user = await prisma.user.findUnique({
    where: {
      id: session?.id as string,
    },
  });

  const activeShift = await getActiveShift(user?.id || "");

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
          dataVoucher={voucher}
          dataTopping={topping}
          dataCategory={category}
          activeShift={activeShift}
        />
      )}
    </>
  );
};

export default page;
