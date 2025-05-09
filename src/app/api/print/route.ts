import Printer from "node-thermal-printer";
import { NextResponse } from "next/server";
import { formatDate, formatIDR } from "@/lib/format";
import { filterTransactionsByShift } from "@/utils/filterTransactionByShift";

// print thermal
export async function POST(req: Request) {
  try {
    const { history, shift } = await req.json();
    const filtered = filterTransactionsByShift(history, shift);

    let printer = new Printer.printer({
      interface: "printer:Epson_L3210",
      characterSet: Printer.CharacterSet.SLOVENIA,
    });

    printer.alignCenter();
    printer.bold(true);
    printer.println("Loempia BOM");
    printer.bold(false);
    printer.println("Jl. Sudirman No. 123, Jakarta");
    printer.newLine();

    printer.alignLeft();
    printer.println(`Kasir: ${shift.user.name}`);
    printer.println(
      `Shift: ${formatDate(shift.start_time)} - ${formatDate(shift.end_time)}`
    );
    printer.drawLine();

    printer.bold(true);
    printer.println("Detail Transaksi:");
    printer.bold(false);
    printer.drawLine();

    filtered.forEach((trx: any, index: number) => {
      printer.newLine();
      printer.bold(true);
      printer.println(`#${index + 1} - ID: ${trx.id}`);
      printer.bold(false);
      printer.println(formatDate(trx.createdAt));

      trx.transaksi_product?.forEach((item: any) => {
        printer.println(`${item.product.name} x${item.quantity}`);
        printer.tableCustom([
          { text: `Rp ${item.product.price}`, align: "RIGHT", width: 0.3 },
        ]);
      });

      trx.transaksi_topping?.forEach((item: any) => {
        printer.println(`  + ${item.topping.name}`);
        printer.tableCustom([
          { text: `Rp ${item.topping.price}`, align: "RIGHT", width: 0.3 },
        ]);
      });

      printer.bold(true);
      printer.tableCustom([
        { text: "Total:", align: "LEFT", width: 0.6 },
        { text: `Rp ${trx.total_amount}`, align: "RIGHT", width: 0.3 },
      ]);
      printer.bold(false);
      printer.drawLine();
    });

    // Ringkasan
    printer.newLine();
    printer.bold(true);
    printer.println("Ringkasan:");
    printer.bold(false);
    printer.drawLine();
    const totalPendapatan = filtered.reduce(
      (sum: number, trx: any) => sum + trx.total_amount,
      0
    );
    const totalDibayar = filtered.reduce(
      (sum: number, trx: any) => sum + trx.paid_amount!,
      0
    );
    const totalKembalian = totalDibayar - totalPendapatan;

    printer.tableCustom([
      { text: "Total Transaksi:", align: "LEFT", width: 0.6 },
      { text: `${filtered.length} order`, align: "RIGHT", width: 0.3 },
    ]);
    printer.tableCustom([
      { text: "Total Pendapatan:", align: "LEFT", width: 0.6 },
      { text: formatIDR(totalPendapatan), align: "RIGHT", width: 0.3 },
    ]);
    printer.tableCustom([
      { text: "Total Dibayar:", align: "LEFT", width: 0.6 },
      { text: `Rp ${totalDibayar}`, align: "RIGHT", width: 0.3 },
    ]);
    printer.tableCustom([
      { text: "Total Kembalian:", align: "LEFT", width: 0.6 },
      { text: `Rp ${totalKembalian}`, align: "RIGHT", width: 0.3 },
    ]);

    printer.drawLine();
    printer.alignCenter();
    printer.println("Terima Kasih! 😊");
    printer.cut();

    await printer.execute();

    return NextResponse.json({
      success: true,
      message: "Struk berhasil dicetak!",
    });
  } catch (error) {
    console.error("Gagal mencetak:", error);
    return NextResponse.json({
      success: false,
      message: "Gagal mencetak",
      error,
    });
  }
}
