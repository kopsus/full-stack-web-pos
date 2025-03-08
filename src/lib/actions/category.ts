"use server";

import { CategorySchema } from "@/lib/formValidationSchemas/category";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { responServerAction } from "./responseServerAction";

export const createCategory = async (data: CategorySchema) => {
  try {
    await prisma.category.create({
      data: {
        name: data.name,
      },
    });

    revalidatePath("/category");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil membuat Category",
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal membuat Category",
    });
  }
};

export const updateCategory = async (data: CategorySchema & { id: string }) => {
  try {
    await prisma.category.update({
      where: { id: data.id },
      data: {
        name: data.name,
      },
    });

    revalidatePath("/category");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil mengupdate Category",
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal mengupdate Category",
    });
  }
};

export const deleteCategory = async (id: string) => {
  try {
    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/category");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil menghapus Category",
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal menghapus Category",
    });
  }
};
