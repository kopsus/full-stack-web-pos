"use server";

import { cookies } from "next/headers";
import { responServerAction } from "./responseServerAction";

export default async function logout() {
  (await cookies()).delete("session");
  return responServerAction({
    statusSuccess: true,
    messageSuccess: "Logout success",
  });
}
