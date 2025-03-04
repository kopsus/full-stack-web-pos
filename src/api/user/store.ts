import { atom } from "jotai";
import { TypeUser } from "./types";

export type IDialog = {
  show: boolean;
  type: "CREATE" | "UPDATE" | "DELETE";
  data?: TypeUser | null;
};

const storeDialogUser = atom<IDialog>({
  show: false,
  type: "CREATE",
  data: null,
});

export { storeDialogUser };
