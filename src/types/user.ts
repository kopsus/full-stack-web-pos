import { atom } from "jotai";

export type IDialog = {
  show: boolean;
  type: "CREATE" | "UPDATE" | "DELETE";
  data?: TypeUser | null;
};

export const storeDialogUser = atom<IDialog>({
  show: false,
  type: "CREATE",
  data: null,
});

export type TypeRole = "cashier" | "admin";

export type TypeUser = {
  id: string;
  username: string;
  password?: string;
  role: TypeRole;
  createdAt?: Date;
  updatedAt?: Date;
};
