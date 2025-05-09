import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Printer from "node-thermal-printer";
import { formatIDR } from "@/lib/format";

// thermal
export async function GET({ params }: any) {
  try {
    const { id } = await params;

    const trx = await prisma.transaksi.findUnique({
      where: { id: id },
      include: {
        shift: { include: { user: true } },
        transaksi_product: { include: { product: true } },
        transaksi_topping: { include: { topping: true } },
      },
    });

    if (!trx) {
      return NextResponse.json({
        success: false,
        message: "Transaksi tidak ditemukan",
      });
    }

    let printer = new Printer.printer({
      interface: "printer:EPPOS_EP5859",
      characterSet: Printer.CharacterSet.SLOVENIA,
    });

    printer.alignCenter();
    printer.bold(true);
    printer.println("Loempia BOM");
    printer.bold(false);
    printer.println("Jl. Sudirman No. 123, Jakarta");
    printer.newLine();

    printer.alignLeft();
    printer.println(`Kasir: ${trx.shift.user.username}`);
    printer.println(`Waktu: ${new Date(trx.createdAt).toLocaleString()}`);
    printer.drawLine();

    trx.transaksi_product.forEach((item) => {
      printer.println(`${item.product.name} x${item.quantity}`);
      printer.tableCustom([
        { text: `Rp ${item.product.price}`, align: "RIGHT", width: 0.3 },
      ]);
    });

    trx.transaksi_topping.forEach((item) => {
      printer.println(`  + ${item.topping.name}`);
      printer.tableCustom([
        { text: `Rp ${item.topping.price}`, align: "RIGHT", width: 0.3 },
      ]);
    });

    printer.drawLine();
    printer.bold(true);
    printer.tableCustom([
      { text: "Total:", align: "LEFT", width: 0.6 },
      { text: formatIDR(trx.total_amount), align: "RIGHT", width: 0.3 },
    ]);
    printer.tableCustom([
      { text: "Dibayar:", align: "LEFT", width: 0.6 },
      { text: formatIDR(trx.paid_amount || 0), align: "RIGHT", width: 0.3 },
    ]);
    printer.tableCustom([
      { text: "Kembalian:", align: "LEFT", width: 0.6 },
      { text: formatIDR(trx.change || 0), align: "RIGHT", width: 0.3 },
    ]);
    printer.bold(false);

    printer.drawLine();
    printer.alignCenter();
    printer.println("Terima Kasih! 😊");
    printer.cut();

    await printer.execute();

    return NextResponse.json({
      success: true,
      message: "Struk transaksi berhasil dicetak!",
    });
  } catch (error) {
    console.error("Gagal mencetak transaksi:", error);
    return NextResponse.json({
      success: false,
      message: "Gagal mencetak transaksi",
      error,
    });
  }
}
