import { atom } from "jotai";

export type IDialog = {
  show: boolean;
  type: "CREATE" | "UPDATE" | "DELETE";
  data?: TypeTopping | null;
};

export const storeDialogTopping = atom<IDialog>({
  show: false,
  type: "CREATE",
  data: null,
});

export type TypeTopping = {
  id: string;
  name?: string;
  price?: number;
  quantity?: number;
  category_id?: string;
};
