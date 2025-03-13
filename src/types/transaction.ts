import { atom } from "jotai";
import { TypeUser } from "./user";
import { TypePayment } from "./payment";
import { TypeVoucher } from "./voucher";
import { TypeProduct } from "./product";

export type IDialog = {
  show: boolean;
  type: "CREATE" | "UPDATE" | "DELETE";
  data?: TypeTransaksi | null;
};

export const storeDialogHistory = atom<IDialog>({
  show: false,
  type: "CREATE",
  data: null,
});

export type TypeTransaksi = {
  id: string;
  customer_name: string;
  total_amount: number;
  sales_type: string;
  user_id: string;
  payment_id: string;
  voucher_id: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: TypeUser;
  payment: TypePayment;
  voucher: TypeVoucher | null;
  transaksi_product: TypeTransaksiProduct[];
  // transaksi_topping: TypeTransaksiTopping[];
};

export type TypeTransaksiProduct = {
  id: string;
  transaksi_id: string;
  product_id: string;
  product: TypeProduct;
  quantity: number;
  subtotal: number;
};

export type TypeTransaksiTopping = {
  id: string;
  topping_id: string;
  transaksi_id: string;
  product: TypeProduct;
  quantity: number;
};
