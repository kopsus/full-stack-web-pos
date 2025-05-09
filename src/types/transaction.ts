import { atom } from "jotai";
import { TypePayment } from "./payment";
import { TypeVoucher } from "./voucher";
import { TypeProduct } from "./product";
import { TypeTopping } from "./topping";
import { TypeShift } from "./shift";

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
  sales_type: "DO" | "DineIn" | "Gojek" | "TakeAway";
  change: number | null;
  paid_amount: number | null;
  shift_id: string;
  payment_id: string;
  voucher_id: string | null;
  createdAt: Date;
  updatedAt: Date;
  shift: TypeShift;
  payment: TypePayment;
  voucher: TypeVoucher | null;
  transaksi_product: TypeTransaksiProduct[];
  transaksi_topping: TypeTransaksiTopping[];
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
  transaksi_id: string;
  topping_id: string;
  topping: TypeTopping;
  quantity: number;
  subtotal: number;
};
