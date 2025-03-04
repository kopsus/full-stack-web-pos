import { IDialog } from "@/store/dialog";
import { atom } from "jotai";
import { TypeVoucher } from "./types";

const storeDialogVoucher = atom<IDialog<TypeVoucher>>({
  show: false,
  type: "CREATE",
  data: null,
});

export { storeDialogVoucher };
