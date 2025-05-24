"use client";

import { TypeTransaksi } from "@/types/transaction";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
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

  // 2. Inisialisasi objek untuk menyimpan total transaksi per bulan
  const monthlyTotals: Record<string, number> = months.reduce(
    (acc, month) => ({ ...acc, [month]: 0 }),
    {}
  );

  // 3. Proses data transaksi
  dataTransaction.forEach((transaction) => {
    if (transaction.createdAt) {
      const monthIndex = new Date(transaction.createdAt).getMonth(); // Ambil index bulan
      const monthName = months[monthIndex]; // Konversi ke nama bulan
      monthlyTotals[monthName] += transaction.total_amount; // Tambahkan total_amount
    }
  });

  // 4. Konversi ke array untuk chart & tentukan warna berdasarkan perbedaan bulan sebelumnya
  const data = months.map((month, index) => {
    const total = monthlyTotals[month];
    const prevTotal = index > 0 ? monthlyTotals[months[index - 1]] : 0;
    return {
      name: month,
      total,
      color: total >= prevTotal ? "#22c55e" : "#ef4444", // Hijau jika naik, merah jika turun
    };
  });

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
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar
            dataKey="total"
            radius={[4, 4, 0, 0]}
            barSize={30}
            fill="currentColor"
            className="transition-all duration-300"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
