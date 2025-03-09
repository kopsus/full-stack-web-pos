"use server";

import { ToppingSchema } from "@/lib/formValidationSchemas/topping";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { responServerAction } from "./responseServerAction";

export const createTopping = async (data: ToppingSchema) => {
  try {
    const existingTopping = await prisma.topping.findFirst({
      where: {
        name: data.name,
        NOT: { id: data.id },
      },
    });

    if (existingTopping) {
      return responServerAction({
        statusError: true,
        messageError: `Topping ${existingTopping.name} sudah tersedia. Silakan gunakan nama lain.`,
      });
    }

    await prisma.topping.create({
      data: {
        name: data.name,
        price: data.price,
      },
    });

    revalidatePath("/topping");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil membuat Topping",
    });
  } catch (error) {
    console.error(error);

    return responServerAction({
      statusError: true,
      messageError: "Gagal membuat Topping",
    });
  }
};

export const updateTopping = async (data: ToppingSchema & { id: string }) => {
  try {
    const existingTopping = await prisma.topping.findFirst({
      where: {
        name: data.name,
        NOT: { id: data.id },
      },
    });

    if (existingTopping) {
      return responServerAction({
        statusError: true,
        messageError: `Topping ${existingTopping.name} sudah tersedia. Silakan gunakan nama lain.`,
      });
    }

    await prisma.topping.update({
      where: { id: data.id },
      data: {
        name: data.name,
        price: data.price,
      },
    });

    revalidatePath("/topping");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil mengupdate Topping",
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal mengupdate Topping",
    });
  }
};

export const deleteTopping = async (id: string) => {
  try {
    await prisma.topping.delete({
      where: { id },
    });

    revalidatePath("/topping");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil menghapus Topping",
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal menghapus Topping",
    });
  }
};
