import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { formatIDR } from "@/lib/format";
import { Button } from "../ui/button";
import { TypeProduct } from "@/types/product";
import { baseIMAGEURL } from "@/lib/utils";

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
      <div className="w-full h-14 lg:h-28 overflow-hidden border">
        <Image
          src={`${baseIMAGEURL}/${image}`}
          alt={name}
          width={0}
          height={0}
          sizes="100vw"
          className="hover:scale-105 transition-all"
        />
      </div>
      <div className="flex flex-col m-2 text-xs">
        <p className="font-bold">{name}</p>
        <p className="text-slate-500">{formatIDR(price)}</p>
        <Button
          className="mt-1"
          size={"sm"}
          onClick={() => addToCart({ id, name, price, image })}
        >
          Add To Cart
        </Button>
      </div>
    </Card>
  );
};

export default CardMenu;
