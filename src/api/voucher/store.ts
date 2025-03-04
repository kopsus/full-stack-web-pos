import { atom } from "jotai";
import { TypeVoucher } from "./types";

export type IDialog = {
  show: boolean;
  type: "CREATE" | "UPDATE" | "DELETE";
  data?: TypeVoucher | null;
};

const storeDialogVoucher = atom<IDialog>({
  show: false,
  type: "CREATE",
  data: null,
});

export { storeDialogVoucher };
