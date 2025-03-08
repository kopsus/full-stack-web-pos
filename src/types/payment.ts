import { atom } from "jotai";

export type IDialog = {
  show: boolean;
  type: "CREATE" | "UPDATE" | "DELETE";
  data?: TypePayment | null;
};

export const storeDialogPayment = atom<IDialog>({
  show: false,
  type: "CREATE",
  data: null,
});

export type TypePayment = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
