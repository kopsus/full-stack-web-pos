import { IDialog } from "@/store/dialog";
import { atom } from "jotai";
import { TypeProduct } from "./types";

const storeDialogProduct = atom<IDialog<TypeProduct>>({
  show: false,
  type: "CREATE",
  data: null,
});

export { storeDialogProduct };
