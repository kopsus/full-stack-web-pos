import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import Image from "next/image";
import { formatIDR } from "@/lib/format";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { TypeProduct } from "@/api/product/types";
import { dataSalesType } from "@/data/sales-type";
import prisma from "@/lib/prisma";

interface IFormCart {
  cartItems: TypeProduct[];
  updateQuantity: (id: string, amount: number) => void;
}

const FormCart = async ({ cartItems, updateQuantity }: IFormCart) => {
  const payments = await prisma.payment.findMany();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 0),
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Rincian Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </div>
                  <div className="text-sm flex flex-col gap-3">
                    <p className="line-clamp-1 font-bold">{item.name}</p>
                    <p>{formatIDR(item.price * item.quantity!)}</p>
                    <div className="flex items-center gap-2">
                      <MinusCircle
                        className="cursor-pointer"
                        onClick={() => updateQuantity(item.id, -1)}
                      />
                      <p>{item.quantity}</p>
                      <PlusCircle
                        className="cursor-pointer"
                        onClick={() => updateQuantity(item.id, 1)}
                      />
                    </div>
                  </div>
                </div>
                <Trash
                  className="cursor-pointer"
                  onClick={() => updateQuantity(item.id, -item.quantity!)}
                  color="red"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <p>Subtotal</p>
              <p className="font-semibold">{formatIDR(subtotal)}</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p>Tax (10%)</p>
              <p className="font-semibold">{formatIDR(tax)}</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p>Total</p>
              <p className="font-semibold text-red-600">{formatIDR(total)}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Masukan nama pembeli"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="sales_type">Tipe Penjualan</Label>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Tipe Penjualan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipe Penjualan</SelectLabel>
                    {dataSalesType.map((item, index) => (
                      <SelectItem key={index} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="payment">Metode Pembayaran</Label>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Metode Pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Metode Pembayaran</SelectLabel>
                    {payments.map((item, index) => (
                      <SelectItem key={index} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormCart;
