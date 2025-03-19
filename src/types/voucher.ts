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
  minimum_price: number;
  maximum_price: number;
  max_usage: number;
  voucher_end: Date;
  createdAt: Date;
  updatedAt: Date;
};
