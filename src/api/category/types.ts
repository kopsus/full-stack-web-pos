import { TypeProduct } from "../product/types";

export type TypeCategory = {
  id: string;
  name: string;
  product_id?: TypeProduct[];
};
