import { IDialog } from "@/store/dialog";
import { atom } from "jotai";
import { TypeHistory } from "./types";

const storeDialogHistory = atom<IDialog<TypeHistory>>({
  show: false,
  type: "CREATE",
  data: null,
});

export { storeDialogHistory };
