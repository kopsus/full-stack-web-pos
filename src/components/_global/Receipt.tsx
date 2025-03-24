import { formatIDR } from "@/lib/format";
import { TypeTransaction } from "@/types/transaction";
import React, { forwardRef } from "react";

const Receipt = forwardRef<HTMLDivElement, { history: TypeTransaction[] }>(
  ({ history }, ref) => {
    const totalPendapatan = history.reduce(
      (sum, trx) => sum + trx.total_amount,
      0
    );
    const totalDibayar = history.reduce(
      (sum, trx) => sum + trx.paid_amount!,
      0
    );
    const totalKembalian = totalDibayar - totalPendapatan;

    return (
      <div
        ref={ref}
        className="p-4 text-sm font-mono border w-72 bg-white mx-auto"
      >
        <h2 className="text-center font-bold text-lg">Toko XYZ</h2>
        <p className="text-center">Jl. Contoh No. 123, Jakarta</p>
        <hr className="my-2" />

        <p>Kasir: Tegar</p>
        <p>Shift: 24 Maret 2025 08:00 - 16:00</p>

        <hr className="my-2" />
        <p className="font-bold">Detail Transaksi:</p>

        {history.map((trx, index) => (
          <div key={index} className="mb-3">
            <p className="font-bold"># {trx.id}</p>
            <p>{new Date(trx.createdAt).toLocaleString("id-ID")}</p>

            <div className="ml-2">
              {trx.transaksi_product?.map((product, pIndex) => (
                <div key={pIndex} className="mb-2">
                  <p>
                    {product.product.name} x {product.quantity} -{" "}
                    {formatIDR(product.product.price)}
                  </p>
                </div>
              ))}
              {trx.transaksi_topping?.map((topping, pIndex) => (
                <div key={pIndex} className="mb-2">
                  <p>
                    {topping.topping.name} x {topping.quantity} -{" "}
                    {formatIDR(topping.topping.price!)}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-right font-bold">
              Total: {formatIDR(trx.total_amount)}
            </p>
            <hr className="my-2" />
          </div>
        ))}

        <p className="font-bold">Ringkasan:</p>
        <p>Total Transaksi: {history.length} order</p>
        <p>Total Pendapatan: {formatIDR(totalPendapatan)}</p>
        <p>Total Dibayar: {formatIDR(totalDibayar)}</p>
        <p>Total Kembalian: {formatIDR(totalKembalian)}</p>

        <hr className="my-2" />
        <p className="text-center">Terima Kasih! 😊</p>
      </div>
    );
  }
);

Receipt.displayName = "Receipt";

export default Receipt;
