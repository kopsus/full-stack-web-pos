import { TypeRole, TypeUser } from "@/api/user/types";

export const dataRole: TypeRole[] = [
  {
    id: "1",
    name: "ADMIN",
  },
  {
    id: "2",
    name: "CASHIER",
  },
];

export const dataUser: TypeUser[] = [
  {
    id: "1",
    roleId: "2",
    email: "kasir@gmail.com",
    password: "password",
    role: {
      id: "2",
      name: "CASHIER",
    },
  },
  {
    id: "2",
    roleId: "1",
    email: "admin@gmail.com",
    password: "password",
    role: {
      id: "1",
      name: "ADMIN",
    },
  },
];
