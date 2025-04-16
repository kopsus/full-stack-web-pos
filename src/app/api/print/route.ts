// import { formatDate, formatIDR } from "@/lib/format";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import Printer from "node-thermal-printer";
import { NextResponse } from "next/server";
import { formatDate, formatIDR } from "@/lib/format";
import { filterTransactionsByShift } from "@/utils/filterTransactionByShift";

// print thermal
export async function POST(req: Request) {
  try {
    const { history, shift, type } = await req.json();
    const filtered = filterTransactionsByShift(history, shift);

    if (type === "thermal") {
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
        message: "Struk thermal berhasil dicetak!",
      });
    }

    // --- CETAK NON THERMAL ---
    else if (type === "non-thermal") {
      let receiptText = "";
      receiptText += `Loempia BOM\nJl. Sudirman No. 123, Jakarta\n\n`;
      receiptText += `Kasir: ${shift.user.username}\n`;
      receiptText += `Shift: ${new Date(
        shift.start_time
      ).toLocaleString()} - ${new Date(shift.end_time).toLocaleString()}\n`;
      receiptText += "--------------------------------\n";
      receiptText += "Detail Transaksi:\n";
      receiptText += "--------------------------------\n";

      filtered.forEach((trx: any, index: number) => {
        receiptText += `#${index + 1} - ID: ${trx.id}\n`;
        receiptText += `${formatDate(trx.createdAt)}\n`;

        trx.transaksi_product?.forEach((item: any) => {
          receiptText += `  ${item.product.name} x${item.quantity} - Rp ${item.product.price}\n`;
        });

        trx.transaksi_topping?.forEach((item: any) => {
          receiptText += `    + ${item.topping.name} - Rp ${item.topping.price}\n`;
        });

        receiptText += `Total: Rp ${trx.total_amount}\n`;
        receiptText += "--------------------------------\n";
      });

      const totalPendapatan = filtered.reduce(
        (sum: number, trx: any) => sum + trx.total_amount,
        0
      );
      const totalDibayar = filtered.reduce(
        (sum: number, trx: any) => sum + trx.paid_amount!,
        0
      );
      const totalKembalian = totalDibayar - totalPendapatan;

      receiptText += `Total Transaksi: ${filtered.length} order\n`;
      receiptText += `Total Pendapatan: Rp ${totalPendapatan}\n`;
      receiptText += `Total Dibayar: Rp ${totalDibayar}\n`;
      receiptText += `Total Kembalian: Rp ${totalKembalian}\n`;
      receiptText += "--------------------------------\n";
      receiptText += "Terima Kasih! 😊\n";

      const filePath = path.join("D:\\temp", "receipt.txt");
      fs.writeFileSync(filePath, receiptText);

      exec(`notepad /p "${filePath}"`, (error) => {
        if (error) {
          console.error("Gagal mencetak:", error);
        }
      });

      return NextResponse.json({
        success: true,
        message: "Struk non-thermal berhasil dikirim ke printer!",
      });
    }

    // Jika type tidak dikenali
    return NextResponse.json({
      success: false,
      message: "Tipe cetak tidak dikenali.",
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
