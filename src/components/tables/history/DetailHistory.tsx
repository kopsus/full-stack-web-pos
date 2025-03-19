import { formatDate, formatIDR } from "@/lib/format";
import { TypeTransaksi } from "@/types/transaction";
import React from "react";

const DetailHistory = ({ history }: { history: TypeTransaksi }) => {
  return (
    <div className="border rounded-lg shadow-lg p-6 bg-white">
      {/* Header Transaksi */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">Detail Transaksi</h2>
        <p className="text-gray-600">
          📅 {formatDate(history.updatedAt.toISOString())}
        </p>
      </div>

      {/* Informasi Umum */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="font-semibold">🆔 ID Transaksi:</p>
          <p>{history.id}</p>
        </div>
        <div>
          <p className="font-semibold">👤 Customer:</p>
          <p>{history.customer_name}</p>
        </div>
        <div>
          <p className="font-semibold">👨‍💼 Kasir:</p>
          <p>{history.user.username}</p>
        </div>
        <div>
          <p className="font-semibold">💳 Pembayaran:</p>
          <p>{history.payment.name}</p>
        </div>
        {history.voucher && (
          <div>
            <p className="font-semibold">🎟️ Voucher:</p>
            <p>
              {history.voucher.name} (Diskon {history.voucher.discount} %)
            </p>
          </div>
        )}
      </div>

      {/* Daftar Produk */}
      <div className="mt-4">
        <p className="font-semibold mb-2">🛒 Produk yang Dibeli:</p>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Produk</th>
              <th className="border p-2 text-center">Jumlah</th>
              <th className="border p-2 text-right">Harga Satuan</th>
              <th className="border p-2 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {history.transaksi_product.map((item) => (
              <tr key={item.id} className="border">
                <td className="border p-2">{item.product.name}</td>
                <td className="border p-2 text-center">{item.quantity}</td>
                <td className="border p-2 text-right">
                  {formatIDR(item.subtotal / item.quantity)}
                </td>
                <td className="border p-2 text-right">
                  {formatIDR(item.subtotal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* daftar topping */}
      <div className="mt-4">
        <p className="font-semibold mb-2">🛒 Topping yang ditambahkan:</p>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Produk</th>
              <th className="border p-2 text-center">Jumlah</th>
              <th className="border p-2 text-right">Harga Satuan</th>
              <th className="border p-2 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {history.transaksi_topping.map((item) => (
              <tr key={item.id} className="border">
                <td className="border p-2">{item.topping.name}</td>
                <td className="border p-2 text-center">{item.quantity}</td>
                <td className="border p-2 text-right">
                  {formatIDR(item.subtotal / item.quantity)}
                </td>
                <td className="border p-2 text-right">
                  {formatIDR(item.subtotal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ringkasan Pembayaran */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="font-semibold">💰 Ringkasan Pembayaran</p>
        <div className="flex justify-between">
          <span>Subtotal Produk:</span>
          {history.transaksi_product.map((item) => (
            <span key={item.id}>{item.subtotal}</span>
          ))}
        </div>
        <div className="flex justify-between">
          <span>Subtotal Topping:</span>
          {history.transaksi_topping.map((item) => (
            <span key={item.id}>{item.subtotal}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <p>Tax</p>
          <p>+ 10 %</p>
        </div>
        {history.voucher && (
          <div className="flex justify-between">
            <span>Diskon:</span>
            <span>- {formatIDR(history.voucher.discount)} %</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>✅ Total:</span>
          <span>{formatIDR(history.total_amount)}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailHistory;
