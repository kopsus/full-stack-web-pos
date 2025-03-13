import { TypeProduct } from "@/types/product";
import { atom } from "jotai";
import { TypeUser } from "./user";
import { TypePayment } from "./payment";
import { TypeVoucher } from "./voucher";
import { TypeTopping } from "./topping";

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
  user_id: string;
  payment_id: string;
  voucher_id: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: TypeUser;
  payment: TypePayment;
  transaksi_product: TypetransaksiProduct[];
  transaksi_topping: TypeTransaksiTopping[];
};

export type TypetransaksiProduct = {
  id: string;
  transaksi_id: string;
  transaksi?: TypeTransaksi;
  product_id: string;
  product: TypeProduct;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TypeTransaksiTopping = {
  id: string;
  transaksi_id: string;
  transaksi: TypeTransaksi;
  topping_id: string;
  topping: TypeTopping;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};
