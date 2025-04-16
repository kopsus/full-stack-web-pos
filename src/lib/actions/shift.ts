"use server";

import { revalidatePath } from "next/cache";
import { ShiftSchema } from "../formValidationSchemas/shift";
import prisma from "../prisma";
import { responServerAction } from "./responseServerAction";

export const onShift = async (data: ShiftSchema) => {
  try {
    await prisma.shift.create({
      data: {
        start_time: data.start_time,
        user_id: data.user_id,
      },
    });

    revalidatePath("/shift");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil memulai memulai shift anda",
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal memulai shift",
    });
  }
};

export async function endShift({ id }: { id: string }) {
  await prisma.shift.update({
    where: { id },
    data: {
      end_time: new Date(),
    },
  });
  revalidatePath("/shift");

  return responServerAction({
    statusSuccess: true,
    messageSuccess: "Berhasil mengakhiri shift",
  });
}
