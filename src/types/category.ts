import { atom } from "jotai";

export type TypeCategory = {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type IDialog = {
  show: boolean;
  type: "CREATE" | "UPDATE" | "DELETE";
  data?: TypeCategory | null;
};

export const storeDialogCategory = atom<IDialog>({
  show: false,
  type: "CREATE",
  data: null,
});
