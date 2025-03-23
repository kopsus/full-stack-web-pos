"use server";

import { TransactionSchema } from "@/lib/formValidationSchemas/transaction";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { responServerAction } from "./responseServerAction";
import { getVoucherDiscount } from "./voucher";

export const createTransaction = async (data: TransactionSchema) => {
  try {
    return await prisma.$transaction(async (tx) => {
      // Cek apakah user dan metode pembayaran valid
      const user = await tx.user.findUnique({ where: { id: data.user_id } });
      if (!user) throw new Error("User tidak ditemukan!");

      const payment = await tx.payment.findUnique({
        where: { id: data.payment_id },
      });
      if (!payment) throw new Error("Metode pembayaran tidak valid!");

      // Ambil harga produk dari database
      const productPrices = await tx.product.findMany({
        where: {
          id: { in: data.transaksi_product.map((p) => p.product_id) },
        },
        select: { id: true, price: true },
      });

      const productPriceMap = new Map(
        productPrices.map((p) => [p.id, p.price])
      );

      // Validasi subtotal produk
      const calculatedSubtotal = data.transaksi_product.reduce(
        (total, item) => {
          return (
            total + (productPriceMap.get(item.product_id) || 0) * item.quantity
          );
        },
        0
      );

      // Ambil harga topping dari database (jika ada)
      let toppingSubtotal = 0;
      let toppingPrices: { id: string; price: number }[] = [];

      if (data.transaksi_topping && data.transaksi_topping.length > 0) {
        toppingPrices = await tx.topping.findMany({
          where: {
            id: { in: data.transaksi_topping.map((t) => t.topping_id) },
          },
          select: { id: true, price: true },
        });

        const toppingPriceMap = new Map(
          toppingPrices.map((t) => [t.id, t.price])
        );

        toppingSubtotal = data.transaksi_topping.reduce((total, item) => {
          return (
            total + (toppingPriceMap.get(item.topping_id) || 0) * item.quantity
          );
        }, 0);
      }

      // Hitung subtotalBeforeTax
      const subtotalBeforeTax = calculatedSubtotal + toppingSubtotal;

      // Validasi voucher jika ada
      let discountAmount = 0;
      if (data.voucher_id) {
        const discountPercentage = await getVoucherDiscount(
          tx,
          data.voucher_id
        );
        discountAmount = (subtotalBeforeTax * discountPercentage) / 100;
      }

      // Validasi total amount yang dikirim dari frontend
      const expectedTotalAmount = subtotalBeforeTax - discountAmount;

      if (data.total_amount !== expectedTotalAmount) {
        throw new Error("Total amount tidak valid!");
      }

      // Simpan transaksi ke database dengan total amount dari frontend
      const newTransaction = await tx.transaksi.create({
        data: {
          customer_name: data.customer_name,
          total_amount: data.total_amount, // Pakai total dari frontend
          user_id: data.user_id,
          payment_id: data.payment_id,
          voucher_id: data.voucher_id,
          sales_type: data.sales_type,
        },
      });

      // Simpan produk yang dibeli dalam transaksi
      await tx.transaksiProduct.createMany({
        data: data.transaksi_product.map((product) => ({
          transaksi_id: newTransaction.id,
          product_id: product.product_id,
          quantity: product.quantity,
          subtotal:
            product.quantity * (productPriceMap.get(product.product_id) || 0),
        })),
      });

      // Simpan topping jika ada
      if (data.transaksi_topping && data.transaksi_topping.length > 0) {
        await tx.transaksiTopping.createMany({
          data: data.transaksi_topping.map((topping) => ({
            transaksi_id: newTransaction.id,
            topping_id: topping.topping_id,
            quantity: topping.quantity,
            subtotal:
              topping.quantity *
              (toppingPrices.find((tp) => tp.id === topping.topping_id)
                ?.price || 0),
          })),
        });
      }

      revalidatePath("/history");

      return responServerAction({
        statusSuccess: true,
        messageSuccess: "Berhasil membuat transaksi",
      });
    });
  } catch (error) {
    return responServerAction({
      statusError: true,
      messageError:
        error instanceof Error ? error.message : "Terjadi kesalahan",
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
