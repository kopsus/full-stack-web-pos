import React from "react";
import { Card } from "../ui/card";
import { ArrowUp, Boxes, Repeat } from "lucide-react";
import { TypeTransaksi } from "@/types/transaction";
import { TypeProduct } from "@/types/product";

interface ICardState {
  dataTransaction: TypeTransaksi[];
  dataProduct: TypeProduct[];
}

const CardState = ({ dataTransaction, dataProduct }: ICardState) => {
  return (
    <>
      <Card className="p-5 w-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-500 text-sm">Total Produk</p>
            <p className="text-2xl font-bold">{dataProduct.length}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-600 flex justify-center items-center">
            <Boxes />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-green-600">
            <Boxes size={16} />
            {dataProduct.length}
          </span>
          <p className="text-slate-500">Produk Tersedia</p>
        </div>
      </Card>
      <Card className="p-5 w-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-500 text-sm">Total Transaksi</p>
            <p className="text-2xl font-bold">{dataTransaction.length}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-green-200 text-green-600 flex justify-center items-center">
            <Repeat />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-green-600">
            <ArrowUp size={16} />
            {dataTransaction.length}
          </span>
          <p className="text-slate-500 text-wrap">Transaksi dilakukan</p>
        </div>
      </Card>
    </>
  );
};

export default CardState;
