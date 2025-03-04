import { atom } from "jotai";
import { TypePayment } from "./types";

export type IDialog = {
  show: boolean;
  type: "CREATE" | "UPDATE" | "DELETE";
  data?: TypePayment | null;
};

const storeDialogPayment = atom<IDialog>({
  show: false,
  type: "CREATE",
  data: null,
});

export { storeDialogPayment };
