import { z } from "zod";

export const userSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username minimal 3 karakter!" })
    .regex(/^[a-z0-9]+$/, {
      message: "Username hanya boleh mengandung huruf kecil dan angka!",
    }),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter!" })
    .or(z.literal("")),
  role: z
    .enum(["cashier", "admin"], {
      errorMap: () => ({ message: "Tipe harus dipilih!" }),
    })
    .default("admin"),
});

export type UserSchema = z.infer<typeof userSchema>;
