import PageHeader from "@/components/page-header";
import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import prisma from "@/lib/prisma";

const page = async () => {
  const products = await prisma.product.findMany();
  const payments = await prisma.payment.findMany();
  // const toppings = await prisma.topping.findMany();
  const transactions = await prisma.transaksi.findMany();

  return (
    <>
      <PageHeader title="Dashboard" />
      <Dashboard
        dataProduct={products}
        dataPayment={payments}
        dataTransaction={transactions}
        // dataTopping={toppings}
      />
    </>
  );
};

export default page;
