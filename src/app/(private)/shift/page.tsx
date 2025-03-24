import PageHeader from "@/components/page-header";
import Logout from "@/components/shift/Logout";
import Print from "@/components/shift/Print";
import PrintButton from "@/components/shift/PrintButton";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import React from "react";

const page = async () => {
  const history = await prisma.transaksi.findMany({
    include: {
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
      <PageHeader title="Shift" />
      <Card className="m-4 p-5 h-full flex justify-center items-center gap-10">
        <Logout />
        <Print history={history} />
        {/* <PrintButton history={history} /> */}
      </Card>
    </>
  );
};

export default page;
