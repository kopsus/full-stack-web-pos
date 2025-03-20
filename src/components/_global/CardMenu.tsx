import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { formatIDR } from "@/lib/format";
import { Button } from "../ui/button";
import { TypeProduct } from "@/types/product";

interface ICardMenu {
  id: string;
  name: string;
  price: number;
  image: string;
  addToCart: ({ id, name, price, image }: TypeProduct) => void;
}

const CardMenu = ({ id, name, price, image, addToCart }: ICardMenu) => {
  return (
    <Card className="rounded-xl overflow-hidden">
      <div className="w-full h-36 lg:h-40 overflow-hidden">
        <Image
          src={`/uploads/${image}`}
          alt={name}
          width={0}
          height={0}
          sizes="100vw"
          className="hover:scale-105 transition-all"
        />
      </div>
      <div className="flex flex-col m-3">
        <p className="font-bold">{name}</p>
        <p className="text-slate-500 text-sm">{formatIDR(price)}</p>
        <Button
          className="mt-2"
          onClick={() => addToCart({ id, name, price, image })}
        >
          Add To Cart
        </Button>
      </div>
    </Card>
  );
};

export default CardMenu;
