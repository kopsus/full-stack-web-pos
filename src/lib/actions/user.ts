"use server";

import { UserSchema } from "@/lib/formValidationSchemas/user";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { responServerAction } from "./responseServerAction";
import bcrypt from "bcryptjs";

export const createUser = async (data: UserSchema) => {
  try {
    const existingUsername = await prisma.user.findFirst({
      where: {
        username: data.username,
        NOT: { id: data.id },
      },
    });

    if (existingUsername) {
      return responServerAction({
        statusError: true,
        messageError: `Username ${existingUsername.username} sudah digunakan. Silakan gunakan username lain.`,
      });
    }

    await prisma.user.create({
      data: {
        username: data.username,
        password: bcrypt.hashSync(data.password, 10),
        role: data.role,
      },
    });

    revalidatePath("/user");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil membuat User",
    });
  } catch (error) {
    console.error(error);

    return responServerAction({
      statusError: true,
      messageError: "Gagal membuat User",
    });
  }
};

export const updateUser = async (data: UserSchema & { id: string }) => {
  try {
    const existingUsername = await prisma.user.findFirst({
      where: {
        username: data.username,
        NOT: { id: data.id },
      },
    });

    if (existingUsername) {
      return responServerAction({
        statusError: true,
        messageError: `Username ${existingUsername.username} sudah digunakan. Silakan gunakan username lain.`,
      });
    }

    await prisma.user.update({
      where: { id: data.id },
      data: {
        username: data.username,
        ...(data.password && { password: bcrypt.hashSync(data.password, 10) }),
        role: data.role,
      },
    });

    revalidatePath("/user");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil mengupdate User",
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal mengupdate User",
    });
  }
};

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/user");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil menghapus User",
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal menghapus User",
    });
  }
};
