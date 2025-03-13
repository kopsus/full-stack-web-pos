import { z } from "zod";

export const transactionSchema = z.object({
  id: z.coerce.string().optional(),
  customer_name: z.string().min(1, "Customer name is required!"),
  sales_type: z
    .enum(["DO", "DineIn"], {
      errorMap: () => ({ message: "Tipe penjualan harus dipilih!" }),
    })
    .default("DO"),
  total_amount: z.coerce
    .number()
    .min(1, "Total amount must be greater than zero!"),
  user_id: z.string().min(1, "User ID is required!"),
  payment_id: z.string().min(1, "Payment ID is required!"),
  voucher_id: z.string().optional().nullable(),
  transaksi_product: z
    .array(
      z.object({
        product_id: z.string(),
        quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
      })
    )
    .min(1, "At least one product is required!"),
  transaksi_topping: z
    .array(
      z.object({
        topping_id: z.string(),
        quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
      })
    )
    .optional(),
});

export type TransactionSchema = z.infer<typeof transactionSchema>;
