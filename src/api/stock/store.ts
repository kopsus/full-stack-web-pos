import { IDialog } from "@/store/dialog";
import { atom } from "jotai";
import { TypeStock } from "./types";

const storeDialogStock = atom<IDialog<TypeStock>>({
  show: false,
  type: "CREATE",
  data: null,
});

export { storeDialogStock };
