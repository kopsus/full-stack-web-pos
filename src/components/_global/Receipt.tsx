import { formatIDR } from "@/lib/format";
import { TypeTransaction } from "@/types/transaction";

interface IReceipt {
  history: TypeTransaction[];
}

const Receipt = ({ history }: IReceipt) => {
  const totalPendapatan = history.reduce(
    (sum, trx) => sum + trx.total_amount,
    0
  );
  const totalDibayar = history.reduce((sum, trx) => sum + trx.paid_amount!, 0);
  const totalKembalian = totalDibayar - totalPendapatan;

  return (
    <div className="text-start p-4 text-sm font-mono border w-72 bg-white mx-auto">
      <h2 className="text-center font-bold text-lg">Loempia BOM</h2>
      <p className="text-center">Jl. Sudirman No. 123, Jakarta</p>
      <hr className="my-2" />

      <p>Kasir: Tegar</p>
      <p>Shift: 24 Maret 2025 08:00 - 16:00</p>
      <hr className="my-2" />
      <p className="font-bold">Detail Transaksi:</p>
      <hr className="my-2" />

      {history.map((trx, index) => (
        <div key={index} className="mb-3">
          <p className="font-bold"># {trx.id}</p>
          <p>{new Date(trx.createdAt).toLocaleString("id-ID")}</p>

          <div className="ml-2">
            {trx.transaksi_product?.map((item, index) => (
              <p key={index}>
                {item.product.name} x {item.quantity} -{" "}
                {formatIDR(item.product.price)}
              </p>
            ))}
            {trx.transaksi_topping?.map((item, index) => (
              <p key={index} className="ml-4 text-xs">
                + {item.topping.name} - {formatIDR(Number(item.topping.price))}
              </p>
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
};

export default Receipt;
