import { atom } from "jotai";

export type IDialog = {
  show: boolean;
  type: "CREATE" | "UPDATE" | "DELETE";
  data?: TypeVoucher | null;
};

export const storeDialogVoucher = atom<IDialog>({
  show: false,
  type: "CREATE",
  data: null,
});

export type TypeVoucher = {
  id: string;
  discount: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
