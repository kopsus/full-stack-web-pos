"use client";

import { TypeTransaksi } from "@/types/transaction";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip, // Tambahkan ini
  Legend, // Tambahkan ini
} from "recharts";
import CardState from "../_global/CardState";
import { TypeProduct } from "@/types/product";

interface IDashboardAdmin {
  dataTransaction: TypeTransaksi[];
  dataProduct: TypeProduct[];
  activeShift: any;
}

export function DashboardAdmin({
  dataTransaction,
  dataProduct,
  activeShift,
}: IDashboardAdmin) {
  // 1. Buat mapping nama bulan
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // 2. Inisialisasi objek untuk menyimpan data agregat per bulan
  //    Sekarang kita simpan omset (revenue) dan jumlah pembeli (transactions)
  const monthlyData: Record<string, { omset: number; jumlahPembeli: number }> =
    months.reduce((acc, month) => {
      acc[month] = { omset: 0, jumlahPembeli: 0 };
      return acc;
    }, {} as Record<string, { omset: number; jumlahPembeli: number }>);

  // 3. Proses data transaksi
  dataTransaction.forEach((transaction) => {
    if (transaction.createdAt) {
      const monthIndex = new Date(transaction.createdAt).getMonth();
      const monthName = months[monthIndex];
      // Tambahkan total omset
      monthlyData[monthName].omset += transaction.total_amount;
      // Tambahkan jumlah transaksi (sebagai jumlah pembeli)
      monthlyData[monthName].jumlahPembeli += 1;
    }
  });

  // 4. Konversi ke array yang akan digunakan oleh chart
  const chartData = months.map((month) => ({
    name: month,
    "Total Omset": monthlyData[month].omset,
    "Jumlah Pembeli": monthlyData[month].jumlahPembeli,
  }));

  return (
    <div className="p-4 space-y-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:items-center gap-4">
        <CardState
          dataTransaction={dataTransaction}
          dataProduct={dataProduct}
          activeShift={activeShift}
        />
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            yAxisId="left" // Memberi ID untuk sumbu Y kiri (Omset)
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) =>
              `IDR ${new Intl.NumberFormat("id-ID").format(value)}`
            }
          />
          <YAxis
            yAxisId="right" // Memberi ID untuk sumbu Y kanan (Jumlah Pembeli)
            orientation="right"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            formatter={(value, name) => {
              if (name === "Total Omset") {
                // Format sebagai mata uang Rupiah
                return `IDR ${new Intl.NumberFormat("id-ID").format(
                  Number(value)
                )}`;
              }
              // Untuk "Jumlah Pembeli", tampilkan nilai apa adanya
              return value;
            }}
          />
          <Legend />
          <Bar
            yAxisId="left" // Kaitkan bar ini dengan sumbu Y kiri
            dataKey="Total Omset"
            fill="#22c55e" // Warna hijau untuk omset
            radius={[4, 4, 0, 0]}
            barSize={25}
          />
          <Bar
            yAxisId="right" // Kaitkan bar ini dengan sumbu Y kanan
            dataKey="Jumlah Pembeli"
            fill="#3b82f6" // Warna biru untuk jumlah pembeli
            radius={[4, 4, 0, 0]}
            barSize={25}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
