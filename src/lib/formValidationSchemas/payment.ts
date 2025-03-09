import { z } from "zod";

export const paymentSchema = z.object({
  id: z.coerce.string().optional(),
  name: z.string().min(1, "Payment name is required!"),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;
