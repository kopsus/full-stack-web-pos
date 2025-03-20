import { atom } from "jotai";
import { TypeCategory } from "./category";

export type IDialog = {
  show: boolean;
  type: "CREATE" | "UPDATE" | "DELETE";
  data?: TypeProduct | null;
};

export const storeDialogProduct = atom<IDialog>({
  show: false,
  type: "CREATE",
  data: null,
});

export type TypeProduct = {
  id: string;
  image: string | null;
  name: string;
  price: number;
  quantity?: number;
  category_id?: string;
  category?: TypeCategory;
};
