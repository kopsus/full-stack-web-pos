import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { formatIDR } from "@/lib/format";
import { Button } from "../ui/button";
import { TypeProduct } from "@/api/product/types";

const CardMenu = ({ name, price, image }: TypeProduct) => {
  return (
    <Card className="rounded-xl overflow-hidden">
      <div className="w-full h-36 lg:h-40 overflow-hidden">
        <Image
          src={image}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="hover:scale-105 transition-all"
        />
      </div>
      <div className="flex flex-col m-3">
        <p className="font-bold">{name}</p>
        <p className="text-slate-500 text-sm">{formatIDR(price)}</p>
        <Button className="mt-2">Add To Chart</Button>
      </div>
    </Card>
  );
};

export default CardMenu;
