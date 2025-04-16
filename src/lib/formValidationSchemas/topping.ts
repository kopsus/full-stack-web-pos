import { z } from "zod";

export const toppingSchema = z.object({
  id: z.coerce.string().optional(),
  name: z.string().min(1, "Topping name is required!"),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
});

export type ToppingSchema = z.infer<typeof toppingSchema>;
