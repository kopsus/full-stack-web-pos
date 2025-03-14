import { formatDate, formatIDR } from "@/lib/format";
import { TypeTransaksi } from "@/types/transaction";
import React from "react";

const DetailHistory = ({ history }: { history: TypeTransaksi }) => {
  console.log("histrory", history);

  return (
    <div className="flex justify-between bg-slate-50 p-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <p className="font-bold">Nama Customer</p>
          {history.customer_name}
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Nama Kasir</p>
          {history.user.username}
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Pembayaran</p>
          {history.payment.name}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold">Menu</p>
        {history.transaksi_product.map((item) => (
          <ul key={item.id} className="list-disc list-inside">
            <li>{item.product.name}</li>
          </ul>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold">Quantity</p>
        {history.transaksi_product.map((item) => (
          <p key={item.id}>{item.product.quantity}</p>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold">Subtotal</p>
        {history.transaksi_product.map((item) => (
          <p key={item.id}>{formatIDR(item.subtotal)}</p>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold">Total</p>
        {formatIDR(history.total_amount)}
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold">Tanggal Transaksi</p>
        {formatDate(history.updatedAt.toISOString())}
      </div>
    </div>
  );
};

export default DetailHistory;
