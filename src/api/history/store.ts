import { atom } from "jotai";
import { TypeHistory } from "./types";

export type IDialog = {
  show: boolean;
  type: "CREATE" | "UPDATE" | "DELETE";
  data?: TypeHistory | null;
};

const storeDialogHistory = atom<IDialog>({
  show: false,
  type: "CREATE",
  data: null,
});

export { storeDialogHistory };
