import { IDialog } from "@/store/dialog";
import { atom } from "jotai";
import { TypePayment } from "./types";

const storeDialogPayment = atom<IDialog<TypePayment>>({
  show: false,
  type: "CREATE",
  data: null,
});

export { storeDialogPayment };
