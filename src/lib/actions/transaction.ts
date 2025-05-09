"use server";

import { TransactionSchema } from "@/lib/formValidationSchemas/transaction";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { responServerAction } from "./responseServerAction";
import { getVoucherDiscount } from "./voucher";

export const createTransaction = async (data: TransactionSchema) => {
  try {
    return await prisma.$transaction(async (tx) => {
      // 1. Validasi shift aktif
      const shift = await tx.shift.findUnique({ where: { id: data.shift_id } });
      if (!shift || shift.end_time !== null) {
        throw new Error("Shift belum aktif");
      }

      // 2. Ambil harga & stok produk
      const products = await tx.product.findMany({
        where: { id: { in: data.transaksi_product.map((p) => p.product_id) } },
        select: { id: true, price: true, quantity: true, name: true },
      });

      const productMap = new Map(products.map((p) => [p.id, p]));

      // 3. Validasi stok & hitung subtotal produk
      let calculatedSubtotal = 0;
      for (const item of data.transaksi_product) {
        const product = productMap.get(item.product_id);
        if (!product)
          throw new Error(`Produk ${item.product_id} tidak ditemukan`);
        if (product.quantity < item.quantity)
          throw new Error(`Stok produk ${item.product_id} tidak cukup`);

        calculatedSubtotal += item.quantity * product.price;
      }

      // 4. Ambil harga & stok topping jika ada
      let toppingSubtotal = 0;
      let toppingMap = new Map<
        string,
        { price: number; quantity: number; name: string }
      >();

      if (data.transaksi_topping && data.transaksi_topping.length > 0) {
        const toppings = await tx.topping.findMany({
          where: {
            id: { in: data.transaksi_topping.map((t) => t.topping_id) },
          },
          select: { id: true, price: true, quantity: true, name: true },
        });

        toppingMap = new Map(toppings.map((t) => [t.id, t]));

        // Validasi stok topping & hitung subtotal
        for (const item of data.transaksi_topping) {
          const topping = toppingMap.get(item.topping_id);
          if (!topping)
            throw new Error(`Topping ${item.topping_id} tidak ditemukan`);
          if (topping.quantity < item.quantity)
            throw new Error(`Stok topping ${item.topping_id} tidak cukup`);

          toppingSubtotal += item.quantity * topping.price;
        }
      }

      // 6. Validasi pembayaran
      if (data.paid_amount && data.paid_amount < data.total_amount) {
        throw new Error("Jumlah yang dibayarkan kurang!");
      }

      const change = data.paid_amount - data.total_amount;

      // 7. Simpan transaksi
      const newTransaction = await tx.transaksi.create({
        data: {
          customer_name: data.customer_name,
          total_amount: data.total_amount,
          shift_id: data.shift_id,
          paid_amount: data.paid_amount,
          change: change,
          payment_id: data.payment_id,
          voucher_id: data.voucher_id,
          sales_type: data.sales_type,
        },
      });

      // 8. Simpan transaksi produk
      await tx.transaksiProduct.createMany({
        data: data.transaksi_product.map((item) => ({
          transaksi_id: newTransaction.id,
          product_id: item.product_id,
          quantity: item.quantity,
          subtotal:
            item.quantity * (productMap.get(item.product_id)?.price || 0),
        })),
      });

      // 9. Simpan transaksi topping jika ada
      if (data.transaksi_topping && data.transaksi_topping.length > 0) {
        await tx.transaksiTopping.createMany({
          data: data.transaksi_topping.map((item) => ({
            transaksi_id: newTransaction.id,
            topping_id: item.topping_id,
            quantity: item.quantity,
            subtotal:
              item.quantity * (toppingMap.get(item.topping_id)?.price || 0),
          })),
        });
      }

      // 10. Kurangi stok produk
      for (const item of data.transaksi_product) {
        await tx.product.update({
          where: { id: item.product_id },
          data: {
            quantity: { decrement: item.quantity },
          },
        });
      }

      // 11. Kurangi stok topping
      if (data.transaksi_topping && data.transaksi_topping.length > 0) {
        for (const item of data.transaksi_topping) {
          await tx.topping.update({
            where: { id: item.topping_id },
            data: {
              quantity: { decrement: item.quantity },
            },
          });
        }
      }

      // 12. Revalidate halaman history
      revalidatePath("/history");

      return responServerAction({
        statusSuccess: true,
        messageSuccess: "Berhasil membuat transaksi",
        data: {
          transaksi: {
            ...data,
            transaksi_product: data.transaksi_product.map((item) => {
              const p = productMap.get(item.product_id);
              return {
                ...item,
                name: p?.name || "Unknown Product",
                price: p?.price || 0,
                subtotal: item.quantity * (p?.price || 0),
              };
            }),
            transaksi_topping:
              data.transaksi_topping?.map((item) => {
                const t = toppingMap.get(item.topping_id);
                return {
                  ...item,
                  name: t?.name || "Unknown Topping",
                  price: t?.price || 0,
                  subtotal: item.quantity * (t?.price || 0),
                };
              }) || [],
          },
        },
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
