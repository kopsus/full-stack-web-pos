import React from "react";
import { Card } from "../ui/card";
import { ArrowUp, Boxes, Repeat, ShoppingCart } from "lucide-react";

const CardState = () => {
  return (
    <>
      <Card className="p-5 w-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-500 text-sm">Total Penjualan</p>
            <p className="text-2xl font-bold">46</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-200 text-red-600 flex justify-center items-center">
            <ShoppingCart />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-green-600">
            <ArrowUp size={16} />
            12%
          </span>
          <p className="text-slate-500">Dari bulan lalu</p>
        </div>
      </Card>
      <Card className="p-5 w-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-500 text-sm">Total Produk</p>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-600 flex justify-center items-center">
            <Boxes />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-green-600">
            <Boxes size={16} />
            12
          </span>
          <p className="text-slate-500">Produk Tersedia</p>
        </div>
      </Card>
      <Card className="p-5 w-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-500 text-sm">Total Transaksi</p>
            <p className="text-2xl font-bold">52</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-green-200 text-green-600 flex justify-center items-center">
            <Repeat />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-green-600">
            <ArrowUp size={16} />
            15
          </span>
          <p className="text-slate-500 text-wrap">Transaksi dilakukan</p>
        </div>
      </Card>
    </>
  );
};

export default CardState;
