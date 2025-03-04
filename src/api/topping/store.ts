import { atom } from "jotai";
import { TypeTopping } from "./types";

export type IDialog = {
  show: boolean;
  type: "CREATE" | "UPDATE" | "DELETE";
  data?: TypeTopping | null;
};

const storeDialogTopping = atom<IDialog>({
  show: false,
  type: "CREATE",
  data: null,
});

export { storeDialogTopping };
