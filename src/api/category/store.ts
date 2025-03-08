import { atom } from "jotai";
import { TypeCategory } from "@/types/category";

export type IDialog = {
  show: boolean;
  type: "CREATE" | "UPDATE" | "DELETE";
  data?: TypeCategory | null;
};

const storeDialogCategory = atom<IDialog>({
  show: false,
  type: "CREATE",
  data: null,
});

export { storeDialogCategory };
