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
  name: string;
  percentage: number;
  minimum_price: number;
  maximum_price: number;
  voucher_end: Date;
  max_usage: number;
  createdAt: Date;
  updatedAt: Date;
};
