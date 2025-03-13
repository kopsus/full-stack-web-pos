import { z } from "zod";

export const voucherSchema = z.object({
  id: z.string().optional(),
  discount: z.coerce.number(),
  // name: z.string().min(1, "Voucher name is required!"),
  // percentage: z.coerce.number(),
  // minimum_price: z.coerce.number(),
  // maximum_price: z.coerce.number(),
  // max_usage: z.coerce.number(),
  // voucher_end: z.coerce.date().nullable(),
});

export type VoucherSchema = z.infer<typeof voucherSchema>;
