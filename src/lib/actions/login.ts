"use server";

import { LoginSchema } from "../formValidationSchemas/login";
import { createSession } from "./createSession";
import { responServerAction } from "./responseServerAction";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function login(values: LoginSchema) {
  const { username, password } = values;

  try {
    // cek di semua tabel untuk mencari username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // jika username tidak ditemukan di semua tabel
    if (!user) {
      return responServerAction({
        statusError: true,
        messageError: "Username tidak ditemukan",
      });
    }

    // validate hash password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // cek password
    if (!isPasswordValid) {
      return responServerAction({
        statusError: true,
        messageError: "Password yang anda masukan salah",
      });
    }

    await createSession(user.id.toString(), user.role);

    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Login berhasil",
      data: user,
    });
  } catch (error) {
    return responServerAction({
      statusError: true,
      statusSuccess: false,
      messageError: "Terjadi kesalahan",
    });
  }
}
