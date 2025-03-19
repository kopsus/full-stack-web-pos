"use server";

import { TransactionSchema } from "@/lib/formValidationSchemas/transaction";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { responServerAction } from "./responseServerAction";

export const createTransaction = async (data: TransactionSchema) => {
  try {
    // 🔍 Validasi awal: Cek apakah `data` tidak null atau undefined
    if (
      !data ||
      !data.transaksi_product ||
      data.transaksi_product.length === 0
    ) {
      throw new Error("Data transaksi tidak valid atau kosong!");
    }

    return await prisma.$transaction(async (tx) => {
      // ✅ Validasi User
      const user = await tx.user.findUnique({ where: { id: data.user_id } });
      if (!user) throw new Error("User tidak ditemukan!");

      // ✅ Validasi Payment
      const payment = await tx.payment.findUnique({
        where: { id: data.payment_id },
      });
      if (!payment) throw new Error("Metode pembayaran tidak valid!");

      // ✅ Validasi Voucher (Jika ada)
      let discountPercentage = 0;
      let voucher = null;

      if (data.voucher_id) {
        voucher = await tx.voucher.findUnique({
          where: { id: data.voucher_id },
        });

        if (!voucher) throw new Error("Voucher tidak valid!");
        if (voucher.max_usage <= 0) throw new Error("Voucher sudah habis!");
        if (new Date(voucher.voucher_end) < new Date()) {
          throw new Error("Voucher sudah kadaluarsa!");
        }

        // Simpan persentase diskon
        discountPercentage = voucher.discount / 100;

        // Kurangi max_usage voucher
        await tx.voucher.update({
          where: { id: data.voucher_id },
          data: { max_usage: { decrement: 1 } },
        });
      }

      // ✅ Ambil data produk yang dipesan
      const products = await tx.product.findMany({
        where: { id: { in: data.transaksi_product.map((p) => p.product_id) } },
        select: { id: true, price: true, quantity: true, name: true },
      });

      // 🔍 Validasi stok produk & Pastikan semua produk ditemukan
      const productMap = new Map(products.map((p) => [p.id, p]));
      for (const item of data.transaksi_product) {
        const product = productMap.get(item.product_id);
        if (!product)
          throw new Error(
            `Produk dengan ID ${item.product_id} tidak ditemukan!`
          );
        if (item.quantity > product.quantity)
          throw new Error(`Stock produk ${product.name} tidak mencukupi`);
      }

      // ✅ Hitung total subtotal dari backend
      let subtotal = data.transaksi_product.reduce((total, item) => {
        const product = productMap.get(item.product_id);
        return product ? total + item.quantity * product.price : total;
      }, 0);

      // Pajak dihitung dulu
      let tax = subtotal * 0.1;
      let subtotalWithTax = subtotal + tax;

      // Diskon dihitung dari subtotal setelah pajak
      let discountAmount = subtotalWithTax * discountPercentage;
      if (voucher?.maximum_price) {
        discountAmount = Math.min(discountAmount, voucher.maximum_price);
      }

      // Hitung total akhir
      let totalAmount = subtotalWithTax - discountAmount;

      // ✅ Simpan transaksi utama
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

      // ✅ Simpan transaksi produk
      const transaksiProductData = data.transaksi_product.map((product) => {
        const productData = productMap.get(product.product_id);
        if (!productData)
          throw new Error(
            `Produk dengan ID ${product.product_id} tidak ditemukan!`
          );
        return {
          transaksi_id: newTransaction.id,
          product_id: product.product_id,
          quantity: product.quantity,
          subtotal: product.quantity * productData.price, // ✅ Hitung subtotal di backend
        };
      });

      await tx.transaksiProduct.createMany({ data: transaksiProductData });

      // ✅ Kurangi stok produk setelah transaksi berhasil
      for (const item of data.transaksi_product) {
        await tx.product.update({
          where: { id: item.product_id },
          data: { quantity: { decrement: item.quantity } },
        });
      }

      // ✅ Simpan transaksi topping (jika ada)
      if (data.transaksi_topping && data.transaksi_topping.length > 0) {
        await tx.transaksiTopping.createMany({
          data: data.transaksi_topping.map((topping) => ({
            transaksi_id: newTransaction.id,
            topping_id: topping.topping_id,
            quantity: topping.quantity,
          })),
        });
      }

      // ✅ Refresh halaman history setelah transaksi berhasil
      revalidatePath("/history");

      return responServerAction({
        statusSuccess: true,
        messageSuccess: "Berhasil membuat Transaksi",
      });
    });
  } catch (error) {
    let errorMessage = "Terjadi kesalahan";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return responServerAction({
      statusError: true,
      messageError: errorMessage,
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
