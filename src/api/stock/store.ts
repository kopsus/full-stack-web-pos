import { atom } from "jotai";
import { TypeStock } from "./types";

export type IDialog = {
  show: boolean;
  type: "CREATE" | "UPDATE" | "DELETE";
  data?: TypeStock | null;
};

const storeDialogStock = atom<IDialog>({
  show: false,
  type: "CREATE",
  data: null,
});

export { storeDialogStock };
