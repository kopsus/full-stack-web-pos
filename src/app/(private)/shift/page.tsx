import PreviewReceipt from "@/components/_global/PreviewReceipt";
import EndShift from "@/components/shift/EndShift";
import StartShift from "@/components/shift/StartShift";
import { ColumnsShift } from "@/components/tables/shift/Columns";
import { DataTable } from "@/components/tables/shift/DataTable";
import { Card } from "@/components/ui/card";
import { decrypt } from "@/lib/actions/session";
import prisma from "@/lib/prisma";
import { getActiveShift } from "@/utils/getActiveShift";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const shift = await prisma.shift.findMany({
    include: {
      user: true,
    },
  });
  const history = await prisma.transaksi.findMany({
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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card className="m-4 p-5 flex justify-center items-center gap-10">
        <StartShift user={user} activeShift={activeShift} />
        <EndShift history={history} activeShift={activeShift} />
        <PreviewReceipt history={history} activeShift={activeShift} />
      </Card>
      <DataTable data={shift} columns={ColumnsShift} />
    </>
  );
};

export default page;
