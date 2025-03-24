import { NextResponse } from "next/server";
import fs from "fs";
import PDFDocument from "pdfkit";
import { print } from "pdf-to-printer";
import { formatIDR } from "@/lib/format";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { history } = await req.json();
    if (!history || history.length === 0) {
      return NextResponse.json(
        { error: "Data transaksi kosong" },
        { status: 400 }
      );
    }

    const filePath = "receipt.pdf";
    const doc = new PDFDocument({ size: [200, 600] });

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(12).text("LOEMPIA BOM", { align: "center" });
    doc.fontSize(10).text("Jl. Sudirman No. 123, Jakarta", { align: "center" });
    doc.moveDown();
    doc.text("==============================", { align: "center" });

    history.forEach((trx: any) => {
      doc.moveDown();
      doc.text(`Order: ${trx.id}`);
      doc.text(`Tanggal: ${new Date(trx.createdAt).toLocaleString("id-ID")}`);

      trx.transaksi_product?.forEach((item: any) => {
        doc.text(
          `${item.product.name} x${item.quantity} - ${formatIDR(
            item.product.price
          )}`
        );
      });

      trx.transaksi_topping?.forEach((item: any) => {
        doc.text(`+ ${item.topping.name} - ${formatIDR(item.topping.price!)}`);
      });

      doc.text(`Total: ${formatIDR(trx.total_amount)}`);
      doc.text("------------------------------");
    });

    doc.moveDown();
    doc.text(`Total Transaksi: ${history.length} order`);
    doc.text("==============================", { align: "center" });
    doc.text("Terima Kasih! 😊", { align: "center" });

    doc.end();

    return new Promise((resolve) => {
      stream.on("finish", async () => {
        try {
          await print(filePath, { printer: "EPSON L3210 Series" });
          resolve(NextResponse.json({ success: true }));
        } catch (printError) {
          resolve(
            NextResponse.json(
              { error: "Gagal mencetak", details: printError },
              { status: 500 }
            )
          );
        }
      });
    }) as Promise<NextResponse>; // 🔥 **Tambahkan return type agar sesuai dengan Next.js**
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
