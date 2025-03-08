import { z } from "zod";

export const categorySchema = z.object({
  id: z.coerce.string().optional(),
  name: z.string().min(1, { message: "Category name is required!" }),
});

export type CategorySchema = z.infer<typeof categorySchema>;
