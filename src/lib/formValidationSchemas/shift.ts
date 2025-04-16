import { z } from "zod";

export const shiftSchema = z.object({
  id: z.string().optional(),
  user_id: z.string().min(1, "user id is required"),
  start_time: z.coerce.date(),
  end_time: z.coerce.date().optional(),
});

export type ShiftSchema = z.infer<typeof shiftSchema>;
