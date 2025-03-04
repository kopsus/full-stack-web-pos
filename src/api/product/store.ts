import { atom } from "jotai";
import { TypeProduct } from "./types";

export type IDialog = {
  show: boolean;
  type: "CREATE" | "UPDATE" | "DELETE";
  data?: TypeProduct | null;
};

const storeDialogProduct = atom<IDialog>({
  show: false,
  type: "CREATE",
  data: null,
});

export { storeDialogProduct };
