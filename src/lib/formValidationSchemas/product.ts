import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Product name is required!"),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
  image: z.any().optional(),
  category_id: z.string().min(1, "Category id is required"),
});

export type ProductSchema = z.infer<typeof productSchema>;
