"use server";

import { TransactionSchema } from "@/lib/formValidationSchemas/transaction";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { responServerAction } from "./responseServerAction";

export const createTransaction = async (data: TransactionSchema) => {
  try {
    return await prisma.$transaction(async (tx) => {
      // Validasi User
      const user = await tx.user.findUnique({ where: { id: data.user_id } });
      if (!user) throw new Error("User tidak ditemukan!");

      // Validasi Payment
      const payment = await tx.payment.findUnique({
        where: { id: data.payment_id },
      });
      if (!payment) throw new Error("Metode pembayaran tidak valid!");

      // Validasi Voucher (Jika ada)
      let voucherDiscount = 0;
      if (data.voucher_id) {
        const voucher = await tx.voucher.findUnique({
          where: { id: data.voucher_id },
        });
        if (!voucher) throw new Error("Voucher tidak valid!");
        voucherDiscount = voucher.discount;
      }

      // Ambil data produk yang dipesan
      const products = await tx.product.findMany({
        where: { id: { in: data.transaksi_product.map((p) => p.product_id) } },
        select: { id: true, price: true, quantity: true },
      });

      // Validasi stok produk
      for (const item of data.transaksi_product) {
        const product = products.find((p) => p.id === item.product_id);
        if (!product)
          throw new Error(`Produk ${item.product_id} tidak ditemukan`);
        if (item.quantity > product.quantity)
          throw new Error(`Stock produk ${item.product_id} tidak mencukupi`);
      }

      // Hitung total harga transaksi
      let totalAmount = data.transaksi_product.reduce((total, item) => {
        const product = products.find((p) => p.id === item.product_id);
        return total + (product?.price ?? 0) * item.quantity;
      }, 0);

      // Kurangi diskon jika ada voucher
      totalAmount = Math.max(totalAmount - voucherDiscount, 0);

      // Simpan transaksi utama
      const newTransaction = await tx.transaksi.create({
        data: {
          customer_name: data.customer_name,
          total_amount: totalAmount,
          user_id: data.user_id,
          payment_id: data.payment_id,
          voucher_id: data.voucher_id,
          sales_type: data.sales_type,
        },
      });

      // Simpan transaksi produk
      const transaksiProductData = data.transaksi_product.map((product) => {
        const productData = products.find((p) => p.id === product.product_id);
        return {
          transaksi_id: newTransaction.id,
          product_id: product.product_id,
          quantity: product.quantity,
          subtotal: (productData?.price ?? 0) * product.quantity,
        };
      });

      await tx.transaksiProduct.createMany({ data: transaksiProductData });

      // Kurangi stok produk
      for (const item of data.transaksi_product) {
        await tx.product.update({
          where: { id: item.product_id },
          data: { quantity: { decrement: item.quantity } },
        });
      }

      // Simpan transaksi topping (jika ada)
      if (data.transaksi_topping && data.transaksi_topping.length > 0) {
        await tx.transaksiTopping.createMany({
          data: data.transaksi_topping.map((topping) => ({
            transaksi_id: newTransaction.id,
            topping_id: topping.topping_id,
            quantity: topping.quantity,
          })),
        });
      }

      // Refresh halaman history setelah transaksi berhasil
      revalidatePath("/history");

      return responServerAction({
        statusSuccess: true,
        messageSuccess: "Berhasil membuat Transaksi",
      });
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal membuat Transaksi",
    });
  }
};

export const updateTransaction = async (
  data: TransactionSchema & { id: string }
) => {
  try {
    await prisma.transaksi.update({
      where: { id: data.id },
      data: {
        customer_name: data.customer_name,
        total_amount: data.total_amount,
        user_id: data.user_id,
        payment_id: data.payment_id,
        voucher_id: data.voucher_id,
      },
    });

    revalidatePath("/history");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil mengupdate Transaksi",
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal mengupdate Transaksi",
    });
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    await prisma.transaksi.delete({
      where: { id },
    });

    revalidatePath("/history");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil menghapus Transaksi",
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal menghapus Transaksi",
    });
  }
};
