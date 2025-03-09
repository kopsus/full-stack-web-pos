"use server";

import { PaymentSchema } from "@/lib/formValidationSchemas/payment";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { responServerAction } from "./responseServerAction";

export const createPayment = async (data: PaymentSchema) => {
  try {
    const existingPayment = await prisma.payment.findFirst({
      where: {
        name: data.name,
        NOT: { id: data.id },
      },
    });

    if (existingPayment) {
      return responServerAction({
        statusError: true,
        messageError: `Pembayaran ${existingPayment.name} sudah tersedia. Silakan gunakan pembayaran lain.`,
      });
    }

    await prisma.payment.create({
      data: {
        name: data.name,
      },
    });

    revalidatePath("/payment");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil membuat Payment",
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal membuat Payment",
    });
  }
};

export const updatePayment = async (data: PaymentSchema & { id: string }) => {
  try {
    const existingPayment = await prisma.payment.findFirst({
      where: {
        name: data.name,
        NOT: { id: data.id },
      },
    });

    if (existingPayment) {
      return responServerAction({
        statusError: true,
        messageError: `Pembayaran ${existingPayment.name} sudah tersedia. Silakan gunakan pembayaran lain.`,
      });
    }

    await prisma.payment.update({
      where: { id: data.id },
      data: {
        name: data.name,
      },
    });

    revalidatePath("/payment");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil mengupdate Payment",
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal mengupdate Payment",
    });
  }
};

export const deletePayment = async (id: string) => {
  try {
    await prisma.payment.delete({
      where: { id },
    });

    revalidatePath("/payment");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil menghapus Payment",
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal menghapus Payment",
    });
  }
};
