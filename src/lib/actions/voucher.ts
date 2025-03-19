"use server";

import { VoucherSchema } from "@/lib/formValidationSchemas/voucher";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { responServerAction } from "./responseServerAction";

export const getVoucherDiscount = async (
  tx: any,
  voucherId?: string
): Promise<number> => {
  if (!voucherId) return 0; // Jika tidak ada voucher, diskon 0%

  const voucher = await tx.voucher.findUnique({
    where: { id: voucherId },
    select: { discount: true }, // Ambil hanya nilai diskon
  });

  return voucher?.discount ?? 0; // Jika voucher ditemukan, kembalikan nilai diskon
};

export const createVoucher = async (data: VoucherSchema) => {
  try {
    const existingVoucher = await prisma.voucher.findFirst({
      where: {
        name: data.name,
        NOT: { id: data.id },
      },
    });

    if (existingVoucher) {
      return responServerAction({
        statusError: true,
        messageError: `Nama Voucher ${existingVoucher.name} sudah digunakan. Silakan gunakan nama lain.`,
      });
    }

    await prisma.voucher.create({
      data: {
        discount: data.discount,
        name: data.name,
        max_usage: data.max_usage,
        minimum_price: data.minimum_price,
        maximum_price: data.maximum_price,
        voucher_end: data.voucher_end,
      },
    });

    revalidatePath("/voucher");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil membuat Voucher",
    });
  } catch (error) {
    console.error(error);

    return responServerAction({
      statusError: true,
      messageError: "Gagal membuat Voucher",
    });
  }
};

export const updateVoucher = async (data: VoucherSchema & { id: string }) => {
  try {
    const existingVoucher = await prisma.voucher.findFirst({
      where: {
        name: data.name,
        NOT: { id: data.id },
      },
    });

    if (existingVoucher) {
      return responServerAction({
        statusError: true,
        messageError: `Nama Voucher ${existingVoucher.name} sudah digunakan. Silakan gunakan nama lain.`,
      });
    }

    await prisma.voucher.update({
      where: { id: data.id },
      data: {
        discount: data.discount,
        name: data.name,
        max_usage: data.max_usage,
        minimum_price: data.minimum_price,
        maximum_price: data.maximum_price,
        voucher_end: data.voucher_end,
      },
    });

    revalidatePath("/voucher");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil mengupdate Voucher",
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal mengupdate Voucher",
    });
  }
};

export const deleteVoucher = async (id: string) => {
  try {
    await prisma.voucher.delete({
      where: { id },
    });

    revalidatePath("/voucher");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil menghapus Voucher",
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal menghapus Voucher",
    });
  }
};
